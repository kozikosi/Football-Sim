SPEAKER: Q | ROLE: advisor | TASK: P-284 | DATE: 2026-11-06T12:16:00Z

FOR: P-284 (P1) — Review of the consensus range table

RELAYED BY: Owner via MUSE (High Councillor). Q is a chat-only seat and cannot write to the repo; this filing is Q's P-284 consensus review as relayed by the Owner in chat. All claims are REPORTED (Q did not run the sweep; the data was supplied in the web prompt).

---

**P-284 Consensus Review**
**From:** MUSE (High Councillor)
**To:** The Council / Owner
**Date:** Friday, November 06, 2026
**Verdict:** IMPROVED — the ranges are mostly right, but I have changes on K, the unmeasured depth slots, and some salary alignment issues.

—

## 1. Salary Alignment Check

I checked all 32 slots against the median salary data. The consensus table is driven by REVEALED IMPACT (wins per +1 OVR), not salary. Where weight and salary disagree, we need to decide which one to follow.

**Aligned (weight ratio ≈ salary ratio):**
- QB: 1000 / $28.28M — anchor
- DE2: 419-435 / $11.91M — ratio 0.42-0.44, salary ratio 0.421
- TE1: 305-315 / $8.33M — ratio 0.30-0.31, salary ratio 0.295
- WR3: 150-166 / ~$4-6M — ratio 0.15-0.17, salary ratio ~0.18

**Weight is HIGHER than salary suggests:**
- CB2: 402-465 / $6.67M — weight ratio 0.40-0.47, salary ratio 0.236 (weight is 1.7-2.0x salary)
- OT1: 408-419 / $8.59M — weight ratio 0.41-0.42, salary ratio 0.304 (weight is 1.3-1.4x salary)
- OT2: 400-410 / $9.14M — weight ratio 0.40-0.41, salary ratio 0.323 (weight is 1.2-1.3x salary)
- CB3: 325-370 / ~$4-6M — weight ratio 0.33-0.37, salary ratio ~0.18 (weight is 1.8-2.1x salary)
- SS: 307-350 / $8.13M — weight ratio 0.31-0.35, salary ratio 0.287 (weight is 1.1-1.2x salary)
- MIKE: 303-340 / $7.89M — weight ratio 0.30-0.34, salary ratio 0.279 (weight is 1.1-1.2x salary)
- FS: 301-340 / $8.13M — weight ratio 0.30-0.34, salary ratio 0.287 (weight is 1.1-1.2x salary)
- OG2: 313-336 / $6.13M — weight ratio 0.31-0.34, salary ratio 0.217 (weight is 1.4-1.6x salary)
- C: 320-336 / $3.73M — weight ratio 0.32-0.34, salary ratio 0.132 (weight is 2.4-2.6x salary)
- WILL: 281-316 / $5.97M — weight ratio 0.28-0.32, salary ratio 0.211 (weight is 1.3-1.5x salary)
- RB1: 249-262 / $5.46M — weight ratio 0.25-0.26, salary ratio 0.193 (weight is 1.3-1.4x salary)

**Weight is LOWER than salary suggests:**
- DE1: 510-516 / $18.00M — weight ratio 0.51-0.52, salary ratio 0.636 (weight is 0.80-0.81x salary)
- WR1: 434-480 / $19.18M — weight ratio 0.43-0.48, salary ratio 0.678 (weight is 0.64-0.71x salary)
- DT1: 370-391 / $16.43M — weight ratio 0.37-0.39, salary ratio 0.581 (weight is 0.64-0.67x salary)
- OG1: 313-336 / $11.07M — weight ratio 0.31-0.34, salary ratio 0.391 (weight is 0.80-0.86x salary)
- DT2: 299-302 / $10.96M — weight ratio 0.30, salary ratio 0.387 (weight is 0.77x salary)
- WR2: 235-266 / $10.74M — weight ratio 0.24-0.27, salary ratio 0.380 (weight is 0.62-0.70x salary)
- TE2: 55-60 / $4.14M — weight ratio 0.05-0.06, salary ratio 0.146 (weight is 0.37-0.41x salary)
- SAM: 29-40 / ~$4-6M — weight ratio 0.03-0.04, salary ratio ~0.18 (weight is 0.16-0.22x salary)

—

## 2. Where Weight Should NOT Follow Salary (Football Reasoning)

### A. The secondary (CB2/CB3/SS/FS): Follow the engine

The market underpays the secondary relative to wins. Why?
- **Scheme dependence:** In modern NFL, teams use 3+ WRs on 60-70% of snaps, so CB2/CB3 are on the field more than ever.
- **Scarcity vs replaceability:** Elite CBs are rare, but the market prioritizes CB1 and underpays CB2/CB3.
- **The engine is right:** The revealed impact measures wins per +1 OVR, which captures the true value of coverage.

I endorse following the engine. CB2 should be ~460, CB3 ~370, SS ~350, FS ~340.

### B. Interior line (OG/C): Follow the engine

The market underpays centers relative to wins. Why?
- **Visibility bias:** Centers are less visible than guards, so the market underpays them.
- **Crucial role:** Centers are responsible for snap timing, protection calls, and run blocking. They are as valuable as guards.
- **The engine is right:** OG1/OG2/C all have the same revealed impact (0.04262), so they should have the same weight.

I endorse following the engine. C should be ~335, same as OG.

### C. Wide receivers (WR1/WR2): Follow the engine

The market overpays WR1 relative to wins. Why?
- **Highlight reel bias:** WR1 is the most visible position, so the market overpays for "star power."
- **Fantasy football:** WR1s are highly valued in fantasy, which drives up their market price.
- **The engine is right:** The revealed impact says WR1 is worth 0.434 of QB, not 0.678.

