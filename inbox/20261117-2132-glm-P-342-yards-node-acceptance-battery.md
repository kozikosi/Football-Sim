SPEAKER: glm | ROLE: council | TASK: P-342 Part 2 — yards-node acceptance battery | DATE: 2026-11-17T21:32Z
FOR: P-342 (the yards-node item rides the pass-class family; no separate queue id exists yet — MUSE may attach one)

## What this is

An acceptance battery for the **yards node** the Architect's bake report names as "the next node" (`tools/mathlab/results/glm-pass-class-2026-11-17.md`: "Yards on a completion are still the pool's within-class mix; a GLM or quantile node for them is the next node"). The battery is a spec, not an implementation: it names what a candidate must pass before the Architect ships it. Scope v1: **yards on completions** (the report's stated next node); if the candidate also models sack-loss or INT-return yards, every item applies per class.

**Headline rule (verbatim from the round): must beat the within-class mix or it does not ship.** The pool's class-then-tuple sampler — class from `passClass`, tuple conditional on the class (`rec` tag, unchanged) — is the baseline the candidate has to improve on, measured by the same state-bucket machinery my Part 1 filing used.

## §5 form (applies to the candidate)

- **Target build:** any extract the Architect names as a yards-node candidate, file + sha256 stated at build time. The battery runs in a clean extract of that tip.
- **WHERE (anchors, current tree):** `colors/src/sports/nfl/sim/passclass.ts` (node pack + `loadPassClass`/`passFeatures`/`passClassProbs`), the class-then-tuple sampler in `pools.ts`/`game.ts` (rec tag), `tools/glm-bar.ts`, and my harness `glm-bucket.ts` (on `council/glm` at `_agents/glm/deliveries/glmnode-probes/`).
- **old → new:** the outcome detail stays the pool's within-class mix → the candidate draws yards from its own model (GLM or quantile), conditioned on the drawn class.
- **WHY:** Part 1 VERIFIED the pool's within-class mix is faithful but coarse; a yards node must buy real calibration, not just move noise — and Part 1 also proved the class node already shifts aggregates ~1% (sacks −1.07% z −5.9, drives −1.05% z −19.9), so the yards node must not stack more unexplained shift.
- **SAFE ALONE?** Every item below is additive to existing tests; nothing touches `DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `RATING_SPECS`, or `flex.json`. The node is opt-in (`passClass`-style option); default-off is bit-identity (A6).

## The seven coverage items

### A1 — Beat the within-class mix (headline; kills the candidate if it fails)

- **What:** extend the state-bucket harness to yards: buckets = down(4) × dist(7) × ydlC(5) = 140, track **mean yards per completion** implied vs realized on pool-node states (mechanism (B)) and paired per-game realized diffs (mechanism (A)), 120,000 paired games on the default packs. Run the same harness with the node OFF (baseline = within-class mix) and ON (candidate).
- **Pass:** candidate's summed absolute per-bucket (B) in yards-per-completion ≤ **0.9 ×** baseline's (a ≥10% calibration improvement), **and** the mean paired |realizedDiff| reduction is significant (paired per-bucket diffs, α = 0.05, 140 buckets). Secondary guard: no bucket with n ≥ 5,000 pass snaps has its |(B)| grow by more than **+0.5 yards** unless offset by an equal sign flip in the same direction across its ytg neighbors (a stated, checkable rule — list any exceptions in the report).
- **HOW TO CHECK:** copy `glm-bucket.ts` to `glm-yards.ts`; replace the class tally `rate(TP, c)` with a yards tally `ySum / yN` on completions (oc = comp0). Command: `node --experimental-strip-types tools/glm-yards.ts 120000` twice (node off / on); expected: the pass line `overall (B) ... ypc` for each, and the printed improvement ratio ≥ 0.90. The current harness's per-bucket plumbing, bins and OT handling are already correct (Part 1 receipts); only the tally changes.
- **SAFE ALONE?** Yes — harness-only until a candidate exists.

### A2 — Per-bucket calibration bounds

- **What:** from the same A1 output, overall (B) yards per completion must be inside |z| ≤ 2, and no bucket with n ≥ 3,000 may sit beyond |z| ≥ 5. Outliers are **listed in the candidate's report, not hidden** — Part 1 showed the class node's overall z −6.0 came from concentrated near-cancellation; the same accounting is required here.
- **HOW TO CHECK:** the A1 run's per-bucket table; grep the top-|z| section; expected: no line beyond the bound, or an explicit named-exception block with the Architect's reasoning.

### A3 — Aggregate non-regression (glm-bar)

- **What:** `node --experimental-strip-types tools/glm-bar.ts 120000` with class node off vs off+yards vs (already-shipped) class+yards. Bounds: every metric within the Owner's 10% bar (trivially), **and** the candidate may not add an aggregate shift beyond |z| ≥ 4 that the class node alone does not already show, and points must stay non-significant (Part 1: +0.19% z 1.8 at 120k with the class node).
- **HOW TO CHECK:** three paired runs; expected table; any new significant shift must be explained in the candidate's report with a state-bucket pointer (which buckets), the same standard my Part 1 filing applied to the class node.

### A4 — Sampler and partition invariants

- **What:** the yards pools must partition their parent exactly (same ids, same weights — the `probe-partition.ts` pattern, extended to the yards pool file); drawn yard frequencies equal the node-implied distribution on the node's own states (mean and SD within stated tolerance; chi-square-style identity like the bake report's class check); **0 holes-fallbacks** on canonical packs; the class-then-tuple **tag separation is preserved** — the shared-tag distributional test (mean completion yards within 0.5 of the pool node's; Part 1 planted it RED at 5.83 vs 11.28) must still exist and still kill the shared-tag mutation *when the yards node is on* (its failure mode is worse: one uniform would now condition yards too).
- **HOW TO CHECK:** `npx vitest run` (expect 406 + new tests / 0); run the partition probe against the yards pool file; expected: 0 failures, 0 holes-fallbacks, and the shared-tag plant RED under both node settings.

### A5 — Seam/tilt interaction

- **What:** at λ = 0 or gap = 0, the node with tilt replays the neutral log bit for bit (the class node's VERIFIED seam property — 60 games); with λ > 0, mean completion yards shift monotonically with the gap; keyed coupling holds: nothing changes before the first tilted pass.
- **HOW TO CHECK:** the `probe-seam.ts` pattern extended to yards; expected: gap −1/0/1 monotone in mean yards per completion, bit-identity at the seam, coupling check clean.

### A6 — Default-off, cross-version

- **What:** `runGame` without the yards option is **bit-identical** to the parent commit's `runGame` for ≥ 200 paired games (my `probe-defaultoff.ts` does exactly this across versions — 200/200 identical for the class node), and node-on differs on key 0. No new `Math.random()` sites, no holes.
- **HOW TO CHECK:** run `probe-defaultoff.ts` from the candidate extract against its parent; expected: `200 games identical, 0 differ` and `DIFFERENT (the node does something)`.

### A7 — Loader and mutation rejection; suite green

- **What:** the yards-pack loader refuses a named mutation list: wrong shape, wrong tag, wrong arity, non-finite parameters, non-monotone/quantile-boundary violations, bad version, and a shared-uniform (tag-coupling) plant — each fails a test, each fails loudly naming the field (the class loader's 7/7 standard, Part 1). Full suite green: `npm test` → 406 + N new tests, 0 fail; `tsc:check` at the pinned count (89); pmath lint: nothing new in `sim/` (stays 0).
- **HOW TO CHECK:** the loader probe pattern (`probe-loader.ts`) with 7 new mutations; the three gate commands. Expected: 7/7 refusals, gates green.

## Sequencing and authority

- The battery is **input to the Architect**, who owns what enters the build; bounds above are my proposal (INFERRED from Part 1's measured noise floors) and the Architect may tighten or relax them with one line of why. The headline rule (A1) is from the round and stands as stated.
- A candidate that passes A4/A5/A6/A7 but not A1 is a **better-labeled noise generator**: it ships only if the Architect explicitly waives A1 with the Owner's say-so (it would contradict the round's framing, so default is no).
- Anti-echo note: A1's improvement ratio must be computed on the **candidate vs within-class-mix** comparison, not on a candidate-vs-nothing difference, and the harness must be the *same* run pair for both arms (paired keys), so the ratio is not a property of key-domain luck — the exact failure mode glm-bar's 12k-vs-120k rows demonstrated (Part 1, VERIFIED).

## Verdict form for the candidate (what the Architect's ship note must contain)

For each of A1–A7: the command, the key output line, PASS/FAIL; the sha256 of the candidate; the named exceptions if any; and the class node's Part 1 receipts re-quoted if the tree changed under it (the battery does not re-open the class node unless the tree under `passclass.ts` changed).
