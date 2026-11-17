SPEAKER: inkling | ROLE: council | TASK: KG — "make edge to dt 2 and retest" | DATE: 2026-11-17T00:50Z
FOR: P-333

# EDGE ↔ DT priced at 2 — measured (three readings of one sentence; nothing landed)

**Reading:** the live table has `EDGE>DT: 0` (natural) and `DT>EDGE: 6`. "Make edge to dt 2" most plausibly means `EDGE>DT: 0→2`; the two neighbors measured for completeness. All arms measured in a throwaway extract of the live architect tip `7a0706df` (FB>TE=2 already in place); live table untouched; the engine/Architect owns the change.

| arm (flex.ts edit in the throwaway) | fixture gap (table / measured) DT cell | EDGE cell | league split | mean | flexed | emergencies |
|---|---|---|---|---|---|---|
| baseline | 700 / 720.1 | 0 / 5.3 | 28/3/1 | +1184.5 (+0.150) | 143/147 | 0 |
| **A1 — EDGE>DT 0→2** (literal) | **700 / 720.1** (unchanged) | **−600 / −616** | **25/6/1** | **+1098.4** (+0.140) | 153/155 | 0 |
| A2 — DT>EDGE 6→2 | **600 / 627.6** | 0 / 5.3 | 28/3/1 | +1058.5 (+0.134) | 160/162 | 0 |
| A3 — both → 2 | **600 / 627.6** | **−600 / −616** | **25/6/1** | **+945.0** (+0.120) | 165/165 | 0 |

Own-base equality holds in all arms under both providers.

**KG-condition arms (your weak-DT / deep-LB knee), A1 and A3:**
- DT class −10: baseline 17/13/2 (+0.027) → **14/17/1 (−0.027)**; named knee (DTs −10 + LB+10): 3/29 unchanged count, mean **−1634.6 (−0.208)** vs baseline −1154 (−0.147) — the flip deepens.
- A2 leaves the KG-condition arms exactly where they were (named knee −1154.0).

**Read-through:**
- **A1 (literal)** moves only the EDGE-corner fixture (gap flips to −600/−616: a 3-4 DL5-built roster now loses ~600 in 4-3 — the DT2/300-weight leg is priced at 2) and barely dents the league tilt (+1184 → +1098, one team flips). **It does not shrink the synthetic DT corner at all.**
- **A2** buys the DT-corner −100 gap shrink (700→600) at +17 league flexed spots; league flat.
- **A3** combines both — DT corner −100, league tilt −240, deepest KG-knee flip; the EDGE-corner fixture flips to 3-4-favored by ~616.
- In all three, the *shape* of the ownership condition you set is strengthened, not weakened — the 3-4 gains everywhere it was winning already.

Measured now-certain addition to the record: under A1 and A3, the KG-condition cells get strictly better for the 3-4.

**Not done:** per-team who-flips under A1/A3 (only league totals); `bad.length` arbitrage recount under the arms; full sweep re-run — not asked for; nothing applied anywhere.

**If KG wants this in the live table,** it is the Architect's to apply with the flex ruling (protected constant, cite the approval) + re-pin `formation-gap.test.ts` in the same commit — currently it pins 2500/1800/700 and would flip with the arm chosen. My recommendation to the Owner: read A1 first (it moves the least), and if the EDGE-corner flip to −616 is acceptable, A3 is the one with the largest measured effect on your condition; if you meant something else entirely, say the word and I re-measure.
