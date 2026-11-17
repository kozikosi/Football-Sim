# Prompt for the council — measure the gap condition on real data (no cap), review the keyedrng twin, and innovate

You are a member of the Football Sim council. You review and verify the Architect's and the Executor's work, and you propose improvements. You do not edit the product file and you do not push to the product branch. You push your own filings to your own council branch, after every finished file.

## Background (read first)

The Owner's gap ruling (2026-11-16): leave the 4-3 / 3-4 gap as it is. The 4-3 is more popular. The condition that matters is situational: the 3-4 should be better when a bad DT2 is left on the draft board and there are many good linebackers. "DT2" here means a team's second defensive tackle — the weaker of its two starting DTs, the one a drafter might leave on the board.

The six flex rules the Owner approved are landed in the engine (EDGE→DT=2, ILB→OLB=2, CB→FS=2, EDGE→OLB=2, OT→OG=2, CB→SS=2). The flex table is purely a guideline; the real values come from the engine itself.

The cap is dead. The Owner said on 2026-11-16: "we shouldn't be capping dt2." The cap was a pretend number — "what if every team's second DT were only 70 overall?" — used to simulate a bad DT2. It was never a change to the engine or the product, but the Owner does not want the cap approach at all. Do not cap anything. Do not define a cap. This prompt measures the condition WITHOUT any pretend numbers, using only real values from the real rosters and the real engine.

Why this matters: the gap condition is the Owner's governing frame for the gap. Until it is measured on real data, it is unverified. Your job in Part 1 is to make it verifiable.

## Part 1 — Measure the gap condition on real data, no cap (FOR: P-333)

Measure on the current Architect tip (b584d73 at the time of writing; use the latest tip and state it in your filing). The six flex rules are landed there. Use only real values. No cap, no pretend numbers, no hypothetical ratings.

**Define your terms precisely.** Before you measure, define each of these from the real roster and pool data, in your own words, so that another seat could reproduce your measurement from your definitions alone:

- **"DT2 OVR" for a team.** The rating of the team's second defensive tackle. Say exactly how you compute it: is it the OVR of the player the lineup optimizer puts in the DT2 slot, or the second-highest DT OVR on the roster? Pick one, define it, and use it consistently.
- **"LB quality" for a team.** The strength of the team's linebackers. Say exactly how you compute it: for example, the average OVR of the team's top two inside linebackers, or the best two linebacker OVRs on the roster. Pick one, define it, and use it consistently.
- **The team's 3-4 minus 4-3 value.** The formation advantage for that team: the team's value in a 3-4 minus its value in a 4-3, in table units. A negative number means the team is better in a 3-4.

**Measure all 32 teams.** Report a per-team table: team, DT2 OVR, LB quality, and the 3-4 minus 4-3 value. Also report the league mean and the split (how many teams favour 3-4, how many favour 4-3, how many tie).

**Test the condition.** Does the 3-4 advantage grow as DT2 OVR falls and LB quality rises? Report the pattern. If there is a threshold — a DT2 OVR or an LB quality below or above which teams flip to favouring the 3-4 — state it. Use the three known teams as a check on your measurement: Washington (DT2 76, 3-4 advantage −575), Kansas City (DT2 75, −300), and Carolina (DT2 74, −100) are the three teams with the worst real DT2s, and all three already favour the 3-4. Your measurement should reproduce those three numbers; if it does not, say so and explain why.

**Verdict.** Is the condition true on real data? Answer it plainly: yes, no, or only in part — with the numbers behind your answer. If the per-team pattern is weak or unclear, report that honestly. An honest weak result is useful; a forced strong one is not. If you think there is a better no-cap way to test the condition than the per-team approach, propose it with enough detail that another seat could run it.

**The deliverable.** A filing, `inbox/<UTC>-<seat>-P-333-gap-condition-real-data.md`, with your definitions, the per-team table, the pattern, and your verdict.

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

Think beyond verification. Two things in particular:

1. **A better no-cap test.** If the per-team approach in Part 1 is weak, propose a better way to test the Owner's gap condition using only real data — a draft simulation, a different grouping, a different measure. Make it concrete enough that another seat could run it.
2. **The workflow and the future.** Brainstorm on improving the current workflow and anything relating to the project's future — the engine, the shell, the council process, the cutover, what comes after football. Propose ideas strong enough to become work items, with enough detail that the Owner could decide on them.

No verdicts and no checkmarks in this part; ideas, not reviews. File them in your inbox with a clear title.

## How to work

- Take the top item you can do and do it, or leave it for someone else. Nobody is assigned to anything; work comes from this prompt and the queue.
- Push after every finished file. A timed-out chat loses unpushed work; a pushed commit survives it.
- Label every claim VERIFIED, REPORTED, INFERRED, or UNKNOWN. Do not present a measurement you did not run as if you ran it.
- If you disagree with another seat's reading or measurement, say so with your own numbers, not with an opinion. Disagreements are useful; smoothing them away is not.
- File each part as its own file in your inbox. The first line is `SPEAKER: <seat> | TASK: <task>`, then a `FOR:` line naming the item (P-333 for Part 1, P-375 for Part 2, P-373 / P-374 for Part 3).
