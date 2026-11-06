# 03-lab-calibration — P-252 closeout, P-255 methodology, P-250 measurement + tuning finding, P-256 goldens, streaming, public page (w74 item 3a–3h)

**What this is:** the Lab work, measured and reported. Headline (P-250): **the three drafter policies separate decisively, but the proposed tuning lever is flat** — the CPU-draft spread cannot reach 90/35/25 (+ P(20-0) ≈ 1–2 %); no parameter value is proposed (the pre-registered rule stops the tuning); two follow-up experiments are pre-registered and need a ruling. Full read in **FINDINGS-P-250.md**.

**Verified receipts:**

| Item | Command / artifact | Result |
|---|---|---|
| 3a P-252 closeout | fresh worktree, `node --experimental-strip-types tools/outcomelab/sweep.ts 200 40` | **440 seasons reproduce** (Mode A 200 + B 40 + C 200); key metric lines byte-identical to the 2026-11-04 baseline report; re-run AGAIN at session end after the streaming smoke — same numbers (results/reproduce-run.log, results/model-report-2026-11-05.md) |
| 3b P-255 | `CALIBRATION.md` | the three policies defined, paired-seed methodology, bands as policy → target ± tolerance → N required, GLM's ±8pp-at-N=100 constraint adopted, pre-registration embedded in every run's JSON |
| 3c P-250 | `results/baseline-n1000.json` + `tune2-midfloor{14,18,24}-n240.json` + sharded `b-*.json` | baseline curve + **flat tuning ladder** + sharded corroboration (z ≤ ±0.19); the space-form override bug that invalidated the first ladder is documented in the findings |
| 3d P-256 | `test/nfl/golden-seasons.test.ts` + `tools/outcomelab/golden-seasons.json` | 5 seeds × 1 season, canonical box-score hashes pinned as the CI golden file; order-independence extended to full seasons (runs green in the suite) |
| 3e | `test/nfl/interleaving-determinism.test.ts` + `tools/outcomelab/determinism-1000.ts` | 1,088 games × 3 interleavings → identical digest (the same-bug lesson: hash canonically sorted, never in interleaved order) — CI gate, cutover-grade |
| 3f | `tools/outcomelab/edge-sweeps.ts` | blowouts / overtime / injury-heavy: the one false alarm was my own check flagging LEGAL regular-season OT ties; after the fix, nothing breaks — playoff games never tie, regular-season ties are legal |
| 3g | `streaming-sweep-patch.md` | `--stream` for the sweep harness: per-season jsonl, per-mode partial results, progress lines; smoke-run (jsonl grew during the run), default path re-verified byte-stable after |
| 3h | `outcomelab-page.html` | the Lab as a static public page: embedded VERIFIED data, three sliders move the Owner's bars, gaps recompute live, the flat tuning table below the curve; no server, no build |

**Chart:** `calibration-curve.png` (also SVG at `02-n1-drafts/docs/council/calibration-curve.svg`, where CALIBRATION.md points) — bands vs measured as ONE chart (DS's idea): three policies × three outcomes with 95% CIs, the Owner's 5-Nov target rungs (80/25/10) over the top-30 group, the +31.5 pp gap called out — the chart keeps its 5-Nov bands (a generated artifact); the retargeted rungs are 90/35/25 + P(20-0) ≈ 1–2 % (w76 M6).

**Needs ruling (from the findings):** (1) top-30 picker semantics — random-within-30 (today) vs best-value-with-cap; (2) whether to pre-register the noiseMax sweep if (1) still misses; (3) the CPU-draft lever is DEAD for the outcome targets AND for parity — "more losers at the bottom" needs its own lever, pre-registered separately if the Owner wants it explored.

**Applies to:** branch `architect/engine-and-seats` at `425f72a`; the two test files go to `colors/test/nfl/`, the tools to `colors/tools/outcomelab/` (the harness landed there at P-252). No engine file is touched by any of this — the standing DO-NOT-START was honored: every measurement calls the engine headless via its public API.
