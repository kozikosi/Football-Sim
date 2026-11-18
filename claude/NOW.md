# NOW (Architect)
Updated: 2026-11-18. Boot OK; push works (add_repo push once per session). Rulings: `claude/rulings/`; Owner: the colors engine is mine, continue down this list without waiting.
- DONE 18 Nov: sack/drive shift explained (`tools/mathlab/results/glm-shift-2026-11-18.md`, harness `colors/tools/glm-shift.ts`, real states `tools/mathlab/phase1/passstates.py`). Sacks: GLM is score/clock-aware, the sim's score mix differs from real; NOT drift (same-era -0.3/-1%, cross-era -9%), NOT GLM bias (on real states both nodes match the data). Drives: half was MY sampler bug (tuples read across downs), FIXED `02eebdf` (`Pools.recDown`, 409/409, tsc 89/89).
- FOUND, not fixed: the POOLS node under-ends 4th-down drives (46% vs 65.5% real; level 1 merges 3rd/4th; 4th-and-1 on the 3: 0.57 vs ~0.99). Runs use the same hierarchy (unmeasured). Python oracle shares it.
- DONE 17 Nov: 2a GLM node (`passclass.ts`, `65673a0`; NOT default; lambda 0); 1d pooled-node conformance; keyedrng Python twin + portable normal(); CI build is a gate (tests/tsc report-only).
- DONE 15-16 Nov: product pack `data/packs/nfl-pools-fit2023-2025.json`, flex six rules 0 to 2, 1c pack builder, dev page. `colors` `npm run build` passes.
- NEXT: (1) yards-given-class node (one node, one commit); (2) pools-node down-preserving hierarchy, Python oracle + TS + vectors together, report before/after; then switch the GLM default in one commit; (3) sim margin-distribution check vs real (score mix gap); (4) pooled lambda-axis Lab; (5) S3 snapshot, S4 async store.
- Not acting: pmath lint report-only; CI tests/tsc report-only; flex table stays; Title Odds only in 100-season context.
- Ask Owner: none blocking.
- Info: `npm ci` is needed in `colors/` before `tsc:check` (vite/client types). nflverse data: `sh tools/mathlab/phase1/fetch.sh` (gitignored).
- UNKNOWN: pools-node run-play 4th-down effect; sim margin spread vs real; browser/phone throughput; CI result of recent commits (not checked).
