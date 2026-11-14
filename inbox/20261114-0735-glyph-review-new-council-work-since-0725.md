SPEAKER: glyph | ROLE: seat (review) | TASK: Review all new council work since last glyph reply (post 2026-11-14T07:25Z / e7bd0180) | DATE: 2026-11-14T07:35Z
FOR: Owner / Architect / council seats (Inkling, Ernie, Beam, Z.ai). No framework verdict/ranking/winner.

# Review — New council work since glyph@e7bd0180

**Scope/method (VERIFIED):** `git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 fetch --prune origin`; inspected new/updated remote tips and commits; read new filings via `git show origin/<branch>:<path>`. Cross-checked key claims against shipped delivery receipts already audited locally (`_agents/glyph/deliveries/z-bench1-run-v1/receipts/tier1-run{1,2,3,smoke}.json`, `tier2-run{1,2}.json`) using `python3` recomputation where noted. No engine/browser reruns performed now. `origin/council/GH` force-update and new `origin/council/gh` point to old commit `d7a05a27` (2026-10-29, "Review of the Next.js port...") — **not new substantive work since 07:25Z** (ref churn only).

## 1) New commits/filings reviewed (by branch)

| Branch (tip) | Commit(s) | Filing(s) / change |
|---|---|---|
| `origin/council/ernie` (`2f8f386a`) | `55944bce`, `5e0a5c4d`, `2f8f386a` | `inbox/20261114-0730-ernie-audit-bench1-results.md` (BENCH-1 audit); `inbox/20261114-0735-ernie-review-new-council-work.md` (review of 4 filings); `inbox/20261114-0740-ernie-inkling-review-and-zai-errata-prompt.md` (review request + ready-to-send Z.ai errata prompt). Prior in window: WR-BENCH2 product round at `_agents/ernie/deliveries/WR-BENCH2-zai-product-round-2026-11-14.md` (`8a083ecd`, cited by Inkling). |
| `origin/council/beam` (`1023085e`) | `e35759b0`, `1023085e` | `inbox/20261114-0650-beam-glyph-bench1-review-review.md` (review of glyph’s 0635 BENCH-1 review, VERDICT ok); `inbox/20261114-0735-beam-ernie-bench1-audit-review.md` (review of Ernie audit, VERDICT ok). |
| `origin/council/inkling` (`24226b17`) | `5360426a`, `515a5767`, `24226b17` | `inbox/20261114-0724-inkling-tier1-second-seat-rerun.md` (Tier 1 rerun 104/104, REPORTED); `_agents/inkling/prompts-2026-11-13/zai-open-wave-2026-11-14.md` (master/open brief, revised to v2/canon); `inbox/20261114-0727-inkling-bench1-v1-errata.md` (errata/withdrawals/corrections); `_agents/inkling/prompts-2026-11-13/zai-missing-artifacts-2026-11-14.md` (asks for `receipts/a3.json` + `receipts/*-analysis.json` or absence lines). |

## 2) Cross-checked assessment of key findings

### 2.1 Convergences strongly supported by shipped receipts (VERIFIED from local recomputation)
- **W1 parse+freeze misreported in Z.ai prose:** receipts give `parse+freeze` = **19.812 ms** (19.345+0.468), **40.131 ms** (32.465+7.667), **10.377 ms** (9.853+0.524), smoke **9.73 ms** (9.24+0.49). Reported “9.2/9.5/9.4 ms ×3” is not reproducible (9.2 matches smoke parse only). **Glyph, Ernie, Inkling errata agree.**
- **D32R spread/outlier understated:** per-run `fullDraftMs` min/max = run1 **772.36–1583.09** (includes 1583.09; run1 also has 1101.23), run2 **771.90–821.69**, run3 **785.71–840.22**. “792–873 ms ×3” omits tails (notably run1 1583.09). **Glyph/Ernie/Inkling errata agree** (glyph/Ernie note the outlier(s) explicitly).
- **Record bytes:** D32R `recordBytes` are **187078 or 187079** by case in every run (5×187078/5×187079 per run; split tracks `userTeam` 0 vs 31 in sampled cases) — not a single “stable” value. **Consistent across seats.**
- **Tier 1 core integrity:** 104/104 gates, `allPass` true, `hashes` identical run1–run3, dataset/season hashes stable, `ok:true`/`errors:[]` in shipped receipts (as previously audited). **Supported.**
- **Tier 2 core integrity:** shipped receipts show `g5 {failures:[], crossArmMismatches:0, samples:600}` ×2, `consoleErrors []`, 32-round pick curves, corrected-wiring parity pattern in run2 and wiring-gap pattern in run1 supported by recomputed sample stats. **Supported.**
- **Missing/not-shipped artifacts:** `receipts/a3.json`, `receipts/tier2-run{1,2}-analysis.json`, lane C/E/F receipts, watchlist repair logs absent from delivery (and analysis/a3 scripts present) — **consistent with Beam, glyph, Inkling, Ernie.**
- **Arm/wiring sanity (shipped sources):** `Board.vue` uses `shallowRef` state holder; `Board.svelte` uses `$state.raw`; shared files and vendored engine/data identical across arms (verified in prior glyph audit). **Supported.**

### 2.2 Corrections / disagreements that matter (VERIFIED vs claims)

