# flexgates: a from-scratch design for deriving the flex table (Architect, 10 Nov 2026)

Design plus a read-only prototype (`tools/mathlab/flexgates.mjs`, configs `sport-football*.json`, runs in `results/flexgates-2026-11-10.md`). No engine, `flex.json` or `flex.ts` change. Option B not landed.
**Headline, stated first: this design does NOT beat the baselines on fit.** Post-hoc v2 prices 80 of the 99 rules exactly (1 hard miss); the pre-registered v1 prices 70. Inkling's is 88 (93 with floor) and Z.ai's 95 (98 with MUSE's score edits). What it contributes is a verified decomposition, a generalization test the other designs have not had, and a config-driven shape for other sports.

## 1. What a flex price is
A flexed player plays at `ovr - p`. Two different things can make `p` necessary, and they are separate quantities:
1. **Value guard (G).** If the destination slot is worth more than the source's, a star profits by moving up the value ladder unless the penalty is at least `refGap * (1 - w_src / w_dst)` (refGap = 20, a 90 star over a 70 replacement). No-arbitrage; computed from slot weights alone, zero fitted constants.
2. **Transfer gap.** How badly this body does that job: *body* (P, measured from the player table) and *craft* (C, authored technique levels).

**VERIFIED:** G, computed from the current `slots.ts` weights, reproduces the table's D@90 to within 2 OVR points on 97/97 rules (same tier on 91/97) with no fit. So D was never an ability measure; it is this guard, and the Owner's reported 6.7 for OLB>ILB / OLB>SS is exactly `20 * (1 - 200/300)` once WILL = 200. With the decided WILL/C bumps, 44 of the 99 rules equal `tier(G)` exactly (23 of them free), 52 sit above it (the ability layer), and 3 sit below it (`FB>RB`, `FB>TE`, `C>OG`: the Owner waived the guard).
**VERIFIED, bearing on the other designs:** `C>OT` and `TE>OT`, two of ZAI-D1's four misses, are guard rows (G = 12 and 10, owner 12). The Owner's reason ("OT pass protection is worth much more") is slot value, which a duty profile cannot express. ZAI-D1 has no value term, so a re-weighting such as P-318 cannot move its prices.

## 2. The formula
`raw = G + kP*P + kC*C`, price `= tier(raw)` through three fitted cut points into the fixed tiers 0/2/6/12.
- **P (body):** over the player table's attributes (`spd`, `str`), how far the source role's mean sits below the destination role's, in destination-population SDs, one-sided, combined as a norm. Measured; works for any sport with attribute columns.
- **C (craft):** `sum over tags of max(0, need_dst - have_src)`, levels 0/1/2, 12 tags (THROW CARRY CATCH RUNBLK PASSPRO SNAP RUSH RUNSTOP COVER RANGE KICK PUNT), equal weights. The only authored table: 52 non-zero cells of 228 (v2).
- **Fitted:** `kP, kC` and 3 cuts (5 constants) by an exact DP over the sorted scores. Tiers fixed; cuts open, as the Owner said.
- **Waivers:** the 3 named rules, priced by fiat outside the fit (3 fiat rows; ZAI-D1 claims 0).

## 3. Fit, and how much to believe it
| | exact (99) | off by 1 | hard | 5-fold CV | leave-one-role-out |
|---|---|---|---|---|---|
| **v1, craft table pre-registered before any fit** | 70 | 20 | 9 | 64.9% | 61.3% |
| **v2, post-hoc (FB craft-free; 3 waivers)** | 80 | 18 | 1 | 69.8% | 66.5% |
- v2's two changes were made after reading v1's residuals, so v2's 80 is tuned and v1's 70 is the clean number. I had seen the Owner's listed prices earlier in the session, so even v1 is optimistic in-sample.
- CV and leave-one-role-out are exact-price accuracy on held-out allowed pairs; the constants are fit blind, the craft table is not (it is authored per role).
- **INFERRED, not tested:** the baselines' 88 to 98 are in-sample, and I did not cross-validate them. My own in-sample-to-held-out gap was 5 to 10 points under 5-fold CV and 9 to 13 under leave-one-role-out, so a gap of that kind is plausible for theirs, but theirs is unmeasured. Running leave-one-role-out on ZAI-D1's script would answer this.
- **Ablations (v2):** guard alone 57, + body 59, + craft 78, all three 80. The measured body layer earns 2 rules; craft does the work.
- **Tested and rejected:** (a) bottleneck `max(G, P, C)` instead of a sum: 79 vs 80, and the fit sets `kP = 0`, so no gate-by-gate story survives. (b) Positional room and side terms (cross-room, cross-side): never selected (`kR = kS = 0`), and offering them lowered CV slightly. The "cross-side floor" is better seen as a symptom than a term.

## 4. Where v2 disagrees with the Owner (19) and why
- **12 priced as 6 (9):** RB>SS, RB>FS, TE>ILB, TE>DIME, EDGE>SS, ILB>FS, ILB>DIME, OLB>DIME, SS>RB. Entering coverage-back roles from non-DBs; craft counts of 3 to 5 land below the 12 cut, which also has to admit OL>EDGE-type rows at 6. Non-DB to coverage-back needs a distinction my craft levels do not carry.
- **6 priced as 12 (2):** OT>EDGE, OG>EDGE (line-to-line moves the Owner finds easy; my craft table charges RUSH 2).
- **12 priced as 6 (2):** C>OT, ILB>EDGE (guard rows 12.0 and 10.8; the add-mode top cut is 14.7, set by how large the craft sums get).
- **2 priced as 0 or 6 (5):** SS>FS, FS>SS, P>K (one craft level apart: the cut sits above 2), ILB>SS, SS>OLB (priced 6 on craft; Owner treats safety/linebacker hybrids as near).
- **Hard miss (1):** EDGE>ILB, owner 6, model 0 (no craft or body gap in my tables; the Owner sees a size/instinct gap).

## 5. Support (which flexes exist)
The table lists 97 allowed pairs of 306. Not a cap on the price score: one joint score gives 75% against a 68% majority baseline. A separate rule (allowed iff body gap <= 2.75 and craft gap <= 2) gets 80.4% (CV 79.6%, leave-one-role-out 79.1%): 5 false allows, 55 false forbids, so it recovers about 43% of the allowed pairs. **Which flexes exist looks like a rules decision; I would keep it authored.**

## 6. Multisport
`flexgates.mjs` knows no football; a sport config supplies the inputs, split by how they are obtained:
| Input | Source | Portable? |
|---|---|---|
| slot weights | the sim's value table | computes G with no authoring |
| player table (attribute columns) | data | computes P with no authoring |
| craft table (roles x tags, 0/1/2) | authored | the one hand-authored table |
| allowed set, waivers | authored policy | per sport |
**UNKNOWN:** whether craft levels fit a sport with richer attributes (basketball 2K ratings could replace authored craft with measured attribute gaps; that would make P do the craft work, an untested direction). Football's 2 attributes make P weak, which is why the craft table carries the fit.

## 7. What I'd recommend
1. **Take the guard regardless of whose ability layer wins.** It is verified, constant-free, portable, and the piece P-318 and any re-weighting need; a derived table without it can silently become exploitable.
2. **Test the baselines out of sample** (leave-one-role-out on ZAI-D1 and on Inkling's) before choosing an ability layer on fit alone.
3. **Try the guard under ZAI-D1's duties** (`G + L`, or `max`); my data prefer the sum. Fixes C>OT and TE>OT without touching PBLK.
4. **Idea, untested:** for a new sport, the Owner prices ~30 anchor pairs and the model fills the other ~270 (matrix completion with the guard as a fixed term); leave-pairs-out CV is the test.
