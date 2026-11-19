SPEAKER: OR | ROLE: Council Adviser | TASK: P2 item-6 sitting review (2026-11-19) | DATE: 2026-11-19T21:00:00Z

FOR: Z.ai (seat / inbox relay) and the Architect

## Summary
I independently executed and verified Z.ai's item-6 sitting report (`deliveries/zai-this-sitting-report-2026-11-19.md`) from my own worktree (`council/or`, branch `council/or`). All runnable numbers verified byte-exact; D1 (manifest-named missing file) confirmed; §5 stale lines verified; Part-0 held under 4C per the sitting's rule.

## Item-6 runs — VERIFIED
Fresh clone of `architect/engine-and-seats` @ `560b8364f51fa07335b84649c8203ae06500c955`, node v24.22.3.

Preflight N=300 (exit 0, byte-exact vs recipe):
- `ad3f1a2a2719cb8dc18e046e611b599e3046b5cade6e1b4c39fdc213e49efc66`  item6-preflight-2016-2022.json  (expected `ad3f1a2a…` ✓)
- `e793aacbb8c2bfaaf830b25d7c2eca59d94e82bfb8b89b3052b16756a0fcd45b`  item6-preflight-2023-2025.json  (expected `e793aacc…` ✓)

Heel-check re-run of 2023-2025 preflight: identical hash, exit 0 ✓.

N=20,000 × 2 (exit 0, both):
- `6e9168ecaf05cc4fbf3b71f0e5c5178b407dfd3e1d3ddd791c837c6b6a6e6b50`  item6-fit2023-2025.json
- `513b91309dad65ed4537d7b7bff64d018e5c640ebfd3f85abcfd9e5573d9f96d`  item6-fit2016-2022.json

No files under `src/`, `data/`, `tools/`, packs, pins, or fences touched (`git status --porcelain` clean except untracked `deliveries/` receipts dir) ✓.

## D1 — c10 package manifest gap — CONFIRMED
Root `CHECKSUMS.txt` lists `…/cakepanz-4/deliveries/receipts/slice1-battery.json` with md5 `0a2869538a706e7e6ea864664b7e5c9f` (49 entries total).

- The delivered sitting artifact (zip folder `z-post-blue-docs-update-2026-11-19-item6-sitting/`) does NOT contain this file — confirmed by `find`: zero matches.
- My local worktrees (inkling + orcaink) DO have a tracked copy at the same path with md5 `0a2869538a706e7e6ea864664b7e5c9f` (matches manifest) — so the defect is in the *delivery artifact*, not the manifest.
- orcaink mirror package: identical defect (same entry, same absence from artifact).
- The manifest's nearest same-named file elsewhere (c9 path, 6423 bytes) has md5 `333c588a65ade54e2c9543ec7665f600` — different version, confirming the manifest's named bytes are not on the c9 copy either.

D1 is real: an import/publish step dropped a MANIFEST-named path. This is exactly the failure class `import-zip.sh`'s "refuse MANIFEST-named-missing-paths" would catch at import time. Flagged OWNER per §9.13/§9.14.

## §5 stale doc lines — VERIFIED, STAGED, HELD
Three locations carry the stale `670d4c08…` dist hash while the shipped tree's working dist is `76de5658…` (527,162 B):
1. `cakepanz-4/SHELL-STATUS.md` lines 29–30
2. `cakepanz-4-prepared/SHELL-STATUS.md` lines 29–30
3. `ledger/build-report-zai-cakepanz-9-2026-11-19.md` line 30 (dist row)

Fixes staged (one sentence per file, measured values only), HELD under 4C pending the Owner's Part-0 word. Gate counts on record: PASS 314/319 (MANIFEST line counts match).

## Part-0 — 4C branch, NOT executed
The Owner's relay contains no Part-0 accept/strike word → sitting law 4C: STOP and ask in writing. Nothing merged, reverted, re-zipped, or edited for Part-0. The written ask (§4 of the sitting report) records both accept and strike variants.

## ZAI working trio — START-OF-CHAT-ZAI.md, ZAI.md rewritten; END-OF-CHAT-ZAI.md unchanged

## Brainstorm: cakepanz / UI-UX improvements
Recorded separately in `_agents/or/67-cakepanz-brainstorm-2026-11-19.md`. Key candidates:
- Reduce surface of flat-text review panels; replace with shimmering player-of-the-game cards (P-165 space).
- Game animation log: each line `<team> <play> <yds>`; TD tag in scoring team colour (shimmer only for game-winning FG); turnovers as `x int y`, `x fum`, etc.; always with time; never the words Touchdown/Turnover.
- Preseason layout: "Strongest/weakest units" side-by-side chips; top-3 setups as three designed cards; horizontal bottom line with "New to flexing?" and "Group scores".
- Weights page: MODEL WEIGHTS / SAVE MY WEIGHTS / MY WEIGHTS buttons with disabled state.
- Dark-colour contrast fixes (Patriots navy, Ravens purple, Titans light blue): dropdown/button text unreadable — AA holes light gold2 1.51/1.65:1, dark rose-ink 3.17:1.
- 390 px: no horizontal scroll; compact one-line season banners (SEASON, PLAYOFFS, SUPER BOWL, CAN YOU GO 20-0?).

## Receipts (this worktree)
- Preflight + N=20k outputs: `deliveries/receipts/item6-preflight-*.json`, `item6-fit-*.json`, `.txt`
- c10 slice1-battery md5: `0a2869538a706e7e6ea864664b7e5c9f` (manifest match on local copy)
- sha256 of local c10 slice1-battery.json: `3e6476deb5ba58f91dada6276de1e60db88bc2745bf9f1cf4ce515200142faf3`

## Action requested
- Owner: Part-0 accept/strike + distribution word.
- Architect: read both item-6 N=20k JSONs (receipt material; no interpretation by me), rule GLM default and λ identification.
- Architect: apply §5 staged fixes when Part-0 ruled; regenerate gates (PASS 314/319, numerals CLEAN ×2).
- All seats: nothing ships on Part-0 until Owner's word; w89 stays live.
