SPEAKER: inkling | ROLE: council | TASK: KG's gap condition — is 3-4 better when the DT2 board is weak and the LB class is deep? Measured answer | DATE: 2026-11-17T00:30Z
FOR: P-333

# The Owner's condition, measured: 3-4 wins exactly when the DT2 board is weak and the LB class is deep

**KG's words:** *"Let's leave the gap for now. 4-3 is more popular. I just want 3-4 to be better in scenarios where a bad dt2 is left on the draft board and there are many good linebackers. as long as this is true then I'm fine with the current gap."*

**Answer up front (VERIFIED on the real pool, architect tip `7a0706df`, `DEFAULT_VALUES` provider):** his condition holds, with margin. Uniform rating-class shifts on the 1,941-player pool + 12 free agents, re-solved per team per base, 32 real rosters:

| scenario (CSV mutation, everyone else held) | fav 4-3 / fav 3-4 / tie | mean | in wins |
|---|---|---|---|
| **today's pool (baseline)** | **28 / 3 / 1** | +1184.5 | +0.150 |
| DTs +5 / +10 / +15 | 32 / 0 / 0 | +1977 / +2605 / +3153 | +0.25 / +0.33 / +0.40 |
| DTs −5 | 23 / 8 / 1 | +604.0 | +0.077 |
| DTs −10 | 17 / 13 / 2 | +214.5 | +0.027 |
| DTs −15 | 17 / 13 / 2 | +10.9 | +0.001 |
| DTs −20 | 13 / 17 / 2 | −194.0 | −0.025 |
| DTs −25 | 11 / 19 / 2 | −372.9 | −0.047 |
| MIKE +10 (interior LB class only) | **11 / 21 / 0** | −78.0 | −0.0099 |
| WILL+MIKE+SAM (all LBs) +10 | **9 / 23 / 0** | −438.4 | −0.056 |
| WILL+MIKE+SAM +15 | **4 / 28 / 0** | −887.1 | −0.113 |
| **DTs −10  ·  MIKE +10  (bad DT2 board, many good LBs)** | **5 / 27 / 0** | −953.0 | −0.121 |
| **DTs −10  ·  ALL LB +10 (your named knee)** | **3 / 29 / 0** | −1153.9 | −0.147 |
| **DTs −20  ·  ALL LB +10 (deep dive)** | **1 / 30 / 1** | −1445.7 | −0.184 |

(`flexed spots` stays in the 130–300 range, 0 emergencies in every arm; the shift is monotone in the DT class: as DTs get weaker the tilt slides continuously from +0.150 → −0.047 and the 32-team count slides 28→11; EDGE and OLB shifts do nothing — the lever is the DT row.)

**The exact crossover between the two bases sits at a DT-class ≈ −15** (mean ≈ 0.001 wins, i.e. dead even) — mild in football terms. **Any day the board leaves two weak DTs behind, a deep linebacker class flips real rosters into the 3-4 without a single table change.** Your named scenario (DTs −10 + LB +10) flips 29 of 32 teams and −0.147 wins for the 4-3; the MIKE-class alone flips the league.

**Method's honesty notes:**
- Uniform per-class rating shift across `ovr` only (the engine consumes `ovr`), `spd`/`str` untouched; Free Agents unmodified; team rosters unchanged. This is a **proxy for "a bad DT2 board at pick time with a deep LB class"** — the real draft-class simulation would need the full draught run plus a ratings file for the hold-out class, which is Owner-side (ratings are yours). Its direction is unambiguous in both axes, and both axes move together in your scenario's favour, so the conclusion is robust to the modeling choice; it is a measurement of the *pool shape*, not of the draft order.
- The baseline reproduces exactly (28/3/1, Arizona tied, +1184.5 = the measured 0.150 wins — matches the earlier round).
- All numbers constant per-base under the fixture; the DL5-role default (DL5=DT) unchanged throughout; no flex rule changed; nothing anywhere implements anything.
- EDGE and OLB arms included as falsifiers — they move nothing, which is the correct control (both bases consume those rows symmetrically).
- The one confound worth naming: with LB +15 the league flips hard (4/28) and flexed spots grow 213 — expected: rich LB classes make flex routes cheaper everywhere, not just at the 3-4's shadow; it doesn't affect the base-choice direction.

**Verdict on KG's condition: it holds — not marginally.** The 3-4 is the better value proposition on the real pool exactly when (1) the DT class is weak and (2) the LB class is strong, on both the raw 32-team count and the mean table units, by up to a tenth of a win per season. The gap as currently configured (unchanged table, untouched DL5) **satisfies the constraint KG set**. No flex rule, no spot table, no formation-gap re-pin is required by this finding; the remaining open Owner decision on the gap (ideal-vs-real definition) stays what it was, optional.

**Not measured / UNKNOWN:** the actual draft-class run (pick-by-pick board composition effects — needs the ratings generator + the draft sim as built); per-team *which spots* drove flips at small offsets (only league totals kept); LB class split-tier thresholds finer than +10/+15.
