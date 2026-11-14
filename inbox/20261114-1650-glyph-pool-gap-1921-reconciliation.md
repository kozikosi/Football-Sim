SPEAKER: glyph | ROLE: council member | TASK: POOL-GAP-1921-RECONCILIATION | DATE: 2026-11-14T16:50Z
FOR: Ernie returning prompt §3 “pool numbers” (madden27-ratings.csv = 1,941; poolCount = 1,953 = 1,941 + 12 free agents; board renders 1,921; 32-row gap unexplained)

## VERIFIED (bytes in `/Users/kosi/Desktop/wt/glyph`)
- Source data files (`data/`): `madden27-ratings.csv` = **1941** data rows; `free-agents-old-ratings.csv` = **12** data rows (1941 + 12 = 1953). Columns observed: `name,pos,team,ovr,spd,str`.
- Z.ai wave-v3 vendored bench data (`_agents/glyph/deliveries/z-open-wave-v3/arms/arm-vue/src-bench/data/`, same for arm-svelte): `madden27-ratings.csv` **1941**, `free-agents-old-ratings.csv` **12**, `player-ids.csv` **1953** (cols `pid,name,pos,team`; 12 rows with team `Free Agent`).
- player-ids position counts (1953 total): WR 212, CB 201, DT 199, TE 139, HB 126, LEDG 97, QB 92, REDG 89, FS 84, SS 83, MIKE 79, WILL 78, LT 71, RG 71, LG 69, C 68, RT 63, **K 35, P 33, LS 32**, FB 16, SAM 16.
- Rendered board receipt: `_agents/glyph/deliveries/z-open-wave-v3/receipts/phaseD.json` reports for both vue and svelte arms `assertions.totalPoolRows: 1921`, `distinctRowsSeenByScrolling: 1921`, `allReachable: true` (virtualized board; dom rows at rest 27/26).
- Arithmetic: `1953 - 32 = 1921`.

## INFERRED (high confidence, from verified counts/receipts)
- The **32-row gap (1953 pool vs 1921 board)** is explained by **Long Snappers (LS, n=32 in `player-ids.csv`) being excluded from the rendered draft board** in the wave-v3/bench board implementation represented by `phaseD.json`. This reconciles: full player-id pool 1,953 = 1,941 ratings + 12 free agents; board-visible pool 1,921 = 1,953 − 32 LS.
- This does **not** by itself imply LS are absent from engine/pool data structures—only that they are not rendered/counted as board rows in that receipt.

## Notes / limits
- Evidence is from vendored wave-v3 data + phaseD receipts in this glyph worktree, not from `colors/` UI/board source in this check. Treat as a receipt-backed explanation for the bench/board context cited; confirm against live Colors/Architect board implementation if needed for Claude’s pool ledger.
- “Draftable” vs “in pool” semantics (LS/K/P inclusion rules) remain a product/engine definition question; the count reconciliation is exact.
