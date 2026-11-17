SPEAKER: ernie | ROLE: council | TASK: P-333 Part 1 — pooled-node conformance: plant the faults, prove the check can fail | DATE: 2026-11-17T05:20Z
FOR: P-333

**Tip tested: `5c808472`** ("Pooled-node conformance: the lab's own Pack is the oracle…"), the branch tip at the time of writing. Machine: node **26.13.0**, macOS arm64. All faults were planted one at a time in `colors/src/sports/nfl/sim/pools.ts` and the file restored after each (`diff -q` against a backup: **identical**).

# Clean baseline

```
$ node --test --experimental-strip-types test/nfl/poolnode-vectors.test.ts
ℹ tests 10  ℹ pass 10  ℹ fail 0
```

All ten pass, as claimed. The full suite is **394/394** (see the Part-4 filing).

# The faults I planted

| # | fault | planted as | result |
|---|---|---|---|
| A | minimum pool size `>=` → `>` | `p.total >= minn` → `p.total > minn` (pools.ts:80) | **6 of 10 fail** |
| B | the 40-second bucket → 41 | `hs <= 40 ? 0` → `hs <= 41 ? 0` (pools.ts:46) | **4 of 10 fail** |
| C | `bisect_right` → `bisect_left` | `at(edges, mid) <= x` → `< x` (pools.ts:40) | **the file fails at load: 1 "fail", 0 pass** |
| D | down cap 3 → 2 | `Math.min(down, 3)` → `Math.min(down, 2)` (pools.ts:68) | **2 of 10 fail** |

**Four of Claude's five faults planted and caught. I did not plant the fifth** (a fine yard bin at call level 5) because that is a *data* change inside the pack rather than a code change, and I could not locate the level-5 edge table in the time available — **UNKNOWN, not skipped silently.**

The failure output for each (abridged; full names are in the receipt):

```
A: ✖ …(nfl-pools-fit2023-2025 …): the call node picks the lab's pool, level by level
   ✖ …(nfl-pools-fit2023-2025 …): the play-record node picks the lab's pool
   ✖ …(nfl-pools-fit2023-2025 …): both clock nodes, both clock variants
B: ✖ …(nfl-pools-fit2023-2025 …): the call node picks the lab's pool, level by level
   ✖ …(nfl-pools-fit2023-2025 …): both clock nodes, both clock variants
   ✖ …(nfl-pools-fit2016-2022 …): the call node picks the lab's pool, level by level
D: ✖ …(nfl-pools-fit2023-2025 …): the play-record node picks the lab's pool
   ✖ …(nfl-pools-fit2016-2022 …): the play-record node picks the lab's pool
```

# Fault C needs a caveat

Fault C does **not** fail on a conformance assertion. It fails at module load, inside the pack's own validator:

```
Error: pools: distC edges are not a subset of dist edges
```

So the mutation is caught, but by the **loader's internal invariant**, not by the vectors. That is a weaker guarantee than A, B and D: it proves the loader validates its own bin relationships, and it does *not* prove the vectors would notice a wrong bin edge that keeps the invariant intact. I would not count C as a "the check can fail" demonstration without that distinction.

# The "check can fail" test itself

`pool nodes: the check can fail (a perturbed pool changes its digest; a wrong bin edge picks a different pool)` (line 100) **passes on the clean tree** — it is one of the ten.

I then mutated the digest to ignore multiplicities — `bump(m, label(id), c[k] as number)` → `bump(m, label(id), 1)` — which **kills 6 of the 10 tests**, but the **"check can fail" test still PASSES** (✔, 164 ms). That is a real finding about the test's scope: it proves the digest distinguishes *different players* and that a bin edge changes the pool, but **it is blind to the multiplicity component of the digest**. The conformance tests catch that; this one does not. It is not a tautology, but it is narrower than its name suggests.

# The table-hole divergence: is it safe?

**Claude's design:** on a hole (a key with no pool at any level), `pick()` falls back to **the largest pool at the coarsest level** (pools.ts:76-83). The lab, working from raw plays, **takes an arbitrary pool** there. The vectors record how many draws were skipped for this reason (136 and 292 non-late clock draws).

**My answer: the divergence is safe, and it needs no rule — for one specific reason.** The coarsest level is keyed by the **call** alone (`k4(call, down, dist, ytg)` collapses to `call` at the top level — pools.ts:68), so the fallback pool is the pool for *that play call*, which is exactly the population the lab is drawing from. The two sides are therefore sampling **the same distribution** and differ only in which member of it they pick when the fine-grained key has no support. That is a *sampling* difference, not a *distributional* one, and it is invisible to any downstream consumer that is not replaying the exact same draw sequence.

**The caveat that makes it conditional, not unconditional:** the moment anything needs *reproducibility* (a replayed game, a seeded comparison against the lab), the two will diverge on those 136 and 292 draws — the product will pick the largest pool, the lab an arbitrary one, and the box scores will differ. So the honest statement is: **safe for behaviour, unsafe for bit-replay against the lab.** If the Architect ever wants the lab and the product to agree draw-for-draw, the rule to add is one line: *on a hole, both sides take the largest pool at the coarsest level* — and the lab side changes, not the product's.

**Reason, not opinion:** the product's choice is the *deterministic* one (largest pool is a pure function of the pack); the lab's is not. When two implementations must agree, the deterministic one is the one to converge on.

# What I did not check

- The level-5 fine yard bin fault (a data change; see above).
- The 136 / 292 skip counts — I found no counter in the vectors' top-level metadata (`train`, `kick`, `minPool`, `minClock`, `plays`, `call`); the counts are **REPORTED by Claude, not independently counted by me**.
- The `sim.py` oracle itself — I trusted the vectors as the oracle's output, not the Python.