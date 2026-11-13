SPEAKER: inkling | ROLE: council | TASK: P-142 — reconcile the Owner's flex rules into one table (draft-board order) for Owner approval | DATE: 2026-11-13T23:51Z
FOR: the Owner (approval) · the Architect (wiring) · P-142 · P-141

Sources (all read this session from git objects, not live worktrees):
- **Live engine FLEX (the truth):** `origin/architect/engine-and-seats @ 5a3bb75e` — `tools/mathlab/flex.json` (2814 B, sha1 of bytes `5cd2d71c1bb1e4ceb42d3ec9f0b1964a3bd2a121`) and `colors/src/sports/nfl/engine/flex.ts` (3717 B, sha256 `76ebea5e2b…`). **99 rules — 23 at 12, 43 at 6, 10 at 2, 23 at 0.** `origin/council/muse` mirror re-hashed identical (`5cd2d71c…`).
- **Product (pre-Colors) FLEX:** `Football-Sim-PreColors.html` (657,486 B) — the old REV-4-style table (−2/−4/−6/−8 tiers), `NATURAL_SLOT_MAP` at line 931 (shown below), `EMERGENCY_PENALTY = 8` (illegal for QB in engine `fit()`; product: legal-except-QB at the last unfilled spot only).
- **Owner's rules of 2026-10-25 (N1/N2, verbatim in the brief):** "QB and offensive linemen can play RB at -6; QB can play WR at -6; TE to WR -2 and RB -4; OLB/WILL/SAM to FS -6, SS or DT -4, Edge or CB3 -2; Edge to OLB/WILL/SAM free; MIKE to DT -4, SS -2; SS to CB3 free, FS/OLB/WILL/SAM -2; CB to OLB/WILL/SAM -4, to MIKE -6; RB or FB can play FB free; K or P can punt free; unmentioned rules unchanged."
- **Owner's rules of 2026-11-09/10/11 (in the live table):** D picks + 9 Owner corrections (EDGE>ILB/OG/OT/RB/NICKEL, DT>C, DT>OG, EDGE>C → 6; OG>C → 2); cross-side floor (WR>CB/DIME/FS/NICKEL/SS from −2 to −6, FB exempt); item 3 (TE>DIME, TE>FS → 12; ILB>FS, OLB>FS **new** at 12); item 7 (SAM mirrors OLB — no new rules); QB→FS stays the only QB flex (12, was −10 REV 4).
- **Removed 2026-10-27 text** (flagged in the brief): "anyone but OL/K/QB at RB -6 and -8 last-spot fallback" — **already gone** from the live design: the live emergency is `EMERGENCY_PENALTY = 8`, and a quarterback has **no legal flex at all** (`legal: false` in `fit()`); in the product the 27 Oct rule lived as userEmergency (line 1650) which still bars QB (`p[1]!=='QB'`) but licenses the rest at the last unfilled spot only.

## The reconciled table (draft-board / ROSTER_SLOTS order), 25-Oct rules vs live 99-rule table

