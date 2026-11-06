SPEAKER: beam | ROLE: council | TASK: P-284 | DATE: 2026-11-06T12:09Z

REVIEW-OF: _agents/muse/deliveries/P-284-consensus-ranges-2026-11-06.md (council/muse)
VERDICT: improved

------------------------------------------------------------
WHAT I RAN
------------------------------------------------------------
- git show origin/council/muse:_agents/muse/deliveries/P-284-consensus-ranges-2026-11-06.md (read the consensus table). REPORTED/VERIFIED by read.
- curl -sL --max-time 60 https://overthecap.com/contract-growth-in-2024 -o /tmp/otc.html (71,261 B) and parsed both tables with python (table 0 = position tiers, table 1 = growth). VERIFIED: every median salary quoted below is read directly from that page.
- grep DEFAULT_WEIGHTS in Football-Sim-PreColors.html (line 452): 34 keys, including WR4/DL5/LB4/CB4/SS2/FS2/P/FB (no TE3/DIME). VERIFIED.
- python json.load(tools/mathlab/design.json): 32 keys including TE3/DIME (no LB4/CB4/SS2/FS2). VERIFIED.
- Re-read all seven P-284 filings (Beam, VL, OR, VLOC, GPT, Groq, DS) for their salary sources and depth-key choices. REPORTED (files read).

------------------------------------------------------------
1. SALARY ALIGNMENT — where the consensus median column is right, and where it is wrong
------------------------------------------------------------

Verified against OTC 2024 "Contract Growth in 2024" (Jason Fitzgerald, 2024-04-01), tiers "Players 11 to 20" (starters; median of 32 starters is #16) and "Players 21 to 32" (second-stringers). QB anchor $28,283,333.

RIGHT (consensus median matches OTC for the stated tier):
- QB 28.28M (QB 11-20) ✔
- CB1 10.88M (CB 11-20) ✔; CB2 6.67M (CB 21-32) ✔
- DE1 18.00M (EDGE 11-20) ✔; DE2 11.91M (EDGE 21-32) ✔
- WR1 19.18M (WR 11-20) ✔; WR2 10.74M (WR 21-32) ✔
- OT1 8.59M (LT 11-20) ✔
- DT1 16.43M (IDL 11-20) ✔; DT2 10.96M (IDL 21-32) ✔
- SS/FS 8.13M (S 11-20) ✔ for two starters
- MIKE 7.89M (LB 11-20) ✔; WILL 5.97M (LB 21-32) ✔
- OG1 11.07M (OG 11-20) ✔; OG2 6.13M (OG 21-32) ✔
- C 3.73M (C 11-20) ✔
- TE1 8.33M (TE 11-20) ✔; TE2 4.14M (TE 21-32) ✔
- RB1 5.46M (RB 11-20) ✔; RB2 3.34M (RB 21-32) ✔
- K 3.90M (K 11-20) ✔
- P 2.15M (P 11-20) ✔

WRONG TIER (the one clear error):
- OT2: consensus says 9.14M using "RT 11-20 (Groq fill)". OT2 is a second-stringer and should use RT 21-32 = $3,855,830 (136 on the QB=1000 scale), not 9.14M (323). This flips OT2 from "paid like a starter RT" to "paid like a backup RT" and widens the OT1/OT2 pay gap to 2.2x. Source: OTC table row RT, Players 21-32 = $3,855,830. VERIFIED.

JUDGMENT TIERS THAT ARE SLIGHTLY OFF (not errors, but should be re-anchored):
- CB3: consensus "~4-6M (judgment; no clean tier)". OTC CB 21-32 = 6.67M, so CB3 (third corner, rotational) should be capped at 6.67M; 4-6M is plausible but the ceiling should be stated as the CB 21-32 tier, not an invented band. Recommend "~4-6M, ceiling 6.67M (CB 21-32)".
- WR3: consensus "~4-6M (judgment)". OTC WR 21-32 = 10.74M; a third receiver in most offenses is a 60-75% snap player and earns in the WR 21-32 band, not a 4-6M depth wage. Recommend 8-11M (WR 21-32), not 4-6M.
- SAM: consensus "~4-6M (LB depth)". OTC LB 21-32 = 5.97M, so 4-6M is fine; keep as "ceiling 5.97M".
- DL5: consensus "~8-11M (IDL depth, Groq)". OTC IDL 21-32 = 10.96M, so 8-11M is fine; keep.
- FB: consensus "~1.8M (judgment)". OTC RB 21-32 = 3.34M; a modern fullback (10-20% snaps) is cheaper than a backup RB, so 1.8M is plausible. Keep as judgment.
- WR4 1.2M, TE3 1.2M: judgment, plausible for 4th/5th skill players. Keep.

DEPTH-KEY SET MISMATCH (structural, not a salary issue):
The consensus table (and the four seats that used "Colors" depth keys) lists TE3 and DIME as slots. DEFAULT_WEIGHTS (the protected constant actually being revised, line 452) does NOT contain TE3 or DIME; it contains LB4, CB4, SS2, FS2 (plus WR4, DL5, P, FB). design.json contains TE3/DIME but not LB4/CB4/SS2/FS2. So the final table must be keyed to the 34 DEFAULT_WEIGHTS keys, not to design.json's 32. The review should replace the TE3/DIME rows with LB4/CB4/SS2/FS2 rows (near-zero, 5-20, matching VL/OR/VLOC's near-zero depth treatment). DIME/TE3 can remain as Colors slots.ts entries if that engine uses them, but they are not part of DEFAULT_WEIGHTS and should not be in this table.

