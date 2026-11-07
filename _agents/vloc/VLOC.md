# VLOC — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** VLOC · **Model / how reached:** Nemotron via OpenCode (worktree `/Users/kosi/Desktop/wt/vloc`, branch `council/vloc`) · **State:** adviser
- **ID block:** none · **First seen:** 2026-11-05
- **Reviews on record (VERIFIED, Pre-Colors receipts):** P-041/042/043/045/046/047/049/058/067/069/074/077/078/100/101/102/103/104/108/109/110/111/112/114/115/116/117/118/119/120/121/124/131/142/144/151/155/156/164/166/167/171/174/177/183/185/186/187/190/192/193/196/198/199/201/204/205/206; E-210/E-212; P-008 board-state (REVIEWED via soft cap). This session: P-279/P-280 boot-v3 review (VERDICT ok, filed 070817), P-282 below; w79 weights+flex (prior session); P-013 tooling (this session).

## Current work (this session, P-013 tooling ahead of Claude's turn)
- **P-013 tooling (Beam's 2026-11-07 council prompt):** built and ran read-only tooling in `tools/mathlab/` (never touches the product or protected constants; all pin product sha256 40233d6b before/after):
  - **T3** `tools/mathlab/triangulate.mjs` — raw-curve witness export + triangulation vs Owner final 11-06 / design.json / salary-only. RAN: 16/27 slots flagged; raw curve CB1 397 > WR1 304 on 700 scale. Evidence: `results/triangulate-2026-11-07T23-46.json` (T12-wrapped, `uncertainty.mjs check` PASS) + `results/raw-curves-2026-11-07T23-46.csv`.
  - **T4** `tools/mathlab/replacement-audit.mjs` — engine replacement vs Madden 27 pool Nth-best. RAN: gapPts = 0 on all 14 groups; real-snap comparison UNKNOWN (no snap data in workspace). Evidence: `results/replacement-audit-2026-11-07T23-49.json`.
  - **T6** `tools/mathlab/flex-pricer.mjs` — deterministic flex opportunity cost vs flat FLEX penalties. RAN: CB->SAM at 95 OVR = 0.993 wins lost vs flat penalty 4; CB->FS flat 0 but 0.42 wins at 95. Evidence: `results/flex-pricer-2026-11-07T23-50.json`.
  - **T12** `tools/mathlab/uncertainty.mjs` + `uncertainty-reporting-law.md` — reporting law (n/spread/ci95/threshold on every lab JSON). Helper VERIFIED; T3 output wrapped, check PASS.
  - **T1** `tools/mathlab/t1-harness.mjs` — skeleton + dry-run only (NO sim, NO RNG, NO external data); full T1 BLOCKED on seeded RNG (task T-20261022-claude-2) and nflverse snap/target/EPA data. Evidence: `results/t1-dryrun-2026-11-07T23-51.json`.
  - **Governance:** `H-001-mechanics-honesty.md`, `discrepancy-register.md` (D-001..D-006), `ruling-log.md` (R-01..R-04) — all in `_agents/vloc/deliveries/`.
- **Revised Claude-facing prompt + inbox entry filed:** `_agents/vloc/deliveries/prompt-for-claude-P-013-revised-2026-11-07.md` + `inbox/20261107-2352-vloc-P-013-prompt-for-claude-revised.md` (FOR: P-013). Uncommitted until this session's commit.

## Prior session (still open)
- **P-013 / P-017 w79 weights & flex (Owner directive, prior chat):** `flexcap.mjs` apparatus; flex cap -10 proposed table `flex-proposed-cap10.json` (44 rules, penalties {0,2,4,10}); FACT: under cap 10 + leave-2s/4s + upper anchors fixed, NO self-consistent lower-weight raise clears all 85+ flex-outs — Owner decision required (raise offending 4-penalties / accept stars flex / accept collapsed weights). UI/UX proposals in `ui-proposals-w79.md`. Inbox `inbox/20261107-1021-vloc-P-013-w79-weights-flex-ui.md` (FOR: P-013, P-017) needs two reviews by seats other than vloc.
- **P-013/P-140 review chains** still need two reviews each from seats other than vloc.

## Position
- This seat proposes/tests/reports only — never edits the product (Architect builds), never edits PRIORITIES.md. DEFAULT_WEIGHTS/FLEX are protected constants (Owner approval given); any build edit needs MERGE-MANIFEST.md re-pin in same commit. Not safe-alone-complete for the protected-constant parts.
- Read-only this round for P-013 tooling: no product bytes or protected constants changed (VERIFIED via git status).

## Files in this lane
- `_agents/vloc/VLOC.md` (this file)
- `_agents/vloc/deliveries/PLAN-P-013-tooling-2026-11-07.md` (this session's plan)
- `_agents/vloc/deliveries/uncertainty-reporting-law.md`, `H-001-mechanics-honesty.md`, `discrepancy-register.md`, `ruling-log.md`, `prompt-for-claude-P-013-revised-2026-11-07.md`
- Earlier w79: `flexcap.mjs`, `weights-flex-proposal-w79.md`, `ui-proposals-w79.md`, `flex-proposed-cap10.json`, evidence JSONs, `weights-measure.mjs` + `weights-measure-2026-11-06.json`, `flex-measure.mjs` + `flex-measure-2026-11-06.json`
- Tooling: `tools/mathlab/triangulate.mjs`, `uncertainty.mjs`, `replacement-audit.mjs`, `flex-pricer.mjs`, `t1-harness.mjs` + `tools/mathlab/results/*` evidence JSONs/CSV

## Worktree / branch
- **Worktree:** /Users/kosi/Desktop/wt/vloc · **Branch:** council/vloc
- **merge-base with origin/council/base:** 1b91f50e · **Local commits not yet pushed:** none (this session's commit pending)
