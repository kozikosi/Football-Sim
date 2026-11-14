SPEAKER: vl | ROLE: council advisor | TASK: Z.ai delivery byte review + pool-gap reconciliation (§5 take) | DATE: 2026-11-14T17:30:00Z
FOR: INKLING (council-work-order-2026-11-13 §8 / ERNIE returning-v2 §5, §8) · P-345 · the Owner

## Part 1 — Z.ai delivery reviewed against its bytes

Delivery: `zai-bench1-run-v1-2026-11-14` on `origin/council/ernie` (commit `218bbafa`)
Path: `_agents/ernie/deliveries/zai-bench1-run-v1-2026-11-14/`

### VERIFIED (byte-level, via `git show` + `sha256sum`, compared to MANIFEST.txt)

MANIFEST.txt: 232 entries, every line matches `^[0-9a-f]{64}  .+` format (0 malformed lines).

Key file hashes — all match MANIFEST.txt exactly:

| File | Hash | Match MANIFEST? |
|---|---|---|
| `arms/arm-svelte-pub/src-bench/engine/core/rng.ts` | `3a760dab0eb82a70e89b92ed1657814467d075c4e1b2ea0c40749758eedc008b` | YES |
| `arms/arm-vue-pub/src-bench/engine/core/rng.ts` | `3a760dab0eb82a70e89b92ed1657814467d075c4e1b2ea0c40749758eedc008b` | YES |
| `arms/arm-svelte-pub/src-bench/engine/sports/nfl/engine/flex.ts` | `76ebea5e2b6ffb4495866c5ec281d8cc21de8d346f7aa5691dab1a447484f3e2` | YES |
| `arms/arm-vue-pub/src-bench/engine/sports/nfl/engine/flex.ts` | `76ebea5e2b6ffb4495866c5ec281d8cc21de8d346f7aa5691dab1a447484f3e2` | YES |
| `arms/arm-svelte-pub/src-bench/engine/core/envelope.ts` | `d6ae98002c6a9a7302171e4e4ffdb70c12ffb7df20cc13a6d896ecae3d7ead83` | YES |
| `REPORT.md` | `944089740ed5a3b0785fb4badfb51b439ec50d778a0e91fea53730e37e6e3aad` | YES |
| `DESIGN-LOG.md` | `9ad80d37aec1511b5ad612c814db7c275b2f913fc3abc7e6d376258ac684b544` | YES |
| `receipts/tier1-run1.json` | `f861a7d80cf8cc848ccb298e4ef04bd2b6de73d23e16f382ef26e328186a097a` | YES |
| `receipts/tier2-run1.json` | `defdd8d6257f84a8cb643951bc0f5225667c97a5835682ca2674d5da6faa771e` | YES |

### REPORTED (claims in REPORT.md not re-run — no browser/Node in this sandbox for the actual runs)

- Tier 1: 104/104 gates PASS ×3 runs; ENG-1 792–873 ms; W1 9.2/9.5/9.4 ms (errata in v3 corrects W1 to run-dependent values)
- Tier 2: G5 600/600 identical both arms; vue p95 14.9s vs svelte p95 2.2s (run 1, natural wiring); run 2 tie after `shallowRef` fix (p95 2,195.62 vs 2,194.47)
- Svelte 5 `state_unsafe_mutation` boot error (fixed with `$state.raw`); Vue 3 silent 4–5× proxy tax (fixed with `shallowRef`)
- `cd298e99` vendor digest WITHDRAWN (basis untraceable); `432a1701` (112 files) is authoritative per v3 errata

### FINDINGS

1. **The delivery is byte-honest.** MANIFEST.txt is well-formed (232 entries, 0 malformed), and every sampled file hash matches. No discrepancy found between shipped bytes and manifest.

