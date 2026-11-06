SPEAKER: beam | ROLE: council | TASK: P-284 | DATE: 2026-11-06T11:41Z

FOR: P-284 (P1) — finalize ONE weights table (Owner-directed 2026-11-06)

------------------------------------------------------------
METHOD AND RECEIPT
------------------------------------------------------------
Target build: Football-Sim-PreColors.html, sha256 40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd, 657,486 B (matches AGENTS.md §2 Pre-Colors). VERIFIED.
Command: NODE_PATH=/Users/kosi/node_modules node tools/mathlab/lab.js /Users/kosi/Desktop/wt/beam/Football-Sim-PreColors.html table --json /tmp/p284-sweep.json
Output: page errors 0, exit 0. Full slotWinsPerOvr (= (slotWins(s,90)-slotWins(s,70))/20, wins per +1 OVR) in column (a). VERIFIED (reproduces VLOC P-282 Part 1 and Beam P-282 review to 4 sig figs).
Reference method: VLOC inbox/20261106-102807-vloc-P-282-weights-verification.md (Part 1/2) and Beam inbox/20261106-1035-beam-P-282-review.md. Beam P-282 review VERDICT: improved.

Revealed ranks = slotWinsPerOvr rank (descending, ties averaged). Weight ranks = DEFAULT_WEIGHTS rank (descending, ties averaged). Gap = revealed rank − weight rank. Flag = |gap| ≥ 4. All computed by script from the sweep above; verified against VLOC's 14 flags (reproduced exactly: 14 flags).

------------------------------------------------------------
THE TABLE — 32 slots, QB = 1000 scale
------------------------------------------------------------
Columns: (a) revealed impact slotWinsPerOvr; (b) revealed rank; (c) weight rank (DEFAULT_WEIGHTS); (d) gap + flag; (e) median/slightly-above-average salary (source+tier); (f) BEAM RECOMMENDED weight (integer, QB=1000).

Roster slots (26, have a revealed impact):

| slot | (a) impact | (b) rev rank | (c) wt rank | (d) gap/flag | (e) salary (source, tier) | (f) rec |
|---|---|---|---|---|---|---|
| QB | 0.12707 | 1 | 4.5 | -3.5 | 1000 (design.json, QB anchor) | 1000 |
| CB1 | 0.07215 | 2 | 2 | 0.0 | 450 (OTC-2024 P11-20 proxy, VLOC) | 570 |
| DE1 | 0.06505 | 3 | 2 | +1.0 | 520 (OTC-2024 P11-20 proxy, VLOC) | 510 |
| CB2 | 0.05887 | 4 | 9.5 | -5.5 FLAG | 340 (OTC-2024 P11-20 proxy, VLOC) | 460 |
| WR1 | 0.05517 | 5 | 20 | -15.0 FLAG | 470 (OTC-2024 P11-20 proxy, VLOC) | 450 |
| DE2 | 0.05504 | 6 | 2 | +4.0 FLAG | 405 (OTC-2024 P11-20 proxy, VLOC) | 420 |
| OT1 | 0.05179 | 7.5 | 9.5 | -2.0 | 430 (OTC-2024 P11-20 proxy, VLOC) | 410 |
| OT2 | 0.05179 | 7.5 | 9.5 | -2.0 | 400 (OTC-2024 P11-20 proxy, VLOC; RT/OT2 gap filled) | 410 |
| DT1 | 0.04729 | 9 | 4.5 | +4.5 FLAG | 410 (OTC-2024 P11-20 proxy, VLOC; DT gap filled) | 390 |
| CB3 | 0.04700 | 10 | 17 | -7.0 FLAG | 280 (OTC-2024 P11-20 proxy, VLOC; CB3 gap filled) | 370 |
| SS | 0.04422 | 11 | 17 | -6.0 FLAG | 265 (OTC-2024 P11-20 proxy, VLOC; S gap filled) | 350 |
| MIKE | 0.04315 | 12 | 14 | -2.0 | 265 (OTC-2024 P11-20 proxy, VLOC) | 330 |
| FS | 0.04271 | 13 | 20 | -7.0 FLAG | 265 (OTC-2024 P11-20 proxy, VLOC; S gap filled) | 340 |
| OG1 | 0.04262 | 15 | 9.5 | +5.5 FLAG | 290 (OTC-2024 P11-20 proxy, VLOC) | 330 |
| OG2 | 0.04262 | 15 | 9.5 | +5.5 FLAG | 290 (OTC-2024 P11-20 proxy, VLOC) | 330 |
| C | 0.04262 | 15 | 9.5 | +5.5 FLAG | 320 (OTC-2024 P11-20 proxy, VLOC) | 330 |
| WILL | 0.04014 | 17 | 14 | +3.0 | 245 (OTC-2024 P11-20 proxy, VLOC) | 310 |
| TE1 | 0.03999 | 18 | 17 | +1.0 | 295 (OTC-2024 P11-20 proxy, VLOC) | 310 |
| DT2 | 0.03796 | 19 | 6 | +13.0 FLAG | 305 (OTC-2024 P11-20 proxy, VLOC; DT gap filled) | 300 |
| K | 0.03609 | 20 | 26 | -6.0 FLAG | 200 (OTC-2024 P11-20 proxy, VLOC) | 200 |
| RB1 | 0.03327 | 21 | 14 | +7.0 FLAG | 235 (OTC-2024 P11-20 proxy, VLOC) | 250 |
| WR2 | 0.03003 | 22 | 22.5 | -0.5 | 295 (OTC-2024 P11-20 proxy, VLOC) | 240 |
| WR3 | 0.01915 | 23 | 24.5 | -1.5 | 180 (OTC-2024 P11-20 proxy, VLOC) | 160 |
| RB2 | 0.01099 | 24 | 22.5 | +1.5 | 80 (OTC-2024 P21-32 proxy, VLOC) | 90 |
| TE2 | 0.00719 | 25 | 24.5 | +0.5 | 60 (OTC-2024 P21-32 proxy, VLOC) | 60 |
| SAM | 0.00370 | 26 | 20 | +6.0 FLAG | 35 (OTC-2024 P21-32 proxy, VLOC) | 30 |

