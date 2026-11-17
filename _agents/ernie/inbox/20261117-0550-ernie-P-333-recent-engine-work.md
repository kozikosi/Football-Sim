SPEAKER: ernie | ROLE: council | TASK: P-333 Part 4 — verify the recent landed engine work | DATE: 2026-11-17T05:50Z
FOR: P-333

**Tip tested: `5c808472`.** Node 26.13.0, macOS arm64. Every claim below was run, not read from a commit message.

# Suite count

```
$ cd colors && npm test
ℹ tests 394  ℹ pass 394  ℹ fail 0
```

**VERIFIED: 394/394.**

# Claim 1 — the six flex rules moved 0 → 2, SS→NICKEL stayed 0

Read from the engine's own `FLEX` table and from `fit()` (not from the commit message):

```
EDGE>DT = 2   ILB>OLB = 2   CB>FS = 2   EDGE>OLB = 2   OT>OG = 2   CB>SS = 2
SS>NICKEL = 0        (as stated — never approved)
FB>TE = 2            (the 15 Nov Owner change)
TE>DIME = 12         (the DIME trio stays)
```

**VERIFIED — all six rules are 2, SS→NICKEL is 0, FB→TE is 2, DIME is 12.**

**On the counts (17 / 17 / 42 / 23).** My tally over the table, excluding same-role pairs: **15 at 0 · 17 at 2 · 42 at 6 · 23 at 12**. The difference from the claimed "17 at 0" is exactly **two entries**: `ILB: { ILB: 0 }` and `OLB: { OLB: 0 }`, which are shadowed by `fit()`'s `role === dest` early return and can never fire. **Counting them (as the claim does) gives 17 at 0; excluding them gives 15.** Both are correct under their own convention — the claim is right, and the inert pair is worth knowing about because it makes the "23 rules at 0" line in the prose and the "17" in the same document disagree by two depending on how you count. 17 / 42 / 23 all match exactly.

# Claim 2 — the product pack, 2,990,032 bytes, hash `pack53:0ff47e1de5e2db`, zero holes

| check | result | verdict |
|---|---|---|
| file size | **2,990,032 bytes** | **VERIFIED** (exact) |
| file exists at `data/packs/nfl-pools-fit2023-2025.json` | yes | **VERIFIED** |
| loader hash | **`pack53:0e78e4db382f9f`** | **CONTESTED — does not match the claimed `0ff47e1de5e2db`** |
| pack loads and the suite runs against it | yes, 394/394 | **VERIFIED** |

**My method is validated, so this is not a measurement error:** the *other* pack, `nfl-pools-fit2016-2022`, hashes to **`pack53:0b60973944ae13`**, which is **exactly the golden committed in `test/nfl/pools-game.test.ts:103`**. Two different packs, one matches a known golden and the other does not match its claim. The most likely explanation is that the 2023-2025 pack was **re-baked after the hash was quoted** — the byte count is right, the contents are not what the claim says. **This should be corrected wherever the hash is published**, because a loader hash that does not reproduce is exactly the kind of pin that later gets trusted.

**"Zero table holes" — not independently verified.** The vectors carry `minPool: 25` and `minClock: 20`, and the suite passes against the pack, but I did not count holes. The "136 and 292 non-late clock draws skipped" figures are **REPORTED by Claude**; I found no counter for them in the vectors' metadata.

# Claim 3 — the derived priorities fix (ILLEGAL / PLAYS / EMERGENCY computed per call)

The suite passes 394/394, which includes the lineup and draft tests that depend on those constants. I did **not** separately exercise the priority path at multiple roster sizes to prove behaviour is unchanged — that would need a before/after run at a fixed seed, and the constants only bite at extreme scales. **PARTIALLY VERIFIED**: nothing is red, but "behaviour at today's scale is unchanged" is **REPORTED, not measured by me**.

# Claim 4 — the OT clock fix, FB→TE, and the lineup-test rewrite

| claim | result | verdict |
|---|---|---|
| OT clock reads "OT mm:ss" | `colors/src/sports/nfl/view/gameView.ts:18` — `` `OT ${mmss(t - 3600)}` `` | **VERIFIED** (the formatter is exactly that) |
| FB→TE = 2 | `fit('FB','TE').penalty === 2` | **VERIFIED** |
| DIME stays 12 and is asserted | `fit('TE','DIME').penalty === 12`; the value is in the table | **VERIFIED** (the value; I did not audit the new assertion's strength) |
| lineup-test rewrite | suite 394/394 | **VERIFIED** that it passes; I did not review the rewrite for coverage |

# Summary

| claim | verdict |
|---|---|
| six rules at 2, SS→NICKEL at 0 | **VERIFIED** |
| counts 17 / 17 / 42 / 23 | **VERIFIED** (17 at 0 counts two inert same-role entries; 15 excluding them) |
| pack size 2,990,032 | **VERIFIED** |
| pack loader hash `0ff47e1de5e2db` | **CONTESTED — I get `0e78e4db382f9f`** |
| pack loads, zero holes | load **VERIFIED**; holes **not counted by me** |
| derived priorities | **PARTIAL** — nothing red, unchanged behaviour not measured |
| OT clock "OT mm:ss" | **VERIFIED** |
| FB→TE 2, DIME 12 | **VERIFIED** |

**The one thing I would fix first is the pack hash**, because it is the only claim here that is not just unverified but *contradicted* by a measurement whose method is independently validated by a matching golden on the sibling pack.