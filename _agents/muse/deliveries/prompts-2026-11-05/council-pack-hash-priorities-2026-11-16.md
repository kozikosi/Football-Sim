# Prompt for the council — confirm Claude's pack-hash correction and validate the derived priorities

You are a member of the Football Sim council. You review and verify the Architect's and the Executor's work, and you propose improvements. You do not edit the product file and you do not push to the product branch. You push your own filings to your own council branch, after every finished file.

## Background (read first)

Two small items from the last verification round need closing out. This prompt covers both. It is short and narrow — do only these two parts.

**The pack hash.** Ernie found that the 2023–2025 pack's loader hash did not reproduce: the bake report claimed `pack53:0ff47e1de5e2db`, but the file hashes to `pack53:0e78e4db382f9f`. Claude corrected it at `f9991424`: the bake report now states the file hash and explains that `0ff47e1de5e2db` is the hash of the same pack with the product-world overrides (`clock=dt_pf`, `trans=computed`) that the totals-bar run applies — he had copied the run's printed hash, not the file's. A further nuance: one seat (VL) computed the hash with only the clock override and got `pack53:1fe065713f326b`, which differs from both. Your job in Part 1 is to confirm Claude's correction and explain the three values.

**The derived priorities.** Claude changed the lineup priority constants (ILLEGAL / PLAYS / EMERGENCY) from hard-coded literals to values computed per call (`a062597f`). The suite passes and the code is verified, but no seat in the last round measured whether the behaviour is unchanged at today's scale — one seat (Ernie) explicitly said that claim is REPORTED, not measured by him. Your job in Part 2 is to measure it.

## Part 1 — Confirm Claude's pack-hash correction (FOR: P-333)

**Your job:** read Claude's correction commit `f9991424` and the bake report (`tools/mathlab/results/current-era-pack-2026-11-16.md`) at the current Architect tip (state it). Then independently recompute all three hashes yourself, using the pack loader (`makePack` / `packHash` in `colors/src/core/pack.ts`):
1. The file as baked (no overrides) — should be `pack53:0e78e4db382f9f`.
2. With only the clock override (`clock=dt_pf`) — should be `pack53:1fe065713f326b`.
3. With both product-world overrides (`clock=dt_pf` and `trans=computed`) — should be `pack53:0ff47e1de5e2db`.

Report the three values you computed and whether each matches. Then confirm the bake report now states the file hash and explains the override hash. If any value does not match, say so plainly with your output. File as `inbox/<UTC>-<seat>-P-333-pack-hash-confirm.md`.

## Part 2 — Validate the derived priorities behaviour (FOR: P-333)

**Your job:** confirm that the derived priority ladder behaves identically to the old hard-coded literals at today's scale. Read the derived ladder in `colors/src/sports/nfl/engine/lineup.ts` (the `priorities` function) and the old literals it replaced (ILLEGAL 1e12, PLAYS 1e7, EMERGENCY 1e5 — from the commit message or the code comment). Then run the lineup optimizer on a set of fresh rosters (at least 1,000, at a fixed seed) under both the derived ladder and the old literals, and compare: the fill counts (how many spots are filled by emergency, by plays, by illegal) and the resulting lineups. Report whether the behaviour is identical (same fill counts, same lineups) or whether it differs, and by how much. If it differs, say where and why. Do not just run the suite and report that it passes — the suite passing does not measure behaviour. File as `inbox/<UTC>-<seat>-P-333-priorities-validate.md`.

## How to work

- Take the top item you can do and do it, or leave it for someone else. Nobody is assigned to anything; work comes from this prompt and the queue.
- Push after every finished file. A timed-out chat loses unpushed work; a pushed commit survives it.
- Label every claim VERIFIED, REPORTED, INFERRED, or UNKNOWN. Do not present a measurement you did not run as if you ran it.
- If you disagree with another seat's reading or measurement, say so with your own numbers, not with an opinion.
- File each part as its own file in your inbox. The first line is `SPEAKER: <seat> | TASK: <task>`, then a `FOR:` line naming the item (P-333 for both parts).
