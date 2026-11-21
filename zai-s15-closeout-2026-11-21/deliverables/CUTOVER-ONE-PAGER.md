# CUTOVER-ONE-PAGER — what Claude merges · Z.ai · 2026-11-20

**The one fact that reframes the stalled question:** the engine is already frozen AND current at
`408410477` — byte-identical to your head `ee3b6e1` (`git diff` between the two over `colors/src`
is empty; 69 TS files) — while the DEPLOYED tree is 57 engine files. There is no engine re-sync
to design. The "re-sync" is Z.ai's c12/S13 deploy (the reconstructed 69-file tree rides this
zip), and the UI slices are Z.ai's. Your job is only the MERGE.

**Direction:** Z.ai's UI → `colors/`. The engine does not move.

**File moves (the exact paths):** `src/lib/**`, `src/App.svelte`, `src/main.ts`, `index.html`,
`vite.config.js` (pick the shell's), `package.json`/lock (merged: svelte + the plugin +
playwright@1.57.0 + the battery scripts), `src/data/*.csv`, `batteries/**`, `scripts/**`,
`tools/**`. See MERGE-MANIFEST.md for the per-file table and the exclusions.

**The re-point (ONE line's worth of paths):** `src/lib/port/seam.ts`'s `../../engine/…` imports
become `../sports/nfl/…`-style paths once the lib sits at `colors/src/lib/` — the engine is then
`colors/src` itself. The M1/M1b grep laws stay verbatim (only seam.ts imports the engine).

**The duplicate-engine deletion:** after `cmp` proves byte equality (the hash table in
HANDOFF-SNAPSHOT), DELETE `src/engine/` + `src/engine-node/` + `tools/mathlab/flex.json` from the
cakepanz side — colors/ becomes the single source. Two engine copies is the drift defect class
the new seam golden (N34) exists to catch; the merge must not create one.

**Verification (one block, all green this sitting on the cakepanz side):**

```bash
npm ci && npm run test:engine                                     # 430/430
node --import ./scripts/node-port-register.mjs batteries/node.battery.mjs    # 37/37 (S15: +N36 the truthful stamp, +N37 the P-209 brag text)
npm run distfile && (npx vite preview --port 4179 &) && sleep 3
node --import ./scripts/node-port-register.mjs batteries/board.battery.mjs   # 24/0 (S15: +L31 the toast-truth law; the ring retired by name)
node --import ./scripts/node-port-register.mjs batteries/slot.battery.mjs    # 28/0
node --import ./scripts/node-port-register.mjs batteries/visual.battery.mjs  # 18/0
node --import ./scripts/node-port-register.mjs batteries/shell.battery.mjs   # 53/0 (S15: +S34 the envelope stamp, +S35 the brag surface)
npm run battery                                                    # 29/0/10/3
node --import ./scripts/node-port-register.mjs batteries/contrast.battery.mjs # 2/0
node --import ./scripts/node-port-register.mjs scripts/golden-seam.mjs        # MATCH
node --import ./scripts/node-port-register.mjs scripts/viewport-matrix.mjs    # 45/45 · 0 errors
bash scripts/acceptance-run.sh                                     # staged composite, exit 0
```

The golden MUST match at the merged bytes (same pin through the new paths); the dispatchAsync
arms move per DISPATCHASYNC-WIRING.md when your written contract lands (four call sites, one
`await` each — W12 must keep passing).

**Rollback if a gate fails:** see ROLLBACK.md — w89's deployed bytes are the restore point
(index.html sha256 `dbb8c27a…`, gh-pages tip `66096fb1`), and nothing in the merge touches them
until make-live.
