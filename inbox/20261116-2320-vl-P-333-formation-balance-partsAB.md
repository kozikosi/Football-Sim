SPEAKER: vl | ROLE: council | TASK: P-333 — principled formula AND structural side of the 4-3/3-4 gap (Part A + Part B; KG picks, no implementation yet) | DATE: 2026-11-16T23:20:00Z
FOR: P-333

## Measurement baseline (VERIFIED — I ran the commands; outputs quoted)

Extracted the d3bd81d2 engine (`colors/src/sports/nfl/engine/{slots,flex,lineup}.ts`, `colors/src/core/hungarian.ts`) plus `colors/test/nfl/formation-gap.test.ts` to /tmp/peg, ran with `node --experimental-strip-types`. The fixture builds a native roster per base (every spot filled by its dest role; DL5 = DT or EDGE) and measures `lineupFor(ps, base).value - lineupFor(ps, other).value`, in table units (1 point = 0.00254 wins over 70→90; ÷20 per OVR).

- `git merge-base --is-ancestor 97d7e9d HEAD` → NO (MUSE's Option-B build not here; its 2700→2200/gap-400 numbers are REPORTED by Muse, not reproducible from this seat).
- Baseline d3bd81d2 (formation-gap.test.ts, 4 tests pass): DL5=DT → 4-3→3-4 loses 2700, 3-4→4-3 loses 1800, gap 900 (= 0.1143 wins/season). DL5=EDGE → both 1800, gap 0 (Inkling's fixture-artifact point).
- 4-3→3-4 = TE3←FB@6×50=300 + DT2←OLB@6×300=1800 + SAM←TE@6×100=600 = 2700.
- 3-4→4-3 = DL5←ILB@12×150 = 1800.
- Current table (d3bd81d2 flex.ts): DIME trio TE/ILB/OLB→DIME = 12 ✓; FB exception DT/OT→FB=0 ✓ but FB→TE=6 (NOT the principle's 2); cross-side floor WR→CB/FS/SS/NICKEL/DIME = 6 ✓; tier structure 0/2/6/12 ✓.

Note: the prompt's "as measured" gap 700 (2500/1800) assumes FB→TE=2 already applied; on the actual current engine (FB→TE=6) the gap is 900.

## Part A — a principled mechanism that closes the gap (VERIFIED)

Proposal: **restore the FB exception (FB→TE=2) + list DT→ILB=6 (directional: DT playing ILB; ILB→DT NOT added)**.

Principled rationale:
- FB→TE=2 is the FB exception itself (FB and TE are similar body types / H-back), an explicitly-stated principle — restoring it is applying a principle, not ad hoc re-pricing.
- DT→ILB=6 derives from the interior-defender family: DT and ILB both play in the box against the run, small athletic distance, same position tier as the existing OLB→ILB=6. Tier 6 already exists (no new tier, which KG wants to avoid). This is a *missing rule the table's logic implies*, not "change one price to close the gap." It does not touch the DIME trio, the cross-side floor, or add a tier.

Measurement (isolated FLEX override, snapshot/restore; each cell recomputed):
| config | 4-3→3-4 | 3-4→4-3 | gap | wins/season |
|---|---|---|---|---|
| current d3bd81d2 (FB→TE=6, DT→ILB unlisted) | 2700 | 1800 | 900 | 0.1143 |
| FB→TE=2 alone (FB exception restored) | 2500 | 1800 | 700 | 0.0889 |
| FB→TE=2 + DT→ILB=6 | 1800 | 1800 | **0** | **0.0000** |

With FB→TE=2 + DT→ILB=6:
- 4-3→3-4: MIKE(=ILB2)←DT@6×300=1800; all other spots natural (OLB→OLB=0, TE→TE=0, FB→FB=0). Loss 1800.
- 3-4→4-3: DL5←ILB@12×150=1800 (DL5 = min(ILB→DT unlisted, ILB→EDGE=12) = 12). Loss 1800.
- Gap exactly 0.

Placement detail verified (MIKE←DT@6×300=1800; DL5←ILB@12×150=1800).

Principles kept: DIME trio=12 ✓, FB exception FB→TE=2 ✓, cross-side floor=6 ✓, tier structure 0/2/6/12 (no new tier) ✓.

Why other candidates fail (do not repeat):
- Ernie's ladder (destination weight + athletic distance): best fit 50/99, prices DIME at 4–5 (breaks DIME trio=12), breaks FB exception, flexing doubles 145→245–413 — rejected on principles.
- Beam's distance×leverage: keeps DIME=12, FB→TE=2, but "never demonstrated closing the gap" — unproven; I measured no zero from a pure distance formula.
- Ad hoc one-rule re-pricings (Ernie SS→ILB 6→4 → gap 100; Glyph TE→OLB 6→0 → gap 100): change one price without a principled reason — exactly what KG rejected. (My DT→ILB=6 is not a re-price of an existing rule; it adds a missing rule derived from interior-defender logic.)
- Two-rule zeros that unwind the FB exception: break FB principle — rejected.
- Flexing-frequency impact of adding one rule (DT→ILB): minimal, not measured against the full 32×2 sweep — flagged "to verify," not claimed.

Caveat: DT→ILB=6 without ILB→DT=6. Adding ILB→DT=6 too would reduce DL5 to min(6,12)=6 → 3-4→4-3 = 6×150=900, gap 900 again. So the rule must be directional (DT→ILB only).

## Part B — structural side / real-roster bias

Finding I CANNOT reproduce (REPORTED by Ernie, not reproducible here — no real-roster dataset in this worktree): on 32 real rosters, 28 teams better in 4-3, 3 in 3-4 (Cardinals tied), mean signed bias +1144 units (= 0.145 wins); best re-pricing only reaches ~947.

Structural driver I CAN identify from the synthetic fixture + slots.ts (VERIFIED):
- 3-4's ILB2 (the DT2 slot) is rated off DT2's weight (300) but has dest ILB (`fieldSlots`: DT2 → dest ILB, weight WEIGHT.DT2=300).
- 4-3-shaped rosters are built with DTs (DT1/DT2) at those body types, not ILBs. DT→ILB is NOT a listed flex (emergency 8), so a 4-3 roster in 3-4 cannot put its DT2 body into ILB2 cheaply — it must steal an OLB (cascading TE→OLB, FB→TE) or pay emergency 8. That's the structural asymmetry.
- 3-4→4-3 always pays one price (DL5←ILB@12=1800) regardless; 4-3→3-4 pays the ILB2 conversion.

Pool/slot side tested (VERIFIED, gap stays 700 — no improvement):
- Re-rate 3-4 ILB2 off WILL weight (150 instead of DT2 300): gap 700 (4-3→3-4=2500, 3-4→4-3=1800).
- Re-rate ILB2 off SAM weight (100 instead of 300): gap 700.
Conclusion: the pool/slot-weight side ALONE cannot close the gap. The fix is at the occupant/flex interface — a 4-3-shaped roster needs a cheap, natural way to fill ILB2, which is DT→ILB (Part A).

Real-roster bias re-measurement (28-3 split, +1144 mean): requires Ernie's roster dataset, not available here — NOT REPRODUCIBLE, flagged for Ernie/Architect.

## Recommendation for KG (a choice, not a pick)

- Part A mechanism (FB→TE=2 + DT→ILB=6) closes the synthetic gap to exactly 0 while keeping every protected principle and no new tier. This also addresses Part B's structural driver (lets a 4-3-shaped roster fill ILB2 with a DT at 6 instead of emergency 8 / OLB-stealing cascade).
- Real-roster bias (+1144, 28-3) cannot be verified or re-measured from this seat; needs Ernie's data. The structural fix's effect on the real bias is therefore unmeasured — flagged, not claimed.

No implementation until KG picks. If another seat files a P-333 rebuttal, file it as your own measurement, not a correction to this file.

## How to check
1. `git merge-base --is-ancestor 97d7e9d HEAD && echo YES || echo NO` → expect NO.
2. Extract d3bd81d2 engine + formation-gap.test.ts; `node --test --experimental-strip-types test/nfl/formation-gap.test.ts` → baseline 900/0 (4 tests pass).
3. Apply `{FB:{TE:2}, DT:{ILB:6}}` to FLEX (directional, no ILB→DT), re-run the four cells → gap 0 (1800/1800); confirm DIME trio=12, FB→TE=2, cross-side WR→*=6 all hold.

Labels: baseline gap and all option gaps VERIFIED (commands run by me). Ernie's real-roster numbers (28-3, +1144, ~947) and Muse's 2700→2200/gap-400: REPORTED by their authors, not reproducible here. Prompt's 2500/1800/gap-700: equals FB→TE=2 alone, VERIFIED as such but not the current-engine baseline (900).
