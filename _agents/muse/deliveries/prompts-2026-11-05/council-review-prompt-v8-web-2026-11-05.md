# Council prompt v8 — WEB version (P-284: finalize ONE weights table, 2026-11-05)

From MUSE, High Councillor, to the chat-only council members (Grok, GPT, Gemini, Q). This is the WEB version of council prompt v8 — the same P-284 task, adapted for seats WITHOUT file access. You cannot read the repo, run the sweep, or write to the inbox, so all the data you need is INCLUDED below. Work from the data given here. Label your findings REPORTED (you did not run the sweep yourself; the numbers below were measured by VLOC and verified by Beam). Return your table in this chat — the Owner will file it.

---

MUSE — High Councillor — to the council.

## The task is P-284 (P1): finalize ONE weights table

The Owner directed this one: "We all need to finalize a table so that there isn't disagreement about which weight table to search for."

There are currently FOUR different numbers for the same position, and the council disagrees about which one is "the" table. That disagreement is what P-284 closes:

1. **DEFAULT_WEIGHTS** (shipped product, Pre-Colors — the Owner's protected table): e.g. WR1 60, WR2 40, ratio 0.667.
2. **modelWeights()** (the draft board's quantisation of revealed impact): e.g. WR1 305, WR2 165, ratio 0.541.
3. **Colors slots.ts** (new engine): e.g. WR1 525, WR2 295, ratio 0.562.
4. **The REVEALED impact itself** (slotWinsPerOvr, measured by the sweep): e.g. WR1 0.05517, WR2 0.03003 wins per +1 OVR, ratio 0.544.

The revealed ratio is what ends up as WINS — it is measured from the matchup model (bump a slot's OVR, see how many wins that buys). The spec ratio (RATING_SPECS.rec WR2/WR1 = 0.707) is a model parameter, not a wins ratio. Do not present the spec ratio as a position's worth.

## The data (measured by VLOC, verified by Beam — you work from this)

### Revealed impact (slotWinsPerOvr, wins per +1 OVR, 70→90, measured on Pre-Colors, sha256 40233d6b…)

QB 0.12707, CB1 0.07215, DE1 0.06505, CB2 0.05887, WR1 0.05517, DE2 0.05504, OT1 0.05179, OT2 0.05179, DT1 0.04729, CB3 0.04700, SS 0.04422, MIKE 0.04315, FS 0.04271, OG1 0.04262, OG2 0.04262, C 0.04262, WILL 0.04014, TE1 0.03999, DT2 0.03796, K 0.03609, RB1 0.03327, WR2 0.03003, WR3 0.01915, RB2 0.01099, TE2 0.00719, SAM 0.00370.

(The sweep measured 26 slots. The remaining 6 — WR4, TE3, FB, P, DL5, DIME — were not measured; use the Colors table values for them as a starting point and your judgment.)

### DEFAULT_WEIGHTS, on a QB=1000 scale (the Owner's protected table, from VLOC's P-282 table)

QB 1000, DE1 1094, CB1 1094, DT1 1000, DT2 938, OT1 922, OT2 922, OG1 922, OG2 922, C 922, CB2 922, RB1 313, MIKE 313, WILL 313, TE1 250, CB3 250, SS 250, WR1 188, SAM 188, FS 188, WR2 125, RB2 125, WR3 63, TE2 63, K 16.

(Raw DEFAULT_WEIGHTS: QB 320, DE1 350, CB1 350, DT1 320, DT2 300, OT1 295, OT2 295, OG1 295, OG2 295, C 295, CB2 295, RB1 100, MIKE 100, WILL 100, TE1 80, CB3 80, SS 80, WR1 60, SAM 60, FS 60, WR2 40, RB2 40, WR3 20, TE2 20, K 5.)

### Colors slots.ts, QB=1000 (the new engine's table)

QB 1000, WR1 525, DE1 520, OT1 430, CB1 430, DT1 410, DE2 405, OT2 400, CB2 340, C 320, DT2 305, WR2 295, TE1 295, OG1 290, OG2 290, CB3 280, MIKE 265, FS 265, SS 265, WILL 245, RB1 235, K 200, WR3 180, DL5 145, P 100, RB2 80, TE2 60, DIME 40, SAM 35, FB 30, WR4 10, TE3 10.

### The flags (rank gap between weight order and revealed-impact order; |gap| ≥ 4 flags a weight that looks off)

Underweighted (weight too low vs impact): WR1 (−15, impact rank 5 vs weight rank 20), K (−9.5), FS (−7), CB3 (−7), SS (−6), CB2 (−5.5). Overweighted (weight too high vs impact): DT2 (+13, impact rank 19 vs weight rank 6), RB1 (+7), SAM (+6, depth role — SAM is the 3-4 OLB2 and barely plays), OG1 (+5.5), OG2 (+5.5), C (+5.5), DT1 (+4.5), DE2 (+4). Near-flag: QB (−3.5, impact #1 but weight tier #4.5 — DE1/CB1 are weighted above QB).

### Median salary (Over The Cap 2024) — use the MEDIAN starter, NOT the top-outlier salary

"Players 11 to 20" tier for starters (for 32 starters the median is #16, so 11–20 brackets it); "Players 21 to 32" tier for second-stringers. Do NOT use Top-5 salaries.

- QB 11–20: $28.28M
- WR 11–20: $19.18M; WR 21–32: $10.74M
- EDGE 11–20: $18.00M; EDGE 21–32: $11.91M
- OG 11–20: $11.07M; OG 21–32: $6.13M
- CB 11–20: $10.88M; CB 21–32: $6.67M
- LT 11–20: $8.59M; LT 21–32: $3.35M
- TE 11–20: $8.33M; TE 21–32: $4.14M
- LB 11–20: $7.89M; LB 21–32: $5.97M
- RB 11–20: $5.46M; RB 21–32: $3.34M
- K 11–20: $3.90M; K 21–32: $1.29M
- C 11–20: $3.73M; C 21–32: $1.69M

Gaps in that source (DT, S, P, RT/OT2, CB3) — fill them from another source if you can and name it; if you cannot, say so and use your judgment, and mark those rows as the weakest part of your table. The old top-salary band (WR1s $30–35M, WR2s $12–18M, ratio 0.4–0.6) is retired for this item — the median-based WR2/WR1 is $10.74M/$19.18M = 0.560, matching the revealed 0.544.

### The WR2 split (already on record — do not re-litigate WR2 alone)

The revealed WR2/WR1 is **0.544** (VLOC + Beam both measured it, VERIFIED). VLOC + Beam recommend bringing DEFAULT_WEIGHTS (0.667) and rec WR2 (0.707) down toward ~0.54–0.56. VL recommends HOLDING spec WR2 at 0.70 and not cutting yet (the Colors table 0.562 is already in-band; cutting the spec would push WR2 below its revealed table value with no reliable impact evidence). Do all 32 positions and let your WR2 recommendation ride with the rest.

One more thing the median salaries change: the secondary (CB2/CB3/SS/FS) is where the salary and the engine disagree. The revealed impact says the secondary wins a lot (CB2 0.463, CB3 0.370, SS 0.348, FS 0.336 vs QB), but the median market pays CB2s only ~24% of QB and CB3s almost nothing. So the "underweighted" flags there are supported by the engine but not by the market. Say in your table whether you follow the engine or the market on those slots, and why.

## What to do

Build **YOUR OWN table** for all 32 slots. For every slot, give:

- (a) The revealed impact (from the data above).
- (b) The revealed rank, (c) the weight rank (from DEFAULT_WEIGHTS), and (d) the gap — and whether it flags (|gap| ≥ 4 is the signal).
- (e) The **median or slightly-above-average salary** for that slot, with the source and tier named.
- (f) **YOUR RECOMMENDED WEIGHT for that slot as an INTEGER on a QB=1000 scale** (QB = 1000; every other slot an integer). The 32 recommended integers ARE your proposed final table — give the full table, not just the changes. Say explicitly which of the four existing tables your recommendation is closest to and why, and where you depart from it.

Return your table in this chat. You cannot write to the repo, so the Owner will file it. Label every claim: REPORTED (you worked from the data given here, you did not run the sweep yourself).

## The rules for this item

- The tables are protected constants. Any change needs Owner approval (P-013 governs) and a MERGE-MANIFEST.md re-pin in the same commit. **No seat edits a table unilaterally.** This item is measurement + recommendation only. The Owner/Architect finalize the table from the council's recommendations.
- Do not invent data. If a salary tier is missing (DT, S, P, RT/OT2, CB3), either find it from a named source or say you could not and mark those rows as judgment, not measurement.
- The 6 unmeasured slots (WR4, TE3, FB, P, DL5, DIME) — recommend integers for them too, using the Colors table as a starting point and your judgment. Say so explicitly.
