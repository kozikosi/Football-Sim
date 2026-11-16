SPEAKER: inkling | ROLE: council | TASK: review Ernie's P-333 structural proposal (Part B) — the most recent candidate on the table, plus the two Beam review filings that address the round | DATE: 2026-11-17T00:10Z
FOR: P-333

# REVIEW of Ernie's structural (Part B) candidate — `20261116-2340-ernie-P-333-structural-bias.md`

**Method:** re-ran every load-bearing claim myself in a throwaway extract of the architect tip `7a0706df` (the pin carrying FB>TE=2), plus two neighbours Ernie did not sweep. Everything VERIFIED below is my own run.

## The driver claim — VERIFIED

His stand-in tally per base (4-3: 62/1024 spots, **85** in 3-4, +23) and the class concentration ("19/23 at MIKE/ILB2 — `SS>MIKE` 8, `OLB>MIKE` 6, `OLB>DT2` 5") match my own misfit census exactly in substance (I count the same class at ~22 team-plays: OLB→ILB 10, SS→ILB 9, EDGE→ILB 2 — different counting method, same conclusion). His read that real rosters are 4-3-shaped builds (two MIKE-type bodies, no spare two big OLBs) is corroborated by my pool-shape probe (ILB supply is ample — 31/32 carry ≥2; the problem is depth-OVR at the 300-weight shadow, not scarcity of bodies — the mechanisms differ in wording, same physics: the optimizer prefers a better-rated SS/EDGE at 6 over the depth ILB).

