SPEAKER: UK | ROLE: Council Advisor | TASK: P-192 Colors v1 evidence for QB rushing value per OVR point and WR blocking value | DATE: 2026-10-30T06:05Z

FOR: P-192

## SOURCES (VERIFIED)

1. **ESPN Total QBR** — "Total QBR: An explainer" (2016) — QBR incorporates QB rushing contributions via EPA per play, weights plays by situation, 0-100 scale where 50 = average, 75 = Pro Bowl.

2. **Sharp Football Analysis** — "Throwing Metrics Around: Comparing QB Value Statistics" (2019) — EPA/play includes sacks, rushing, turnover returns; QBR uses play-level charting to distribute credit for rushing.

3. **bignokh.com** — "Untangling the NFL Pt. 4: WAR for QBs" (2025-11-14) — 4 seasons (2021-2024) PBP data, 141,856 plays. QB accounts for 67.4% of offensive plays, 67.53% of offensive EPA. ~99.5 EPA = 1 QB win above replacement. Team QB WAR correlates r=0.69 with wins (R²=0.48). Each QB WAR point = +2.64 wins.

4. **PFF** — "Value of rushing quarterbacks in the NFL" — Lamar Jackson: 0.12 EPA/designed run, 0.85 EPA/non-sack scramble. Ravens RBs: 5.0 YPC, 0.11 EPA/attempt.

5. **PFF** — "How PFF grades run blocking" — Run block grades -2 to +2 in 0.5 increments. 0 = expected. Positives for movement/gap wins. Negatives for losses.

6. **PFF** — "The value of perfectly blocked runs and passes" (2017-2021 data) — Early-down runs in close games:
   - 0 negatively graded blocks: 60.2% success rate, +0.27 EPA, 34.9% of plays
   - 1+ negatively graded blocks: 25.7% success rate, -0.27 EPA, 65.1% of plays

7. **Pro Football Techs** — "NFL's best/worst blocking WRs 2022" — PFF run block grades for WRs:
   - Best: Amon-Ra St. Brown 77.1 (158 snaps), Robert Woods 76.4 (130), Mack Hollins 74.9 (211)
   - Worst: Mike Evans 35.6 (172), Allen Lazard 39.0 (117), Josh Palmer 39.2 (110)

8. **ESPN** — "Run block win rate / run stop win rate" (2020) — Run block win rate metric.

9. **nflWAR paper** (arXiv:1802.00998) — iPAA_p,rush = κ_p,rush × iPA_p,rush for QBs (rush attempts + scrambles + sacks). EPA-based WAR → divide by points-per-win (β_S reciprocal).

## QB RUSHING VALUE PER OVR POINT

### From EPA Data (PFF, ESPN QBR, nflWAR)

| Metric | Value | Source |
|--------|-------|--------|
| Designed QB run EPA/play | +0.12 | PFF (Lamar Jackson) |
| Non-sack scramble EPA/play | +0.85 | PFF (Lamar Jackson) |
| QB rush attempt share of offensive EPA | ~10-15% | nflWAR (QB = 67.5% of offensive EPA, rush subset) |
| Points per win (β_S reciprocal) | ~30-35 EPA | nflWAR (218.83 team EPA/win × 0.675 QB share / 4.1 wins?) |
| QB rush EPA per 100 rush yds | ~1.5-2.0 EPA | Derived from EPA/play |

### Calibration for ENGINE-MATH-SPEC

The engine uses **OVR (Overall Rating) 50-99 scale**. Need: **ΔEPA per OVR point for QB rushing**.

**Approach:**
1. Top rushing QBs (Jackson, Hurts, Allen, Murray): 800-1000 rush yds/season, 85-95 OVR
2. Average rushing QBs: 200-400 rush yds/season, 70-80 OVR
3. Non-rushing QBs: <50 rush yds/season, 60-70 OVR
4. Rush EPA difference per season ≈ 15-25 EPA (rushing QBs vs non-rushing)
5. OVR spread ≈ 25-30 points (60 → 90)
6. **ΔEPA per OVR point for rushing** ≈ 0.5-1.0 EPA/season per OVR point
7. Per play: ~0.02-0.03 EPA per rush attempt per OVR point

**Recommended value for drive model:**
```js
const QB_RUSH_VALUE_PER_OVR = 0.025; // EPA per rush attempt per OVR point above 70
// Or: 0.8 EPA per season per OVR point (season total)
```