| Slot (draft order) | Owner's 25-Oct rule | Live value (evidence) | Status |
|---|---|---|---|
| QB | QB → RB −6 (and OL → RB −6) | QB has **no** RB rule; QB can **never** flex (engine: `legal: false`; product: QB:{}). OL (OT/OG/C) have no RB rules either | **CONFLICT + absent** — the live design forbids what the 25-Oct rule licenses, and at a different penalty (8 emergency, illegal for QB) |
| QB | QB → WR −6 | No QB>WR rule anywhere (engine QB: FS 12 only; product QB:{}) | **CONFLICT + absent** |
| QB | QB → FS | Engine: QB>FS **12** (Owner, 9 Nov/D-picks; REV-4 had −10, 29 Oct) | Present (magnitude superseded, tier changed) |
| RB1 / RB2 | *(no 25-Oct rule; rev-2 reading: RB→FB −2, WR −4, TE −6 — unmentioned ⇒ unchanged)* | RB>FB **0** ✓, RB>WR **12**, RB>TE **6** | Present; magnitudes tier-set (WR 12, TE 6) |
| WR1–WR3 | *(no 25-Oct rule; rev-2 reading: RB −4, SS −4, FS −4, NICKEL −4, DIME −4, CB −6 — unmentioned ⇒ unchanged)* | WR>RB **6**, WR>FS **6**, WR>SS **6**, WR>CB **6**, WR>DIME **6**, WR>NICKEL **6**, WR>TE **6** (all floor-raised to 6 on 10 Nov) | Present; cross-side floor applied |
| TE1 / TE2 | TE → WR **−2**, TE → RB **−4** | TE>WR **12**, TE>RB **6** (tier set 9–11 Nov) | **CONFLICT** (Owner 2/4 vs 12/6) |
| TE1 / TE2 | TE → FS −6 | TE>FS **12** (raised 6→12 on 10 Nov, item 3, in the live table) | Present (magnitude changed 9→11 Nov) |
| OT1 / OT2 | OT → OG free, C free; OT → RB −6 (25 Oct: OL play RB at −6) | OT>OG **0** ✓, OT>C **2**, OT>RB **none** (emergency 8) | Partial; OL→RB rule **absent** |
| OG1 / OG2 | OG → C free, OT −4, …; OL → RB −6 | OG>C **2** (corrected 9 Nov: OG>C to 2), OG>OT **2**, OG>RB **none** | Partial; OL→RB **absent** |
| C | C → OG free, OT −4, …; OL → RB −6 | C>OG **6**, C>OT **12**, C>RB **none** | Partial; OL→RB **absent**; OG↔C are 2/6 now, not free/0 as rev2 had it |
| DE1 / DE2 (EDGE) | Edge → OLB/WILL/SAM **free** | EDGE>OLB **0** ✓ (SAM takes the OLB column; item 7) | Present ✓ |
| DT1 / DT2 | *(rev-2 reading: DT→C −4 — unmentioned ⇒ unchanged)* | DT>C **6**, DT>OG **6**, DT>OT **6** (Owner corrections, 9 Nov, kept) | Present (9-Nov tier set) |
| MIKE | MIKE → DT **−4**, SS **−2** | ILB>DT **none** (emergency 8), ILB>SS **2** ✓ | Half-present; MIKE→DT **absent** |
| WILL / SAM | OLB → FS **−6**, SS −4, DT −4, Edge −2, CB3 −2 | OLB>FS **12** (new 10 Nov, item 3), OLB>SS **6**, OLB>DT **none** (8), OLB>EDGE **12**, OLB>NICKEL **6** | **CONFLICTS** on all five (−6→12, −4→6, −4→8/absent, −2→12, −2→6) — but the 10-Nov Owner rulings are the latest word and sit in the live table; OLB>EDGE=12 is the OLB mirror of ILB>EDGE=12 |
| MIKE/WILL/SAM | MIKE → SS −2 ✓ (live ILB>SS 2) | Same-side consistent | ✓ |
| CB1 / CB2 / CB3 | CB → OLB/WILL/SAM **−4**, CB → MIKE **−6** | CB has **no** OLB or ILB (MIKE) rules; emergencies at 8 | **CONFLICT + absent** |
| CB1 / CB2 / CB3 | CB → SS −2 / FS 0 / NICKEL 0 / DIME 0 | CB>SS **0**, CB>FS **0**, CB>NICKEL **0**, CB>DIME **0** ✓ | Present ✓ |
| SS | SS → CB3 **free**; SS → FS −2, OLB −2 | SS>NICKEL **0** ✓, SS>FS **2** ✓, SS>OLB **2** ✓ | Present ✓ (NICKEL = CB3) |
| FS | FS → SS −2, OLB −2? | FS>SS **2**, FS>OLB **6** (not −2) | FS>SS ✓; FS>OLB is 6 — the symmetric partner to OLB>FS 12 (item-3 pair) — flagged, same-side |
| K | K → P **free** | K>P **2** | **CONFLICT** (−0 Owner vs 2) |
| P | P → K? | P>K **2** | Unmentioned by Owner — unchanged ✓ (or confirm intent) |
| FB | FB → RB −4 band? FB → TE −6? FB → RB 2 (measured), FB>TE **6** (4.74 measured, above the 4.0 cut) | FB>RB **2** ✓, FB>TE **6** ✓ | Present (D-price set 9–10 Nov); note the measured values behind these tiers in the A3 correction filing |
| LS | (none — engine-only emergency fallback; product: unlisted → last-spot emergency 8, QB barred) | LS: {} ✓ | Present ✓ |
| DL5 | derived: min(DT, EDGE) price | implemented in flex.ts `dl5Penalty()` | Present ✓ |
| TE3 / WR4 | follow TE / WR columns (28-spot plan) | slot names not in the 26-slot ROSTER_SLOTS; flex families carry over by `SLOT_FAMILY` | Pending the 28-slot wiring (P-141/ Architect) |

**Draft-board-ordered conflict count:** 8 Owner-listed rules **absent** from the live engine FLEX (QB→RB, QB→WR for the QB himself is absent by the 29-Oct QB→FS-only ruling; OL→RB; OLB→DT; MIKE→DT; CB→OLB; CB→ILB), **6 conflicts** in magnitude (TE→WR, TE→RB, RB→WR/RB→TE tiers, OLB>DT both forms, K→P), **1 conflict of principle** (25-Oct QB-plays-RB/WR vs 29-Oct QB→FS-only), with everything else present.

## Conflicts with NATURAL_SLOT_MAP (line 931, verbatim above)

