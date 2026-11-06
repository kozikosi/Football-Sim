SPEAKER: VLOC | ROLE: advisor | TASK: P-284 | DATE: 2026-11-06T12:12:44Z
REVIEW-OF: _agents/muse/deliveries/P-284-consensus-ranges-2026-11-06.md (on council/muse, built by MUSE from the seven included P-284 tables; Gemini and Q excluded per Owner)
VERDICT: improved

FOR: P-284
This is review #1 of 3 needed for REVIEWED ✓✓✓; seat VLOC, not the author of the consensus synthesis (MUSE), and I have not reviewed this item before and will not review it again. My own P-284 filing was one of the seven inputs to the consensus table; I evaluate the consensus on its merits below, and where my filing is cited it is labelled.

EVIDENCE LABELS USED: VERIFIED = command + output, re-computed in this session; REPORTED = OTC positional-contracts Avg./Year pull, closest accessible tier to the 2024 reference, NOT re-verified against the 2024 OTC freeze; INFERRED = my arithmetic/analysis; UNKNOWN = cannot arbitrate without the 2024 OTC freeze or a source I do not have.

Nothing here touches the product file or a protected constant. Measurement + recommendation only. The Owner/Architect finalize ONE table.

------------------------------------------------------------
1. SCOPE AND WHAT I CHECKED
------------------------------------------------------------

Target build for all swept numbers: Football-Sim-PreColors.html,
sha256 40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd (657,486 B) — matches AGENTS.md §2 Pre-Colors exactly (VERIFIED from my VLOC P-284 filing, re-run this session; byte-identical to its P-282 sweep).

I did NOT re-run the mathlab sweep in this session; I rely on my VLOC P-284 filing's sweep output, which is labelled VERIFIED there (command + full JSON output, page errors 0, byte-identical to P-282 Part 1). I recomputed every salary-implied ratio and every revealed→weight conversion below by hand; they match both my filing and the consensus table's "typical" column (VERIFIED arithmetic, INFERRED where I extend it).

I read only the consensus synthesis (the task-named file) plus my own filing; I did not read the seven individual seat filings (Beam, VL, OR, GPT, Groq, DS), so per-seat attribution inside the consensus is taken on trust from MUSE's table (REPORTED as attributed there).

------------------------------------------------------------
2. PART 1 — SALARY ALIGNMENT: confirm / challenge
------------------------------------------------------------

Method: salary-implied weight = median salary / QB anchor ($28.28M, QB 11–20) × 1000, compared to the consensus "typical" weight. A match means weight tracks what the market pays; a mismatch means weight does NOT follow salary for that slot. The protected contract (modelWeights() = monotone quantisation of slotWinsPerOvr()) says weight follows WINS, not salary — so mismatch is expected and often correct. I report both and flag where I think the table's own salary column is suspect.