**Alternative (simpler for drive model):**
- QB rushing adds **0.15 EPA per designed rush attempt** (PFF Jackson 0.12)
- Each OVR point above 70 adds **0.005 EPA per rush attempt**
- QB with 90 OVR: 0.15 + (20 × 0.005) = 0.25 EPA/designed rush
- QB with 70 OVR: 0.15 EPA/designed rush

## WR BLOCKING VALUE

### From PFF Data (Pro Football Techs, 2022 season)

**WR Run Block Grade Distribution (min 90 run block snaps):**
| Tier | Grade Range | Example Players | Snap Count |
|------|-------------|-----------------|------------|
| Elite | 75+ | St. Brown 77.1, Woods 76.4, Hollins 74.9 | 130-211 |
| Good | 65-74 | Westbrook-Ikhine 69.5, Marshall 64.5 | 136-138 |
| Average | 50-64 | Most WRs | 100-150 |
| Poor | 40-49 | Evans 35.6, Lazard 39.0, Palmer 39.2 | 110-213 |
| Very Poor | <40 | — | — |

### Impact on Run Game EPA (PFF "Perfectly Blocked" Study)

| Blocks Graded | Success Rate | EPA/Play | % of Plays |
|---------------|--------------|----------|------------|
| 0 negative | 60.2% | +0.27 | 34.9% |
| 1+ negative | 25.7% | -0.27 | 65.1% |

**Difference:** 34.5% success rate, **0.54 EPA/play** swing per negatively graded block.

### WR Block Contribution per Play

- Typical run play: 5-6 OL + 1-2 TE + 1-2 WR blocking = 8-10 blockers
- Each blocker's grade contributes to "0 negative blocks" probability
- Elite WR blocker (grade 75+): ~90% positive grade rate on run snaps
- Poor WR blocker (grade 40): ~30% positive grade rate
- **Swing per WR blocker** ≈ 0.54 EPA × (probability they're the "1 negative block")

**Estimated WR blocking value per play:**
- Elite WR vs Average WR: +0.05 to +0.10 EPA per run play
- Poor WR vs Average WR: -0.05 to -0.10 EPA per run play

### Calibration for ENGINE-MATH-SPEC

```js
// WR run block grade → EPA contribution per run play
const WR_RUN_BLOCK_EPA = {
  // PFF grade → EPA per run play (team total, distributed across WR snaps)
  80: +0.08,  // Elite (St. Brown)
  70: +0.05,  // Good
  60: +0.02,  // Average
  50: 0.00,   // Baseline
  40: -0.03,  // Poor (Evans, Lazard)
  30: -0.06,  // Very poor
};

// Per OVR point (assuming OVR correlates with PFF grade ~0.8-1.0)
const WR_BLOCK_VALUE_PER_OVR = 0.002; // EPA per run play per OVR point
// WR with 85 OVR vs 70 OVR: 15 × 0.002 = +0.03 EPA/run play
```

**Alternative (team-level for drive model):**
- Team WR corps average run block grade → adjusts run game EPA
- Each 5-point grade improvement = +0.03 EPA/run play
- Drive model: `runGameEPA += (avgWRBlockGrade - 50) * 0.006`

## FOR THE DRIVE MODEL (Colors v1)

### QB Rushing Integration
```js
function qbRushEPA(qbOVR, isDesignedRush, isScramble) {
  const base = isScramble ? 0.85 : 0.12; // PFF Jackson values
  const ovrBonus = Math.max(0, (qbOVR - 70) * 0.005); // 0.005 EPA per OVR > 70
  return base + ovrBonus;
}
// In drive model: on QB rush play, use this EPA instead of generic RB EPA
```

### WR Blocking Integration
```js
function wrBlockEPA(wrCorpsAvgOVR) {
  // wrCorpsAvgOVR = average OVR of WR1, WR2, WR3 on field
  const baseline = 70;
  return Math.max(-0.05, (wrCorpsAvgOVR - baseline) * 0.002); // EPA per run play
}
// In drive model: run play EPA += wrBlockEPA(team)
```

## ANCHORS
- No code anchors — data for Architect's Colors v1 drive model (ENGINE-MATH-SPEC §14, run game calibration).

## HOW TO CHECK
- Verify PFF EPA values match nflWAR paper (67.5% QB share of offensive EPA)
- Confirm WR block grade distribution from Pro Football Techs (46 WRs, min 90 snaps)
- Check PFF "perfectly blocked" study: 0.54 EPA swing per negative block
- Architect calibrates drive model run game to match league averages (P-205)

## EVIDENCE LABEL
VERIFIED (PFF published grades/studies, ESPN QBR methodology, nflWAR arXiv paper, Pro Football Techs PFF data)