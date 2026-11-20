# MERGE-MANIFEST — what moves into colors/ · Z.ai → Claude · 2026-11-20

**Direction (the Owner's lane split):** the UI (Z.ai's cakepanz-4 tree) moves INTO `colors/`
(Claude's tree). The engine does NOT move — `colors/src/` is already byte-identical to the pin
`408410477` (verified twice this sitting; `git diff 408410477 ee3b6e1 -- colors/src` is empty).
The merge is a UI landing, not an engine sync.

## 1 · The exact paths that move into `colors/`

| cakepanz-4 path | colors/ destination | what it is |
|---|---|---|
| `src/lib/**` (22 port files + bindings + components + screens + assets) | `colors/src/lib/**` | the shell: every screen (15), component (10), port VM (22), bindings |
| `src/App.svelte` | `colors/src/App.svelte` | the composition root (the four dispatchAsync sites ride inside it) |
| `src/main.ts` | `colors/src/main.ts` | the mount ("the user-facing brand is 76 Pancakes") |
| `index.html` | `colors/index.html` | the shell host page |
| `vite.config.js` | `colors/vite.config.js` | Claude's colors/ tree already HAS one — the merge picks the shell's (it must build the Svelte app) and receipts the diff |
| `package.json` + `package-lock.json` | merged into `colors/`'s | the shell adds `svelte` + `@sveltejs/vite-plugin-svelte` + `playwright@1.57.0` (dev) + the battery scripts (`battery`, `battery:node`, `battery:board`, `battery:slot`, `battery:visual`, `precompile`, `distfile`) |
| `src/lib/assets/shell.css` + `tokens-w89.css` + `zpb-team-colors.json` | inside `src/lib/assets/**` | the tokenized shell chrome |
| `src/data/*.csv` (the three ratings/ids CSVs) | `colors/src/data/` | the dev dataset (the `?dev=1` build input; the public default stays the EMPTY state) |
| `batteries/**` (node/board/slot/visual/shell/slice + the golden JSON) | `colors/batteries/` | the whole QA harness — laws, not clones |
| `scripts/**` (acceptance-run, falsify-board, falsify-slot, falsify-shell, shell-falsifier, seed-roundtrip-receipt, golden-seam, precompile-engine, engine-node-gen/loader, node-port-register, distfile, gate-manifest, gate-numerals, viewport-matrix, probe-contrast, sync_engine_tests) | `colors/scripts/` | the receipt + gate tooling |
| `tools/**` (verify-package, package-delivery, shell-status, mathlab/flex.json) | `colors/tools/` (flex.json may already exist — byte-identical at the pin; `cmp` must pass) | packaging + status tools |
| `test/engine.test.ts` + `test/engine/**` | ALREADY IN colors/ (they ARE colors/test) | the carried suite — the merge must prove `cmp` equality, not move it |
| `data/nfl/*.csv` + `data/packs/*.json` | ALREADY IN colors/ (data/) | same — prove, don't move |
| `deliverables/**` (SLICE-STATUS, the handoff package, receipts) | `colors/deliveries/` or stays package-side | the sitting's paperwork (Claude's call) |

**Excluded from the move (stays cakepanz-side or dies):** `node_modules/`, `dist/` (rebuilt at
the merge bytes), `src/engine-node/` (the precompile emit — regenerated, gitignored),
`.wt-*` worktree dirs, the CHECKSUMS/MANIFEST packaging artifacts (regenerated for the merged
tree), `_agents*/` (the council's inbox/history — stays with the seats).

## 2 · Single-source plan: the engine lives at colors/src, cakepanz's copy is DELETED

After the UI lands and the seams re-point:

1. The seam import paths change ONE level: cakepanz's `../../engine/…` imports inside
   `src/lib/port/seam.ts` resolve to `colors/src/…` when `src/lib/` sits at `colors/src/lib/` —
   i.e. the seam's `from '../../engine/sports/nfl/…'` becomes `from '../sports/nfl/…'`
   (engine at `colors/src`, seam at `colors/src/lib/port/seam.ts`). ONE file changes its import
   prefix; the M1/M1b grep laws (no .svelte imports the engine; only seam.ts does) must still
   pass verbatim — they are path-agnostic (`engine/` substring still matches).
2. `test/engine.test.ts`'s import prefix re-points the same way (Claude's suite already lives in
   the colors layout — the merge proves `cmp colors/test/engine.test.ts <cakepanz>/test/engine.test.ts`
   is EQUAL at the pin, so no content change).
3. DELETE cakepanz's engine copy: `cakepanz-4/src/engine/**` + `cakepanz-4/src/engine-node/**`
   (the derived emit) + `cakepanz-4/tools/mathlab/flex.json` (the colors copy is the single
   source) — after `cmp` proves byte equality, deletion is safe and REQUIRED (two engine copies
   is the drift defect the golden test exists to catch).
4. `precompile-engine.mjs`'s output path (`src/engine-node/`) follows the tree root — no edit
   needed (it is root-relative).

## 3 · The verification commands after the merge (the gates, one block)

```bash
npm ci && npm run test:engine            # 430/430 — the engine, byte-frozen
node --import ./scripts/node-port-register.mjs batteries/node.battery.mjs      # 35/35
npm run distfile && (npx vite preview --port 4179 &) && sleep 3
node --import ./scripts/node-port-register.mjs batteries/board.battery.mjs     # 16/0
node --import ./scripts/node-port-register.mjs batteries/slot.battery.mjs      # 28/0
node --import ./scripts/node-port-register.mjs batteries/visual.battery.mjs    # 17/0
node --import ./scripts/node-port-register.mjs batteries/shell.battery.mjs     # 48/0
npm run battery                                  # 29/0/10/3
node --import ./scripts/node-port-register.mjs batteries/contrast.battery.mjs  # 2/0
node --import ./scripts/node-port-register.mjs scripts/golden-seam.mjs         # MATCH (the golden)
node --import ./scripts/node-port-register.mjs scripts/viewport-matrix.mjs     # 45/45, 0 errors
bash scripts/acceptance-run.sh                   # the whole staged composite, exit 0
```

**Golden at the merge:** `batteries/seam-golden.json` must MATCH at the merged bytes — the seam
now reads the SAME pin bytes through a different path, so the outputs must be identical. If the
golden fails after the merge, the import re-point changed engine behaviour (a build-layer bug),
and the merge stops until it is named.

## 4 · What Claude owns in the same merge (his side, not Z.ai's)

- The engine contract prose for dispatchAsync (still pending — see DISPATCHASYNC-WIRING.md's flag).
- The cutover battery (the slice battery's 3 DEFER items need both trees — the Architect runs it).
- The merge commit's NOW.md/SNAPSHOT notes on his branch.