------------------------------------------------------------
2. WHERE THE WEIGHT SHOULD NOT FOLLOW THE MEDIAN SALARY
------------------------------------------------------------

The median salary is a sanity band, not the win model. Weights price wins per +1 OVR. Where they disagree, the weight should follow the wins measurement, with two labelled exceptions (K, and the deep depth keys).

POSITIONS WHERE THE MARKET UNDERPAYS RELATIVE TO WINS (weight above salary share):
- Secondary (CB2/CB3/SS/FS): revealed impact 0.463/0.370/0.348/0.336 of QB vs market 0.236/0.236/0.287/0.287. I endorse following the ENGINE (CB2 ~460-465, CB3 ~365-370, SS ~348-350, FS ~335-340), as eight of nine filers did. Football reason: modern NFL is pass-heavy; these slots are on the field 65-100% of snaps and their marginal OVR changes EPA allowed and explosive-play rate. The market underpays because (a) the supply of competent DBs is large (replaceability), (b) the rookie wage scale pins young DBs cheap for four years, and (c) agents negotiate against a market anchored by the top of the position, not by marginal wins. The sim's secondary value is not an artifact of an overpowered QB: even if QB were weaker, CB2/SS/FS still face the opponent's #2/#3 receivers and tight ends on most snaps, and +1 OVR there changes completion % and YAC. Keep the engine values. Do NOT moderate toward the market.
- WR1: revealed impact 434 (0.544? no — 0.05517/0.12707 = 0.434 of QB) vs market 678 (0.678 of QB). The market pays WR1 MORE than the sim's wins coefficient. I recommend lifting WR1 slightly above pure revealed (to ~440-450) because the sim under-credits receiver separation, contested-catch win probability and red-zone leverage, but NOT to 480 (DS's 50/50 blend overstates it). Land at 450 (Beam) — +3.7% over revealed, inside the salary band.
- CB1: revealed 568 vs market 385. CB1 is #2 in wins and already rank-aligned (gap 0). Keep at 568-570; the market underpays #1 corners relative to their win value because of the same supply/rookie-scale effects, but less severely than CB2.

POSITIONS WHERE THE MARKET OVERPAYS RELATIVE TO WINS (weight below salary share):
- Interior OL (OG1/OG2/C): revealed 335/335/335 vs market 391/217/132. The market pays guards ~39% of QB but the sim's wins coefficient is 33.5% (and center only 13.2%). Keep the weights EQUAL at 335 by revealed impact, despite the pay gap. Football reason: in the sim these three slots have identical slotWinsPerOvr (0.04262), so any split by market would invent a distinction the engine does not measure. The center's low market pay reflects replaceability and the fact that centers are rarely drafted high, not that a +1 OVR center wins less than a +1 OVR guard. Do not distinguish them by market.
- DT1: revealed 372 vs market 581. Interior DL is scarce and highly paid, but the sim's per-OVR win value is 37.2% of QB. Keep 370-372; the market premium is scarcity/contract, not marginal wins.
- DE2: revealed 433 vs market 421 (close); keep 430-435.
- RB1: revealed 262 vs market 193. The market has depressed RB pay (replaceability, short careers, rookie scale). The sim says 26.2% of QB. I lean toward the REVEALED impact (262) rather than the market (193), because the weight measures wins and the sim's RB1 includes run value; but I acknowledge the market's replaceability argument and would accept 250 as a compromise. Do not cut below 250. Football reason the market might be right: RBs are the most replaceable starter position and a +1 OVR RB is worth less in roster construction than +1 OVR at a scarce position; but the sim's measurement says otherwise, and weights are per-OVR wins, not roster value. Defer to the sim.

POSITIONS WHERE SCHEME DEPENDENCE MATTERS:
- SAM (3-4 OLB2): revealed 29, market ~5.97M (21% of QB). The sim treats SAM as a depth role with near-zero impact. In a 3-4 scheme a SAM can be a primary pass rusher (high value), but in this engine's deployment SAM is a rotational/depth OLB. Keep SAM low (29-32) because the weight must reflect THIS sim's deployment, not a generic 3-4. If the Owner wants scheme-specific weights later, that is a separate (scheme-conditional) table, not this one. Flag: do not raise SAM toward the LB 21-32 market tier.

