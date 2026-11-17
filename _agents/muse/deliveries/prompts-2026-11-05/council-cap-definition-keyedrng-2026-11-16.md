# Prompt for the council — settle the DT2 cap definition, review the keyedrng twin, and innovate

> **WITHDRAWN 2026-11-16 (Owner): Part 1 (the DT2 cap definition) is withdrawn.** The Owner said we should not be capping DT2. Do not do Part 1. Parts 2, 3, and 4 stand.

You are a member of the Football Sim council. You review and verify the Architect's and the Executor's work, and you propose improvements. You do not edit the product file and you do not push to the product branch. You push your own filings to your own council branch, after every finished file.

## Background (read first)

The Owner's gap ruling (2026-11-16): leave the 4-3 / 3-4 gap as it is. The 4-3 is more popular. The condition that matters is situational: the 3-4 should be better when a bad DT2 is left on the draft board and there are many good linebackers. "DT2" here means a team's second defensive tackle — the weaker of its two starting DTs, the one a drafter might leave on the board.

The six flex rules the Owner approved are landed in the engine (EDGE→DT=2, ILB→OLB=2, CB→FS=2, EDGE→OLB=2, OT→OG=2, CB→SS=2). The flex table is purely a guideline; the real values come from the engine itself.

The problem this prompt settles: the gap condition is not yet a reproducible measurement. Four seats verified the non-cap math to the digit, but the cap cells were contested because the cap reading — which DTs get capped, and how — was never written down. Ernie, in his verification filing: "The gap between 'top-2' (+437) and 'every DT' (−95) is 532 units — the sign of the entire gap condition depends on which one you mean. The gap condition as written is not yet a reproducible measurement." This prompt writes the definition down.

## Part 1 — Settle the DT2 cap definition (FOR: P-333)

**WITHDRAWN 2026-11-16 (Owner) — do not do this part.** The Owner said we should not be capping DT2. The cap was a measurement hypothetical, not a product change, but the Owner does not want the cap approach. Skip to Part 2.

Measure on the current Architect tip (b584d73 at the time of writing; use the latest tip and state it in your filing). The six flex rules are landed there.

**The candidate readings.** State each one precisely in your filing, in your own words, so that another seat could reproduce your measurement from your definition alone. The readings that appeared in the verification round are:

- **Top-2 (MUSE's reading):** for each team, keep the #1-OVR DT at its real value; cap every further DT at the cap. Free agents uncapped. This is the reading that matches the Owner's scenario: each team keeps its DT1, the available DT2 is bad.
- **Every DT:** cap every DT-role player at the cap.
- **Best DT, top-3, and DT2-player-only:** these appeared in Ernie's verification filing. State each one precisely as you understand it, citing the filing you took it from. If two of them turn out to be the same reading under a precise definition, say so.

**The measurement.** For each candidate reading, measure the condition — the mean signed 3-4 minus 4-3 value across the 32 teams, in table units — at caps 65, 70, and 75, on the current engine. Report the mean and the split (how many teams favour 3-4, how many favour 4-3, how many tie) for each reading at each cap. Also report the baseline (uncapped) mean for reference.

**The recommendation.** Recommend ONE reading as the written definition, with reasons. The deciding question is: which reading matches the Owner's scenario — "a bad DT2 is left on the draft board and there are many good linebackers"? A reading that caps a team's DT1 does not match that scenario; a reading that leaves DT1 alone does. Say which reading you recommend and why, and say what the condition is under your recommended reading at caps 65, 70, and 75 (true, false, or a coin flip at each cap).

**The deliverable.** A written definition, one paragraph, that the Owner can lock: the exact cap rule (which DTs, which cap, what is uncapped), plus the measured condition under it at caps 65, 70, and 75. File it as `inbox/<UTC>-<seat>-P-333-cap-definition.md`.

## Part 2 — Independently review the keyedrng twin (FOR: P-375)

The Architect built a Python twin of the TypeScript `keyedrng` (the keyed random-number generator), so the lab's conformance vectors match the TypeScript port bit for bit. Tip b584d73, commit "Python twin of keyedrng, with a conformance check against the TypeScript". MUSE verified it (suite 379/379, ratchet 89/89, checker exit 0). Your job is an independent check, not a copy of MUSE's.

**Run it yourself.** From the repo root at the tip, run `python3 -I tools/mathlab/keyedrng_check.py` and run the engine suite (`cd colors && npm test`). Report the exact outputs: the checker counts (Philox, string hashes, game keys, draws, sequences, error cases), the suite count, and the type-check ratchet.

**Check the normal() gap.** The checker reports `normal()` separately: it is NOT bit-identical (JavaScript `Math.cos` and Python's libm cosine disagree in the last bit). Confirm the reported figure (MUSE measured 108/120 bit-identical, worst relative difference 2.20e-16) and confirm the checker still exits 0 because `normal()` is reported, not required. Confirm that `core/pmath.ts` has no cosine.

**Check the twin is independent.** Read `tools/mathlab/keyedrng.py` and confirm the Philox multiply uses Python's native 64-bit integers, not a copy of the TypeScript 16-bit-limb trick. Read the check chain and confirm it is real, not a tautology: the TypeScript emitter (`tools/mathlab/keyedrng-vectors.mjs`) generates the vectors file (`colors/test/core/keyedrng-vectors.json`) from `colors/src/core/keyedrng.ts`, the Python checker reads that file, and the guard test (`colors/test/core/keyedrng-vectors.test.ts`) keeps the vectors file equal to what the TypeScript actually produces.

**The deliverable.** A short filing, `inbox/<UTC>-<seat>-P-375-keyedrng-twin-review.md`, with the commands you ran, the outputs, and a verdict per claim (confirmed or contested, with the numbers you measured). If you find a discrepancy with MUSE's verification, say so plainly with the evidence.

## Part 3 — Two small verification items

**P-373: Independent coverage of Parts 16/17 (specs inventory + label hygiene).** Confirm or correct MUSE's Part 16/17 drafts from the Cakepanz assist round (in `_agents/muse/deliveries/cakepanz-assist-review-2026-11-16/`), with receipts. File as `inbox/<UTC>-<seat>-P-373-parts-16-17.md`.

**P-374: Second-seat review of Ernie D6 (FEED_YEAR = 2027).** Confirm or refute D6 by reading `feedVM.ts:37` and `:91` in the 67-cakepanz-2 tree. File as `inbox/<UTC>-<seat>-P-374-d6-review.md`.

## Part 4 — Innovate

Think beyond verification. Brainstorm on improving the current workflow and anything relating to the project's future — the engine, the shell, the council process, the cutover, what comes after football. Propose ideas strong enough to become work items, with enough detail that the Owner could decide on them. No verdicts and no checkmarks in this part; ideas, not reviews. File them in your inbox with a clear title.

## How to work

- Take the top item you can do and do it, or leave it for someone else. Nobody is assigned to anything; work comes from this prompt and the queue.
- Push after every finished file. A timed-out chat loses unpushed work; a pushed commit survives it.
- Label every claim VERIFIED, REPORTED, INFERRED, or UNKNOWN. Do not present a measurement you did not run as if you ran it.
- If you disagree with another seat's reading or measurement, say so with your own numbers, not with an opinion. Disagreements are useful; smoothing them away is not.
- File each part as its own file in your inbox. The first line is `SPEAKER: <seat> | TASK: <task>`, then a `FOR:` line naming the item (P-333 for Part 1, P-375 for Part 2, P-373 / P-374 for Part 3).
