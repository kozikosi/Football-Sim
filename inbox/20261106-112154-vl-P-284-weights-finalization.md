SPEAKER: VL | ROLE: council | TASK: P-284 | DATE: 2026-11-06T11:21:54Z

FOR: P-284 (P1) — Finalize ONE weights table: every seat sweeps all positions and recommends changes

Source: Owner-directed, 2026-11-06 ("We all need to finalize a table so that there isn't disagreement about which weight table to search for."). Read VLOC's P-282 filing and Beam's P-282 review first (reference method + verification). This seat's sweep is independent; every claim carries its evidence label.

----------------------------------------------------------------
METHOD — P-224 sweep = tools/mathlab/lab.js "table"
----------------------------------------------------------------

TARGET BUILD (re-measured this session):
sha256sum Football-Sim-PreColors.html = 40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd (657,486 B) — matches AGENTS.md §2 Pre-Colors exactly. VERIFIED.

COMMAND:
node tools/mathlab/lab.js "/Users/kosi/Desktop/wt/vl/Football-Sim-PreColors.html" table

OUTPUT (page errors: 0, exit 0):
QB      2.541 0.1271
CB1     1.443 0.0721
DE1     1.301 0.0650
CB2     1.177 0.0589
WR1     1.103 0.0552
DE2     1.101 0.0550
OT1     1.036 0.0518
OT2     1.036 0.0518
DT1     0.946 0.0473
CB3     0.940 0.0470
SS      0.884 0.0442
MIKE    0.863 0.0432
FS      0.854 0.0427
OG1     0.852 0.0426
OG2     0.852 0.0426
C       0.852 0.0426
WILL    0.803 0.0401
TE1     0.800 0.0400
DT2     0.759 0.0380
K       0.722 0.0361
RB1     0.665 0.0333
WR2     0.601 0.0300
WR3     0.383 0.0191
RB2     0.220 0.0110
TE2     0.144 0.0072
SAM     0.074 0.0037

Column 2 = slotWins(s,90)−slotWins(s,70) (wins over a 20-OVR bump); column 3 = impact = column2/20 = slotWinsPerOvr, wins per +1 OVR. Reproduced verbatim; identical to VLOC's P-282 table (0.12707/0.07215/…/0.00370). VERIFIED.

modelWeights() contract (read line 459-462 of the product): out[k] = max(5, round(w[k]/max(w)*700/5)*5). mx = QB impact 0.1271 → WR1 round(0.05517/0.1271*140)=305, WR2 round(0.03003/0.1271*140)=165 → ratio 0.541, within 0.6% of revealed 0.544. Beam independently VERIFIED modelWeights WR1 305 / WR2 165. VERIFIED.

----------------------------------------------------------------
SCOPE NOTE — "all 32 positions"
----------------------------------------------------------------

ROSTER_SLOTS (line 924) = 26 starter slots; slotWinsTable/slotWinsPerOvr iterate exactly ROSTER_SLOTS, so the sweep measures 26 slots, not 32. DEFAULT_WEIGHTS defines 34 keys including depth/special-teams slots (WR4, DL5, LB4, CB4, SS2, FS2, P, FB) that slotWinsTable does not cover — P ($3–5M) and the depth slots are out of sweep scope. VLOC's reference table also covered these same 26. All 26 measured slots are reported below; nothing measurable is omitted. INFERRED (ROSTER_SLOTS length read from source) + VERIFIED (sweep output).

----------------------------------------------------------------
FULL REVEALED TABLE (26 measured slots)
----------------------------------------------------------------

