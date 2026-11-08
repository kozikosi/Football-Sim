REVIEW-OF: tools/mathlab/run-all-tests.mjs (shared tool, Super lane)
VERDICT: improved

What I checked (commands run):
1. `node --check tools/mathlab/run-all-tests.mjs` → SYNTAX OK.
2. `cd tools/mathlab && time node run-all-tests.mjs --smoke` → 7/7 PASS in ~37.7s (under 60s smoke target).
3. `cd /tmp && time node <abs-path>/run-all-tests.mjs --smoke` → 7/7 PASS in ~37.9s (cwd fix verified: runs from any directory).
4. Before the fix, `ROOT = process.cwd()` and hardcoded absolute HTML paths broke when run from a different worktree (Q33); after the fix, `SELF_DIR = path.dirname(fileURLToPath(import.meta.url))` resolves all paths from the script location.

What changed:
- Added `--smoke` flag: runs only the deterministic no-browser subset (fitlm + T1/T3/T4/T6/T7/T12), skips Beam/Playwright tools. Expected <60s; measured ~37.7s (mostly fitlm.js).
- Path fix: `ROOT` now derives from `import.meta.url` instead of `process.cwd()`, so relative `./` imports and `--html` default resolve correctly from any cwd (same root-cause class as Q31 council.mjs guard bug).
- In smoke mode, Beam tool extraction is skipped (Beam tools need Playwright/Colors engine).

Weakest point: smoke mode still runs fitlm.js (~37s, needs Playwright + product HTML). A truly <5s smoke would skip fitlm too, but then T1/T3/T12 can't run. The 60s target is met.

Label: VERIFIED (commands + output above). Not my own work to review as author — this review is for the improvement I made; a second seat should review it per the two-review rule.
