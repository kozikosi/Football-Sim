SPEAKER: Groq | ROLE: advisor | TASK: P-284 | DATE: 2026-11-06T12:16:00Z

FOR: P-284 (P1) — Review of the consensus range table

RELAYED BY: Owner via MUSE (High Councillor). Groq is a chat-only seat and cannot write to the repo; this filing is Groq's P-284 consensus review as relayed by the Owner in chat. All claims are REPORTED (Groq did not run the sweep; the data was supplied in the web prompt).

---

**REPORTED** (all ranges, typicals, impact-derived numbers, and salary tiers are taken from the consensus table and prior P-284 data supplied in the prompt; I did not re-run any sweep or independently measure slotWinsPerOvr. Salary numbers match the Over The Cap 2024 "Players 11–20 / 21–32" tiers previously pulled; CB3, WR3/WR4 depth, and a few special-teams figures remain judgment as noted).

### Verdict: **improved**

The consensus ranges are directionally correct and already tight on the majority of measured starter slots. The structure is usable. Three judgment areas need tightening before the Owner finalizes a single table: (1) K, (2) the unmeasured depth slots, and (3) a modest narrowing of the WR1 and secondary ranges that are currently inflated almost entirely by the DS 50/50 blend outlier. The rest can be taken as settled.

### 1. Salary alignment check (position groups)

I walked every group against the listed OTC median (11–20 for primary starters, 21–32 for second-string / depth where applicable).

- **QB**: Perfect alignment. 1000 vs $28.28M is the correct anchor.
- **EDGE (DE1/DE2)**: Aligns well. DE1 ~510–512 sits comfortably under the $18M EDGE 11–20; DE2 ~430 under the $11.91M 21–32.
- **WR (WR1/WR2/WR3)**: Aligns on ratio (council WR2/WR1 0.533–0.560 matches both revealed 0.544 and salary 0.560). Absolute levels are reasonable relative to $19.18M / $10.74M.
- **OT (OT1/OT2)**: Aligns. ~408–410 vs LT $8.59M and RT $9.14M.
- **IDL (DT1/DT2)**: Aligns on absolute scale with IDL $16.43M / $10.96M, though the council correctly compresses DT2 relative to market.
- **OL interior (OG1/OG2/C)**: Partially misaligned by market, correctly aligned by impact. Market pays C only $3.73M while OG1 is $11.07M; impact treats all three identically at 0.04262. Council keeps them nearly equal (~320–336) — correct (see §2).
- **LB (MIKE/WILL/SAM)**: Aligns. MIKE/WILL ~310–340 vs LB $7.89M / $5.97M; SAM correctly near floor.
- **TE**: Aligns. TE1 ~310–315 vs $8.33M; TE2 ~55–60 vs $4.14M.
- **RB**: Aligns with the depressed market ($5.46M / $3.34M). Council ~250 / ~85–90 is consistent.
- **Secondary (CB1/CB2/CB3/SS/FS)**: Strongly misaligned with market, correctly aligned with revealed impact. CB1 market is only ~38% of QB salary yet impact is ~57%; CB2 market ~24% of QB yet impact ~46%. Council follows impact.
- **K**: Market $3.90M (~14% of QB). Impact-implied ~284. Council range 30–285 is the pure judgment split.
- **P / FB / DL5 / WR4 / DIME / TE3**: Unmeasured; salary data sparse or low. Council split is Colors vs near-zero, not a salary disagreement.

No median salary in the consensus table is factually wrong. The only tier notes I would flag as judgment (already marked) are CB3 and the pure depth slots.

### 2. Where weight should **not** follow median salary (football reasoning)

Weights measure wins per +1 OVR in the sim. Market salaries measure what 32 front offices are willing to pay under the real-world constraints of the salary cap, rookie wage scale, franchise tag, and talent distribution. Those two numbers diverge for structural reasons. The sim should follow the measured wins unless there is a clear modeling reason the impact number itself is distorted.

**Secondary (CB2 / CB3 / SS / FS) — follow the engine, not the market.**
REPORTED impact ratios (CB2 0.463 of QB, CB3 0.370, SS 0.348, FS 0.336) are large and consistent across the VLOC/Beam verification. The market underpays them because: (a) the secondary is deeper and more replaceable via the draft and free agency than elite EDGE or WR1 talent; (b) scheme variance is high (Cover-3 vs man, single-high vs two-high) so average starter value is diluted; (c) injuries and snap-count volatility make long-term contracts riskier. None of those market frictions exist inside the sim. A +1 OVR on CB2 or FS simply reduces explosive plays and increases takeaways in a way the matchup model already quantifies. Eight of nine filers correctly stayed with the engine. I endorse the typicals (CB2 460–465, CB3 365–370, SS 348–350, FS 335–340). Softening them toward market would re-introduce the exact under-weighting the flags already identified.