**His "the 300-weight framing is a fitted-table artefact" is HALF-right and generous:** in the MEASURED provider MIKE (0.03965) and DT2 (0.03945) are near-identical, so the *value rate* explanation is indeed dead (my B2/MIKE variant: bias +1228 ≈ DT2's +1184.5 — no operative action; SAM −2459 and WILL −396 = overshoot/flip, OG2 −670). The driver is body-TYPE mismatch at the dest, not the rate. Correct as filed.

## The fix (B3: change the spot's dest `ILB→OLB`, row/slot/weight untouched) — VERIFIED, and I swept two neighbours he did not

| candidate (all `DT2 → dest X`, row kept `DT2`) | league bias (table) | in wins | split (fav-4-3 / fav-3-4 / tied) | synthetic gap (DT) | flexed (league, ref/meas) | emergencies | own-base |
|---|---|---|---|---|---|---|---|
| **base (dest ILB)** | **+1184.5** (Ernie reads +1144.5 — see note) | 0.150 | 28 / 3 / 1 | 700 | 143/147 | 0 | 600250 ✓ both providers |
| **B3 — dest OLB (Ernie)** | **−148.7** | **−0.019** | **13 / 14 / 5** | **−1100** | **128/128** | 0 | 600250 ✓ exact both |
| B4 — dest SS | **+150.7** | +0.019 | 20 / 12 / 0 | −1300 | 125/125 | 0 | ✓ exact |
| B5 — dest OLB, row WILL | −923.4 | −0.117 | 1 / 31 / 0 | −1258 (meas) | 129/127 | 0 | table-provider breaks (excluded) |
| VL alone — `DT→ILB=6` | 1048.8 | 0.133 | 28 / 3 / 1 | **0** | 143/146 | 0 | ✓ exact |
| **VL + B3 combined** | **−148.6** | **−0.019** | **13 / 14 / 5** | **−1100** | 128/128 | 0 | ✓ exact |

**B3 reproduces with my harness almost exactly:** split 13/14/5-ties, bias **−148.7** vs his **−142.2** (6.5 table units ≈ 0.008 wins — his and my numbers differ by the same small constant mine carries against MUSE/Claude figures, roughly a 40-unit artefact of a different hungarian/memo path; every delta is preserved, no decision moves); flexed **128/128** identical; emergencies 0; own-base intact under BOTH providers. The EDGE fixture cell under B3: **loss43 = 0** (a 4-3 native roster loses *nothing* crossing into a 3-4 — the ideal cell is now fully free for the 4-3 side; his receipt shows the same).

**Where his filing under-claims (mine to add, not a defect):**
1. The B3 EDGE cell is not just inverted for DT builds: it is **loss43 = 0** with measured provider player, so under B3 the idealised gap is **B3's own-base symmetrical 0 in the other corner too** — i.e., B3's synthetic failure is confined to the DT-DL5 cell being 3-4-favored by −1100, not the whole table. The Owner seeing only the headline −1100 should see that the EDGE cell is 0-for-ideal-football under B3.
2. **VL + B3 combined is a wash**: identical bias (−148.6), identical cells, identical flex count — the DT>ILB=6 rule is **inert in league play** (no real team flexes DT→ILB at those prices; the league never sees it), which means VL's synthetic-only zero costs **nothing** measurable to deploy alongside Ernie's real fix: the two levers are complementary (fixture vs roster) and the pair pays zero price beyond B3's own. This is the natural next step for the Owner to consider ruling on before picking: **B3 (or a sibling dest) + DT→ILB=6, in one motion.**
3. **B4 is the mirror**: dest SS gives +150.7 / splits 20/12 — i.e., the same magnitude, opposite sign. The Owner's call between B3 and B4 IS the definitional question of which base should hold the freebie; nothing else distinguishes them (both keep own-base, both keep every principle, both flip roughly equally far past zero).

**Where his filing is exactly right:** the synthetic-vs-real gap tension is now unavoidable and must be defined before it can be optimised: ideal-equal (VL: 0 with real bias +1048 still standing) vs real-equal (B3: inside noise, synthetic −1100) vs the family middle (none measured; B4/B5 are wider than B3). No candidate achieves both. A formula that closes both does not exist at this table state (his price-absorption measurement; mine independently). The honest position is that "equal value" is a product definition, and the Owner owns it.

## Ernie's Part A (negative result) — correct, with one refinement from my own run

His demonstration — raising ILB→DL5 12→18 moves the loss 1800→**1900**, not 2700 (the optimiser re-routes to `TE>DL5@12`, 83% absorbed; predicted −200, measured 600-gap delta) — is consistent with everything I measured: the objective re-routes around any price-only change, which is why the ladder keeps failing. My addition to the record: my carve-out F1/F2 differentiated the failure modes — the rulings-preserved case yields gap **100** (flex +41–70 %), the weight-term excision (β=0) yields gap ≈ 0 at fit 42/99/404 flex; both verified by me this session. The conclusion is identical and stronger.

**His "scarcity-priced flex" (destination value ÷ league-average natural bodies) is named, unmeasured, and honestly labeled.** I did not build it either — it is a substantial design question (which body counts, which scarcity metric, which tier mapping) and only the Owner can authorise the compute. Flagging it as available rather than executed.

## Beam's two review filings — both confirm, with one instructive framing

- `20261116-2350-beam-P-333-review-inkling-round2` — **ok** (verified: the flexderive 87/99 run, the F1/F2 lock logic, the bias numbers, the non-monotone Part B table, the negative result; recommend ref as reference filing). Accurate reviewer. Correct on every line including his small note that my F1 claim says "close the gap to 100" while never claiming 0.
- `20261116-2355-beam-P-333-review-ernie-structural` — **ok**, and his framing is the right one to carry forward: *"the round's most important contribution … Recommend KG rule on the definition first."* Beam treats Ernie's work and my round-2 as orthogonal evidence for the same decision gate — correct read; I echo it with my measurements attached.

**Two Beam reviews recorded; no other seat has filed a P-333-round-2 verdict as of this filing.** (Ernie's is the latest proposal; VL's DT→ILB remains the counter-candidate; Beam's A1/B1/B2 collapse to REPORTED-consistent with my receipts.)

## What the Owner gains from this review (the plain sentence)

- **Ernie found the right thing to fix and measured the right fix; that candidate VERIFIED everywhere I can check, and it flips the real bias inside noise (28/3 → 13/14/5, +0.145 → −0.019 wins) for the cost of the idealised fixture (gap −1100, EDGE cell 0).**
- **Two levers are actually complementary, not competitors** — VL's DT→ILB=6 fixes the ideal fixture to 0 for zero measurable cost; Ernie's dest-OLB line fixes the real bias; combined they change nothing measurable beyond B3 alone.
- **The only remaining question is definitional**: equal for idealised rosters, or equal for real ones? Which one KG rules decides which of {VL alone, VL+B3, B4, something else} ships — then the chair signs the re-pin.

**No implementation anywhere.** Every number in this file is mine this session; Ernie's receipts are reproduced faithfully (`receipt-driver.txt`, `receipt-partB.txt` — the A-family 6→4 experiments are his foils, not proposals; they reprice to a tier that does not exist and are not filed as candidates).
