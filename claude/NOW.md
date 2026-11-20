# NOW (Architect)
Updated: 2026-11-20 (9th sitting, part 2). OWNER FINAL: ship 76 Pancakes; MULTISPORT PARKED; Colors engine is mine; SHIP-FIRST, tune values/history AFTER shipping. Push: tier 1, then add_repo push once per session if 403.
- STATE (VERIFIED 20 Nov): colors/ 430/430, tsc 89/89, build OK at ee3b6e1. Engine pin 408410477; `git diff 408410477 ee3b6e1 -- colors/src` = 0 paths (tree 8d8a8a1e). No engine change needed or planned.
- LANES (Owner, 20 Nov): Z.ai builds UI slices 3-5 against the pin, applies the gh-pages test re-point (277->286), lands c12, retires w89 at make-live. I own the MERGE into colors/ and the engine. The old "re-sync snapshot, 11 files differ" line was a lane error: that gap is the DEPLOYED gh-pages snapshot (12 files differ, 0 dispatchAsync), closed by Z.ai's c12, not by me.
- PUBLISHED: `claude/dispatchasync-contract-2026-11-20.md` (re-anchored 20 Nov to c12: 4 sites START/PICK/UNDO/LOAD at :148/178/184/208, keep pickSlot; REPORTED by hy4, Z.ai confirms anchors; refresh via selectBoardAsync; busy flag; no sync/async mixing) and `claude/cutover-runbook-2026-11-20.md` (what moves, gates 1-10, rollback). Old MERGE-CHECKLIST.md marked superseded.
- Q7 LOG (Owner: log, do not fix before pin): week/season gap; production unaffected. RING dropped. react gone. CI gates: pin-watch, tsc, tests, build.
- NEXT: wait for Z.ai "slices 3-5 done"; then run the runbook. Meanwhile (optional, mine): save export/import, migration scaffold, quota class, multi-tab guard (assessment 13 Nov, D14), purity test over core/view/app (D13).
- RULINGS (Owner via hy4, 20 Nov, REPORTED): ring REMOVED (Contract B, L13/L16-L22 retire); deploy = CLOUDFLARE by Owner+me, Z.ai hands over a static build only; S14 target = near-exact w89 look (Cinzel already inlined); multisport parked.
- TODO (mine): rewrite runbook rollback for Cloudflare (no wrangler/config in repo; plan UNKNOWN); restate visual acceptance as w89 parity; gate 5 baseline = CUTOVER-CHECKLIST.md:20-22 (board 15->16, slot 28, visual 15->17); swap-test "26 pass" is stale, S13 receipts = 29/0/10/3; w89 key `zpb:season`, no `sim:nfl` collision (REPORTED); name a law for state.error self-clearing.
- OPEN: Playwright dev dep; devgame keep (hy4: keep as src/devgame.ts); make-live trigger under Cloudflare.
- TOLERANCES (18 Nov): margin SD 14.158 +-10%; one-score 48.5% +-4; home win 54.8% +-4; blowout 16.1% +-3; sacks +-10%. A miss is REPORTED, not a gate.
- Info: `npm ci` in `colors/` before `tsc:check`. nflverse: `sh tools/mathlab/phase1/fetch.sh`.
- Blockers: none.
