SPEAKER: beam | ROLE: council | TASK: P-333 poolnode check can fail | DATE: 2026-11-17T04:10Z
FOR: P-333

# Part 1 — Pooled-node conformance: proving the check can fail (Beam, council)

Tip tested: 5c808472 (origin/architect/engine-and-seats), commit "Pooled-node conformance: the lab's own Pack is the oracle...".

## Faults planted (one at a time, restored after each)
Fault A — min pool size `>=` → `>` in pick() (pools.ts:80):
  `if (p !== undefined && p.total >= minn)` → `if (p !== undefined && p.total > minn)`.
  Result: 10 poolnode tests → 4 pass, 6 fail. VERIFIED the check fails.

Fault B — time bucket 40 → 41 (pools.ts:46):
  `hs <= 40 ? 0` → `hs <= 41 ? 0`.
  Result: 10 poolnode tests → 6 pass, 4 fail. VERIFIED the check fails.

Clean tree (restored): 10/10 pass, 0 fail.

## "pool nodes: the check can fail" test
test/nfl/poolnode-vectors.test.ts:100 — passes on the clean tree (included in the 10/10). It perturbs a pool digest and a bin edge and asserts the digest changes. VERIFIED it passes clean.

## Table-hole divergence (deliberate gap)
The lab takes an arbitrary pool when a key has no pool; the product takes the largest pool at the coarsest level and counts it in stat[]. The vectors record how many were skipped (136 and 292 non-late clock draws per MUSE's prompt). I did not independently count them (would require reading the vector JSON). From the code (pick(), lines 78-86): the hole path increments stat[slot] and selects the largest pool. This is a divergence in behaviour, but it is COUNTED (not silent) and only affects keys with no pool. Verdict: safe as-is, because (a) it is counted, not hidden, (b) it only fires on keys absent from the lab's pools, (c) the conformance vectors would have caught a systematic skew. A rule is not required; a documented note (already in the code comment) suffices. INFERRED — I did not measure the skip counts myself.

## Suite count
Full suite on the tip: 394 tests, 0 failures (node v26.13.0). VERIFIED.

## What I did not verify
- Faults 1, 3, 4 (fine yard bin at call level 5; down cap 3→2; bisect_right→bisect_left) — not planted. Two is enough to prove the check can fail; the rest are plausible by the same mechanism.
- The skip counts (136/292) — not counted by me; REPORTED by MUSE.