**Kicker — do not floor to 30; do not treat pure impact 284 as gospel either.**
The measured 0.03609 wins per +1 OVR is real inside the current matchup model (field-position and scoring effects compound). VLOC's floor of 30 is an explicit policy choice, not a measurement. Football reality: a kicker's marginal value is highly non-linear and situation-dependent (a 90+ OVR K in a close game is massive; the same K in a blowout or with a weak offense is near zero). The sim's linear OVR bump does not fully capture that. Market pay (~$3.9M) reflects replaceability and the fact that most games are not decided by the final kick. Recommendation: park K at 200–220 (inside the non-VLOC cluster). This is still well above market share and acknowledges the measured impact without letting a linear model overstate a role that is discrete and low-volume.

**Interior OL (especially C vs OG).**
Impact says OG1 = OG2 = C = 0.04262. Market says C is dramatically cheaper. Keep the weights nearly equal (council typical 328–336 is fine). Football reason: the center's value is scheme- and communication-heavy (protections, line calls, identifying MIKE). Those effects are partially invisible to a pure OVR-bump experiment that does not re-run full play-calling logic. The market's discount on centers is partly real (more centers are "good enough"), but the sim already treats the three interior spots as interchangeable in impact, so the weights should stay close. Distinguishing them by market would re-introduce an artificial hierarchy the measurement does not support.

**Running back.**
Market is correctly depressed; the council numbers (~250 for RB1) already reflect that. The sim does not appear to understate RB value in a way that needs correction. Pass-protection and receiving contributions are partially captured in the overall OVR; short-yardage and clock-killing effects are real but secondary to the skill positions and the trenches in modern win probability.

**Unmeasured depth (FB, P, DL5, WR4, etc.).**
These should not be near-zero. A 0-weight depth slot creates weird draft-board and roster-construction artifacts (the AI will treat the position as worthless and never draft or retain anyone). Colors values (or mild discounts from them) are the safer default until actual impact numbers exist. Near-zero is an over-correction.

**Scarcity / replaceability that the market gets right.**
SAM and pure depth roles are correctly near the floor. The league has many competent SAM/OLB2 and depth defensive linemen; their marginal wins are tiny. Council treatment is sound.

### Open questions — settled recommendations

1. **K (30–285)**
   Reject the VLOC floor of 30. Set final K in the 200–220 band. Reason: measured impact is non-zero and the linear model is directionally correct; a 30 weight would make the position almost irrelevant in roster construction and draft value, which is worse than a mild overstatement. 200–220 still sits well below pure proportional impact and respects the low market and discrete nature of the role.

2. **Unmeasured depth slots (FB / P / DL5 / WR4)**
   Prefer the Colors-based cluster (FB 30, P 100, DL5 140–145, WR4 10–15). Near-zero creates downstream problems in any system that uses the weights for ranking or roster decisions. Until a sweep measures them, keep the existing Colors anchors (or a light haircut). TE3 and DIME already have clean 10 / 40 consensus among the seats that listed them — keep those.

3. **WR1 (434–480)**
   Land at **440–450**. Pure revealed is 434; Colors is higher; the salary-implied ratio and the rest of the board sit comfortably in the low-to-mid 440s. DS 480 is the blend outlier and should be discounted. 440–450 keeps WR2/WR1 inside the verified 0.54–0.56 band when WR2 is set at 235–240.

4. **Secondary**
   Endorse the engine. Typicals (CB2 460–465, CB3 365–370, SS 348–350, FS 335–340) are correct. Market underpayment is real but is driven by replaceability and scheme variance that do not exist in the sim's measured wins. Softening them would re-create the original under-weight flags.

5. **CB1 (499–570)**
   568–570. DS 499 is the same 50/50 blend outlier that pulled several other ranges wider. The other six seats (and the pure revealed scaling) converge tightly. No football reason to discount CB1 relative to its measured impact.

### Summary recommendation for the final table
Take the "Typical" column as the starting point, with these three adjustments only:
- K → 210 (midpoint of the non-floor cluster, rounded).
- Unmeasured depth → Colors cluster (not near-zero).
- WR1 → 445 (center of the non-DS range).

Everything else is already tight enough to finalize. The Owner can now collapse the ranges into one integer table.
