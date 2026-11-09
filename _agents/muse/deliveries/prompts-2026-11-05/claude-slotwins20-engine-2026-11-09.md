# Claude — Engine architecture: remove SLOTS[].weight from the loop; slotWins20 drives the draft board

Read this first: `git show origin/council/muse:_agents/START-HERE.md` (boot), then this prompt. This is an Owner decision relayed by the MUSE seat, not a build order from the council. The Owner directs the architecture; you (Architect) decide how to implement it.

## The Owner's decision (KG, 2026-11-09)

**SLOTS[].weight is removed from the loop entirely.** The draft board, the lineup, and every user-facing value must come from the ENGINE (slotWins20), not from the SLOTS[].weight input table. The user sees values from the engine. SLOTS[].weight (the input table, originally fitted to NFL average salaries) may be kept in the code as an internal reference for testing, but it must not drive any user-facing value and it is not useful to the user.

**What "give a 50 bump to WILL and C" means.** The Owner clarifies: the bump is NOT a change to SLOTS[].weight. It means **change the engine math so that slotWins20 understands WILL and C are valued more.** The measured value for WILL and C must go up. How the engine math changes to achieve that is your call as Architect (the matchup model specs, the rating specs, or another mechanism in the engine) — the Owner states the intent (slotWins20 for WILL and C goes up by the equivalent of the 50 bump), you decide the implementation. Do not just add 50 to SLOTS[].weight; that is the old approach and it is dead.

**slotWins20 drives the draft board.** The Wins shown on the draft board (and the lineup valuation, and anywhere else a slot's value is used) must come from slotWins20 (the engine measurement), not from SLOTS[].weight. The draft board's Wins is an engine value.

**Why this follows from the earlier work.** Pickle's flexrebuild finding (2026-11-09) showed that slotWins20 does not use SLOTS[].weight — the measurement runs the matchup model (`RATING_SPECS`), which is independent of the input weight table. The Owner's conclusion: if the measurement is the truth (model-first), then the engine should USE the measurement everywhere, not keep a separate input table driving the user-facing values. The input table becomes a reference only. This is the logical conclusion of model-first.

## Link to P-321 (the measurement baseline is under evaluation)

The slotWins20 measurement itself is under evaluation (P-321, design note `_agents/muse/deliveries/slotwins20-measurement-improvement-2026-11-09.md`). The MUSE seat's proposal: per-position, pool-grounded, local slope — each position centered on its own pool average, measured at center±5, everything else at position-specific averages, one shared function parameterized by position. The WILL/C bump you build here must be evaluated against the NEW measurement once P-321 lands, not just the old 70→90. The two tracks are linked: P-318 changes what the engine values; P-321 changes how we measure it. Report both against the same (new) baseline once P-321 lands.

## What to build

1. **Change the engine math so slotWins20 for WILL and C goes up** (the 50 bump, applied to the engine, not the weight table). Report what you changed and by how much slotWins20 for WILL and C moved (before/after, with the command and output).
2. **Remove SLOTS[].weight from the loop:** the draft valuation (Candidate wins), the lineup valuation, and every user-facing value must be computed from slotWins20 (or a value derived from it), not from SLOTS[].weight. SLOTS[].weight stays in the code only as an internal reference (label it as such; do not delete it yet — the council uses it as a reference for testing).
3. **Keep the measured display as the default** (already the rule since Nov 8). The display now shows engine values throughout, so the display and the draft valuation agree (they are the same number, from the same measurement).
4. **Report:** the exact engine change, the before/after slotWins20 for WILL and C (and any other slot that moved), the before/after draft-board Wins for a WILL and a C player, and whether the test suite still passes. Replay the draft scan (flexeval) and report whether the pick counts moved.

## Boundaries

- Only you (Architect) change the engine. The council verifies; Z.ai consumes the snapshot.
- Do not change the flex table in this work (the flex rebuild is separate, P-311). Do not change the save format unless the slot change requires it (say so if it does).
- The display rule (integers everywhere except Wins and Priority, one decimal) is Z.ai's UI work, not yours — but the VALUES the UI shows must come from the engine (slotWins20), which is your part.

## Next

After this lands, the council verifies (P-320) and Z.ai wires the board to the engine values (P-319). The seven guard passes (P-288) and P-308 follow once the Owner picks a direction there.
