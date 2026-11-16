# P333-CANDIDATE-LADDER.md — the P-333 candidate ladder, run on the REAL pool (Rev 9 Part A)

Seat: Z.ai · 2026-11-16 · engine pin **d3bd81d2** (vendored byte-identical, read-only — candidates
swap only the FLEX literal through the engine's own `fit()`; nothing else is touched). The measurement
protocol is the Architect's own `formation-gap.test.ts` (DL5 pinned, both cells reported). Harness:
`scripts/p333-validate.mjs` (validates the harness against every pinned premise, exit 0) and
`scripts/p333-ladder.mjs` (the ladder). Receipts: `receipts/p333-validate.txt`,
`receipts/p333-ladder-run.txt`, `receipts/p333-keypairs.txt`.

## The derivation (P-333 Q1, the Owner's direction)

`price_raw(role → dest) = ALPHA · d̂ + BETA · ŵ` fitted to the live 99-rule table by least squares
(tier midpoints 0/2/6/12 as targets):

- **ALPHA = 5.48** on the athletic term — d̂ = normalized distance between the two roles' **real pool
  centroids** (mean spd/str over all 1,953 players; NICKEL/DIME → CB, DL5 → DT per the pinned protocol);
  max raw distance 22.6 normalized to 1.
- **BETA = 12.46** per 1,000 weight — ŵ = destination weight (max slot weight at that dest, QB-normalized).
- The tier cut maps price_raw onto the Owner's tiers 0/2/6/12; the floor dimension applies the
  Owner's cross-side floor ruling (cross-side < 6 → 6, **except INTO FB** — the FB exception).
- Candidates: 4 tier cuts × 2 floors = 8, + the derived table with FB→TE 6→2, + an **ability-only**
  variant (BETA = 0 — the council's "the objective already prices the weight" critique), + the
  **Owner-approved single rule** (LIVE + FB→TE 6→2) = **12 rows** (LIVE baseline + 11 candidates).

## The ladder (six axes per row; everything measured, nothing inferred)

Real pool = `buildPool(madden27-ratings.csv + free-agents-old-ratings.csv + player-ids.csv)` =
**1,953 players** (asserted in the harness). Flexed/emergency counts = 32 real NFL teams × both bases.
"Rules" = listed pairs priced > 0 (the live table: 99 listed, 76 nonzero — 23@12, 43@6, 10@2, 23@0).

| candidate | gap table (T) | gap measured (M) | flexed spots (real pool) | emerg (real pool) | oop native (cross 4-3/3-4) | worst absurd USED | fit vs live (exact/off1/hard) | rules |
|---|---|---|---|---|---|---|---|---|
| **LIVE (shipped)** | **+900** | **+914.5** | **145** | 0 | 3 / 1 (own: 0) | SS>OLB@2 (×6) | 99/0/0 | 76 |
| floor0-C1(0.5,4,9) | −650 | −689.3 | 413 | 0 | 6 / 3 | DT>FB@2 | 42/50/7 | 99 |
| floor6-C1(0.5,4,9) | −250 | −275.2 | 386 | 0 | 6 / 3 | DT>FB@2 | 48/38/13 | 99 |
| floor0-C2(1,4,9) | −650 | −689.3 | 334 | 0 | 5 / 2 | DT>FB@2 | 44/48/7 | 97 |
| floor6-C2(1,4,9) | −250 | −275.2 | 360 | 0 | 6 / 3 | DT>FB@2 | 49/37/13 | 98 |
| floor0-C3(0.5,3,9) | +450 | +444.7 | 347 | 0 | 5 / 3 | RB>FB@2 | 44/45/10 | 99 |
| floor6-C3(0.5,3,9) | +450 | +444.7 | 339 | 0 | 5 / 3 | RB>FB@2 | 47/36/16 | 99 |
| floor0-C4(1,3,8) | +450 | +444.7 | 245 | 0 | 4 / 2 | RB>FB@2 | 48/41/10 | 97 |
| floor6-C4(1,3,8) | +450 | +444.7 | 296 | 0 | 5 / 3 | RB>FB@2 | 50/33/16 | 98 |
| floor6-C1 + FBTE2 (derived) | −450 | −469.6 | 402 | 0 | 6 / 3 | DT>FB@2 | 47/39/13 | 99 |
| ability-only-floor6-C1 (β=0) | **−50** | **−63.0** | 404 | 0 | 5 / 3 | OLB>FB@2 | 42/42/15 | 93 |
| **LIVE + FB→TE 6→2 (Owner-approved)** | **+700** | **+720.1** | **147** | 0 | 3 / 1 | SS>OLB@2 (×6) | 98/1/0 | 76 |

Premises reproduced before any candidate ran (p333-validate.mjs, exit 0): own-base 600250; 4-3 roster
loses 2700 in 3-4, 3-4 roster loses 1800 in 4-3, gap 900 (table provider); **gap 914.5 measured
(2773.0 − 1858.5, matching Claude's P-342 report)**; EDGE cell 0 table / 5.3 measured (reported, inside
the Architect's 32-unit base-to-base allowance); value scale **98,932 single-spot / 854,227
whole-lineup** (measured provider, max OVR 99).

## The falsifier findings (why the answer is NO)

1. **The formula cannot reproduce the Owner's hand-set judgment.** The protected pairs come out far
   below their ruled prices: TE>DIME formula 4.76 vs **ruled 12**, ILB>DIME 4.17, OLB>DIME 4.09 —
   every cut that fits the rest of the table lands the DIME trio at 6, **violating the Owner's ruling
   that they stay at −12**. The FB exception fails too: DT>FB formula 3.50 (→ tier 2) vs **ruled 0**;
   OT>FB 4.22 (→ 6) vs ruled 0. SS>OLB 4.04 (→ 6) vs live 2. The live table is not a smooth function
   of (distance, weight) — it encodes football judgment the two-term formula does not carry.
2. **Best fit is 50/99 exact** (floor6-C4); the rest are 42–49. Over half the Owner's table is a
   "miss" under the derivation, and the misses concentrate exactly on the pairs the Owner has ruled on.
3. **Flex discipline collapses.** The live table flexes **145 spots** across the 32 real teams; every
   candidate flexes 245–413 (1.7–2.8×) — and the added flexing buys nothing (emergencies stay 0
   everywhere; the real pool never needs an emergency fill on any candidate).
4. **The gap "improvements" are sign flips, not better balance.** C1/C2 flip the asymmetry
   (+900 → −250/−650): the 3-4 roster's DL5←ILB stand-in cost stays 1800 while the 4-3 roster's
   cross loss shrinks — the optimizer re-arranges under cheaper cross prices, not better ones.
   C3/C4 halve it (+450) while more than doubling flexing. Nothing approaches zero without breaking
   the fit.
5. **The honest innovation: the weight term IS most of the asymmetry.** The ability-only variant
   (β = 0 — the council's own critique) nearly zeroes the gap (**−50 table / −63.0 measured**) — the
   formation gap is largely the destination-weight term double-pricing value. But it fails every other
   axis (fit 42/99, 404 flexed spots, 93 rules — it loses the DIME-tier rules entirely) and it departs
   from the Owner's stated direction. Filed as evidence for the derivation debate, not as a candidate.

## The one-page recommendation

**Ship nothing from the ladder. The live 99-rule table stands.** Every derived candidate is worse
than the live table on the Owner's own axes, and every one violates at least one Owner ruling
(DIME trio at −12, the FB exception, or the cross-side floor). A negative result is a legitimate
deliverable: the two-term derivation (destination weight + athletic distance), fitted to the
Owner's table at ALPHA 5.48 / BETA 12.46, prices the DIME trio at 4.1–4.8 (→ tier 6) and the FB
exception at 2–6 (→ nonzero) — the table's severity on those pairs is judgment, not distance.

**The one actionable point on the ladder is the Owner's already-approved rule: FB→TE 6→2.** Measured
here on the real pool against the live table, it costs: **gap 900 → 700 (table) / 914.5 → 720.1
(measured)** — the 4-3 roster's cross loss drops 2700 → 2500, the 3-4's stays 1800; **+2 flexed spots**
(145 → 147 across 64 team-bases); the worst used absurd pair is **unchanged** (SS>OLB@2, ×6); FB>TE@2
is used 16× (FBs genuinely fill TE spots at the cheaper price); 98/99 rules unchanged. **Recommend
shipping it as ruled** — it narrows the gap ~22% (exactly the direction the Owner wants) at
negligible cost, and it is the only candidate on the ladder that touches no other ruling. Claude
implements it (per the P-333 prompt); the implementation should re-pin the formation-gap test values
in the same commit (2700 → 2500, gap 900 → 700; measured 2773.0 → 2573.0-ish, 914.5 → 720.1 — re-run,
do not copy).

**If the Owner still wants a derived table** (Q1 remains open), the ladder's evidence says: derive the
price from **ability distance only** (β = 0 nearly zeroes the gap), keep the Owner's judgment tiers for
the DIME trio / FB exception / QB rule as explicit overrides, and re-fit — but that is a new round of
measurement, not this ladder's recommendation.
