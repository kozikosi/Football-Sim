# Z.ai — Build the Play Ledger (Phase 1: snap ledger), powered by your PLAYLED prototype

This is a proposal from the MUSE seat, not a build order. You decide how to implement it; the Owner decides what ships.

## Background

Claude's engine design is approved (Phases 0 and 1 are a go). The rebuild will proceed as a strangler — the drive engine stays authoritative while the new model is built and gated. But the Ledger is the thing that makes the rebuild measurable, and it is the consensus next step from your own Plays Ledger answer and your PLAYLED prototype.

Claude timed out, so the engine work is stalled. The Ledger is the work that can proceed now, in your lane, without touching the engine.

## The job (one job)

Build the Play Ledger, Phase 1: the snap ledger, powered by your PLAYLED prototype as the staging engine.

- **The drive engine stays authoritative.** The drive engine's totals are the truth. Your PLAYLED prototype stages the plays inside each drive — the Ledger's conservation law is that the staged plays sum to the drive's realised totals (run, pass, plays, sacks, points). This is the Ledger design from your answer, with your prototype as the staging engine.
- **Deliverable:** a working snap ledger — per-spot snap shares (FB, TE2, TE3, WR4, CB3, DIME, DL5, and every other spot), per-personnel-package participation, and gravity event counts (double teams per player per game). The ledger is an output fold of the staged plays.
- **First check (no external data needed):** compare the ledger's snap shares against the drive engine's own constants (PERS, DL5_SHARE, DIME_W) and the slot weights. The shares should be consistent with what the engine already holds. Report where they agree and where they disagree, and by how much.
- **Do NOT edit the engine.** This is a prototype in your own lane. Read-only on `colors/src`, `flex.json`, `flex.ts`. The Ledger is a measurement layer, not an engine change.

## Owner's rulings that bound this work

- FB = scarcity (FB>RB 2, FB>TE 6 stay; the guard 18 is NOT used; Juszczyk-to-TE accepted).
- C>OG = nonissue, 6 is fine.
- Totals bar is ~10% (general sense of realism, not exact 2025 modelling).
- Basketball is the second sport, deferred until football is done.
- No historical Madden ratings right now.

## What to measure and report

- Snap shares per spot (from the staged plays) versus the engine's own constants. Where do they agree? Where do they disagree, and by how much?
- The FB share specifically (the socialism measurement): what snap share does the ledger give FB, and does it match the engine's weight (FB 25)?
- Gravity event counts per player (double teams) — are they plausible? The rates are INFERRED placeholders in the prototype; report them as such.
- The conservation check: do the staged plays sum to the drive totals (run/pass/plays/sacks/points)? Report the purity test.
- A short note on what Phase 2 (validation against nflverse snap counts) would need, so the data request is ready when the Owner gives the go. Do not fetch the data yourself; the Owner or the council attaches it.

## Innovate

This is your design as much as it is a build. If the snap ledger opens a better way to show participation, to count gravity, to stage plays, or to structure the Ledger — if you see a cleaner measurement, a more honest attribution rule, a way to make the ledger itself a better acceptance test for the rebuild, or a use for the staged plays nobody has named yet — build it, or note it as an `IDEA:` with the reasoning. Think around the problem, not just inside it. The best version of this is the one you improve while building it, not the one described here. If a step in the plan above is wrong, say so and show the better step with the measurement that proves it.

## Batch rule

Complete ALL work before responding. You cannot push; every response costs the Owner a publish step. Work as much as possible before responding and batch every completed piece into a single zip. If a piece is blocked, say so and explain the blocker — that is the only reason to respond with work outstanding. Include CHECKSUMS.txt with the algorithm LABELLED (sha256).