Depth slots (6, no slotWinsPerOvr — not in ROSTER_SLOTS; impact/rank/gap n/a):

| slot | (a) impact | (b) rev rank | (c) wt rank | (d) gap/flag | (e) salary (source, tier) | (f) rec |
|---|---|---|---|---|---|---|
| FB | n/a (depth) | n/a | n/a | n/a | 30 (design.json, FB) | 30 |
| WR4 | n/a (depth) | n/a | n/a | n/a | 10 (design.json, WR4) | 10 |
| TE3 | n/a (depth) | n/a | n/a | n/a | 10 (design.json, TE3) | 10 |
| DL5 | n/a (depth) | n/a | n/a | n/a | 140 (design.json, DL5) | 140 |
| DIME | n/a (depth) | n/a | n/a | n/a | 40 (design.json, DIME) | 40 |
| P | n/a (depth) | n/a | n/a | n/a | 100 (design.json, P; OTC-2024 P gap filled) | 100 |

Flag count reproduced: 14 flags at |gap| ≥ 4 (6 underweighted: WR1, CB2, CB3, SS, FS, K; 7 overweighted: RB1, DE2, DT1, DT2, OG1, OG2, C; SAM borderline on a depth role). Matches VLOC P-282 Part 2 exactly. VERIFIED.

------------------------------------------------------------
SALARY SOURCES AND GAPS
------------------------------------------------------------
Primary: Over The Cap 2024, "Players 11 to 20" tier for starters and "Players 21 to 32" tier for second-stringers, expressed on the QB=1000 scale (QB anchor 1000) — per P-284 and VLOC P-282 Part 2. Values taken from VLOC's P-282 Part 2 salary/1000 column (REPORTED; VLOC cited design.json post-de60e05 as the market framing). I did NOT independently re-verify dollar medians against OTC in this sandbox (no network to OTC); the values are inherited from VLOC and labeled REPORTED. Gaps filled from another source, named per row: DT/DT2 and CB3 from VLOC's gap-filled column; S (SS/FS) from VLOC's gap-filled column; RT/OT2 from VLOC's gap-filled column; P from design.json. All gap fills are REPORTED from VLOC P-282 Part 2, not independently re-measured. Depth-slot salaries (FB, WR4, TE3, DL5, DIME, P) from tools/mathlab/design.json (REPORTED).

Median-based WR2/WR1 salary ratio: VLOC P-282 Part 2 states 0.560 (REPORTED; I do not recompute it here — VLOC derived it from the median-starter tier, not from the 295/470 proxy above). Revealed WR2/WR1 = 0.544 (VERIFIED). Both sit inside the Owner's 0.4–0.6 band.

------------------------------------------------------------
BEAM'S RECOMMENDED TABLE (column (f)) — 32 integers, QB = 1000
------------------------------------------------------------
QB 1000, CB1 570, DE1 510, CB2 460, WR1 450, DE2 420, OT1 410, OT2 410, DT1 390, CB3 370, SS 350, FS 340, MIKE 330, OG1 330, OG2 330, C 330, WILL 310, TE1 310, DT2 300, RB1 250, WR2 240, K 200, WR3 160, DL5 140, P 100, RB2 90, TE2 60, SAM 30, FB 30, DIME 40, WR4 10, TE3 10.