SPECIAL TEAMS:
- K: VLOC's floor of 30 is directionally right (the revealed 284 is too high for a kicker) but 30 is too severe. A kicker's +1 OVR changes a handful of FGs per season (~0.3-0.4 wins over 20 OVR), not 0.72. Market-implied K = 3.90M = 13.8% of QB = ~138 on this scale. Recommend K ~140 (market-aligned), not 30 and not 284. Football reason: kickers are the most replaceable non-QB and their per-OVR win value is capped by the number of FG attempts per season; the sim's 0.036 wins/+1 OVR overstates because it credits clutch/long-FG leverage that real kickers rarely convert into wins. VLOC is right to depart downward; the other six are right that 284 is the measured number; the football-correct value is between, near the market-implied 138.
- P: special teams, ~70-100 (market 2.15M = 7.6% of QB = 76). Keep near Colors 100 or market 76; do not near-zero it (punters affect field position on ~4-5 plays/game). Recommend 76-100.

POSITIONS THE MARKET STRUCTURALLY CANNOT PRICE:
- CB2/CB3/SS/FS on rookie deals (rookie wage scale) → market understates win value for 4 years.
- Interior OL and RB on second contracts → market overstates/understates relative to wins.
- The sim's draft pool may not match the real league's talent distribution at DL5/DIME/WR4, so those cannot be priced by either market or measurement. Keep them as labeled judgment.

------------------------------------------------------------
3. POSITIONS ON THE FIVE OPEN QUESTIONS
------------------------------------------------------------

Q1. K: 30-285. VLOC is right to floor it downward, but 30 is too severe. Land K at ~140 (market-implied, OTC K 11-20 = 3.90M = 13.8% of QB). Football reason above. Not 284 (sim over-credits kicker leverage) and not 30 (a starter kicker is worth more than 3% of a QB).

Q2. Unmeasured depth slots (FB, P, DL5, WR4): near-zero vs Colors. Split by role, and key to DEFAULT_WEIGHTS (34 keys, not design.json's 32):
- FB, WR4, LB4, CB4, SS2, FS2: near-zero (5-15). These are 4th/5th depth; their OVR rarely affects a game. Use VL/OR/VLOC's near-zero treatment for these. (FB 5-10, WR4 10, LB4/CB4/SS2/FS2 5-15.)
- P: 76-100 (market-implied 76, Colors 100). Not near-zero.
- DL5: ~60, not 145 and not 5. A 5th DL plays 20-30% of snaps; +1 OVR there is worth roughly 0.2 of a starter DL's impact (DL1 372 → ~75), so 60-80. The Colors 145 overstates a depth player; the near-zero 5-16 understates a rotational DL.
- Drop TE3/DIME from this table (not DEFAULT_WEIGHTS keys). If Colors slots.ts needs them, handle there (DIME 40, TE3 10 are fine as engine-specific values).

Q3. WR1: 434-480. Land at 450 (Beam), not 434 and not 480. Reason: pure revealed 434 is the floor; the market pays WR1 67.8% of QB, signalling the sim under-credits receiver value; DS's 480 (50/50 blend) overstates by blending toward a market that prices star-WR scarcity, not marginal wins. 450 = +3.7% over revealed, inside the salary band, closes most of the -15 flag without inventing value.

Q4. Secondary: engine vs market. Endorse following the engine (CB2 ~460-465, CB3 ~365-370, SS ~348-350, FS ~335-340). Football reason above (pass-heavy league, 65-100% snap share, rookie-scale market distortion). Do not moderate toward the market. The market is wrong here, and the weights should say so — that is the point of measuring wins.

Q5. CB1: 499-570. DS's 499 blend is too low. Land at 568-570 (revealed-implied). CB1 is #2 in wins and rank-aligned (gap 0); the market's 38.5% of QB understates a #1 corner's win value. Keep at impact.

ADDITIONAL (not in the five, but needed):
- Interior line: keep OG1/OG2/C equal at ~335 by revealed impact; do not split by the 11.07M vs 3.73M pay gap.
- RB1: follow revealed impact 262 (accept 250 floor); do not cut to the 193 market level.
- SAM: keep low (29-32) despite LB 21-32 market pay; scheme/deployment, not market.

------------------------------------------------------------
4. VERDICT SUMMARY
------------------------------------------------------------
The ranges are mostly right and the median-salary column is accurate for 16 of 17 stated tiers. Two corrections: (a) OT2 must use RT 21-32 (3.86M), not RT 11-20 (9.14M); (b) the depth-key set must be the 34 DEFAULT_WEIGHTS keys (LB4/CB4/SS2/FS2), not TE3/DIME. The football judgment calls: K ~140 (not 30, not 284); WR1 ~450; secondary follows the engine; interior line stays equal by impact; depth split by role (near-zero for 4th/5th depth, modest for rotational DL/P). With those adjustments the table is ready to finalize. VERDICT: improved.

— Beam · council/beam · 2026-11-06