- QB natural at QB only — consistent with "unmentioned rules unchanged" (QB has no natural flexes). The 25-Oct text licenses QB→RB/WR at −6; **NATURAL_SLOT_MAP does not forbid flexes** — conflicts come only from FLEX/engine (`fit()`), not from the map. No map change is forced by the 25-Oct words.
- MIKE/WILL/SAM are mutually natural (`['MIKE','WILL','SAM']` each way) and EDGE→OLB is 0 in FLEX — consistent with "Edge free to OLB" ✓.
- CB1–CB3 natural at CB1–CB3; NICKEL (CB3) natural for CB — consistent with CB→NICKEL/DIME/FS/SS 0.
- FB/P/LS/DL5/TE3/WR4 do not exist in NATURAL_SLOT_MAP at all — they are V23/28-spot design names pending the Architect's wiring; the map will gain them, not this table.
- DL5: in FLEX, DL5 is not listed — it is **derived** (`dl5Penalty`), and unlisted is consistent with a derived role.

## Removed-text effect ("anyone but OL/K/QB at RB -6 and -8 last-spot fallback")

As removed (REV 4, 29 Oct, Architect): the blanket "OL/K/QB exempt from RB flex; everyone else -6/-8" is gone. Live behavior of the *→RB column: listed rules are **RB>FB 0, WR>RB 6, TE>RB 6, EDGE>RB 6** — there is **no** blanket −6 for "anyone", and **QB is barred outright** (`fit()` QB exception). (ii) Unlisted non-QB destinations fall to **EMERGENCY_PENALTY = 8**, legal; QB → 8, **illegal** (`legal: false`); (iii) the product licenses at the *last unfilled spot only* via `userEmergency` (`p[1]!=='QB'`), the one surviving "last-spot" wording. Net effect of the removal: **OL/K gain no listed RB path; only WR/TE/EDGE → RB at 6, everyone else at 8 (QB barred).** The Owner should confirm whether **K→P = 0** and the **OL→RB** paths are intended to exist at all in the 99-rule world, or were dropped deliberately when REV 4 landed.

## The two same-side inconsistencies (flagged already, unchanged here, Owner to rule)

Live (verified, `git show origin/architect/engine-and-seats:tools/mathlab/flex.json`): **SS>OLB = 2 vs SS>ILB = 6; ILB>SS = 2 vs OLB>SS = 6.** Both are defense→defense (same side), so the cross-side floor does not apply; they are the mirror of the item-3 rulings (ILB>FS 12 / OLB>FS 12 pair). **No change without Owner ruling.**

## What the Owner must approve (the actual P-142 question)

Three mutually exclusive reconciliation strategies — pick one (this is the Owner's call; FLEX is protected):

- **Strategy A — live 99-rule table stands** (status quo, 9–11 Nov Owner-approved D-picks + corrections + floor + item 3/7). Then the 25-Oct list is read as **superseded/retired** and this reconciliation is filed for the record. Only the two same-side flags and K→P=0 are open.
- **Strategy B — resurrect the 25-Oct rules as modifications to the 99-rule table** (OL→RB 6, MIKE→DT 4→6 tier, CB→OLB 6, CB→ILB 12, TE→WR 2? such changes): every one must be priced into the 0/2/6/12 tiers (the tier set has no 4 or 10) and re-pinned per the protected-constant rule; this is a *new* Owner ruling, not a reconciliation.
- **Strategy C — hybrid:** keep the 99-rule table, add **only** the OL→RB and MIKE→DT rows at a tier the Owner picks, plus K→P 0, and retire the rest of the 25-Oct list with a note. Cheapest coherent change; changes exactly the absent-rules count from 8 to 6.

**My recommendation (INKLING, labeled):** Strategy A. The 99-rule table is the Owner's most recent ruling set (9–11 Nov), is byte-identical across two branches (architect ↔ muse mirror), and its two open items are already on the Owner's desk. Resurrecting 25-Oct magnitudes would fork the tier system (4/10 don't exist) and undo the floor (WR→SS would drop 6→4? not in the 25-Oct list, fine — but TE→WR 12→2 would be a large reversal with no measurement behind it). Strategy C is viable **only if the Owner wants OL→RB and MIKE→DT personally available** — then: OL (OT/OG/C)→RB 6; MIKE→DT 6; K→P 0; leave the rest alone.

EVIDENCE: VERIFIED (all flex.json values above re-printed from `git show origin/architect/engine-and-seats:tools/mathlab/flex.json` 2026-11-13T23:51Z, counts 23/43/10/23 recomputed by script; muse mirror identical by sha1; NATURAL_SLOT_MAP, ROSTER_SLOTS,EMERGENCY paths read from the product bytes). REPORTED (25-Oct rule magnitudes as quoted in the brief; Beam's 2330 table is REV-4-era and contradicts the live table in 6+ rows — do not cite it against the live one). UNKNOWN (whether the Owner intends the 25-Oct list to survive the 9–11 Nov tier rebuild; the FB/P slot wiring order).