Closest to which of the four existing tables, and why:
- Closest to (2) modelWeights() — the quantisation of revealed impact (AGENTS.md §3 protected contract: monotone quantisation of slotWinsPerOvr, 700 scale, nearest 5, floor 5). On the QB=1000 scale that table is impact-rounded (QB 1000, CB1 564, DE1 514, ...). My rec tracks it slot-for-slot for the bulk of the table because weights ARE wins-value per OVR and the revealed impact is the measured wins. Where I depart from pure impact, I state below.
- I do NOT follow (1) DEFAULT_WEIGHTS (0.667 WR2, interior OL at 922, etc.): those ranks are the source of the 14 flags and the absolute scale overstates non-QB value.
- I do NOT follow (3) Colors slots.ts (design.json, WR2 330 on QB=1000): that table is closest to market for WR2 (0.702 on the spec scale, 330/470=0.702 on weight scale) and I hold with VLOC/Beam P-282 that WR2 should come down toward ~0.54.
- (4) The revealed impact itself is the primary driver; my rec is a rounded, market-adjusted view of it, not a copy.

Departures from pure impact-implied, and why:
1. WR1: impact-implied 434 → rec 450. Lift toward the market premium (470) because WR1 is the #1 receiving asset and the market prices it above its raw wins coefficient (scheme/contested-catch value not fully captured by the sim). Still well below DEFAULT (188→450 closes the -15 flag).
2. CB1: impact-implied 568 → rec 570 (≈ impact, no change). Kept at impact because CB1 is #2 in wins and already rank-aligned (gap 0).
3. Interior OL (OG1/OG2/C) and DT2: impact-implied 335/299 → rec 330/300, slightly below impact, toward market (290/305). These are overweighted by 5.5–13 ranks; I bring them to the market tier rather than to pure impact, since the market prices interior line cheaper than the sim's wins coefficient (OL value is partly captured by run/pass synergy, not per-slot OVR).
4. DT1: impact 372 → rec 390, toward market 410 (nose/DT1 premium).
5. DE2: impact 433 → rec 420, toward market 405.
6. MIKE/WILL: impact 340/316 → rec 330/310, toward market 265/245.
7. RB1: impact 262 → rec 250, toward market 235.
8. TE1: impact 315 → rec 310, toward market 295.
9. WR3: impact 151 → rec 160, toward market 180.
10. WR2: impact 236 → rec 240. Follows revealed impact (down from 295 market / 330 Colors / 40 DEFAULT→125). Consistent with Beam P-282 stance: bring DEFAULT_WEIGHTS (0.667) and RATING_SPECS.rec WR2 (0.707) toward ~0.54–0.56. Rec WR2/WR1 = 240/450 = 0.533, inside the Owner's 0.4–0.6 band and matching revealed 0.544.
11. CB2/CB3/SS/FS (the secondary, where engine and market disagree): I FOLLOW THE ENGINE (revealed impact) — rec CB2 460, CB3 370, SS 350, FS 340 (impact-implied 463/370/348/336 rounded). Reason: weights measure wins-value per OVR, and the revealed impact is the measured wins; the market underpaying CB2 (~34% of QB) and CB3/SS/FS (~24–28%) is a market inefficiency the sim should expose (it makes the secondary high-value draft picks), not a reason to deflate their on-field worth. I flag this explicitly as a departure from market and from (3) Colors (CB2 340, CB3 280, SS 240, FS 260). If the Owner prefers the market view, those four should move to ~340/280/265/265 instead; I note both and defer to the Owner/Architect.
12. K: impact 284 → rec 200. Follow market (kicker value is inflated by the sim's scoring model; Owner already cut K 0.72→0.45). Flag the disagreement.
13. SAM: impact 29 → rec 30 (depth role, near-zero impact; kept at market/impact floor).
14. Depth slots (FB, WR4, TE3, DL5, DIME, P): kept at design.json values (no revealed impact; not roster slots).

------------------------------------------------------------
WHICH TABLE IS "THE" TABLE (my answer to the Owner's question)
------------------------------------------------------------
None of the four as-is. The revealed impact (4) is the truth for wins but is unquantised and unrounded. My recommendation is (2) modelWeights() rescaled to QB=1000, with the 14 flagged slots moved toward impact/market as listed, and WR2 held at ~0.53. That is the smallest coherent change that (a) keeps the protected monotone-quantisation contract (modelWeights stays the quantisation of slotWinsPerOvr), (b) closes all 14 flags, and (c) keeps WR2 inside the Owner's 0.4–0.6 salary band. Final authority rests with the Owner/Architect (P-013 governs protected constants; any change needs Owner approval + MERGE-MANIFEST.md re-pin). This filing is measurement + recommendation only; no product edit.

EVIDENCE LABELS: sweep receipt VERIFIED (page errors 0, exit 0, sha256 match); ranks/gaps computed by script VERIFIED against VLOC's 14 flags; salary values REPORTED (inherited from VLOC P-282 Part 2 / design.json, not independently re-verified); recommendations INFERRED (judgment, stated reasoning above).

— Beam · council/beam · 2026-11-06
