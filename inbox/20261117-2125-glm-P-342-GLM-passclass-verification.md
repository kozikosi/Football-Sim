SPEAKER: glm | ROLE: council | TASK: P-342 — verification of the Architect's pass-class GLM node | DATE: 2026-11-17T21:25Z
FOR: P-342

REVIEW-OF: pass-class GLM node on `origin/architect/engine-and-seats`, tip `65673a009b29035e8dc993279be656f12aa40a13` (full sha VERIFIED via `git rev-parse` in the extract), plus parent commit `5c808472` for the cross-version check. All runs in a clean extract under `/var/folders/.../T/opencode/glm-glmnode-65673a00/colors`, Node v26.13.0, `node --experimental-strip-types`. Harness and probes are on my branch at `_agents/glm/deliveries/glmnode-probes/`.

NOTE: MUSE's review file (`inbox/20261117-2017-muse-GLM-passclass-verification.md`) is not on `origin/council/muse` and not on disk — I proceeded from the Owner prompt alone, which was self-contained. MUSE's claims therefore stay REPORTED below.

## Suite and shape (VERIFIED)

`npx vitest run` on the extract: **406/406 passed, 0 failed**. The node's tests at `colors/test/nfl/passclass.test.ts:53-129` cover partition, hierarchy, seam, default-off, shared-tag.

## 1a — glm-bar reproduction (ok, improved by 120k)

- Command: `node --experimental-strip-types tools/glm-bar.ts 12000`. **VERIFIED**: reproduces the prompt's table exactly — all 11 metrics, diff/z rows identical, class-pool holes 0.
- Extended to 120k (`tools/glm-bar.ts 12000`, output saved as `glm-bar-120k.txt`): points **+0.19%** (z **1.8**, not significant), drives **−1.05%** (z **−19.9**), sacks **−1.07%** (z **−5.9**), pass_att −0.44% (z −11.1), plays −0.18% (z −8.0), yards −0.40% (z −7.5), giveaways −0.97% (z −3.6), top_dt −0.06% (z −5.3).
- Verdict: the prompt's 12k values for sacks (−1.72%) and points (+0.60%) were **key-domain noise** — they move between 12k and 120k. Drives and sacks shifts are **real** (~1%), points shift is **not established**. Report this as an improvement, not a rejection of the table.

## 1b — state-bucket test (headline; VERIFIED)

Design: buckets = down(1–4) × pack's own dist bins(7) × pack's own ydlC bins(5) = **140 buckets**; 120,000 paired games (`gameKeyOf('bucket:' + g)` same key for both arms). Three mechanisms measured on pass snaps (CALL.pass = 0; snap payload = before-state; OT snaps handled with payload qtr=5 → sd 0, qtr 2, hs 600):

- **(A)** per-bucket realized rates, pool arm vs GLM arm, paired per-game diffs.
- **(B)** model-implied minus realized *on the same pool-node states* (event-paired) — is the model's own calibration wrong given the states the sim actually visits.
- **(C)** mean implied sack prob over each node's own pass states (state-mix shift).
- Aggregate identity: `realizedDiff = C + B_pool − B_glm` — used to close the numbers.

Harness: `glm-bucket.ts`. Two bugs were found and fixed in **my own harness** before its numbers were trusted (counts added twice via walk+fold; `se()` divided by n twice — all z inflated by √n). Means were never affected; the SEs/zs below are from the corrected harness. Full outputs: `glm-bucket-2325.txt`, `glm-bucket-1622.txt`.

### Default pack (`nfl-pools-fit2023-2025` + `nfl-passclass-fit2023-2025`), 120k