I endorse following the engine. WR1 should be ~434-450.

### D. Running backs (RB1): Follow the engine (with caveats)

The market underpays RB1 relative to wins. Why?
- **Replaceability bias:** The market treats RBs as replaceable, but the engine says RB1 is worth 0.262 of QB.
- **The engine may overstate:** The sim's matchup model may not capture the "RB by committee" approach.

I think the engine is right that RB1 is more valuable than the market suggests. RB1 should be ~250-260.

### E. Edge rushers (DE1/DE2): Follow the engine

The market overpays DE1 relative to wins. Why?
- **Sack bias:** The market overpays for sacks, but the engine says DE1 is worth 0.513 of QB, not 0.636.
- **The engine is right:** The revealed impact says DE1 is worth 0.513 of QB.

I endorse following the engine. DE1 should be ~510-516.

### F. Defensive tackles (DT1/DT2): Follow the engine

The market overpays DT1/DT2 relative to wins. Why?
- **Interior pressure bias:** The market overpays for interior pressure, but the engine says DT1 is worth 0.370-0.391 of QB, not 0.581.
- **The engine is right:** The revealed impact says DT1 is worth 0.370-0.391 of QB.

I endorse following the engine. DT1 should be ~370-391, DT2 ~299-302.

### G. Special teams (K/P): Do NOT follow the engine

The engine overstates K value. Why?
- **High variance:** Kickers have high variance. A bad kick can cost a game, but a good kicker doesn't consistently win games.
- **Tiebreaker nature:** The difference between a top-5 kicker and a bottom-5 kicker is maybe 3-5 points per season, not 3-5 wins.
- **The sim's matchup model:** The engine may overstate K value because it doesn't capture the "kicking is a tiebreaker" nature.

I think K should be around 100-150, not 284. VLOC's floor of 30 is too low, but 284 is too high. I'd say 150 is a reasonable compromise.

For P, the engine is unmeasured, but I think P should be around 50-100. The market pays $2.15M (7.6% of QB), which suggests ~76. I'd say 75 is a reasonable compromise.

### H. Unmeasured depth slots (FB/P/DL5/WR4): Use near-zero

- **FB:** The fullback is nearly extinct in modern NFL. Most teams don't use one. Near-zero (1-10) is correct.
- **DL5:** This is a 5th defensive lineman, used in rotation. In a 4-3 base, you only play 4 DL, so DL5 is a situational player. I'd say 50-100.
- **WR4:** 4th WR is a slot receiver or special teams. In modern NFL, slot receivers are important, but WR4 is usually a depth player. I'd say 10-20.

—

## 3. Open Questions

### Q1: K: 30-285

VLOC floors K to 30, arguing 284 is "absurd for a kicker." The other six are 200-285.

**My verdict:** VLOC is right to question 284, but 30 is too low. I'd say K should be ~150.

**Football reason:** Kickers have high variance and are tiebreakers, not game-changers. The difference between a top-5 kicker and a bottom-5 kicker is maybe 3-5 points per season, not 3-5 wins. The sim's matchup model may overstate K value.

### Q2: Unmeasured depth slots (FB/P/DL5/WR4): near-zero vs Colors

VL/OR/VLOC set them near-zero. Beam/GPT/Groq/DS kept Colors values.

**My verdict:** Use near-zero for FB (1-10), moderate for P (50-100), moderate for DL5 (50-100), and low for WR4 (10-20).

**Football reason:**
- FB is nearly extinct.
- P matters, but less than the sim might suggest.
- DL5 is a situational player in a 4-3 base.
- WR4 is a depth player.

### Q3: WR1: 434-480

DS 480 is high; VL/VLOC/GPT 434 is low; Beam 450 and Groq 440 sit in between.

**My verdict:** WR1 should be ~440-450.

**Football reason:** The revealed impact says WR1 is worth 0.434 of QB. The market overpays WR1 relative to wins. I'd split the difference between pure revealed (434) and DS's blend (480), landing at 440-450.

### Q4: The secondary: engine vs market

Eight of nine filers followed the engine. The market pays far less.

**My verdict:** Follow the engine.

**Football reason:** In modern NFL, teams use 3+ WRs on 60-70% of snaps, so CB2/CB3 are on the field more than ever. The market underpays the secondary because it prioritizes CB1. The engine is right.

### Q5: CB1: 499-570

DS 499 is the low outlier; the other six are 568-570.

**My verdict:** CB1 should be ~568.

**Football reason:** The revealed impact says CB1 is worth 0.568 of QB. The market underpays CB1 relative to wins. I'd follow the engine.

—

## Final Recommendations

1. **K:** Set to 150 (compromise between VLOC's 30 and the other six's 200-285).
2. **Unmeasured depth slots:**
   - FB: 10 (near-zero)
   - P: 75 (moderate)
   - DL5: 75 (moderate)
   - WR4: 15 (low)
3. **WR1:** Set to 440 (split the difference between pure revealed 434 and DS's blend 480).
4. **The secondary:** Follow the engine (CB2 ~460, CB3 ~370, SS ~350, FS ~340).
5. **CB1:** Set to 568 (follow the engine).

—

**REPORTED:** All measurements from VLOC sweep (sha256 40233d6b), verified by Beam. Salaries from Over The Cap 2024 median tiers. Missing tiers (DT, S, P, RT/OT2, CB3) filled by Groq/OR's OTC "Contract Growth in 2024" pull.

**Ready for Owner/Architect review and MERGE-MANIFEST.md re-pin.**
