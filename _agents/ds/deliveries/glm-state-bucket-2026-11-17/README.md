# GLM pass-class state-bucket test — council/DS, 2026-11-17

Part 1b (headline) of the 2026-11-17 council prompt. A **REPORT**, not a gate.

- Tool: `state-bucket.ts`
  (sha256 `d8b691a6efc907b7937a479aa399b2d198028befb6852fa4b8c001e4307ece67`).
- Pin: clean extract of `origin/architect/engine-and-seats` at `65673a00`;
  Node `v26.13.0`. The repo was not edited.
- Run, from the extract:

  ```
  cd colors
  cp <this dir>/state-bucket.ts tools/state-bucket.ts
  node --experimental-strip-types tools/state-bucket.ts 12000 200
  ```

- Receipts in this directory:
  - `receipt-state-bucket-12000.txt` — the full 12,000-game run (200-rep seeded paired bootstrap).
  - `receipt-glm-bar-12000.txt` — the baseline `tools/glm-bar.ts 12000` table.
  - `receipt-suite-summary.txt` — `npm test` at the pin (406/406, exit 0).
  - `receipt-fault-shared-tag.txt` — the shared-tag fault planted in a scratch copy; the catcher fails.
  - `receipt-sampler-loader.txt` — 4th & 40 at the goal line (int pool), and the loader refusing `lambda = -1`.

## What it measures

12,000 paired keys, the same keys as `tools/glm-bar.ts` (`glm-bar:0..11999`).
For every pass snap it records the pre-snap state (down, yards to go, yards to
goal, score difference) and the outcome class under each node
(comp/inc/sack/int). Then:

1. per-bucket class rates, pools vs GLM, over 64 buckets
   (4 downs × 4 ytg bins × 4 field-position bins);
2. a Kitagawa decomposition of the overall class-rate shift:
   - `within = Σ_b w_pool(b) · (p_glm(b) − p_pool(b))` — the state mix held at
     the pools weights (a within-bucket bias);
   - `mix = Σ_b (w_glm(b) − w_pool(b)) · p_glm(b)` — the state mix moved
     (an artifact of the GLM visiting different states);
   - both weights renormalised over the buckets present under both nodes, so
     the two terms sum to the difference on the common support;
3. a model-vs-pool check at the **pools node's own states**: the GLM's
   `P(class|state)` against the pool cell's class mix, which isolates
   mispricing from path effects;
4. a score-state table and the drive/play context that connects the class
   rates to the drives shift.

The bootstrap resamples games (paired: one game carries both nodes), 200
replicates, seeded (`mulberry32(0xc0ffee)`); z = estimate / bootstrap SD. The
seed is for the receipt only; the engine's own draws are untouched.

## Headline

- Sack rate: pools 7.07% → GLM 6.97%, diff **−0.10 pp** (z −2.3);
  within-bucket **−0.10 pp** (z −2.2), state-mix **−0.00** (z −0.8).
- Model at the pools node's states: **−0.05 pp** (z −29.3) — the GLM's own
  sack probability is below the pool cell mix in the visited states.
- Drives: 11.038 → 10.920 (**−0.118**, z −6.4); scrimmage snaps per drive
  6.153 → 6.211 (**+0.059**, z 6.8). The drive count falls because the drives
  get longer, not because the state mix moved.
- Verdict: **within-bucket bias, spread, score-dependent; not a coarse
  state-mix artifact.**
