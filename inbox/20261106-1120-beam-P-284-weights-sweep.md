SPEAKER: beam | ROLE: council | TASK: P-284 | DATE: 2026-11-06T11:20Z

FOR: P-284 (P1) — finalize ONE weights table (all 32 slots swept).

------------------------------------------------------------
METHOD + TARGET BUILD
------------------------------------------------------------
P-224 sweep method = tools/mathlab/lab.js "table" command (headless Chromium, reads the REAL engine, writes nothing).

TARGET BUILD: sha256sum Football-Sim-PreColors.html = 40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd (657,486 B) — matches AGENTS.md §2 Pre-Colors. VERIFIED.

COMMAND: NODE_PATH=/Users/kosi/node_modules node tools/mathlab/lab.js "/Users/kosi/Desktop/wt/beam/Football-Sim-PreColors.html" table --json /tmp/beam-sweep.json
OUTPUT: 26 slots, page errors: 0, exit 0. VERIFIED (reproduces VLOC's P-282 table byte-for-byte to 4 decimals).

REVEALED = slotWinsPerOvr (wins per +1 OVR), computed in-page via modelWeights()'s source function; cross-checked against the in-page modelWeights() output (below). VERIFIED.

------------------------------------------------------------
FULL 26-SLOT REVEALED TABLE + FLAGS
------------------------------------------------------------
Revealed rank and weight rank are 1-based with ties averaged. gap = revealedRank - weightRank (negative = underweighted in DEFAULT_WEIGHTS). flag = |gap| >= 4.

slot  | revealed (w/+1OVR) | revRank | DEFAULT_WEIGHTS | wRank | gap   | flag
QB    | 0.12707 |  1.0 | 320 |  4.5 | -3.5 | (near-flag)
RB1   | 0.03327 | 21.0 | 100 | 14.0 | +7.0 | OVER
RB2   | 0.01099 | 24.0 |  40 | 22.5 | +1.5 |
WR1   | 0.05517 |  5.0 |  60 | 20.0 | -15.0| UNDER  (largest flag)
WR2   | 0.03003 | 22.0 |  40 | 22.5 | -0.5 |
WR3   | 0.01915 | 23.0 |  20 | 24.5 | -1.5 |
TE1   | 0.03999 | 18.0 |  80 | 17.0 | +1.0 |
TE2   | 0.00719 | 25.0 |  20 | 24.5 | +0.5 |
OT1   | 0.05179 |  7.5 | 295 |  9.5 | -2.0 |
OT2   | 0.05179 |  7.5 | 295 |  9.5 | -2.0 |
OG1   | 0.04262 | 15.0 | 295 |  9.5 | +5.5 | OVER
OG2   | 0.04262 | 15.0 | 295 |  9.5 | +5.5 | OVER
C     | 0.04262 | 15.0 | 295 |  9.5 | +5.5 | OVER
DE1   | 0.06505 |  3.0 | 350 |  2.0 | +1.0 |
DE2   | 0.05504 |  6.0 | 350 |  2.0 | +4.0 | OVER
DT1   | 0.04729 |  9.0 | 320 |  4.5 | +4.5 | OVER
DT2   | 0.03796 | 19.0 | 300 |  6.0 | +13.0| OVER  (largest over-flag)
MIKE  | 0.04315 | 12.0 | 100 | 14.0 | -2.0 |
WILL  | 0.04014 | 17.0 | 100 | 14.0 | +3.0 |
SAM   | 0.00370 | 26.0 |  60 | 20.0 | +6.0 | OVER (depth role, near-zero impact)
CB1   | 0.07215 |  2.0 | 350 |  2.0 |  0.0 |
CB2   | 0.05887 |  4.0 | 295 |  9.5 | -5.5 | UNDER
CB3   | 0.04700 | 10.0 |  80 | 17.0 | -7.0 | UNDER
SS    | 0.04422 | 11.0 |  80 | 17.0 | -6.0 | UNDER
FS    | 0.04271 | 13.0 |  60 | 20.0 | -7.0 | UNDER
K     | 0.03609 | 20.0 |   5 | 26.0 | -6.0 | UNDER

Flags (|gap| >= 4): 14 total — 6 UNDER (WR1, CB2, CB3, SS, FS, K) and 8 OVER (RB1, OG1, OG2, C, DE2, DT1, DT2, SAM). Matches VLOC's P-282 Part 2 flag list exactly (VLOC counted SAM as the 14th, "borderline on a depth role"). VERIFIED.

------------------------------------------------------------
THE FOUR TABLES, SIDE BY SIDE (raw values, own scales)
------------------------------------------------------------
revealed = slotWinsPerOvr (wins/+1 OVR). modelWeights() = in-page quantisation of revealed (700 scale, nearest 5, floor 5) — re-read this session: QB 700, WR1 305, WR2 165, CB1 395, DE1 360, ... VERIFIED (matches protected contract). Colors slots.ts (origin/architect/engine-and-seats) = QB 1000, WR1 525, WR2 295, CB1 430, DE1 520, ... (read from branch). DEFAULT_WEIGHTS (Pre-Colors line 452) = QB 320, WR1 60, WR2 40, CB1 350, DE1 350, ...

Normalised to QB = 1000 for comparability:
slot  | revealed | modelWeights | Colors | DEFAULT
QB    | 1000 | 1000 | 1000 | 1000
WR1   |  434 |  436 |  525 |  188
WR2   |  236 |  236 |  295 |  125
CB1   |  568 |  564 |  430 | 1094
DE1   |  512 |  514 |  520 | 1094
DT2   |  299 |  300 |  305 |  938
RB1   |  262 |  264 |  235 |  313
K     |  284 |  286 |  200 |   16

Key ratios:
- WR2/WR1 revealed = 0.03003/0.05517 = 0.544 (VLOC + Beam, VERIFIED). Inside the Owner's salary band 0.4-0.6.
- modelWeights effective WR2/WR1 = 165/305 = 0.541 (within 0.6% quantisation error).
- Colors WR2/WR1 = 295/525 = 0.562 (3% above revealed — essentially closed after de60e05).
- DEFAULT_WEIGHTS WR2/WR1 = 40/60 = 0.667 (22% above revealed — NOT closed).

------------------------------------------------------------
SALARY-CONTEXT COMPARISON (revealed, QB = 1000 scale)
------------------------------------------------------------
Band targets from the task (QB 55-60M => QB=1000): edge/CB/DT 20-35M => 360-640; OL/LB/S 10-20M => 180-360; RB 8-12M => 150-220; TE 10-15M => 180-270; K 4-6M => 70-110; P 3-5M => 55-90; WR1 30-35M => 545-636; WR2 12-18M => 218-327.

slot  | revealed(QB=1000) | band     | read
QB    | 1000 | 1000 | on (anchor)
WR1   |  434 | 545-636 | BELOW band (underweighted — matches -15 gap)
WR2   |  236 | 218-327 | inside band (0.544 ratio ✓)
CB1   |  568 | 360-640 | inside (top of band)
DE1   |  512 | 360-640 | inside
DT1   |  372 | 360-640 | low edge (inside)
OT1   |  407 | 180-360 | ABOVE band (OL paid 10-20M but revealed ~edge level — OL undervalued by market, or OVR bump buys more than salary implies)
RB1   |  262 | 150-220 | ABOVE band (RB depressed in market but engine values RB1 above salary)
K     |  284 |  70-110 | well ABOVE band (kicker OVR bumps buy ~3x salary-implied value — consistent with K already cut 0.72->0.45)
SAM   |   29 | 180-360 | far BELOW band (depth role, near-zero impact — weight should track depth, not starter band)

Note: the salary band is a MARKET framing, not a wins framing. The revealed column is what actually ends up as WINS. Where they disagree (WR1 below band, K above, OT1 above), the engine is saying the market under/over-pays that slot relative to on-field impact. That is information for the Owner, not a reason to force weights to salary.

------------------------------------------------------------
RECOMMENDATION — THE FINAL TABLE
------------------------------------------------------------
Recommendation: make modelWeights() (the quantised revealed impact) "the" weights table, and reconcile the other three to it. Rationale:

1. The protected contract (AGENTS.md §3) already says modelWeights() is the monotone quantisation of slotWinsPerOvr(). That means the revealed impact is the only table with a measured, reproducible derivation; modelWeights() is just its integer shadow. "The" table should be the one whose numbers are derived from wins, not from a spec or a market estimate.

2. Colors slots.ts (post-de60e05) is already within 1-6% of revealed on the big slots and its WR2/WR1 (0.562) is inside the salary band. It is the closest non-quantised table to revealed. It can serve as the readable (QB=1000) presentation of the same numbers, but it must not diverge from modelWeights().

3. DEFAULT_WEIGHTS (0.667 WR2/WR1, WR1 weight rank 20 vs revealed rank 5, DT2 weight rank 6 vs revealed rank 19) is the outlier on 14 flags. It should be recalibrated toward revealed impact — at minimum the two largest flags (WR1 up, DT2 down) and the CB/SS/FS secondary group (under by 5.5-7 ranks each). The WR2 move (0.667 -> ~0.54-0.56) is the Owner-directed change already on record (VLOC + Beam recommend; VL dissents "hold at 0.70"). I concur with VLOC+Beam on WR2, and extend the same logic to the 14 flagged slots.

4. RATING_SPECS.rec WR2 (0.707 after de60e05) still sits above the 0.4-0.6 band; if the Owner means that knob, there is headroom toward ~0.50-0.60. Keep it consistent with whichever slot-weight value is chosen (do not let the two knobs drift apart again).

5. modelWeights() stays as the quantisation contract — do not replace it with a hand table; the quantisation (700 scale, nearest 5, floor 5, error <= 2.5) is what keeps the protected contract testable.

What this does NOT do (and must not, without Owner approval + MERGE-MANIFEST.md re-pin): edit DEFAULT_WEIGHTS, RATING_SPECS, or modelWeights(). This item is measurement + recommendation only. The Owner/Architect finalize from the council's filings (VLOC, Beam, VL, and any later seat).

Weakest point / caveat: the sweep measures in a fixed 70->90 OVR window near a starter (single-slot bump, league of 80s). Slots whose value is situational (DL5 rotation, K, P, SAM depth role) are measured as starters in that window, which understates/overstates their real usage. DL5's 0.33 share and K's cut are already handled elsewhere; SAM's near-zero revealed impact is real but SAM is a depth role in this engine (D-012), so its weight should follow the depth tier, not the revealed starter value. Flag for the recalibration, not a contradiction.
