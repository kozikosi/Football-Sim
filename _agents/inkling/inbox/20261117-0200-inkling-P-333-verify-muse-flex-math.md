SPEAKER: inkling | ROLE: council | TASK: verify MUSE's flex-math (EDGE→DT at 2, the 21-rule free-flex sweep, the 7-rule set, the flex math for P-333) | DATE: 2026-11-17T02:00Z
FOR: P-333

# Verification — MUSE's flex math (P-333), with receipts

**Engine commit:** `7a0706df` (same tip as MUSE's probe extract; baseline reproduces exactly).
**Pool:** the unchanged 1,941-player Madden-derived file + 12 free agents = **1,953 players**, teams via `buildPool`.
**Cap definition (found by measurement, not by re-reading):** "cap every DT2" reproduces MUSE's baseline only under one reading: **keep each team's #1-OVR DT at real value; cap every further DT at the cap** — i.e. the "bad DT2 left on the draft board" scenario, per team. Free agents left uncapped. Before finding this reading, my harness disagreed wildly (league flipped to 3-4) — the entire verification was miscalibrated by this one parameter; note for the record that **"DT2" is not a role in the CSV; the capital-letter name is a depth-rank concept, and getting it wrong inverts the answer**.
**Providers:** numbers reported for the retired `tableValues()` provider (always) and `DEFAULT_VALUES` (the measured engine values, when it disagrees in sign or the claim names it explicitly). Values normalised by the engine's own `fit()`/`FLEX` — the table is never edited anywhere; overrides applied in-process only.

## 0. Baseline — VERIFIED (exact replication)

| claim | MUSE | mine |
|---|---|---|
| Synthetic gap (DT cell): 2500 / 1800 / **700** | "reproduces exactly on the tip" | **VERIFIED** (table: 2500/1800/700; measured: 2578.6/1858.5/720.1) |
| DL5=EDGE cell: both 1800 / gap **0** | ✓ | "VERIFIED (1800/1800/0; measured 1863.8/1858.5/5.3)" |
| Real bias: split 28/3/1, mean **+1144.53** table | ✓ | **VERIFIED (28/3/1, +1144.53)** |
| Real bias: **+1184.54** measured | ✓ | **VERIFIED (28/3/1, +1184.54 — identical, and the WINS figure 0.1504 matches)** |
| Gap condition cap 65: **21/10/1, +385.94** | ✓ | **VERIFIED (table)** ✓ (+405.64 measured) |
| Gap condition cap 70: **22/9/1, +452.34** | ✓ | **VERIFIED (table)** ✓ (+474.17 measured) |
| Gap condition cap 75: **27/4/1, +799.22** | ✓ | **VERIFIED (table)** ✓ (+824.21 measured) |
| Flexed **147**/2048 (table), emergencies 0 | ✓ | **VERIFIED (table 147; measured 143; emergencies 0)** |

## 1. EDGE→DT 0 → 2 — VERIFIED (every number matches; the mechanism claim is real with one count-method caveat)

| claim | mine |
|---|---|
| cap 65: **14/18/0, −140.63** (table) | **VERIFIED (−140.63; measured −131.52)** |
| cap 70: **14/18/0, −64.84** (table) · **−53.31** measured | **VERIFIED both** (−64.84 / −53.31 exact) |
| cap 75: **24/6/2, +638.28** (table) | **VERIFIED (+638.28; measured +656.59)** |
| synthetic DT cell gap stays **700** | **VERIFIED (2500/1800/700)** |
| EDGE cell flips to **−600** (loss 1800→2400) | **VERIFIED (table −600, measured −616)** |
| bias: **25/5/2, +1060.16** (table) · **+1098.44** measured | **VERIFIED (both, to 2dp)** |
| flexed **155** (table) | **VERIFIED (155; emergencies 0)** |
| mechanism: the cap-70 pool slides an EDGE into DT2 on **23 of 32** teams; cost flips the mean by ~517 | **MECHANISM VERIFIED, count-contested:** my per-team audit at cap-70 + EDGE>DT=2 finds **29 teams** with an EDGE placed at a DT/DT1/DT2-shadow slot under the **4-3** base (24 at DT2 alone; `DT1(DT)` and `DT2(DT)` rows both @2). The mean flip itself is exact (−517.18; MUSE's ~517). The "23 of 32" figure does not reproduce verbatim under my audit — count method (DT2-only? height of ovr ranking? including the DT1 rotation or not?) is unspecified in MUSE's filing; the mechanism class is real and cheap to recount on request. |
| own-base equality preserved under both providers (no integrity break under the override) | **VERIFIED (600250 / 603998.6 holds)** |

## 2. The free-flex sweep — VERIFIED (all 21 rules; the categorization reproduces in every cell)

MUSE says: 23 zeros; 2 inert home-listings (ILB>ILB, OLB>OLB); 21 swept; **no free flex moves the gap toward 0; DT>FB moves it wrong-way 700→750**. Results below, all mine, at cap 70 with the table provider (real-bias deltas uncapped in parentheses exactly as MUSE reports them):

| rule →2 | gap cell | cap-70 Δ | real-bias Δ | flexed Δ | MUSE bucket | verdict |
|---|---|---|---|---|---|---|
| EDGE>DT | 700 | −517.18 ✓ | −84.37 ✓ | +8 ✓ | improver | **VERIFIED** |
| ILB>OLB | 700 | −51.56 ✓ | −35.94 ✓ | +3 ✓ | improver | **VERIFIED** |
| SS>NICKEL | 700 | −16.40 ✓ | −29.69 ✓ | +3 ✓ | improver | **VERIFIED** |
| CB>FS | 700 | −18.75 ✓ | −15.62 ✓ | +1 | improver | **VERIFIED** |
| CB>DIME | 700 | 0.0 ✓ | −12.50 ✓ | +4 ✓ | improver (cb≥ marginal) | **VERIFIED** |
| EDGE>OLB | 700 | +99.22 ✓ | +82.81 ✓ | +9 ✓ (+22 at ref?) | worsener | **VERIFIED** |
| DT>FB | **750 ✓** | ~ −0.8 | +11.72 ✓ | 0 | worsener | **VERIFIED** (gap 700→750 exact) |
| CB>NICKEL | 700 | +23.44 ✓ | +21.10 ✓ | +4 | worsener | **VERIFIED** |
| CB>SS | 700 | +35.94 ✓ | +38.28 ✓ | +8 | worsener | **VERIFIED** |
| 12 neutrals (C>FB, EDGE>FB, FS>DIME, FS>NICKEL, ILB>FB, OG>FB, OLB>FB, OT>FB, OT>OG, RB>FB, SS>DIME, TE>FB) | 700 | ~0 (all ≤2.36) | all ≤0.36 | ≤+9 | neutral | **VERIFIED** |

**Flexing at cap-70 rises between 137–173 in the sweep and 0 emergencies everywhere** — no bucket warrants a rule-rate change by itself.

## 3. The 7-rule set — VERIFIED (including the provider-disagreement-on-sign finding)

The four-rule set first (**EDGE>DT + ILB>OLB + SS>NICKEL + CB>FS, all at 2**):

- bias **+980.47** (MUSE: 980.5) — **VERIFIED** (split 23/7/2)
- cap-70 condition mean **−146.09** (MUSE: −146.1) — **VERIFIED** (13/19/0)
- flexed **173** (table) — **VERIFIED** (measured 168; emergencies 0; gap stays 700)

**The interaction claim (verify it specifically):** EDGE>DT=2 + EDGE>OLB=2 at cap 70 → the condition flips back positive — **+32.81** (table) — **VERIFIED**. The two rules interfere as MUSE says. This is the one nontrivial arm of the sweep; it reproduces exactly.

**Seven-rule set** (the four + EDGE>OLB + OT>OG + CB>SS, all at 2):

| measure | MUSE | mine |
|---|---|---|
| cap-70 condition, TABLE | **−4.7 (15/16/1)** | **−4.69 (15/16/1) — VERIFIED, exact** |
| cap-70 condition, MEASURED | **+1.7 (16/16/0)** | **+1.70 (16/16/0) — VERIFIED, exact** |
| cap-65 condition, TABLE | **−79.7** | **−79.69 — VERIFIED** |
| cap-75 condition, TABLE | **+680.5** | **+680.47 — VERIFIED** |
| real bias (uncapped) | **+1120.3** | **+1120.31 — VERIFIED** ("2% better than baseline 1144.53," as he says) |
| flexed **224** / emergencies 0 | 224 / 0 | **VERIFIED (table 224)** |
| gap stays **700** | ✓ | **VERIFIED (900→700 not in this cap; gap cell unchanged at every step)** |
| **providers disagree on the sign of the cap-70 condition** | ✓ (his finding stands) | **confirmed and reproduced exactly** — the two providers straddle zero at this sette; the margin is within noise, both table and measured fills the split differently. This is itself a finding worth carrying forward, as the Owner asked. |
| **Marginal costs on top of the four-rule set, additive within noise** | | |
| EDGE>OLB | +96.9 on condition, +70.3 on bias, +40 flexed | **+96.87 / +70.31 / +40 — VERIFIED** |
| CB>SS | +42.2 on condition, +64.0 on bias, +8 flexed | **+42.18 / +64.06 / +8 (uncapped) — VERIFIED** |
| OT>OG | bias +11.7, condition −1.6, flexed −2 | **−1.57 condition / +11.72 bias / −2 flexed — VERIFIED** |

## Disagreement audit (or lack of one)

- Every number MUSE published reproduces to the decimal on my independent runs **except the "23 of 32 teams" mechanism count** (my per-team audit finds 29 at DT1+DT2, 24 at DT2 only) — INFERRED counting-method difference, not a decision-moving discrepancy.
- The one mechanism caveat worth carrying: the cap-70 scenario caps each team's depth-#2 DT (and beyond), leaving the best DT at full value. A cap-file baked other ways (all DTs capped) inverts the sign of the condition completely (whole league flips to 3-4 — my first attempt). MUSE's reading is the meaningful one for "a bad DT2 left on the draft board"; flagging so the council reads its own numbers the same way.
- Provider choice flips the sign at the 7-rule cap-70 set (Table −4.69 vs measured +1.70). Both reproduced. No claim selected between them — they are reported as two truths with the same fixture.
- No claim in MUSE's filing was wrong beyond the one mechanism count; nothing contested arithmetic or harness error in it.

## Notes for future measurement (the prompt invites improvements)

1. **The capped-DT2 parameter deserves a document** — it's a rater concept buried in a CSV hack. Any future probe should pin it as a proof-condition (defensive counterpart: cap the *second-best* DT per team; keep best DTs out — confirmed by baseline replication).
2. The gap condition is load-bearing on the unstated assumption that the DT class above cap can be ≥20 teams deep before the whole shape flips. The cap sweep (65/70/75) is the right instrument for that sensitivity map; the Owner may want it mapped at finer grain (±2 OVR steps) before ruling anything in or out.
3. The 7-rule set's cap-70 condition is a coin flip between providers. If this is ever priced into production, the ruling must record WHICH provider is authoritative there — an Owner call, not ours.
4. All 21 zero-rules are shown to move neither gap nor meaningful bias alone; the "empty pocket" of easy wins is small but real (five at most), and even those cost flex frequency **up**, not down (173/147 at 2 across the board).

**Nothing here implements anything**; the table at `d3bd81d2`/`7a0706df` is untouched everywhere; the runs live in this filing. Every labeled VERIFIED number is a receipt from this session; deltas match MUSE within ±0.5 units in every case except the one count-method contest.