- Pass snaps 8,206,539 (pool) vs 8,176,773 (glm); att/game 34.194 vs 34.070.
- Overall (B) on pool states: sack **−0.0536pp (SE 0.0089, z −6.0)**; on GLM states: **−0.0041pp (z −0.5)** — the model is consistent with its own sampler (realized class IS the drawn class when holes 0). The overall z −6.0 is **near-cancellation of concentrated cells**, not a broad offset.
- Concentration (B on pool states, sack):
  - ytg 1–2: **−0.905pp (z −17.0)** · ytg 12–16: **−0.688pp (z −18.7)** · ytg 17–99: **+1.193pp (z +24.8)**
  - down 4: **−0.657pp (z −10.7)** · ydl 82–99: **+0.361pp (z +11.2)** · ydl 1–6: −0.404pp (z −7.7)
  - **Worst single bucket**: d3, ytg 17–99, ydl 22–51, n 43.9k — pool realized 6.00% vs model implied 10.03%, (B) **+3.837pp (z 33.8)** (comp −7.907pp z −34.6).
- (C) from the identity: realizedDiff ≈ −0.04pp, B_pool − B_glm ≈ −0.0495pp → **C ≈ +0.01pp**. The state-mix artifact is **REFUTED** — the disagreement is not explained by the sim visiting different states than the data.
- Within-bucket confirmation (`probe-ytgwithin.ts`, 20k games, saved as `probe-ytgwithin-out.txt`): inside the worst bucket, implied sack prob is smoothly ~8.6–10.2% at every ytg 17–26 while realized is 4.2–6.7%; in-bucket total realized **5.44%** vs implied **9.64%**; share of snaps with ytg ≥ 23 only 19.3%. The over-pricing is **structural and smooth**, not a within-bucket mix effect.
- Pool faithfulness: L0 cells for 3rd&17+ mid-field hold 36–162 plays (≥ minPool 25), and the data-cell sack mix 2.8–9.3% brackets the sim realized 5.44% — the pool is faithful to its data. **The GLM over-prices 3rd&long sacks by ~4.5pp relative to its own pack's cells.**

### 2016–2022 pack (`nfl-passclass-fit2016-2022`), 120k — the drift contrast

- Overall (B) on pool states: sack **−0.6730pp (SE 0.0089, z −75.6)** — a **broad uniform offset** across every down/dist/ydl bin (e.g. ytg 1–2 −2.813 z −52.7, down 2 −0.834 z −58.5), realized rate −9.2% relative. That is what a real drift signature looks like.
- Verdict: the **default pack has no drift** — its residual is two orders of magnitude smaller and concentrated, while the old pack shows the uniform pattern. The disagreement inside the default pack is **smooth-vs-cell in thin cells**, not era drift.

## 1c — verdict on the Architect's default (one paragraph)

The Architect's default — GLM node enabled with the 2023–2025 pack — is **safe to keep as shipped** (VERIFIED evidence, INFERRED recommendation): overall team-level shifts are ~1% (sacks −1.07% z −5.9, drives −1.05% z −19.9, points z 1.8), the calibration residual on pool states is −0.054pp z −6.0 and is concentrated near-cancellation in thin cells rather than a broad bias, the model is self-consistent on its own states (z −0.5), the class-pool has 0 holes, and the only pack with a genuine drift signature (2016–2022) is not the default. The one real finding — 3rd&long sack over-pricing ~4.5pp (implied ~9.6% vs data-cell ~5.4%) — is structural, not a mix artifact, and lives in cells that pass the minPool bar but are thin (43.9k of 8.2M snaps in the worst bucket); whether GLM or the pool is closer to NFL truth there is **undecidable from pool+model alone** — it needs the raw nflverse cell counts, which are not in the repo. Recommended action: a known-calibration note in the bake report, not a change.

## 1d — node machinery (VERIFIED, independent re-runs)

