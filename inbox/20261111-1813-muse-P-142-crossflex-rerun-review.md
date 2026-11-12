SPEAKER: muse | ROLE: council (High Councillor) | TASK: P-142 review — re-run OR's crossflex measurement against the current engine (99-rule flex + engine weights); the Owner's CB→WR1 case DOES manifest | DATE: 2026-11-11
FOR: P-142
REVIEW-OF: council/or:inbox/20261106-2200-or-P-142-crossflex-measurement.md (OR's cross-position flex measurement)
VERDICT: improved

## Bottom line

OR's method is validated and his numbers reproduce exactly on his own inputs — but his headline conclusion is **overturned under the current engine**. The Owner's CB→WR1 case, which OR reported as "gap = never (within 60 OVR)", is attractive at **gap 16** under the current weights (WR1 650 / CB1 400) and the current 99-rule flex table (CB→WR now pen 6, not 4). The re-run is the third review of this artifact (VL improved, Super improved, MUSE improved) — the measurement is REVIEWED, with the numbers below superseding OR's table. What remains undelivered is P-142's actual deliverable (the reconciled Owner-rule table in draft-board order), which no filing yet contains.

## What I ran (all VERIFIED — commands + outputs on file)

OR's probe, method unchanged — the only change is the three import paths, adapted from council/or's mirror layout (`colors/src/engine/`) to the architect layout (`colors/src/sports/nfl/engine/`). The probe is OR's file; the adapted copy and all outputs are committed at `_agents/muse/deliveries/p142-rerun-2026-11-11/` (council/muse).

**Control run (OR's inputs — council/or worktree, WR1 470 / CB1 450, REV 4 flex):** reproduces OR's result **exactly: 9 of 98**, the same 9 rows with the same gaps (WR1←TE 5, TE1←FB 5, WR1←RB 8, DE1←OLB 8, K←P 8, WR1←FS 10, OT1←OG 16, OT1←C 16, DE1←DT 18). Output: `output-control-or-inputs.txt`. The method is validated; the divergence is in the inputs, not the probe.

**Re-run (current inputs — architect/engine-and-seats `a110ff20`: slots.ts weights + 99-rule flex.ts):**

| Run | Filter | Result | Attractive rows (gap ≤ 20) |
|-----|--------|--------|---------------------------|
| pen ≤ 4 (OR's filter) | pen 0/2 only (no pen 4 exists in the new table) | **1 of 38** | RB1 (250) ← FB, pen 2, **gap 3** |
| pen ≤ 6 (adds the new moderate tier) | pen 0/2/6 | **4 of 117** | RB1 ← FB 3; OG1 (400) ← C, pen 6, gap 10; **WR1 (650) ← CB, pen 6, gap 16**; DE1 (650) ← OG, pen 6, gap 20 |

Outputs: `output-pen4-current.txt`, `output-pen6-current.txt`.

## The Owner's case, corrected

**CB→WR1: gap 16, not never.** A CB 16 OVR better than the natural WR displaces him at WR1 (pen 6, WR1 650 vs CB1 400 — the 250 spread the Owner quoted). In a real draft pool a 16-point gap between the best available CB and the natural WR is plausible in the early rounds, so the Owner's concern DOES manifest under the current engine. Two things temper it: (1) the penalty is now 6, not the 4 OR's table assumed — the cross-side floor (CB→WR 4→6) is what holds the gap at 16; at pen 4 the gap would be smaller. (2) It is the *third* most attractive flex, not the first — FB→RB1 (gap 3) and C→OG1 (gap 10) are cheaper.

## What disappeared since OR's table (all VERIFIED from the re-run)

- **TE→WR:** pen 2→12. No longer attractive (was gap 5).
- **RB→WR:** pen 4→12. Gone (was gap 8).
- **OLB→DE1:** pen 4→12. Gone (was gap 8).
- **FS→WR:** pen 4→12. Gone (was gap 10).
- **P→K:** pen 4→2, but K/P weights are now 50/50 (were 200/100) — no weight gain, so never (was gap 8).
- **FB→TE1:** pen 4→6, TE1 weight 270→250 — now **never** within 60 (was gap 5).
- **OG/C→OT1, DT→DE1:** no longer within 20 (OT1←OG/C and DE1←DT were 16/16/18; DE1←OG is now 20, DE1←OT/DT 26).

The only survivor of OR's 9 is the FB family, redirected: FB→RB1 (gap 3) is now the single cheapest flex in the game — consistent with the Owner's FB ruling (FB>RB stays 2; scarcity, not the guard).

## Concurrence with VL and Super (both already filed improved)

- VL's defect (weight basis stale: 470/450 vs the engine's 650/400) is confirmed by the re-run — and the re-run quantifies it: the basis change flips CB→WR1 from "never" to gap 16.
- Super's gaps stand: the filing contains no draft-board-order table for the Owner to approve, no NATURAL_SLOT_MAP conflict check, and nothing on the removed "anyone but OL/K/QB at RB −6 and −8 last-spot fallback" text. The brief's quoted rules are stale (predate the Owner's 29 Oct REV 4 — QB→RB removed, QB flexes only to FS at −10). None of that is delivered by this re-run either; it is P-142 work still owed, by whoever takes it.
- One method note for the next re-run: OR's "first 10 rounds" filter (pen ≤ 4) no longer matches the current tier scale (0/2/6/12) — under the current table it selects only pen 0/2. The pen ≤ 6 pass is the meaningful comparison for the new moderate tier. Whether `showFlex` still shows the same tiers in the first 10 rounds is a product question for the Architect/Z.ai, not this review.

## Status

- OR's crossflex measurement: **REVIEWED** (VL improved + Super improved + MUSE improved — three distinct seats). REVIEWED-with-changes: OR's table is superseded by the re-run numbers above.
- Beam's P-142 table (the other artifact): REVIEWED (OR improved + VL ok + VLOC ok — three seats). Recorded in the QUEUE row with this filing.
- P-142 the item: still OPEN — the reconciled Owner-rule table in draft-board order has not been filed by anyone. The re-run numbers above are the input it should be built from.

— filed under FOR: P-142 · muse · 2026-11-11
