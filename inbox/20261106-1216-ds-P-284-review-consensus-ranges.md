SPEAKER: DS | ROLE: advisor | TASK: P-284 | DATE: 2026-11-06T12:16:00Z

FOR: P-284 (P1) — Review of the consensus range table

RELAYED BY: Owner via MUSE (High Councillor). DS's P-284 consensus review as relayed by the Owner in chat. All claims are REPORTED (DS did not run the sweep; the data was supplied in the web prompt).

---

**REPORTED — MUSE review of P-284 consensus range table.** I did not run the sweep. All impact/consensus numbers below are the supplied VLOC/Beam/OR re-run data. Salary tiers are as supplied; I could not independently re-pull OTC, so the Groq/OR fills are **REPORTED**, not independently **VERIFIED**.

## Verdict: **IMPROVED**

The ranges are mostly right, and the "typical" clusters are largely finalizable. But I would **not** finalize from the min–max ranges. Finalize from the typical clusters, with five tightenings:

1. **K:** floor it, but not to 30 — final **200**.
2. **Unmeasured depth slots:** use Colors/typical values, not near-zero — **FB 30, P 100, DL5 140, WR4 10, TE3 10, DIME 40**.
3. **WR1:** final **450**, not 480 and not 434; pair WR2 at **245** to keep the verified 0.544 ratio, or 240 if the table prefers the lower cluster.
4. **Secondary:** follow the engine/typical cluster — **CB2 460, CB3 365, SS 348, FS 335** — not DS's low blend.
5. **CB1:** final **568**, not 499. DS's 499 is a blend artifact, not a measurement.

## 1. Salary alignment check — REPORTED

I do **not** see a clearly wrong OTC tier in the named rows. The fills — RT $9.14M, IDL $16.43M/$10.96M, S $8.13M, P $2.15M — are **REPORTED** from Groq/OR and are the weakest salary rows because I cannot independently verify them. CB3, WR3, SAM, FB, TE3, WR4, DIME are **JUDGMENT**, not OTC measurement.

| Group | Consensus weights vs median salary | Alignment call |
|---|---|—|
| QB | 1000 vs $28.28M | Aligned anchor. |
| EDGE | DE1 510–516 vs $18.00M; DE2 419–435 vs $11.91M | Weight ratio DE2/DE1 ≈ 0.84; salary ratio ≈ 0.66. Engine says DE2 is closer to DE1 than market does. I accept engine. |
| IDL | DT1 370–391 vs $16.43M; DT2 299–302 vs $10.96M | Same pattern: weight ratio ≈ 0.80; salary ratio ≈ 0.67. Typical DT1 370–372 is right; Beam/DS 390–391 over-blend. |
| OT | OT1 408–419 vs LT $8.59M; OT2 400–410 vs RT $9.14M | Close enough. RT slightly higher salary but equal weight is fine because revealed impact is identical. |
| IOL | OG1 313–336 vs $11.07M; OG2 313–336 vs $6.13M; C 320–336 vs $3.73M | **Major salary misalignment at C.** Market pays C ~13% of QB; consensus C ~33%. I support the consensus: revealed impact says OG1/OG2/C are identical. Do not cut C to market. |
| WR | WR1 434–480 vs $19.18M; WR2 235–266 vs $10.74M | Internal WR2/WR1 is aligned: salary 0.560, revealed 0.544, consensus 0.533–0.560. Absolute WR1 is below salary ratio — correctly, because salary ratio is not wins ratio. |
| TE | TE1 305–315 vs $8.33M; TE2 55–60 vs $4.14M | TE2 weight is far below salary ratio. That is engine-driven; market pays TE2 for blocking/insurance, not wins per OVR. Accept. |
| LB | MIKE 303–340 vs $7.89M; WILL 281–316 vs $5.97M; SAM 29–40 vs depth | MIKE/WILL roughly aligned; SAM near-zero is correct football. |
| S | SS 307–350 vs $8.13M; FS 301–340 vs $8.13M | Closest secondary alignment. Typical SS 348–350 and FS 335–340 are defensible. |
| CB | CB1 499–570 vs $10.88M; CB2 402–465 vs $6.67M; CB3 325–370 vs ~$4–6M | **Largest engine-vs-market gap.** Weights are far above salary ratios. I endorse engine over market here, but not DS's low blend. |
| RB | RB1 249–262 vs $5.46M; RB2 83–90 vs $3.34M | RB1 weight ≈ 25% QB; salary ≈ 19%. RB2 weight much lower than salary ratio. Engine-driven; acceptable. |
| K/P | K 30–285 vs $3.90M; P 1–100 vs $2.15M | K is the genuine split. P 100 is close to salary ratio; K 200–285 is above salary. I would floor K to 200, not 30. |
| Depth | FB/P/DL5/WR4/TE3/DIME | Judgment rows. Use Colors/typical, not near-zero. |

