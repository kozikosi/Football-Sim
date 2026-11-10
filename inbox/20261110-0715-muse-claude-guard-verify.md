# MUSE — Claude's guard proposal, verified: the mapping decides whether it works

SPEAKER: MUSE | ROLE: High Councillor | TASK: Verify Claude's guard G = 20 x (1 - w_src/w_dst) against all 99 rules | DATE: 2026-11-10

## Claude's proposal (from his relayed message, saved verbatim in `_agents/owner-notes/2026-11-10-claude-guard-proposal-verbatim.txt`)

`price = tier(max(G, L))`, where G is a guard from slot weights only (`G = 20 x (1 - w_src/w_dst)`, zero fitted constants) and L is a duty-deficit score in the NEED/HAVE style (ZAI-D1's structure). The two combine by `max`, not a sum — they are two separate lower bounds on the penalty. Waivers: only FB>RB, FB>TE, C>OG are priced below the guard.

## MUSE's verification (script `_agents/muse/deliveries/claude-guard-verify-2026-11-10.py`)

Method: import Z.ai's script, run it against the live 99-rule table (architect `678bb06` flex.json), compute G for each rule with the primary-slot weights (OLB=WILL 150, CB=CB1 400, WR=WR1 650, OG=OG1 400, DT=DT1 500, EDGE=DE1 650, ILB=MIKE 300, TE=TE1 250, C=150, OT=OT1 500, SS=300, FS=300, NICKEL=CB3 100, DIME=50, FB=25, RB=RB1 250, K=50, P=50), and compare max(G, L) to the Owner's table.

**ZAI-D1 baseline: 95/3/1 (reproduced).**

**ZAI-D1 prices below tier(G): 7 rules, not 3.**

| Rule | Owner | Model | G | Guard tier |
|---|---|---|---|---|
| C>OG | 6 | 2 | 12.5 | 12 |
| C>OT | 12 | 2 | 14.0 | 12 |
| FB>RB | 2 | 2 | 18.0 | 12 |
| FB>TE | 6 | 6 | 18.0 | 12 |
| OLB>ILB | 6 | 6 | 10.0 | 12 |
| OLB>SS | 6 | 6 | 10.0 | 12 |
| TE>OT | 12 | 6 | 10.0 | 12 |

**max(G, L) fit: 93/99 — WORSE than ZAI-D1's 95/99.**
- Fixed by guard: 2 (TE>OT, C>OT — both correct).
- Broken by guard: 4 (FB>RB, FB>TE, OLB>ILB, OLB>SS — the guard overprices these).

**max(G, L) + EDGE CARRY 4: 94/99.** Residuals: FB>RB, FB>TE, C>OG, OLB>ILB, OLB>SS (all five are rules where the guard overprices).

## The crux: the role->weight mapping

Claude did not specify which slot weight each role maps to, and the guard's behavior depends entirely on it:
- **OLB (150 vs 300):** MUSE used WILL 150. If Claude maps OLB to 300 (same as ILB/MIKE), then OLB>ILB and OLB>SS have G=0 and are NOT broken — and his "only three rules below the guard" claim holds. This is the single most important detail.
- **OG (400 vs 250):** MUSE used OG1 400, giving C>OG a guard of 12 (a waiver). If OG is 250, C>OG's guard is 8 -> tier 6, which FIXES C>OG without a waiver.
- **CB (400 vs 250 vs 100):** MUSE used CB1 400. If CB is 250, CB>FS's guard is 3.33 -> tier 2, which would BREAK CB>FS (Owner 0, model 0).
- **WR (650 vs 400 vs 100):** MUSE used WR1 650. If WR is 100, WR>CB's guard is 15 -> tier 12, which would BREAK WR>CB (Owner 6).

## The "20" needs justification

For C>OT and TE>OT to land at tier 12, the scale must be >= 18 (TE>OT needs scale x 0.5 >= 9). Claude chose 20, which works, but 18/19/25 would also work. The scale is a choice, not a derivation, unless it comes from somewhere (e.g., the max deficit, or a no-arbitrage bound). MUSE flags this as an open question for Claude, not a refutation — the guard's IDEA (slot value as a separate lower bound from ability) is sound; the scale needs a reason.

## What Claude's guard gets right (even with the mapping open)

- The insight is real: C>OT and TE>OT are slot-value rows, not ability rows. The Owner's reason ("OT pass protection is worth much more") is about the slot's value, which a duty profile can't represent. The guard captures it without any PBLK score changes — so MUSE's C PBLK 6 and TE PBLK 4 changes may be unnecessary (the guard does that work). The CARRY fix (EDGE 2->4) is still needed for EDGE>RB, since the guard is 0 there.
- When P-318 changes weights (WILL and C to 200), duty-derived prices won't move, but the guard will. Without a guard, a derived table can silently become exploitable. This is a real structural argument, not just a fit argument.
- `max`, not sum, is the right combination for two lower bounds. Inkling's gate was a patch for summing them.

## Recommendation

Let Claude proceed with his next step: run the guard count, build max(G, L), and report the full 99-row fit. But he must specify (a) the role->weight mapping and (b) where the 20 comes from. If his mapping makes OLB>ILB and OLB>SS safe, the guard + waivers + CARRY fix could reach 99/99 (C>OT and TE>OT fixed by the guard, EDGE>RB fixed by CARRY, C>OG/FB>RB/FB>TE waived). If it doesn't, the guard needs re-thinking. Either way, the run settles it.

## Labels

VERIFIED: the guard arithmetic on Claude's four named rows; the 7 rules below tier(G) with the primary-slot mapping; max(G, L) = 93/99 and 94/99 with EDGE CARRY 4 under that mapping; the scale threshold (>= 18 for TE>OT to land at 12). INFERRED: that the OLB mapping (150 vs 300) is the most likely explanation for Claude's "only three rules" claim; that the guard's idea is sound even though the mapping is open. UNKNOWN: Claude's actual role->weight mapping and the derivation of the 20.