QB anchor: $28.28M = 1000 (consensus; my own filing used ~$33.5M for #16 Sam Darnold — see §2.3, I cannot arbitrate).

| Slot | Median salary (consensus) | Salary-implied (÷QB×1000) | Consensus typical weight | Aligns? |
|------|---------------------------|---------------------------|--------------------------|---------|
| QB   | $28.28M (QB 11–20)        | 1000                      | 1000                     | yes (anchor) |
| CB1  | $10.88M (CB 11–20)        | ~385                      | 568–570                  | NO — weight ~+180 above salary |
| DE1  | $18.00M (EDGE 11–20)      | ~637                      | 510–512                  | NO — weight ~–125 below salary |
| CB2  | $6.67M (CB 21–32)         | ~236                      | 460–465                  | NO — weight ~+225 above salary (largest gap) |
| WR1  | $19.18M (WR 11–20)        | ~678                      | 434–450                  | NO — weight ~–230 below salary |
| DE2  | $11.91M (EDGE 21–32)      | ~421                      | 430–435                  | YES (~±2%) |
| OT1  | $8.59M (LT 11–20)         | ~304                      | 408–410                  | NO — weight ~+105 above salary |
| OT2  | $9.14M (RT 11–20, Groq fill) | ~323                   | 408–410                  | NO — weight ~+85 above salary |
| DT1  | $16.43M (IDL 11–20, Groq/OR fill) | ~581              | 370–372                  | NO — weight ~–210 below salary |
| CB3  | ~$4–6M (judgment)         | ~142–212                  | 365–370                  | NO — weight far above salary |
| SS   | $8.13M (S 11–20, Groq fill) | ~288                    | 348–350                  | NO — weight ~+60 above salary |
| MIKE | $7.89M (LB 11–20)         | ~279                      | 340                      | NO — weight ~+60 above salary |
| FS   | $8.13M (S 11–20, Groq fill) | ~288                    | 335–340                  | NO — weight ~+50 above salary |
| OG1  | $11.07M (OG 11–20)        | ~391                      | 330–336                  | NO — weight ~–58 below salary |
| OG2  | $6.13M (OG 21–32)         | ~217                      | 325–336                  | NO — weight ~+110 above salary |
| C    | $3.73M (C 11–20)          | ~132                      | 328–336                  | NO — weight ~+200 above salary (largest gap with CB2) |
| WILL | $5.97M (LB 21–32)         | ~211                      | 310–316                  | NO — weight ~+100 above salary |
| TE1  | $8.33M (TE 11–20)         | ~295                      | 310–315                  | YES (~±7%) |
| DT2  | $10.96M (IDL 21–32, Groq/OR fill) | ~388              | 299–300                  | NO — weight ~–90 below salary |
| K    | $3.90M (K 11–20)          | ~138                      | 200–285 (VLOC 30)        | NO — either far above salary; VLOC's 30 is far below |
| RB1  | $5.46M (RB 11–20)         | ~193                      | 249–262                  | borderline — weight ~+60 above salary |
| WR2  | $10.74M (WR 21–32)        | ~380                      | 235–240                  | NO — weight ~–140 below salary |
| WR3  | ~$4–6M (judgment)         | ~142–212                  | 150–151                  | YES (in band) |
| RB2  | $3.34M (RB 21–32)         | ~118                      | 85–90                    | partial — weight ~–30 below salary |
| TE2  | $4.14M (TE 21–32)         | ~146                      | 55–60                    | NO — weight ~–90 below salary |
| SAM  | ~$4–6M (LB depth)         | ~142–212                  | 29–32                    | NO — weight far below salary (depth role) |
| WR4  | ~$1.2M (judgment)         | ~42                       | 10–15                    | both tiny; direction unclear |
| TE3  | ~$1.2M (judgment)         | ~42                       | 10                       | both tiny |
| FB   | ~$1.8M (judgment)         | ~64                       | 1–30 (VLOC 10)           | weight below salary |
| P    | $2.15M (P 11–20, Groq fill) | ~76                     | 1–100 (VLOC 35)          | VLOC's 35 below salary; Colors 100 above |
| DL5  | ~$8–11M (IDL depth)       | ~283–389                  | 5–145 (or 140–145)       | weight below salary |
| DIME | Low (judgment)            | —                         | 40                       | n/a |

CONFIRMED ALIGN (weight ≈ salary-implied): DE2, TE1, WR3, plus QB anchor. That is essentially it — four slots.

CONFIRMED NON-ALIGN: everything else. The consensus table's weights do NOT track the median-salary column for the large majority of slots, and they should not: the typical column equals revealed impact (slotWinsPerOvr ratios on QB=1000 — VERIFIED: CB1 0.07215→568, DE1 0.06505→512, CB2 0.05887→463, WR1 0.05517→434, DE2 0.05504→433, OT1/OT2 0.05179→408, DT1 0.04729→372, CB3 0.04700→370, SS 0.04422→348, MIKE 0.04315→340, FS 0.04271→336, OG1/OG2/C 0.04262→335, WILL 0.04014→316, TE1 0.04000→315, DT2 0.03796→299, RB1 0.03327→262, WR2 0.03003→236, WR3 0.01915→151, RB2 0.01099→86, TE2 0.00719→57, SAM 0.00370→29, K 0.03609→284). The salary column is context, not the driver — consistent with my VLOC filing's stated method and the protected modelWeights() contract.

2.3 — Cross-check of the consensus salary column vs my own OTC pull (REPORTED, not re-verified vs 2024 freeze)

I compared each consensus median salary to the figure in my VLOC P-284 filing (OTC positional contracts pages, Avg./Year, closest accessible tier to the 2024 reference). My figures are REPORTED, not independently verified against the 2024 OTC freeze, so I can only flag agreement/divergence — I do NOT claim to know which is correct. Where they diverge I mark it UNKNOWN and flag the tier choice for re-check.

AGREE (roughly): DE2 ($11.91M vs my ~$12–16M proxy), OG1 ($11.07M vs ~$12–16M proxy), C ($3.73M — note: my filing's ~$12–16M interior-OL proxy for C was a weak estimate; the consensus $3.73M is almost certainly closer to reality, centers are the lowest-paid starters), K ($3.90M vs my ~$3.5M median kicker), P ($2.15M vs my ~$3–3.5M), TE1 ($8.33M vs my ~$10.25M).

DIVERGE (consensus lower than my #16-starter pulls): QB ($28.28M vs my $33.5M), CB1 ($10.88M vs my $18.0M), DE1 ($18.00M vs my $24.5M), CB2 ($6.67M vs my $13–17M), WR1 ($19.18M vs my $28.5M), OT1 ($8.59M vs my $17.0M), OT2 ($9.14M vs my $17.0M), DT1 ($16.43M vs my $21.3M), SS ($8.13M vs my $13.0M), MIKE ($7.89M vs my $11.0M), FS ($8.13M vs my $13.0M), RB1 ($5.46M vs my $9.0M), WR2 ($10.74M vs my $16–18M), SAM (~$4–6M vs my $11.0M starter proxy).

TIER CONCERNS I can state without arbitrating the figures:
- WILL uses LB 21–32 ($5.97M) but WILL is a starter slot — same tier as MIKE (LB 11–20, $7.89M) is arguable; tier choice changes the ratio by ~30%.
- OG2 uses OG 21–32 ($6.13M) but OG2 is a starter — OG 11–20 ($11.07M) is arguable.
- OT2 uses "RT 11–20, Groq fill" — RT is not cleanly a separate starter tier from LT (OT1 uses LT 11–20); inconsistent tiering between OT1/OT2.
- CB3 has "no clean tier" (~$4–6M judgment) — a 3rd corner is deeper than CB2; the judgment band is wide.

ACTION: re-source or at least name the tier for WILL, OG2, OT2, CB3; mark QB/CB1/DE1/CB2/WR1/OT1/OT2/DT1/SS/MIKE/FS/RB1/WR2/SAM as UNKNOWN pending the 2024 OTC freeze. Do not "correct" the column silently.

------------------------------------------------------------
3. PART 2 — WHERE WEIGHT SHOULD NOT FOLLOW MEDIAN SALARY
------------------------------------------------------------

Core position: weight = wins per +1 OVR (revealed impact, protected modelWeights() contract); salary = market price. They are different quantities and systematically diverge. Where they disagree, weight follows impact, not salary. The market is a poor wins-measure for several positions (CBA artifacts, positional scarcity, replaceability, visibility bias). My football reasoning, position by position:

**3.1 K: 30–285 — VLOC's floor to 30 is RIGHT; reject 200–285 (open question 1).**

The engine's kicker impact (0.0361 wins/+1 OVR, impact-implied weight 284) is real but narrow and inflated by the matchup model: it credits FG accuracy linearly with OVR, but real kicker value has a ceiling — a 95% vs 85% kicker is ~1–2 field goals a season, under one win, and no roster builds around kicker OVR. A weight of 284 (28% of a QB) is absurd: no NFL team trades a QB for three kickers, and kicker OVR is not a meaningful wins lever. The market agrees — kickers are paid ~$3.5–3.9M median (~14% of QB) and treated as depth/replaceable. VLOC's deliberate floor to 30 is the correct departure: the sim's kicker impact overstates marginal wins, and the market confirms kickers are not a high-wins slot. Final K should be ~30, not 200–285.

**3.2 Depth slots FB/P/DL5/WR4: near-zero keys, not Colors (open question 2).**

These eight keys (WR4, TE3, FB, P, DL5, DIME, plus VL/OR/VLOC's LB4/CB4/SS2/FS2) are NOT on ROSTER_SLOTS and have NO measured starter-model impact (VERIFIED from my filing: sweep covers 26 roster slots; the 8 depth keys have weight but no impact). Assigning them Colors values (P=100 = 10% of a QB! DL5=145, FB=30) invents impact where none was measured — they exist for roster completeness, not because they buy wins. Near-zero depth-minimal weights (~10–35) are the honest treatment.

Coherence problem: VL/OR/VLOC used an 8-key set (WR4, DL5, LB4, CB4, SS2, FS2, FB, P) while Beam/GPT/Groq/DS used the standard 6 (WR4, TE3, FB, P, DL5, DIME). For the final table, pick ONE coherent depth-key set and apply near-zero values consistently. I (VLOC) used the 8-key set: WR4 15, DL5 15, LB4 15, CB4 15, SS2 15, FS2 15, FB 10, P 35. Either set is defensible; the key decision is near-zero over Colors. P should be ~35 (special-teams depth), not 100.

**3.3 WR1: land at ~434–440 (revealed), not DS's 480 blend (open question 3).**

Revealed impact says WR1 = 434 (0.05517/0.12707 × 1000 = 434.2). DS's 480 is a 50/50 Colors/revealed blend that imports Colors' WR1=525, which was over-weighted vs impact. The market (salary-implied ~678 by the consensus column, or ~850 by my filing) actually says WR1 should be HIGHER — but the market overpays WR1: pass-league visibility, target volume is finite (QB distributes), and a #1 WR's marginal wins per +1 OVR are capped. Follow the impact, not the market, and not the blend. Final WR1 ≈ 434–440, narrowing the 434–480 range at the revealed end; reject 480.

**3.4 Secondary: ENDORSE following the engine (open question 4).**

CB2 ~460–465, CB3 ~365–370, SS ~348–350, FS ~335–340 — all pure revealed impact, all far above the market (CB2 salary-implied ~236; CB3/SS/FS ~142–288). I endorse this. Football reasons the market underpays the secondary and the engine is right:

- This is a passing-league sim: CB2 is impact #4 (0.0589, just behind DE1). The secondary is the primary thing that stops the QB, and the QB is impact #1 and dominant — so pass-defense value scales with the passing game. CB2/CB3/SS/FS buy real wins.
- The market sets CB pay off CB1s (top-of-market), not CB2s, and has historically underpaid corners relative to their game impact (the "CB2 is just a backup" bias). The salary median (~$6.67M for CB2, ~$13M for S) reflects that market bias, not wins truth.
- Counter-consideration (whether the sim overstates the secondary): possible if the matchup model over-credits coverage or the sim QB is "too good," making coverage the only thing that stops him. But the sweep was independently re-verified by Beam + OR + VLOC (VERIFIED), so the measurement is solid; the question is scheme, not measurement. In a pass-first sim, CB2 correctly buys wins.

Verdict: follow the engine on the secondary. Do not moderate toward the market; if anything the market is the outlier.

**3.5 CB1: 568–570 (revealed), not DS's 499 blend (open question 5).**

Revealed impact says CB1 = 568 (0.07215/0.12707 × 1000 = 567.8). DS's 499 is a 50/50 Colors/revealed blend that is unnecessary here — this is the one position where salary and impact nearly agree (salary-implied ~385 by the consensus column, ~537 by my filing, vs revealed 568). No blend is needed; the revealed 568–570 is the answer. Final CB1 = 568–570, reject DS's 499.

**3.6 Extra positions where I have a clear view (weight should NOT follow salary):**

- C vs OG1/OG2: the market pays C ~$3.73M (~13% of QB) and OG ~$11.07M (~39%) — a huge pay gap — but the sim's impact is IDENTICAL for C, OG1, OG2 (0.04262 each, weight 335). The market underpays centers (the "center is just a smart guard" bias); a bad center ruins snaps and protections. KEEP C = OG1 = OG2 by impact (335 each); do NOT distinguish them by market pay. This is a case where weight should explicitly NOT follow salary.
- RB1: market depressed (~$5.46M, ~19% of QB → 193) by CBA artifacts (rookie wage scale, second-contract suppression, replaceability narrative), but sim impact is real (~262, #21) — short-yardage, goal-line, pass protection, receiving (partly undercounted by the sim). KEEP RB1 near impact (~250–262); the market is depressed by bargaining artifacts, not wins truth. Don't overcorrect to market either — RB1 is modest impact (#21), below WR2/TE1 in the sim.
- DE1/DT1: salary-implied (637 / 581) is ABOVE weight (512 / 372). Edge and interior rush are overpaid relative to marginal wins per OVR (pass-rush has diminishing returns; double teams neutralize one rusher). Follow impact (weight already below salary — correct).
- OT1/OT2: weight (408) is above salary-implied (~304–323). OT pass protection protects the QB (impact #1), so OT value scales with the QB. Follow impact (408), not the lower salary ratio.
- WR2: salary-implied (~380) is above weight (~236). WR2s are overpaid relative to marginal wins (volume-capped, QB-dependent). Follow impact (~236); WR2/WR1 = 0.544 stays in-band.

------------------------------------------------------------
4. RECOMMENDED FINAL TABLE CHANGES (specific, measurement + recommendation only)

Consensus "typical" column is already = revealed impact for measurable slots (VERIFIED). Recommended changes to the consensus synthesis before finalization:

| Element | Consensus now | Recommended | Reason |
|---------|---------------|-------------|--------|
| K | 200–285 typical (VLOC 30 outlier) | 30 (final) | Kicker impact overstated (ceiling effect); market ~depth. VLOC's floor is right (open q1). |
| WR1 | 434–480 typical (DS 480 high) | 434–440 | Revealed impact 434; market overpays WR1; reject blend (open q3). |
| CB1 | 499–570 typical (DS 499 low) | 568–570 | Revealed impact 568; salary/impact already near-agree; no blend (open q5). |
| Secondary | CB2 460–465, CB3 365–370, SS 348–350, FS 335–340 (engine) | Keep as-is | Endorse engine; market underpays secondary (open q4). |
| Depth keys | Method split: near-zero (VL/OR/VLOC) vs Colors (Beam/GPT/Groq/DS) | Near-zero, ONE coherent key set | No measured impact for depth keys; Colors values invent impact. Recommend VLOC's 8-key set (WR4 15, DL5 15, LB4 15, CB4 15, SS2 15, FS2 15, FB 10, P 35) or the standard 6 — pick one, apply near-zero consistently (open q2). |
| Salary column | Mixed tiers; some figures diverge from other OTC pulls | Re-source/name tiers for WILL, OG2, OT2, CB3; mark QB/CB1/DE1/CB2/WR1/OT1/OT2/DT1/SS/MIKE/FS/RB1/WR2/SAM UNKNOWN pending 2024 freeze | Do not silently correct; tier choice changes ratios ~2x (see §2.3). |

The resulting measurable-slot weights equal revealed impact (QB=1000), which is what the protected modelWeights() contract requires. The only labelled departures from pure impact are K (30 vs 284) and P (35 vs unmeasured) — explicit, depth/special-teams, consistent with the Owner's prior K treatment.

------------------------------------------------------------
5. WEAKEST POINT / CHECKS NOT RUN
------------------------------------------------------------

- Did NOT independently verify OTC 2024 median salaries — no access to the 2024 OTC freeze. All salary-column checks are cross-references to my own VLOC P-284 filing's OTC pull, labelled REPORTED (Avg./Year, closest accessible tier). UNKNOWN which figure is correct where they diverge.
- Did NOT re-run the mathlab sweep in this session; rely on my filing's sweep output (labelled VERIFIED in that file, byte-identical to P-282).
- Did NOT read the seven individual seat filings (Beam, VL, OR, GPT, Groq, DS); per-seat attribution inside the consensus taken on trust from MUSE's table (REPORTED as attributed there).
- Did NOT verify the "median NFL salary" claim that the Owner cited the 2024 OTC "Players 11–20 / 21–32" tiers — taken from the consensus table header (REPORTED as cited there).

VERDICT: improved. The ranges are mostly right (typical = revealed impact for measurable slots, which is the correct basis per the protected contract), but they need the changes above — K=30, WR1≈434–440, CB1=568–570, engine secondary, near-zero depth keys with ONE coherent key set, and salary-column tier fixes / UNKNOWN flags — before the Owner/Architect finalize ONE table.

Seat: VLOC | council/vloc | 2026-11-06T12:12:44Z
