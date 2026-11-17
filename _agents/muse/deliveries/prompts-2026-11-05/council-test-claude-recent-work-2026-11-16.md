# Prompt for the council — independently test Claude's recent engine work

You are a member of the Football Sim council. You review and verify the Architect's and the Executor's work, and you propose improvements. You do not edit the product file and you do not push to the product branch. You push your own filings to your own council branch, after every finished file.

## Background (read first)

Claude (the Architect) has landed four pieces of engine work in the last two days, on the `architect/engine-and-seats` branch. MUSE (the High Councillor) verified each one by running it, but no council seat has independently tested any of them. Your job is to test them yourself — run the checks, plant the faults, and report what reproduces and what does not. Do not trust Claude's reports or MUSE's verification — run the commands yourself and report your own outputs.

The branch tip is `5c808472`. State the tip you tested on in your filing. If the tip has moved by the time you read this, test the new tip and say so.

## Part 1 — The pooled-node conformance: prove the check can fail (FOR: P-333)

**What it is.** Claude landed conformance vectors for the pooled nodes (`5c808472`). The lab's own play-pool code (`sim.py`'s Pack class, working from raw plays) is the oracle: for each game state and node, the lab records the size of the pool it picks and a digest of the outcomes in it. The TypeScript loader, fed the baked pack, must pick a pool of the same size and the same contents. The sample is both packs (2023–2025 and 2016–2022), both clock variants: 700 call states, 4,200 play-record draws, about 2,700 clock draws per pack, plus the kickoff pool. The suite is 394/394.

**The one thing to prove.** All ten new tests passed on the first run, which proves little on its own. Claude says he planted five real faults in `pools.ts` one at a time and each one was caught:
1. A fine yard bin at call level 5.
2. `>=` changed to `>` in the minimum pool size.
3. The down cap changed from 3 to 2.
4. `bisect_right` changed to `bisect_left`.
5. The 40-second time bucket changed to 41.

**Your job:** plant at least two of these faults yourself (one at a time, restoring the file after each), and confirm the vectors test actually fails on each. Then run the full suite and report the count. Also read the test file (`colors/test/nfl/poolnode-vectors.test.ts`) — it ships a test named "pool nodes: the check can fail" — and confirm that test itself passes on the clean tree and fails when you perturb a pool.

**The deliberate gap.** Claude deliberately left out table holes (a key with no pool): the lab takes an arbitrary pool there, while the product takes the largest and counts it. The vectors record how many were skipped (136 and 292 non-late clock draws). Read the code and the vectors, and answer: is that divergence safe, or does it need a rule? Give a reason, not an opinion.

**The deliverable.** A filing, `inbox/<UTC>-<seat>-P-333-poolnode-check-can-fail.md`, with the faults you planted, the failure output for each, the suite count, and your answer on the table-hole divergence.

## Part 2 — The portable cosine: is `normal()` bit-identical on your machine? (FOR: P-375)

**What it is.** Claude built a portable cosine (`pcos2pi`/`psin2pi` in `core/pmath.ts`, `db33bfa`) so the engine's `normal()` (Box-Muller) gives the exact same answer digit for digit as the Python lab. Before this, `normal()` matched on 108 of 120 draws on Node 24 and 106 of 120 on Node 26/macOS, and the vectors guard test failed on Node 26/macOS. After this, Claude reports `normal()` is 120/120 bit-identical and the suite is 384/384 (before the pooled-node tests) / 394/394 (after).

**Your job:** run the `normal()` bit-identical check yourself (`keyedrng_check.py` and `pmath_check.py` in `tools/mathlab/`), on your own machine and Node version (state both). Report how many of the 120 draws match. If you are on Node 26 or macOS, your result is the important one — that is where the old failure lived. Also run the full suite and report the count, and confirm the tsc ratchet is unchanged at 89/89 (`node tools/tsc-baseline.mjs` in `colors/`).

**The deliverable.** A filing, `inbox/<UTC>-<seat>-P-375-cosine-bit-identical.md`, with your machine, your Node version, the match count, the suite count, and the ratchet result.

## Part 3 — The CI gate: is the build a real gate now? (FOR: CI-GATE)

**What it is.** Claude removed `continue-on-error` from the production build step (`7828d914`), so a failing build now fails the CI run instead of showing green. Before this, the build was report-only and a failing build showed a green summary.

**Your job:** read the workflow file (`.github/workflows/` on the Architect's branch) and confirm the build step no longer has `continue-on-error`. Then check the last three CI runs on the branch and report, per run, whether the build step passed and whether the run's overall status matched it. If you can, confirm the gate is real by pointing to a run where a build failure would have failed the run (or, if no such run exists, say so plainly — do not manufacture one).

**The deliverable.** A filing, `inbox/<UTC>-<seat>-CI-GATE-ci-gate.md`, with the workflow reading and the per-run results.

## Part 4 — The rest of the recent engine work: verify the landed claims (FOR: P-333)

**What it is.** Three more pieces landed just before the cosine, all verified by MUSE but not yet by the council:
1. **The six flex rules** (`9c3a7701`): EDGE→DT, ILB→OLB, CB→FS, EDGE→OLB, OT→OG, CB→SS all moved from 0 to 2. (SS→NICKEL stays at 0 — the Owner never approved it.) The flex counts should be 17 at 0, 17 at 2, 42 at 6, 23 at 12.
2. **The product pack** (`39a91a43`): the 2023–2025 pool baked to JSON (`data/packs/nfl-pools-fit2023-2025.json`), 2,990,032 bytes, loader hash `pack53:0ff47e1de5e2db`. The pack should load and run with zero table holes.
3. **The derived priorities fix** (`a062597f`): the lineup priority constants (ILLEGAL / PLAYS / EMERGENCY) are now computed per call instead of being hard-coded literals. Behaviour at today's scale should be unchanged.
4. **The OT clock fix + FB→TE 6→2 + lineup-test rewrite** (`fe611cbd`): the OT clock should read "OT mm:ss", FB→TE should be 2, DIME stays at 12 and is asserted.

**Your job:** run the full suite and report the count. Then verify each claim by running the code yourself (not by reading the commit message): read the flex counts from the engine files, load the pack and confirm it runs with zero table holes, and confirm the OT clock format and the FB→TE value. If any claim does not reproduce, say so plainly with the output you got.

**The deliverable.** A filing, `inbox/<UTC>-<seat>-P-333-recent-engine-work.md`, with the suite count and a verdict per claim.

## How to work

- Take the top item you can do and do it, or leave it for someone else. Nobody is assigned to anything; work comes from this prompt and the queue.
- Push after every finished file. A timed-out chat loses unpushed work; a pushed commit survives it.
- Label every claim VERIFIED, REPORTED, INFERRED, or UNKNOWN. Do not present a measurement you did not run as if you ran it. Do not repeat Claude's or MUSE's claims as your own — run the check and report your own output.
- If you disagree with another seat's reading or measurement, say so with your own numbers, not with an opinion.
- File each part as its own file in your inbox. The first line is `SPEAKER: <seat> | TASK: <task>`, then a `FOR:` line naming the item (P-333 for Parts 1 and 4, P-375 for Part 2, CI-GATE for Part 3).
