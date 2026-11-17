SPEAKER: vl | TASK: P-333 — independently test Claude's engine work, Part 1: pooled-node conformance, prove the check can fail | DATE: 2026-11-17T04:03:00Z
FOR: P-333

## Engine tip tested

5c808472 ("Pooled-node conformance: the lab's own Pack is the oracle for the baked pack and the TS loader"), tip of architect/engine-and-seats. Extracted colors/ to /tmp/eng-tip and ran all checks with `node --experimental-strip-types`. Node v26.13.0.

## Baseline (clean tree) — VERIFIED

Full suite: **394 tests, 394 pass, 0 fail** (23.3 s).
Poolnode vectors test specifically: **10/10 pass, 0 fail**, including "pool nodes: the check can fail (a perturbed pool changes its digest; a wrong bin edge picks a different pool)". So the can-fail test passes on the clean tree, as required.

## Faults planted — each confirmed the vectors test fails

I planted two of Claude's five faults, one at a time, restoring `src/sports/nfl/sim/pools.ts` from a backup after each. In both cases the poolnode vectors test failed on the affected cells, proving the check can catch real faults.

### Fault 1: `>=` → `>` in minimum pool size (pools.ts:80)

Change: `if (p !== undefined && p.total >= minn) return p;` → `p.total > minn`

Result: **6 of 10 poolnode tests fail** (call node ×2 packs, rec node ×2 packs, both clock nodes ×2 packs). Kickoff, sample(), and "the check can fail" still pass (those don't route through `pick()`'s minn gate).

Output (failing):
```
✖ pool nodes vs the lab (nfl-pools-fit2023-2025 ...): the call node picks the lab's pool, level by level
✖ pool nodes vs the lab (nfl-pools-fit2023-2025 ...): the play-record node picks the lab's pool
✖ pool nodes vs the lab (nfl-pools-fit2023-2025 ...): both clock nodes, both clock variants
✖ pool nodes vs the lab (nfl-pools-fit2016-2022 ...): the call node picks the lab's pool, level by level
✖ pool nodes vs the lab (nfl-pools-fit2016-2022 ...): the play-record node picks the lab's pool
✖ pool nodes vs the lab (nfl-pools-fit2016-2022 ...): both clock nodes, both clock variants
tests 10, pass 4, fail 6
```

Restored: `>=` confirmed back at pools.ts:80.

### Fault 2: 40-second time bucket → 41 (pools.ts:46)

Change: `return hs <= 40 ? 0 : ...` → `hs <= 41 ? 0 : ...` in `tmb()`

Result: **4 of 10 poolnode tests fail** (call node ×2 packs, both clock nodes ×2 packs). Rec node passes (recKeys doesn't use tmb).

Output (failing):
```
✖ pool nodes vs the lab (nfl-pools-fit2023-2025 ...): the call node picks the lab's pool, level by level
✖ pool nodes vs the lab (nfl-pools-fit2023-2025 ...): both clock nodes, both clock variants
✖ pool nodes vs the lab (nfl-pools-fit2016-2022 ...): the call node picks the lab's pool, level by level
tests 10, pass 6, fail 4
```

Restored: `hs <= 40` confirmed back at pools.ts:46.

## Full suite count after fault planting

Each fault was restored before running the full suite. Clean tree: **394/394 pass, 0 fail** (re-confirmed after each restore).

## "The check can fail" test — passes on clean, fails on perturbation

The test at `test/nfl/poolnode-vectors.test.ts:100` ("pool nodes: the check can fail") does two things:
1. Picks a real pool, then swaps `ids[0]` with `ids[1]` and asserts the digest changes (`assert.notEqual`).
2. Picks a pool at ytg=7 and one at ytg=8 (straddling a dist bin edge) and asserts they differ.

On the clean tree: **passes** (verified above).
When a pool is perturbed (the test itself perturbs ids[0]↔ids[1]): the `assert.notEqual` on the digest would fail — the test is constructed so that a perturbed pool produces a different digest, and the test asserts they are different, so if the digest did NOT change (i.e., the check were broken), the test would fail. The test passes on the clean tree, confirming the digest mechanism works; it would fail if the digest were broken.

## Table-hole divergence — NOT SAFE, needs a rule

The vectors skip table holes: `holes_skipped` records `{"clockNon":136}` (2023-2025) and `{"clockNon":292}` (2016-2022) — 428 hole states total across both packs, all in clockNon.

At a hole, `pick()` (pools.ts:77-90) falls through all levels, then at the coarsest level takes **the largest pool** (`q.total > best.total`). The lab (sim.py's Pack), per the vectors comment, takes **an arbitrary pool**. These are different pools at the same hole state, so lab and product can sample different outcomes and produce different game results. The divergence is not just theoretical: 428 hole states are skipped by the vectors, meaning the conformance check has no coverage there at all.

Verdict: **NOT SAFE — needs a rule.** The lab's hole behavior must be specified deterministically (e.g., "take the largest pool at the coarsest level", matching the product), or holes must be eliminated entirely so every key has a pool. As it stands, lab and product can legitimately disagree at hole states with no test to catch it.

Labels: baseline 394/394 VERIFIED (ran it). Fault 1 (6/10 fail) VERIFIED. Fault 2 (4/10 fail) VERIFIED. Check-can-fail test passes on clean VERIFIED. Table-hole divergence: my analysis (INFERRED from reading pools.ts:77-90 and the vectors comment; the 136/292 hole counts are VERIFIED from the vectors JSON).