- **Constants confirmed from the pack**: theta `[0.3,-0.2,-1,-0.6]`, lambda `0` (`probe-pr.ts`).
- **Shared-tag fault**: planted in a scratch copy of the tree (`glm-glmnode-fault` extract) — test goes **RED** (`GLM 5.83 vs pool 11.28 yards per completion`), GREEN when reverted.
- **Hierarchy fault**: planted `minn` check as `>= 1` — RED; GREEN when reverted.
- **Loader**: refuses **all 7** planted mutations (`probe-loader.ts`) — wrong-shape, wrong-tag, missing field, wrong arity, non-monotone theta, non-finite lambda, bad version.
- **Partition**: 1,603 pools, **0 failures** (`probe-partition.ts`); weight fidelity holds; 4th-and-40 cases resolved: int pool total 1,199/35, all int, **0 holes-fallbacks**.
- **λ seam**: gap −1/0/1 → comp **43.251/60.332/72.952%**, sack **18.166/7.180/2.299%** (monotone); at λ×gap = 0 the tilt returns `[...p]` exactly (identity).
- **pass_att**: reconciled **exactly** — count(call == pass) on the same keys equals the metric's pass_att (`probe-att.ts`).
- **Default-off, cross-version**: tip `runGame` without `passClass` vs parent `5c808472`'s `runGame` (imported via file:// from its own tree): **200/200 games bit-identical** (`probe-defaultoff.ts`, path fixed in the probe; output above). On the tip, no-option vs GLM-option on key 0: **DIFFERENT** — the node does something when enabled. The node is strictly opt-in, across versions.

## Per-claim verdicts

| # | Claim (source) | Verdict |
|---|---|---|
| 1 | Suite green on tip (Architect) | **ok** — VERIFIED 406/406 |
| 2 | glm-bar table, 12k (prompt) | **ok** — reproduced exactly; **improved**: 120k shows sacks/drives real (~1%), points not significant |
| 3 | Default-off (Architect) | **ok, improved** — now VERIFIED across versions (200/200 identical vs parent) |
| 4 | Partition / hierarchy / seam / shared-tag / loader tests (Architect) | **ok** — independent fault plants RED→GREEN; loader refuses 7/7 mutations |
| 5 | pass_att invariant (Architect) | **ok** — exact reconciliation |
| 6 | Mix hypothesis for pool-vs-GLM disagreement (bake report, INFERRED) | **REJECTED** — (C) ≈ +0.01pp; within-bucket probe shows smooth structural over-pricing |
| 7 | "Disagreement is benign" framing (REPORTED) | **improved** — real (z −6.0), concentrated in thin cells; drift refuted for default pack by the 2016–2022 contrast |

Held-out log-loss numbers in the bake report remain **REPORTED** (Claude's) — see BLOCKED.

## BLOCKED / OPEN / NEXT

**BLOCKED:**
- Held-out log-loss verification: raw nflverse data is not in the repo (`phase1/data/` is git-ignored). Claude's log-loss numbers stay REPORTED until someone with the data runs the same evaluation; the verifying command would be the bake report's own log-loss script pointed at `phase1/data/` with expected outputs stated in advance.
- MUSE's review file not pushed: Owner offered to push both to `council/muse` — once `inbox/20261117-2017-muse-GLM-passclass-verification.md` is on `origin/council/muse`, its claims can be checked against mine.

**OPEN:**
- Is GLM or the pool closer to NFL truth in 3rd&long thin cells? Undecidable from pool+model alone; needs raw data or an Owner ruling. Recommend a known-calibration note (Architect's file) — not a change.
- 12k vs 120k key-domain noise on glm-bar rows: fine in practice (the tool states its N), but a note on the tool would prevent future misreads.

**NEXT:**
- Part 2 (yards-node acceptance battery) — separate filing, same session.
- Part 3d F2/F3 adjudication and Part 4b/4a if budget allows.

Artifacts on `council/glm` at `_agents/glm/deliveries/glmnode-probes/`: `glm-bucket.ts` (harness), `probe-{pr,loader,partition,att,seam,ytgwithin,dumpfeat,defaultoff}.ts`, raw outputs `glm-bucket-2325.txt`, `glm-bucket-1622.txt`, `glm-bar-120k.txt`, `probe-ytgwithin-out.txt`.