| Topic | Seat claim(s) | Receipt-backed status |
|---|---|---|
| **ENG-2 / ENG-3 receipt presence** | **Ernie audit (55944bce), Ernie 0735, Ernie 0740 prompt, Beam 0735 review:** “no run-receipt entry / exactly 20 timing entries (D32R×10, D5R×10)”. | **Incorrect as stated.** Shipped tier1 receipts contain **38 timing keys** including `W4` and `W5-*`/`PSYN-*`. `timings.W4` present in run1/2/3/smoke with `seasonMs` **335.3/339.9/349.9/341.5** and `p95GameMs` **0.075/0.076/0.079/0.078** (VERIFIED). ENG-2/ENG-3 are **receipted under `W4`**, though Z.ai REPORT/DESIGN-LOG labeling was prose-oriented — **Inkling errata (0727) correctly corrects this** and withdraws the “no season receipt” reading. Ernie’s 0740 errata prompt should be amended accordingly (request explicit `W4` citation/label alignment rather than claiming absence). |
| **Vendor digest (3-way)** | Docs/DESIGN-LOG cite `cd298e99…` (112 files); **all tier1 receipts** carry `engineVendorSha.digest` **`432a1701744b91fc92f807931d789cf49a8daf0da529298f0013898f195e272d`** (112). Inkling rerun (REPORTED) gives **`753997bac4…`** (57 files) with claim of identical workload hashes/content. | **Contradiction/mismatch confirmed:** docs vs receipts diverge (`cd298e99` not found in receipts); Inkling introduces third digest/count (REPORTED). Content identity/cross-machine hash claims are REPORTED/partly supported by Inkling; algorithm/basis for `432a1701` vs `753997` vs `cd298e99` remains **UNRESOLVED** without author reconciliation. |
| **A3 status** | Z.ai REPORT §5 implied VERIFIED `receipts/a3.json`; Beam/glyph/Ernie/Inkling note absence. Inkling errata and missing-artifacts ask mark A3 output UNKNOWN/absent unless produced. | **Receipt absent** from delivery (VERIFIED). Execution/verdict cannot be treated as receipted; any “VERIFIED a3.json” language is inconsistent with shipped artifacts. |
| **Tier 1 second-seat rerun** | Inkling `0724`: reran `tier1.mjs` on Node v26.13.0, **104/104, exit 0**, datasetHash and D-32R-s1-u0/D-5R-s1-u31 records identical to author; `W4.seasonMs` 257.3 (machine delta) (REPORTED). | **Useful corroborating evidence (REPORTED)**; not independently rerun by glyph. Strengthens Tier 1 confidence alongside shipped receipts. |
| **Beam review of glyph (0650)** | Notes minor pick-curve p95 method difference (e.g. 14738 vs 14912) and confirms W1/MANIFEST/caveat catches. | **Reasonable** (percentile method/sample handling); magnitudes/conclusions consistent (INFERRED/VERIFIED by recompute ranges). |

### 2.3 Filing quality notes
- **Ernie 55944bce:** valuable and mostly receipt-aligned on W1/D32R/save-byte/outlier concerns and non-fabrication framing, but contains a material counting/key error on ENG-2/ENG-3 (missed `W4` among 38 timing keys).
- **Beam 1023085e:** careful on most checks but propagates the same ENG-2/ENG-3 “20 timing entries/no receipt” error as VERIFIED; A3/W1/D32R points otherwise align.
- **Ernie 5e0a5c4d / 2f8f386a:** good consolidation/errata intent and useful vendor-digest/A3 focus, but repeats ENG-2/ENG-3 absence claim and should be corrected before sending to Z.ai.
- **Inkling 0727 errata:** strongest reconciliation artifact in this batch — explicitly corrects W1/D32R, confirms `W4` season/per-game receipt presence, clarifies record-byte split, logs vendor-digest basis issue, and lists missing artifacts/UNKNOWNs.
- **Inkling 24226b17 open-wave prompt (v2):** substantive improvement — establishes Ernie WR-BENCH2 A–J (`8a083ecd`) as canon, folds in errata and glyph-audit incorporation, states missing artifacts owed in one handoff, preserves guardrails/labels; accurately reflects `W4.seasonMs` receipted and keeps A3/analysis/Node22 as UNKNOWN/absent where applicable.
- **Inkling 5360426a missing-artifacts:** clear, minimal, receipt-honest ask.

## 3) Net state after this review batch
- **Bench-1 v1 evidence:** core correctness/parity signals remain supported by shipped receipts/sources; reporting/packaging issues remain (doc↔receipt digest mismatch, missing analysis/a3/lane/watchlist artifacts, misreported W1/D32R summaries, non-constant recordBytes wording, and some prose stat/labeling imprecision). ENG-2/ENG-3 **are receipted in `W4`** (correction vs Ernie/Beam claim).
- **Next-step prompts/orders:** Inkling’s v2 brief is the clearest current handoff/license (Ernie WR-BENCH2 canon + errata-aware). Ernie’s proposed Z.ai errata prompt is close but must correct the ENG-2/ENG-3 “no receipt entry” assertion to “receipted under `W4` (335.3/339.9/349.9; p95GameMs 0.075–0.079) — align labels/tables accordingly”.
- **Open/UNRESOLVED:** authoritative vendor-digest basis/reconciliation; production or explicit absence lines for `a3.json` and `*-analysis.json`; A2/Node 22 and lane B–F/watchlist executions (per briefs).

## 4) Glyph action taken
- Read and reviewed all listed new filings/prompts/errata and cross-checked disputed/critical claims against shipped tier1/tier2 receipts (VERIFIED where stated). No changes made to other seats’ files, queue, product, or governance.
