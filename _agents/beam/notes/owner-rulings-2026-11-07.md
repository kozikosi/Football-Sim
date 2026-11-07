# OWNER RULINGS — 2026-11-07 (Beam, recorded for the council)

Source: Owner's edited prompt + permission statements, 2026-11-07. These are binding rulings and permissions, not proposals. Filed so every seat reads the same text.

## Ruling 1 — Abandon the old weights system (binding)
The Owner confirms `modelWeights()` was influenced by his original personal weights via the fitted `RATING_SPECS`/`MC` (lab 28 Oct fit target = the OLD personal table, Pre-Colors `DEFAULT_WEIGHTS` = QB 320, WR1 60, TE1 80, CB1 350, SS 80, FS 60 — secondary-heavy). He gives explicit permission to abandon any reference to his old system (personal weights AND the salary table) as a calibration target or foundation, for the sake of veracity and truth. Keep them only as display presets / independent anchors, never as fit targets. `DEFAULT_WEIGHTS` may be repositioned/retired as a default accordingly. Protected constant — Owner approval granted here; Architect implements + re-pins MERGE-MANIFEST in the same commit.

## Ruling 2 — New display presets (binding)
Remove the old presets entirely. New display presets = QB at 1000 with other slots following from the engine's math, listed in increments of 50 for visual simplicity to the user. (Consistent with what `modelWeights()` already does: `Math.round(w/mx*700/5)*5`.)

## Ruling 3 — Constraints for Claude this round (binding)
Read, synthesize, and evaluate; answer questions before building anything. Permission to run tests to help decide the best path forward. No "Owner's table stays model" law. The Owner's permission to abandon the old system is binding and final.

## Ruling 4 — Analysis (Owner-endorsed)
The lab-28-Oct fit target was the OLD personal table, not the salary table (which arrived 6 Nov). Consequences:
(a) The circularity is deeper than Z.ai stated — L1 was fit to the more biased personal table.
(b) Two inconsistent targets are in play (mechanics fit to old personal; display weights = salary), neither validated.
(c) Beam's M2 "measured vs salary" comparison compared two different targets, not a real validation.
This strengthens Z.ai's prescription (decouple + validate L1 against real data) and makes abandoning the old personal system the correct move. Z.ai's recommendations stand and are more justified; the only correction is that the fit target was the old personal table, making the bias deeper than he stated.

## Ruling 5 — Z.ai's 8 Nov synthesis: adopt with the above corrections
Z.ai's architecture (L0–L4, 3 valuation modes, 12-tool laboratory, raw-curve witness, Rosetta table, dissent list) is adopted as the working plan, subject to the corrections above and to Claude's answers to Z.ai's 4 questions.

## Where the full text lives
- This file: `_agents/beam/notes/owner-rulings-2026-11-07.md` (council/beam, pushed).
- Edited prompt (full): recorded in `inbox/20261107-2240-beam-owner-permission-abandon-old-weights.md` (pushed, commit 10cdee52).
- Review index: `_agents/beam/notes/engine-review-index-2026-11-07.md` (7363a7ff).
- Z.ai synthesis: gh-pages `z-post-blue-zai-advisory-2026-11-08/` (93447340).
- Permission note (original): inbox `20261107-2240-beam-owner-permission-abandon-old-weights.md` (e15d254d → 55e76fbd → 10cdee52).
