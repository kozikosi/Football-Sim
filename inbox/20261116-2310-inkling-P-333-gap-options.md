SPEAKER: inkling | ROLE: council | TASK: propose options to close the 4-3/3-4 formation gap (do not pick) | DATE: 2026-11-16T23:10Z
FOR: P-333

# Cakepanz round — options to close the 4-3/3-4 formation gap, measured (FOR: P-333)

**Frame noted:** the 99-rule table is a guideline, not a constraint (the v4 prompt's direction), so no option below is rejected for deviating from the table. All options change **flex prices only**; none touches the sim, the optimizer, the slot weights, or the DL5 definition. **Nothing here is implemented or landed** — the live table is unchanged at DIME trio 12. KG picks; no code moves until he does.

**Method (every number below is mine, VERIFIED):** a throwaway extract of `7a0706df` (`git archive`); candidate tables edited only in that throwaway; fixture cells computed with synthetic 70-OVR native rosters through `lineupFor(...)`; league measurement across the **real 32 rosters** from the 1,941-player CSV scored in both bases under the MEASURED provider (`DEFAULT_VALUES`) and under the retired `tableValues()` (reference). Commands at the bottom.

## Baseline (today's live table, at `d3bd81d2` = `7a0706df`)

| cell | table | measured |
|---|---|---|
| 4-3 roster → 3-4, DL5=DT | misfits: TE3<-FB @2 (100) · DT2<-OLB/SS @6 (1800) · SAM<-TE @6 (600) = **2500** | DT2<-SS, DIME-free pass → **2578.6** |
| 3-4 roster → 4-3 | DL5<-ILB @12 = **1800** | **1858.5** |
| **Gap (DL5=DT)** | **700** | **720.1** |
| 4-3 roster → 3-4, DL5=EDGE | DT2<-EDGE @6 = **1800** | **1863.8** |
| 3-4 roster → 4-3 | DL5<-ILB @12 = **1800** | **1858.5** |
| **Gap (DL5=EDGE)** | **0** | **5.3** |
| League flex count, 32 teams × 2 bases | 147 | **143** (≈ the prompt's "145"; my number under the live provider) |
| Emergency fills | 0 | 0 |

## Option 1 — the DIME trio at 6 (i.e., land Option B as approved on 2026-11-10)

Rules changed: `TE>DIME 12→6 · ILB>DIME 12→6 · OLB>DIME 12→6`. Nothing else. 99 rules kept; tiers {0:23, 2:11, 6:45, 12:20}; the pinned formation-gap test re-pins to 2200 in the same commit (its own comment already expects exactly this re-pin).

| | DL5=DT | DL5=EDGE | league flex (meas/ref) | emergencies |
|---|---|---|---|---|
| Gap, table | **400** | 0 | 143 / 147 (unchanged) | 0 |
| Gap, measured | **413.1** | 5.3 | — | 0 |

The TE re-routes from SAM (6×100) to DIME (6×50). **Keeps:** the cross-side floor (WR>DIME 6), the FB exception, QB>FS 12, TE>FS/ILB>FS/OLB>FS 12, DT/EDGE→DL5 0, the SAM dest mirror. **Changes:** the DIME trio (item 3's ruling) 12→6 — the low-weight principle governs now, DIME is 50. Flex frequency unchanged (it re-prices the route, doesn't open a free one). This is the option the Owner approved six days before the v4 prompt re-opened the question; this filing re-measures it rather than trusts the projection, and confirms MUSE's projection exactly (2200 / 400).

## Option 2 — the DIME trio at 2 (one tier deeper)

Rules changed: same three, `→2` instead of `→6`. 99 rules; tiers {0:23, 2:14, 6:42, 12:20}.

| | DL5=DT | DL5=EDGE | league flex (meas/ref) | emergencies |
|---|---|---|---|---|
| Gap, table | **200** | 0 | 144 / 148 (+1 spot) | 0 |
| Gap, measured | **206.0** | 5.3 | — | 0 |

The TE still re-routes to DIME (2×50=100). It does not open a meaningful new flex wave (+1 league-wide) but halves the residual. **Keeps:** floor, FB exception, all FS/DIME-of-record rulings otherwise; only the trio's tier changes. The seam vs Option 1 is small (200 vs 400) — KG is choosing between "approved rule, residual 400" and "one more step, residual 200", not between radically different worlds.

## Option 3 — close all the way to zero (TE and FB free at the 50-weight slots)

Rules changed: `TE>DIME 12→0 · ILB>DIME 12→2 · OLB>DIME 12→2 · FB>TE 2→0`. 99 rules; tiers {0:25, 2:12, 6:42, 12:20}. The WR floor (WR>DIME 6) still stands — WRs pay for the dime slot; TEs and FBs stop paying.

| | DL5=DT | DL5=EDGE | league flex (meas/ref) | emergencies |
|---|---|---|---|---|
| Gap, table | **0** | 0 | **126 / 132** (−17 measured) | 0 |
| Gap, measured | **5.3** | 5.3 | — | 0 |

The fixture retains ONLY the DT2<-SS @6 stand-in; `equal.own-base` reproduces exactly in both bases. **The counterintuitive measured result: flexing frequency goes DOWN, not up** — free routes (TE→DIME, FB→TE) dominate any priced route, so 17 fewer spots are flexed across the league. Whether "TE and FB are free at the 50-weight slots" is acceptable football is the ruling KG is actually making; the WR floor is deliberately untouched so a WR still pays 6 — the asymmetry is TE/FB vs WR, i.e., the Owner's TE>WR pecking order made mechanical. **Keeps:** WR floor, the DIME trio (re-tiered, still present — ILB/OLB at 2, TE free), FS rulings, QB>FS 12, IC-rules, SAM mirror. **Changes:** FB>TE to 0 (this re-opens the 15-Nov FB>TE 6→2 ruling — FB>TE at 0 is the FB exception applied to its own ruling; and TE>DIME to 0, item 3's rule voided). Both are football calls, not arithmetic calls; both are named for what they are, not laundered into "cleanup".

## Option 4 (named, deliberately NOT measured to a verdict) — the constrained derivation

Ernie's ladder (destination-weight + athletic-distance fit to the 99 rules): best fit **50/99 exact**; DIME trio priced **4–5**; flex rate roughly doubles (145 → 245–413 across 32×2); **the gap flips sign** (+900 → −250/−650 — the 3-4 becomes the penalized base) — labeled **REPORTED, not re-run by me**. A derivation fitted **subject to constraints** (gap ∈ [0, 100], DIME kept, floor kept, FB kept, per-pair DIME ≥ 2) has **UNKNOWN** yield until the refit runs — it is a commission, not a measurement, and it is the only option that could price every pair principledly if the Owner wants the derivation direction. No false precision offered.

## What every option leaves standing

Cross-side floor (WR→CB/SS/FS/NICKEL/DIME at 6) · QB→FS 12 · QB→nothing-else · TE>FS/ILB>FS/OLB>FS 12 · DT/EDGE→DL5 0 · SAM dest-OLB mirror · the emergency −8 fallback and QB legality · `EMERGENCY_PENALTY` and the optimizer's scale-free priorities (now derived, `priorities()`) · the 99-rule count. In **every** cell of every option the DL5=EDGE fixture is unaffected and the two DL5 cells become equal in value.

## Facts KG can use to pick

- The **DL5 ambiguity is the load-bearing fact**: with DL5=EDGE the gap is ~0 at every option, including today. Whichever option is picked, it is buying ~0.09 wins of symmetry on the DT-at-DL5 corner — the fixture must say which it is, always (pinned by `formation-gap.test.ts`, which now reports, not pins, the measured numbers).
- Option 1 = approved already; Option 2 = Option 1 + one tier; Option 3 = the only zero, at the cost of unwinding two of the Owner's own rulings (FB>TE 2→0, TE>DIME free).
- **Flex frequency moved less than I expected in Options 1–2** (143 flat) and *down* in Option 3 (−17) — none of these opens a flex wave; Option 3 shrinks one.
- Emergency fills: 0 everywhere measured; nothing to see there.
- If KG wants any option priced against the MEASURED-provider season end-to-end (a full 272-game run), say the word — it is the only measurement I did not make; it needs the apply + a seeded run.

## Honesty notes

- Under `tableValues()` the solver mixed two equivalent stand-ins across candidates (`OLB @ DT2` in baseline, `SS @ DT2` under options) — same 300-weight slot, same price, different accepted body. Not a finding; the pinned test asserts the set, not the identity, on this leg.
- The arbitrage pin (`bad.length <= 18`) may move under Options 2/3 — UNKNOWN, not measured (it gates nothing; it is an informational floor).
- `formation-gap.test.ts` pins 2500/1800/700 today — any landed option **must re-pin in the same commit** (the test's own comment mandates it); leaving the 700 pin stale is exactly the pin-coupling class found in this round's other review.
- Rule tier deltas rechecked: Option 1 → {0:23, 2:11, 6:45, 12:20}; Option 2 → {0:23, 2:14, 6:42, 12:20}; Option 3 → {0:25, 2:12, 6:42, 12:20} — all 99, no rule dropped, no 13-tier value introduced.

## Commands (re-runnable)

```
git archive 7a0706df | tar -x -C /tmp/gap
# probes copied into colors/: gap-probe.test.ts (fixture cells, both providers), gap-freq.test.ts (league 2x32), gap-measured.test.ts (four cells)
node --test --experimental-strip-types gap-probe.test.ts gap-freq.test.ts gap-measured.test.ts
# candidate tables: flex.ts edited IN THE THROWAWAY ONLY — TE/ILB/OLB>DIME 12->6 (opt1), ->2 (opt2), TE->0 TE->2 ILB/OLB->2 FB>TE 2->0 (opt3)
```

Consistency check for the record: baseline DT gap == **720.1** measured — his "about 720 measured" reproduced exactly.

**Not done / UNKNOWN:** per-team flex breakdown (only league totals recorded); `bad.length` recount under Options 2/3; measured-provider full-league season deltas; whether the DL5=EDGE cell being ~0 at every option invites ruling the DT-at-DL5 measurement the default fixture (that is a ruling, not a measurement). I picked nothing — KG picks.
