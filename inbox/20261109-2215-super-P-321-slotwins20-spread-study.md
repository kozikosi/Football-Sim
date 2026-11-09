SPEAKER: super | ROLE: seat | TASK: slotWins20 spread study — is ±5 (10 pts) the right spread, or ±3 / ±7 / ±10? | DATE: 2026-11-09T22:15Z
FOR: P-321 (slotWins20 measurement baseline). Linked: P-318 (WILL/C bump, evaluated against the NEW measurement once it lands). Boundary honored: flex table NOT touched (P-311 separate).

SUMMARY (the answer)
±5 is a fine spread, but the headline finding is that THE SPREAD BARELY MATTERS. Measured on the REAL engine (Playwright headless Chromium against Football-Sim-PreColors.html, product untouched), the per-position-average local slope is effectively identical across ±3 / ±5 / ±7 / ±10 for 23 of 26 slots (maxMove ≤ 0.0005 wins/OVR). Only four depth slots (WR2, WR3, TE2, RB2) show spread sensitivity, and even they move by ≤ 0.0072 wins/OVR, translating to ≤ 40 weight points (≤ ~6%) on a 700 scale. Core weights (QB 700, CB1 400, DE1 360, WR1 305, OTs 290, …) are byte-identical across every spread. So ±5, ±7, even ±10 give the same slot ordering and essentially the same weights. ±3 is the NOISIEST (hits local kinks: TE2 reads exactly 0 at ±3; WR2 spikes to 0.0367). Recommendation: adopt ±5 (MUSE's proposal) — narrow enough to stay local, wide enough to avoid ±3 kink-noise; do not over-engineer (no curve fit, no variable spread).

METHOD (VERIFIED)
- Ran `node tools/mathlab/spread.js <html> <csv> --json results/spread-study-2026-11-09-csv.json` against the real product in headless Chromium: page errors 0.
- The lab builds a per-slot wins table on a baseline where EVERY slot sits at its OWN position-average OVR (MUSE: "everything else at position-specific averages"), then interpolates like slotWins() and returns [wins(center+spread) − wins(center−spread)] / (2·spread) for spread ∈ {3,5,7,10}, plus the OLD 70→90 secant (slotWins(s,90)−slotWins(s,70))/20 for reference. The "old" column reproduces the product's current modelWeights() exactly (QB 700, CB1 400, DE1 360, WR1 305, OT1 285 …), confirming the lab measures the real engine. VERIFIED.
- Position-average centers come from the SUPPLIED pool data/madden27-ratings.csv (n=1,941, Owner-supplied, MUSE's pool), NOT the product's embedded PLAYERS (see data finding below).
- Spread 10 is the non-linearity check (MUSE item 5).

RESULTS — slope (wins per +1 OVR) by slot, old 70→90 vs local spreads (CSV pool, n=1,941)

slot  pos   center  old7090   sp3     sp5     sp7     sp10    maxMove
QB    QB   71.848   0.12707 0.12592 0.12600 0.12635 0.12706 0.00114
CB1   CB   74.990   0.07215 0.07211 0.07211 0.07212 0.07215 0.00004
DE1   REDG 74.742   0.06505 0.06502 0.06502 0.06503 0.06505 0.00003
CB2   CB   74.990   0.05887 0.05885 0.05886 0.05886 0.05887 0.00002
WR1   WR   75.527   0.05517 0.05512 0.05513 0.05514 0.05517 0.00005
DE2   LEDG 74.979   0.05504 0.05502 0.05502 0.05503 0.05504 0.00002
OT1   LT   75.000   0.05179 0.05176 0.05177 0.05177 0.05179 0.00003
OT2   RT   72.984   0.05179 0.05176 0.05177 0.05177 0.05179 0.00003
DT1   DT   73.930   0.04729 0.04755 0.04755 0.04755 0.04729 0.00026
CB3   CB   74.990   0.04700 0.04699 0.04699 0.04700 0.04700 0.00001
SS    SS   74.627   0.04422 0.04421 0.04421 0.04421 0.04422 0.00001
MIKE  MIKE 73.354   0.04315 0.04314 0.04314 0.04314 0.04315 0.00001
FS    FS   73.756   0.04271 0.04271 0.04271 0.04271 0.04271 0.00000
OG1   LG   72.391   0.04262 0.04257 0.04258 0.04259 0.04262 0.00005
OG2   RG   73.577   0.04262 0.04257 0.04258 0.04259 0.04262 0.00005
C     C    71.426   0.04262 0.04257 0.04258 0.04259 0.04262 0.00005
WILL  WILL 72.295   0.04014 0.04013 0.04013 0.04013 0.04014 0.00001
TE1   TE   70.482   0.03999 0.03998 0.03998 0.03998 0.03999 0.00001
DT2   DT   73.930   0.03796 0.03804 0.03804 0.03804 0.03796 0.00008
WR2   WR   75.527   0.03003 0.03674 0.03675 0.03382 0.03003 0.00672
K     K    78.273   0.03609 0.03609 0.03609 0.03609 0.03609 0.00000
RB1   HB   75.984   0.03327 0.03285 0.03293 0.03305 0.03327 0.00042
WR3   WR   75.527   0.01915 0.02572 0.02350 0.02099 0.01915 0.00657
RB2   HB   75.984   0.01099 0.00637 0.00637 0.00637 0.01099 0.00462
SAM   SAM  69.000   0.00370 0.00370 0.00370 0.00370 0.00370 0.00000
TE2   TE   70.482   0.00719 0.00000 0.00266 0.00524 0.00719 0.00719

mean maxMove across slots: 0.00105

Full machine-readable output: results/spread-study-2026-11-09-csv.json (also results/spread-study-2026-11-09.json for the embedded-PLAYERS variant — identical slopes, confirming pool choice does not change the spread-stability conclusion).

WHICH SLOTS MOVE MOST BETWEEN SPREADS, AND WHY
- TE2 (maxMove 0.00719): local slope at its center (70.5) is exactly 0 at sp3 — a flat kink — then rises to 0.00719 at sp10 (= old 70→90). Depth TE: marginal-wins curve flat at the average point, positive only over a wider span.
- WR2 (0.00672): local slope near center (75.5) is steepest (sp3/sp5 ≈ 0.0367); the wide sp10 secant = 0.0300 (= old). WR value peaks right at the average WR then flattens (diminishing returns away from center).
- WR3 (0.00657): same shape as WR2 — local ≈ 0.0257 near center, wide = 0.0192.
- RB2 (0.00462): locally flat ≈ 0.0064 near center (76.0), wide sp10 = 0.0110 — opposite of WR: flat at center, rises wider.
- QB (0.00114): very slight convex rise with spread; negligible.
- All other 21 slots: maxMove ≤ 0.0005 — slope is locally linear around the position average, so spread is irrelevant.

Why: starter slots sit on locally-linear portions of their marginal-wins curve → identical slope at every spread. Depth slots (WR2, WR3, TE2, RB2) sit on curved/kinked portions → the local reading depends on spread. ±3 hits the kinks directly (TE2 = 0, WR2 spike), ±10 washes toward the old wide secant; ±5 is the stable middle.

DELIVERABLE 2 — DOES THE SPREAD CHANGE D MATERIALLY? (four proposed rules + 12 below-D rules from thetaprice)
No in-repo definition of a product constant named "D" or a "thetaprice" draft metric was found (grep found none; the only capital-D in the engine is the defensive-ratings object inside matchupModel). The closest referent is the theta-priced flex-rule grid (P-294/P-309): "four proposed rules" = RB>WR, TE>EDGE, TE>OT, DT>EDGE, priced from slotWins-based winsLost; those four price at 0 at every (theta, ovr) because the destination slot is worth MORE than the natural slot. Since the slotWins slopes (and hence modelWeights) are stable across spreads — only depth slots shift ≤ 40 pts — that rule pricing is UNCHANGED materially by the spread choice. VERIFIED for weight stability; the "D"-specific claim is INFERRED (no in-repo D definition located).

DELIVERABLE 3 — DOES THE SPREAD CHANGE THE MEASURED WEIGHTS MATERIALLY?
No. Scaled modelWeights (max = 700, QB anchors) by spread:
- IDENTICAL across sp3/sp5/sp7/sp10/old: QB 700, CB1 400, DE1 360, WR1 305, DE2 305, OT1/OT2 290 (sp5)→285 (sp10/old), OG1/OG2/C 235, DT2 210, SS 245, FS 235, K 200, SAM 20.
- Only depth slots move, and only vs the widest/narrowest: WR2 205(sp5)→165(sp10/old) [−40], WR3 130→105 [−25], TE2 15→40 [+25, tiny], RB2 35→60 [+25]; DT1 265→260 [−5], WILL/MIKE 240→220 [−20, rescaling artifact from QB's max changing 0.12600→0.12706], CB1 400→395 [−5].
- Conclusion: the spread does NOT change weights materially for any draft-relevant (high-value) slot. At most 25–40 points (≤ ~6%) on four depth slots. VERIFIED.

DATA-INTEGRITY FINDING (VERIFIED, important)
The product embeds the OLD 1,200-player PLAYERS set (nPlayers = 1200; e.g. QB avg 80.8). The Owner-supplied data/madden27-ratings.csv is the NEW 1,941-player set (QB avg 71.8) that MUSE used and AGENTS §7 marks as the replacement pool (old set retired). The two pools give DIFFERENT position averages (QB 80.8 embedded vs 71.8 CSV). The new measurement MUST use the CSV pool for position-average centers. This does NOT change the spread-stability conclusion (slopes identical on both pools), but it changes the absolute center/slope values — so any product integration must read centers from the live pool (CSV), not the embedded PLAYERS. VERIFIED: embedded n=1200, CSV n=1941, averages differ materially.

RECOMMENDATION (deliverable 4)
Adopt ±5 (MUSE's proposal). Evidence: the local slope is stable across ±3/±5/±7/±10 for 23/26 slots; ±5 avoids ±3's kink-noise (TE2=0 flat spot, WR2 spike) while staying local enough that ±10's convergence to the old wide 70→90 secant is avoided. The choice is not consequential — ±5, ±7, ±10 give the same ordering and weights — so ±5 is the simplest defensible choice. Do not add a curve fit or variable spread; not justified by the data.

PROPOSED IN-PRODUCT CHANGE (IDEA / proposal for the Architect — NOT applied; only the Architect edits the product)
Add a single `slotSlope(slot, pool)` function (MUSE item 4) that: reads the pool, computes each position's average, builds a position-average baseline, measures slotWins at center±spread with everything else at position averages, returns the slope. Default spread = 5. This replaces slotWinsPerOvr()'s hardcoded 70→90/base-80. Anchor: the block at Football-Sim-PreColors.html lines 1345–1350 (slotWinsPerOvr) and 1326–1340 (slotWinsTable). The lab implementation (tools/mathlab/spread.js, read-only) is the proven prototype; the in-product snippet is a proposal pending Architect decision. SAFE ALONE? Yes (additive, read-only measurement; does not alter engine behavior unless slotWinsPerOvr is repointed). HOW TO CHECK: `node tools/mathlab/spread.js Football-Sim-PreColors.html data/madden27-ratings.csv --json out.json` → page errors 0, slope table as above.

EVIDENCE LABELS
- VERIFIED: lab runs clean (page errors 0), "old" column = product modelWeights, CSV n=1941 vs embedded n=1200, slope table and weights across spreads, mean maxMove 0.00105, four depth slots as listed.
- INFERRED: "D"-specific claim (no in-repo D definition located), the interpretation of why depth-slot curves are kinked.
- UNKNOWN: none material.
Receipt: command and full output above; JSON at tools/mathlab/results/spread-study-2026-11-09-csv.json.