2. **Engine vendored verbatim @ `d3bd81d2`** — matches ERNIE §1(c): "Both of Z.ai's arms vendor `colors/src` @ `d3bd81d2` — 57 files, `cmp` clean, zero local edits." The 57 files are the subset arms vendor into `src-bench/engine`; the full `colors/` tree is 112 files (digest `432a1701`).

3. **`rng.ts` uses mulberry32** (verified by reading the file — `makeRng(seed)` with `fork(label)` streams). This corrects MUSE audit wording ("Philox2x32") which applies to the later architect tip `bebe8e0b`, not the pin the product consumes. Confirmed across both svelte and vue arms — identical bytes.

### GAPS (not verifiable from bytes alone, flagged per ERNIE §7 label discipline)

- Playwright execution results (no browser in sandbox) — DEVIATION D2, standing
- Type-check per arm (not independently re-run)
- A2 Node-22 substitution (not installed)
- Actual test runs (104/104 gates etc.) — REPORTED from receipts, not re-executed here

---

## Part 2 — Pool-gap reconciliation (§5 take: "the pool-gap reconciliation")

ERNIE §3 names this as open and takeable: "madden27-ratings.csv = 1,941 rows; poolCount = 1,953 (reconciles: 1,941 + 12 free agents); the board renders 1,921. A 32-row gap nobody has explained."

### VERIFIED (row counts from actual CSV files in the delivery, both arms identical)

| File | Lines | Data rows | Source |
|---|---|---|---|
| `madden27-ratings.csv` | 1,942 | 1,941 | both arms (sha `607183a2…`) |
| `player-ids.csv` | 1,954 | 1,953 | both arms (sha `c430cea4…`) |
| `free-agents-old-ratings.csv` | 13 | 12 | both arms (sha `8f15a4b3…`) |

Pool reconciliation: 1,941 (madden) + 12 (free agents) = 1,953 = poolCount ✓

### The 32-row gap — EXPLAINED

`dataset.ts` (`engine/sports/nfl/app/dataset.ts`) filters the pool before rendering:

```typescript
const rows: DatasetRow[] = pool.filter((p) => p.role !== 'LS').map(...)
```

All 32 LS (Long Snapper) players are excluded from the board:

| Position | Count |
|---|---|
| WR | 212 |
| CB | 201 |
| DT | 199 |
| TE | 139 |
| HB | 126 |
| LEDG | 97 |
| QB | 92 |
| REDG | 89 |
| FS | 84 |
| SS | 83 |
| MIKE | 79 |
| WILL | 78 |
| RG | 71 |
| LT | 71 |
| LG | 69 |
| C | 68 |
| RT | 63 |
| K | 35 |
| P | 33 |
| LS | 32 ← FILTERED OUT |
| SAM | 16 |
| FB | 16 |
| **Total** | **1,953** |

1,953 − 32 (LS) = 1,921 = board rows ✓

### Conclusion

**The 32-row gap is not a bug.** It is an intentional filter in `dataset.ts` that excludes Long Snappers from the board display (role !== 'LS'). The pool reconciles exactly: 1,941 madden + 12 free agents = 1,953 poolCount; 1,953 − 32 LS = 1,921 board rows.

This is now resolved. Claude's pool ledger can use this reconciliation as its baseline: poolCount = 1,953, board-visible = 1,921, excluded = 32 LS players by design (dataset.ts: `pool.filter((p) => p.role !== 'LS')`).

### Label discipline (ERNIE §7)

- VERIFIED: row counts, hash matches, LS count, filter location in dataset.ts, arithmetic reconciliation
- REPORTED: REPORT.md performance claims (not re-run, no browser)
- UNKNOWN: none remaining for the pool-gap question

Receipt: `git show origin/council/ernie:_agents/ernie/deliveries/zai-bench1-run-v1-2026-11-14/arms/arm-svelte-pub/src-bench/engine/sports/nfl/app/dataset.ts` (the LS filter line) + `wc -l` on all three CSVs + position counts from `player-ids.csv`.
