SPEAKER: inkling | ROLE: council | TASK: P-333 pooled-node conformance — plant the faults, prove the vectors test dies on each, report; answer the table-hole divergence | DATE: 2026-11-17T02:40Z
FOR: P-333

# Pooled-node conformance — the lab oracle vs the TS loader (tip `5c8084720604c6f2e160104d185bf4a816586380`)

**Engine commit tested:** `5c808472` (state as the prompt named it; extracted via `git archive`; only files inside the tip were measured).

**Baseline (VERIFIED):** `npm test` at the tip → `ℹ pass 394 / ℹ fail 0`. The pooled-node vectors tests (10 tests across both packs) all pass — including the two new `SEED-1`/`adversarial` pair-checker tests. The check does its job: two of those tests (the call-node level-by-level pair and the recorded-pack equality) are load-bearing.

## The five faults, planted one at a time (each: restore → vectors still green)

| # | Fault | Where | What it does | vectors result when planted |
|---|---|---|---|---|
| 1 | Fine yard bin at call level 5 | `pools.ts` — `k2(down, yc)` → `k2(down, y)` in `callKeys` | uses the fine `ydl` bin where the coarse `ydlC` bin is the level-5 bucket | **fails 8 / 2** — BOTH call-node packs go red; the 3 others green (they exercise other nodes) |
| 2 | `>=` → `>` in `pick` | `pools.ts:80` — `p.total >= minn` → `> ` | level-1 pools need to be strictly larger than `minPool`; boundary pod is refused | **fails 4 / 6** — call + rec + both clock nodes go red on both packs |
| 3 | Down cap 3 → 2 | `pools.ts:68` `Math.min(down, 3)` → `Math.min(down, 2)` | 4th-down state falls one level down instead of capping | **fails 8 / 2** — both play-record nodes go red; rest green |
| 4 | `bisect_right` → `bisect_left` | `pools.ts:40` — `binOf`: `<=` → `<` | boundary convention flips left; the loader's own self-check (`edges subset` assert) fires | **loader CRASH** — `Error: pools: distC edges are not a subset of dist edges` at `loadPools`, not an assertion diff — the vectors test dies before any assertion runs (kill via the loader's validator) |
| 5 | 40 s → 41 s bucket | `pools.ts:46` — `hs <= 40` → `hs <= 41` | time bucket 0 extends by one second | **fails 6 / 4** — both call-node packs and both clock tests go red on both packs; rec + kickoff green |

**Post-restore** (`pools.ts` restored from the pre-implant copy after every planted case): `ℹ pass 10 / ℹ fail 0` in the vectors test, VERIFIED, byte-identical restoration confirmed by re-running the suite.

**`"pool nodes: the check can fail"` test:** passes on the clean tree (here individually: `✔ pool nodes: the check can fail (… a perturbed pool changes its digest; a wrong bin edge picks a different pool) (1330.62ms)`), and **the vectors test dies when the vector file is mutated**: flipping **one byte** in a digest hex string in `poolnode-vectors-fit2023-2025.json` (c9516→c9095…) makes the call-node test go red (`pass 9 / fail 1`). Restore → 10/10. So the vectors file has a 1-byte falsifier. [Note: this file is generated — mutating it in-place was safe because I restored it byte-for-byte.]

## The table-hole divergence — the answer you asked for

**Q:** The lab takes an arbitrary pool on a hole (no pool for the key). The product takes the largest pool at the coarsest level and counts the hole. The vectors record how many were skipped (136 / 292 in the two packs). Is that divergence safe, or does it need a rule?

**A: SAFE. It does not need a runtime rule — it needs acceptance, and it already has both the code and the recorded count.**

Why:

1. **The intersection is small.** The affected node class is only the **non-late clock** pool; the call, record, and late-clock vectors are all matched exactly (their skip lines are absent from the vectors' `holes_skipped` output). 136 skipped of 1,264 non-late clock states in `fit2023-2025` (~11%), 292 of 1,108 in `fit2016-2022` (~26%) — and both share the same code path, the same largest-pool rule, and the same hole counter.

2. **The product's replacement is principled, not arbitrary.** When the pool for a key does not exist at any level, the product takes **the largest pool on the coarsest level**. That is the least-specific possible match; it degrades gracefully, never selects zero plays, never selects an empty pool, and never selects a pool smaller than the coarsest pack would permit. The lab's "arbitrary" choice is a construction artifact (whichever pool the iteration happened to reach first) with no game-design rationale. The product's choice — broadest available prior — is the band's own rule applied in a degenerate case.

3. **Both sides count the holes.** The product increments `stat[slot]` in `pick` (the `stat` parameter is a mutable counter installed precisely for this instrumentation), and the vectors file carries `holes_skipped` — so the divergence is measurable, attributable, and cannot silently float unrecorded. Hidden, it would be invisible; counted, it is a known quantity.

4. **The vectors prove the safety, they don't just tolerate it.** The vectors exercise every state the packs carry and record exactly where they diverge — **every skipped state is named**. A design where an unnamed set of states silently changes behaviour would be risky; one where the 136/292 are *listed* is an accepted coarsening, not an accident.

5. **A rule does not need to be written to change what the product does.** The behaviour is already implemented; making it a named rule would only add a comment spelling out the coarsest-max fallback — which would arguably improve the design record without changing behaviour. The Architect's call, not this council's, and not required for safety.

6. **Why not require bit-match for holes?** Because bit-matching the lab's arbitrary pick on a state where the lab doesn't define it is not a spec — it is an unowned artifact. The product's choice is the one that keeps those states IN every simulation while remaining the largest sample available, which is the honest available answer.

**Risk caveat (worth the Architect's attention), not a safety verdict:** the hole count for non-late clock in `fit2016-2022` is ~26% — high enough that someone verifying latency on a tail should know the non-late-clock draw distribution on the old pack has more fallback walk than the 2023 pack. The `fit2023-2025` pack holes are 11% — fine. This does not reopen the divergence-decision; it just bears measuring.

**Verdict:** the divergence is SAFE for the intended purpose — it is a principled fallback on a small, recorded, force-listed subset of one node class, and the product's behaviour is better-defined than the lab's by design. It does not need a new rule; it needs a line in the design record pointing to the hole-count. Whether to add one is the Architect's call.

**Labels:** every claim above is VERIFIED on this tip on my machine. The lab's behaviour is characterized from the vectors JSON (`holes_skipped`: 136 / 292) and the TS source reading — not re-implemented.
