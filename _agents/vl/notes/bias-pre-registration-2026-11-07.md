# VL bias pre-registration — step 2 of the Owner's bias protocol

Seat: VL · Role: Council Advisor · Branch: council/vl · Date: 2026-11-07
Status: PRE-REGISTERED (committed before any diagnostic is run; no results seen)
Supersedes: nothing. Related: `_agents/vl/notes/bias-audit-2026-11-07.md` (step 1, read-only).

## Purpose
Decide, before seeing any number, how we will detect whether the engine's per-slot position-value weights are biased (tilted toward any position group, especially the secondary) relative to real football — independent of the table the engine was fit to. This file is the commitment; the diagnostic it describes has NOT been run.

## Why pre-register
fitlm.js fit the composition weights (`RATING_SPECS`/`DEF_SPECS`/`PERS_REC`/`MC`) so measured slot wins per OVR reproduce `tools/mathlab/design.json`. Therefore `derivedWeights()` cannot confirm `design.json` — it was tuned to it. A test run after seeing its output would let the tester choose the threshold that matches the desired conclusion. This file fixes metrics, thresholds, and evidence rules in advance.

## Quantities to be measured (all read-only derivations from engine tables, no simulation)
1. **Weight share per slot group** — each slot's `weight` from `colors/src/engine/slots.ts` (`SLOTS`, == `tools/mathlab/design.json`) divided by total weight. Groups: QB, RB (RB1+RB2+FB), WR (WR1..WR4), TE (TE1..TE3), OT (OT1+OT2), OG/C (OG1+OG2+C), EDGE (DE1+DE2+DL5), DT (DT1+DT2+DL5 share), ILB/OLB (MIKE+WILL+SAM), CB (CB1+CB2+CB3), S (SS+FS), DIME, K/P.
   - Secondary share of interest: CB + S + DIME = CB1+CB2+CB3+SS+FS+DIME.
2. **Measured wins per OVR point per slot** — `derivedWeights()` from `colors/src/engine/value.ts` (wins per +20 OVR ÷ 0.00254), for the 4-3 base. Recorded per slot, not re-fit.
3. **Group share of measured wins** — sum of measured slot wins within each group ÷ total measured wins.

## Anchor data required from the Owner (no data invented; AGENTS §7)
The workspace cannot reach stats sites. The Owner must supply, each with a named source:
- **A1** nflverse snap counts by position for 2023–2025 (denominator for volume share).
- **A2** nflverse target share + catches + receiving yards by position (WR/TE/RB) for 2023–2025.
- **A3** defensive snap share by alignment/group (CB, S, EDGE, DT, LB) for 2023–2025.
- **A4** 2025 team wins (one file already present: `tests/2025_standings.js`, S-203; source to be named/verified by the Owner).
- **Held-out rule**: 2025 is held out of any fit; used only to check. If the Owner supplies only 2025, that season is held out and the fit/anchor comparison is qualitative.

## Metrics the diagnostic will compute (fixed now)
- **M1**: each group's engine weight share vs its real snap/target share (anchor A1–A3), difference in percentage points.
- **M2**: each slot's measured wins per OVR point vs a data-anchored per-slot value (derived from A1–A3 volume × efficiency; formula shown in the diagnostic before it runs).
- **M3**: group share of measured wins vs group share of real snaps/targets.
- **M4** (sensitivity): fit/derive weights under four anchors and record each slot's weight under each:
  - Anchor X: current `design.json` table (the engine's table)
  - Anchor Y: Owner's 6 Nov salary table (QB 1000, WR1 650, OT1 500, TE1 250, DE1 650, DT1 500, ...)
  - Anchor Z: data-only fit from A1–A3 (volume × efficiency, no salary target)
  - Anchor W: the prior REV-4 table (pre-TE3/WR4) if reconstructible from git
  Slots whose weight moves more than the tolerance below across anchors are "anchor-dependent".

## Thresholds for "evidence of bias" (fixed now; not adjustable after seeing results)
A group is flagged as tilted only if ALL of:
- **T1**: |M1| or |M3| for the group ≥ 4 percentage points (weight or measured-wins share vs real share).
- **T2**: the same direction shows in ≥ 2 of the 4 sensitivity anchors (M4), i.e. the tilt is not an artifact of one target table.
- **T3**: the tilt is a group-level pattern (≥ 2 slots in the group move together), NOT a single star player. One player (e.g. McBride 5th/6th in receiving) does NOT count as group bias — this is the caution from the Owner's 6 Nov ruling.
- **T4**: the difference survives rounding to the 700 scale / nearest 5 (so it is not a rounding artifact).

If no group meets T1–T4, the finding is "no detectable group bias" (with the sensitivity spread reported anyway).

## Priors (to be written down by the Owner BEFORE results)
The Owner ranks position groups by importance (QB first, then ...) before seeing M1–M4. Where the Owner's ranking and the data disagree, I report the disagreement and do not settle it silently.

## Independent reviewer
The diagnostic is written/run by VL (who built the engine). A Verifier seat — one that authored nothing in this round — must check this pre-registration and the results, not VL. The Architect decides what to do with the findings.

## What counts as a pass / fail of this pre-registration
- Pass = the diagnostic ran exactly as described here (metrics M1–M4, thresholds T1–T4, held-out 2025, anchors X–Z, four-anchor sensitivity) and its output file is attached.
- Fail = any metric, threshold, anchor, or held-out rule changed after seeing a number; or the builder (VL) is the sole judge of the result.

## Explicitly NOT part of this pre-registration
- Changing any weight, protected constant, or product file.
- Any "before/after" outcome from unseeded runs (no injectable RNG yet; V23).
- Flex penalties (P-013 separate item; Owner handling).
- UI features (rankings dropdown, Guide, Madden Ratings page).

## Evidence label for the eventual result
VERIFIED only if a Verifier seat re-runs the diagnostic per this file and reproduces the output. Otherwise REPORTED (VL's run) or UNKNOWN.