Signal (agreed for this item): rank gap ≥ 4 between weight order and revealed-impact order flags a weight that looks off. Weight rank = DEFAULT_WEIGHTS rank, average ties, computed over all 34 DEFAULT_WEIGHTS keys (same basis as VLOC's P-282; reproduces his flag list exactly — see VERIFIED note below).

Slot | impact (wins/+1 OVR) | impact rank | DEFAULT_WEIGHTS | weight rank | gap (impact−weight) | flag (|gap|≥4) | salary context (Owner-cited band)

QB  | 0.1271 | 1   | 320 | 4.5  | −3.5 | (near-flag) | QB $55–60M — top salary but weight tier mid-table
CB1 | 0.0721 | 2   | 350 | 2    |  0.0 | — | CB $20–35M — consistent
DE1 | 0.0650 | 3   | 350 | 2    | +1.0 | — | EDGE $20–35M — consistent
CB2 | 0.0589 | 4   | 295 | 9.5  | −5.5 | UNDERWEIGHTED | CB $20–35M — salary below impact-implied (VLOC)
WR1 | 0.0552 | 5   | 60  | 20   | −15.0| UNDERWEIGHTED  ← largest flag | WR1 $30–35M — high salary, lowest starter tier
DE2 | 0.0550 | 6   | 350 | 2    | +4.0 | OVERWEIGHTED   | EDGE $20–35M — impact #6, top weight
OT1 | 0.0518 | 7.5 | 295 | 9.5  | −2.0 | — | OT $10–20M — roughly consistent
OT2 | 0.0518 | 7.5 | 295 | 9.5  | −2.0 | — | OT $10–20M — roughly consistent
DT1 | 0.0473 | 9   | 320 | 4.5  | +4.5 | OVERWEIGHTED   | DT $20–35M — impact #9, top-tier weight
CB3 | 0.0470 | 10  | 80  | 17   | −7.0 | UNDERWEIGHTED  | CB depth — underweighted
SS  | 0.0442 | 11  | 80  | 17   | −6.0 | UNDERWEIGHTED  | S $10–20M — underweighted
MIKE| 0.0432 | 12  | 100 | 14   | −2.0 | — | LB $10–20M — roughly consistent
FS  | 0.0427 | 13  | 60  | 20   | −7.0 | UNDERWEIGHTED  | S $10–20M — underweighted
OG1 | 0.0426 | 15  | 295 | 9.5  | +5.5 | OVERWEIGHTED   | OG $10–20M — impact #15, top-tier weight
OG2 | 0.0426 | 15  | 295 | 9.5  | +5.5 | OVERWEIGHTED   | OG $10–20M — impact #15, top-tier weight
C   | 0.0426 | 15  | 295 | 9.5  | +5.5 | OVERWEIGHTED   | C $10–20M — impact #15, top-tier weight
WILL| 0.0401 | 17  | 100 | 14   | +3.0 | — | LB $10–20M — roughly consistent
TE1 | 0.0400 | 18  | 80  | 17   | +1.0 | — | TE $10–15M — consistent
DT2 | 0.0380 | 19  | 300 | 6    | +13.0| OVERWEIGHTED  ← largest over-flag | DT $20–35M — impact #19, #6 weight (VLOC's strongest flag)
K   | 0.0361 | 20  | 5   | 29.5 | −9.5 | UNDERWEIGHTED  | K $4–6M — depth slot; Owner already cut K 0.72→0.45
RB1 | 0.0333 | 21  | 100 | 14   | +7.0 | OVERWEIGHTED   | RB depressed $8–12M — overweighted despite depressed salary
WR2 | 0.0300 | 22  | 40  | 22.5 | −0.5 | — | WR2 $12–18M — ratio WR2/WR1 revealed = 0.544, inside 0.4–0.6 band
WR3 | 0.0191 | 23  | 20  | 25   | −2.0 | — | WR depth
RB2 | 0.0110 | 24  | 40  | 22.5 | +1.5 | — | RB depth
TE2 | 0.0072 | 25  | 20  | 25   |  0.0 | — | TE depth
SAM | 0.0037 | 26  | 60  | 20   | +6.0 | OVERWEIGHTED   | SAM is 3rd-LB depth role per D-012 (VLOC); near-zero impact, starter-tier weight

FLAGS: 14 at |gap|≥4 — 6 underweighted (WR1 −15, CB2 −5.5, CB3 −7, SS −6, FS −7, K −9.5); 8 overweighted (RB1 +7, DE2 +4, DT1 +4.5, DT2 +13, OG1 +5.5, OG2 +5.5, C +5.5, SAM +6). Largest: WR1 underweighted (−15), DT2 overweighted (+13).

This reproduces VLOC's 14 flags exactly (6 under + 7 over + SAM borderline = 14); Beam independently VERIFIED the two largest (WR1 −15, DT2 +13) and re-ran the table with identical numbers. VERIFIED (my sweep output matches VLOC's table; Beam's review confirms).

Revealed WR2/WR1 = 0.0300 / 0.0552 = 0.544 — inside the Owner's 0.4–0.6 salary band. VERIFIED (matches VLOC + Beam, both measured 0.544).

----------------------------------------------------------------
THE FOUR TABLES FOR WR2 (the disagreement this item closes)
----------------------------------------------------------------

1. DEFAULT_WEIGHTS (shipped product, Pre-Colors, protected): WR1 60, WR2 40 → ratio 0.667. That is 22% ABOVE revealed 0.544. THE OUTLIER. VERIFIED (line 452).
2. modelWeights() (draft board quantisation of revealed impact): WR1 305, WR2 165 → ratio 0.541, within 0.6% of revealed 0.544. AGREES with revealed. VERIFIED.
3. Colors slots.ts (new engine): WR1 525, WR2 295 → ratio 0.562, 3% above revealed — in-band, already agrees. REPORTED (from VLOC's P-282; not re-measured by this seat).
4. Revealed impact (slotWinsPerOvr): WR1 0.05517, WR2 0.03003 → ratio 0.544. THE MEASUREMENT TARGET. VERIFIED.

So three of four tables already cluster at 0.54–0.56 and agree with revealed impact; DEFAULT_WEIGHTS at 0.667 is the lone dissenter. The disagreement to close is DEFAULT_WEIGHTS vs the other three.

----------------------------------------------------------------
RECOMMENDATION — THE FINAL TABLE
----------------------------------------------------------------

RECOMMENDED: DEFAULT_WEIGHTS as THE single weights table, recalibrated to the revealed impact (slotWinsPerOvr), so that all tables agree.

Why:
- The revealed impact is the ground truth: it is measured from the matchup model itself (bump a slot's OVR, count wins bought).
- modelWeights() is already the protected-contract quantisation of that same revealed impact (0.541 ≈ 0.544) — no change needed there.
- Colors (0.562) is already in-band — no change needed there.
- DEFAULT_WEIGHTS (0.667) is the only table that disagrees with revealed impact (22% gap on WR2), and it is the shipped product's table (line 456 `weights = {...DEFAULT_WEIGHTS}`, line 6410 draft board uses modelWeights()). Aligning DEFAULT_WEIGHTS to revealed impact removes the inter-table disagreement and collapses the 14 flags.

What changes DEFAULT_WEIGHTS needs (direction only; exact numbers are the Owner/Architect's call, not a unilateral edit):
- WR2/WR1: 0.667 → ~0.54–0.56 (revealed 0.544). E.g. WR1 60 held, WR2 40 → ~33. This is the headline, measured, agreed knob.
- Reweight the 14 flagged slots toward the impact order: raise WR1, CB2, CB3, SS, FS (underweighted); lower DT2, RB1, OG1/OG2, C, DE2, SAM (overweighted). Gap ≥4 is the signal; the reweight should shrink every flag below |gap|≥4.
- Keep the protected contract intact: modelWeights() remains the monotone quantisation of slotWinsPerOvr (700 scale, nearest 5, floor 5) — changing DEFAULT_WEIGHTS to ~0.54 makes the two tables consistent; any other value widens the gap between them.

Constraints (this item is measurement + recommendation only — no seat edits a table unilaterally):
- DEFAULT_WEIGHTS, RATING_SPECS, and the modelWeights() quantisation contract are protected constants (AGENTS.md §3). Any DEFAULT_WEIGHTS change needs Owner approval (P-013) and a MERGE-MANIFEST.md re-pin in the same commit.
- I do not edit DEFAULT_WEIGHTS, RATING_SPECS, modelWeights(), or the product file. This filing is the measurement + recommendation for the Owner/Architect to finalize.

Salary-context sanity check of the recommendation: bringing WR2/WR1 to ~0.54–0.56 lands inside the Owner's 0.4–0.6 band (WR1 $30–35M vs WR2 $12–18M) and matches modelWeights/Colors — all four tables then agree on what a position is worth. The remaining flags (DT2, RB1, OG/C, secondary) are real weight-order mismatches vs impact that a recalibrated DEFAULT_WEIGHTS should address, but they are secondary to the single WR2/WR1 ratio that drives the table disagreement.

This differs from VL's P-282 stance (hold spec WR2 at 0.70) only in scope: the full-table sweep shows DEFAULT_WEIGHTS (0.667), not just the receiving spec, is the outlier vs revealed (0.544), while Colors (0.562) and modelWeights (0.541) already agree — so the coherent fix is to align DEFAULT_WEIGHTS, not to hold the spec out of line.

Labels: sweep numbers VERIFIED; revealed 0.544 VERIFIED (matches VLOC+Beam); 14 flags VERIFIED (reproduce VLOC; Beam confirmed two largest); modelWeights 0.541 VERIFIED; DEFAULT_WEIGHTS 0.667 VERIFIED; Colors 0.562 REPORTED; salary bands REPORTED (Owner-cited, not independently sourced); scope note INFERRED.

Receipts:
- sha256sum Football-Sim-PreColors.html = 40233d6be00e987c…8795fd (657,486 B) — matches Pre-Colors. VERIFIED.
- node tools/mathlab/lab.js "<abs path>/Football-Sim-PreColors.html" table → 26-slot table above, page errors 0, exit 0. VERIFIED.
- Read DEFAULT_WEIGHTS line 452 and modelWeights lines 459-462. VERIFIED.

— VL · council/vl · 2026-11-06