## 2. Where the weight should NOT follow median salary — REPORTED/JUDGMENT

**Secondary — follow engine, not market.** The market pays CB2s ~24% of QB and CB3s almost nothing, but the sim says CB2/CB3/SS/FS buy many wins. I side with the engine because the sim is measuring actual wins per OVR in a passing league where nickel/dime defensive backs are on the field for most snaps. The market median averages across schemes, roles, rookie contracts, and part-time slots; it underprices the wins value of a good slot/nickel defender. But I would **not** go to DS's low blend: finalize the six-seat cluster, not the outlier.

**K — floor it, but not to 30.** VLOC is right that the impact-implied 284 is absurd for a kicker, but 30 is too low. Kicking is high-variance, low-marginal-win per OVR, and kickers are replaceable; the sim's K impact likely overweights the kicker's linear OVR effect. A final K around **200** respects the measured signal while discounting it for football reality. 285 is too close to full impact; 30 makes kickers nearly irrelevant.

**Center — do not follow the market down.** The market pays C $3.73M median, but the revealed impact says C = OG1 = OG2. I would keep C near the guards, around **328–330**, not cut it to ~130 because of salary. The center's line-call value is real, but the sim already measures impact; the market's low C pay is a scarcity/contract artifact, not a wins statement.

**WR1 absolute — do not scale to salary.** WR1 salary is 68% of QB, but the weight should be ~44–45% because the revealed wins ratio is ~43%. The WR2/WR1 ratio should follow the verified 0.544; the absolute WR1 should not follow the $19.18M/$28.28M salary ratio. Final WR1 **450** is the right compromise: above pure revealed 434, below DS 480 and Colors 525.

**RB — market is probably right that RB2 is replaceable, but RB1 is not zero.** The depressed RB market is real, but the sim's RB1 impact (0.262 of QB) is not crazy. I would keep RB1 in the 255–262 range and RB2 near 85–90, not push RB1 up to salary-ratio levels.

## 3. Open questions — my answers

| Open question | My answer |
|---|—|
| **K: 30–285** | **Final K = 200.** VLOC is right to floor it; 30 is too low. 200–220 is the defensible band. |
| **Unmeasured depth: near-zero vs Colors** | **Use Colors/typical:** FB 30, P 100, DL5 140, WR4 10, TE3 10, DIME 40. The near-zero seats used a different depth-key set; that is not measurement evidence of zero. |
| **WR1: 434–480** | **Final WR1 = 450.** Pure revealed 434 is the floor; DS 480 overweights Colors; 450 respects revealed impact and product continuity. Pair **WR2 = 245** to keep 0.544; 240 is acceptable if the table prefers the lower cluster. |
| **Secondary: engine vs market** | **Follow engine/typical cluster:** CB2 460, CB3 365, SS 348, FS 335. Market underprices nickel/dime wins; DS's 402/325/307/301 is too low. |
| **CB1: 499–570** | **Final CB1 = 568.** DS 499 is a 50/50 blend artifact. The revealed-implied 568 is the measurement answer. |

**Bottom line — REPORTED:** finalize from the consensus **typical** clusters, not the ranges; tighten K to 200; use Colors values for unmeasured depth; WR1 450 / WR2 245; CB1 568; secondary at the six-seat engine cluster. That is an **improved** consensus table, not a rejected one.
