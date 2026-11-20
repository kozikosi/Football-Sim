# SNAPSHOT.md — the frozen engine snapshot (M4 · the written contract)

A stranger can re-pin from this file alone.

**STATE: SHIPPED TREE OF RECORD (2026-11-20 sitting, pin 408410477 — the P-317 re-pin).** This
tree's snapshot is the pin below, byte-verified. The re-pin was REQUIRED by P-317 (T1): the
store's `pickSlot` support (introduced at `560b8364f`, present at the tip) is the half the
Team Select selector consumes; the previous shipped pin `5c808472` predates it. The five paths
moved together (the FIVE-path procedure below), the five checks re-ran green, and this file was
re-pinned in the same sitting. The old prepared copy at `65673a00` is SUPERSEDED by this
activation (its pass-class node `sports/nfl/sim/passclass.ts` is part of the tip's snapshot
now); `65673a00` and `5c808472` appear in this file only as historical context.

## The pin

- **Engine commit: `408410477`** on `architect/engine-and-seats` ("multisport plan M — docs
  only"; the engine content at that commit carries the P-317 store (`pickSlot` in START,
  `draftOrder(userTeam, pickSlot)`, `SaveRecord.pickSlot` — 10 hits in
  `sports/nfl/app/store.ts`), the S3 context snapshot, S4 async twins, and the pass-class node.
  The pin commit itself is docs-only (2 files, +65/−0).
- The shell consumes `colors/src/**` at that commit as a frozen snapshot, copied VERBATIM into
  `src/engine/` — **69 TypeScript files**. Byte-identity VERIFIED this sitting against a
  worktree checkout of the pin: `diff -rq <worktree 408410477>/colors/src src/engine` → exit 0.
- The carried suite (`test/engine/`, the pin's `colors/test` re-pointed by
  `scripts/sync_engine_tests.py`) passes **430/430** (`npm run test:engine`) — VERIFIED this
  sitting at the re-pinned bytes, and re-run at the sitting's final bytes (see
  ACCEPTANCE-RECEIPTS.txt).
- The flex table (`tools/mathlab/flex.json`) at this pin: **99 rules — 17 at 0, 17 at 2, 42 at 6,
  23 at 12** (counted this sitting). The six Owner-approved rules are at 2 (EDGE→DT,
  ILB→OLB, CB→FS, EDGE→OLB, OT→OG, CB→SS) and **SS→NICKEL stays at 0** (never approved). The
  table is byte-identical across the re-pin (the same 99-rule distribution at `5c808472`) —
  measured, not assumed.
- **Four pack files** in `data/packs/` at this pin (`nfl-pools-fit2016-2022.json`,
  `nfl-pools-fit2023-2025.json` + the two test-only GLM packs `nfl-passclass-fit2016-2022.json`,
  `nfl-passclass-fit2023-2025.json` — nothing in `src/` reads the GLM packs at runtime;
  grep-verified; the Architect's suite fails without them). The 2023–2025 pools pack is
  byte-identical to the pin (`cmp` vs the worktree → exit 0).
- The engine's self-declared stamp at this pin: **`nfl1.1ac56c28928eff`** — invocation: `node
  --experimental-strip-types --input-type=module -e "import { engineVersion } from
  './src/engine/sports/nfl/app/versions.ts'; console.log(engineVersion())"` (Node v24.22.3) —
  the SAME stamp as at `5c808472` (the ruleset did not change; the store gained a parameter).

## Pack-hash citations (ALWAYS with the invocation — a bare hash is UNKNOWN)

`node --experimental-strip-types scripts/pack-hash-cite.mjs data/packs/nfl-pools-fit2023-2025.json`:
- as baked — `loadPools(makePack(JSON.parse(data/packs/nfl-pools-fit2023-2025.json)))` — the pack
  stamps its own hash (`makePack(body).hash`): **`pack53:0e78e4db382f9f`**
  (M1's missing citation, now named with its invocation; the packs law N22 asserts it)
- product world — `rules.values: clock=dt_pf, trans=computed`: **`pack53:0ff47e1de5e2db`**
- clock only — `rules.values: clock=dt_pf`: **`pack53:1fe065713f326b`**

The 2016–2022 pack, as baked: **`pack53:0b60973944ae13`** (same script, same invocation class;
matches the carried suite's own assertion).

## The GLM pass-class node (at the prepared pin — the shell does NOT touch it)

The next pin's one new capability is a multinomial-logit pass-class node, OFF by default:
`runGame` takes optional `passClass`/`passGap`; absent, the game is bit-for-bit the pools node.
The shell passes neither option anywhere (grep over `src/lib`, `src/App.svelte`, `batteries`,
`scripts` → EMPTY). The default-off proof ran this sitting on both trees
(`scripts/gamelog-fixture.mjs`): 60 keyed games — the old-pin and prepared-tree logs are
byte-identical (full event JSON); lambda-0 tilt is a no-op (60/60 with `passGap: 7` = `passGap`
absent); the control (node ON) differs 60/60. Theta is a toy shape, lambda is 0. You do not turn
the node on; you do not fit theta or lambda; you do not build the yards node.

## The exact command that produced it

```bash
git fetch --depth 50 origin architect/engine-and-seats
# a blob:none partial clone cannot serve git archive — check the paths out into a detached
# worktree instead (the equivalent: the worktree's bytes ARE the commit's bytes)
git worktree add --detach --no-checkout .wt-<pin> <PIN> && (cd .wt-<pin> && git checkout HEAD -- colors/src colors/test tools/mathlab/flex.json data/packs)
cp -R .wt-<pin>/colors/src src/engine && cp .wt-<pin>/tools/mathlab/flex.json tools/mathlab/flex.json
cp -R .wt-<pin>/colors/test test/engine && cp .wt-<pin>/data/packs/*.json data/packs/
python3 scripts/sync_engine_tests.py && node scripts/precompile-engine.mjs
```

## The re-pin procedure (the FIVE paths — all five, or the tree goes red)

```bash
git fetch --depth 50 origin architect/engine-and-seats \
&& git worktree add --detach --no-checkout .wt-<pin> <PIN> && (cd .wt-<pin> && git checkout HEAD -- colors/src colors/test tools/mathlab/flex.json data/packs) \
&& rm -rf src/engine && cp -R .wt-<pin>/colors/src src/engine \
&& cp .wt-<pin>/tools/mathlab/flex.json tools/mathlab/flex.json \
&& rm -rf test/engine && cp -R .wt-<pin>/colors/test test/engine \
&& mkdir -p data/packs && cp .wt-<pin>/data/packs/*.json data/packs/ \
&& python3 scripts/sync_engine_tests.py && node scripts/precompile-engine.mjs \
&& npm run test:engine && npm run battery:node && npm run distfile && npm run battery && node --import ./scripts/node-port-register.mjs batteries/shell.battery.mjs
```
If any step fails: FILE it to the Architect — do not route around it, do not edit the snapshot.
The five paths: **`src/engine/`** (the snapshot) · **`tools/mathlab/flex.json`** (the flex table
the carried tests read) · **`test/engine/`** (the carried expectations) · **`test/engine.test.ts`**
(the entry file — the 2026-11-15 miss was an entry file that imported nothing) ·
**`data/packs/*.json`** (the fixtures the carried suite reads — TWO files here, FOUR at the
prepared pin). One commit-equivalent, green in the same state.

## Running the node-side TS on ANY Node (Part D — the register hook, replaces the transform flag)

The snapshot carries ONE TypeScript parameter property (`platform/localstorage.ts:31`,
`constructor(private readonly ls: Storage | null, …)` — re-checked at this pin). Strip-only mode
cannot parse it, and `--experimental-transform-types` existed only in Node 22.7–24 (removed in
Node 26). Route 2 is BUILT (no engine edit, cannot drift from the pin, reversible):
- `node scripts/precompile-engine.mjs` (or `npm run precompile`) emits **`src/engine-node/`** — a
  generated copy of the snapshot, byte-identical EXCEPT that one constructor (explicit fields;
  the generator proves exactly one file differs). Build artifact: gitignored, excluded from
  CHECKSUMS/MANIFEST, never committed. If the parameter property ever SPREADS, the generator
  fails loud — that is a §5 to the Architect, not a transform to extend.
- Every node-side TS entry runs through **`node --import ./scripts/node-port-register.mjs`**:
  `npm run battery:node`, the shell battery, the probes, the falsifiers. The register fails loud
  on a stale copy and regenerates once after any snapshot byte change.
- Results (VERIFY.txt carries the full table): both node suites run GREEN on Node v24.22.3 AND
  Node v26.13.1. The snapshot itself is never edited (diff against the pin = 0).

## Dependencies and falsifier behaviour (D-1 / D-2)

- **Playwright is a declared devDependency** (`playwright: 1.57.0`, exact pin): `npm ci` installs
  it; the browser is `npx playwright install chromium`. The batteries resolve it from the repo's
  own node_modules and FAIL LOUD with a named error if missing — the HOME-global fallback is
  GONE from all seven entry points (batteries + probes). Verified from a fresh clone this
  sitting: `npm ci && npm run build && npm run battery` → 29/0/10/3, exit 0; `npm run
  battery:node` → 33/33 (the count was 26 at the cakepanz-6 sitting — the cakepanz-8 A1 laws N28/N29
  brought it to 33; re-quoted at the cakepanz-8.1 final state); `npm run test:engine` → 394/394.
- **A falsifier case that cannot run is a FAILURE, never a green light** (D-2): no verdict
  marker, a child error, or a crash with no law evidence → COULD-NOT-RUN, named, exit 1.
  TAUTOLOGY (a real verdict where the law did not die) is also exit 1. Falsifier ports are
  per-process (PORTBASE from the PID). `scripts/receipt-falsifier.mjs` mutations are
  APPLY-ASSERTED (a moved target throws with the file and the anchor).

## The swap test as a habit (M3, one command)

```bash
CP_REPO=<clone> CP_ENGINE_SRC=<worktree>/colors/src node scripts/swap-test.mjs <sha>
```
Copies the tree, swaps `src/engine/` to the named commit's `colors/src`, runs the engine suite +
the node battery + a build + the slice battery against a preview server, and `diff -rq`s the
whole tree to prove NOTHING outside `src/engine/` changed. This sitting it ran BOTH directions
against `65673a00` and `5c808472` (the tip into this tree: everything green — this tip is
additive-default-off; the old pin into the prepared tree: the shell SURVIVES and the
tip-asserting suite fails its LOAD, exactly as designed). Receipts in VERIFY.txt §M3.

## What lives outside the snapshot (and why)

- `data/nfl/*.csv` — the dataset fixtures the engine consumes at runtime (never part of colors/).
- `data/packs/*.json` — the pack fixtures (the snapshot's own dev page `main.ts` imports the
  2016–2022 pool pack via a Vite `?url` specifier; `src/vite-env.d.ts` is the shell-side shim
  that types it — a known non-importer, named in M1's receipts; if a future pin drops `main.ts`,
  the shim goes with it).
- `tools/mathlab/{design.json,flex.json}` — the design constants the engine tests read.
- Everything in `src/lib/port/` is the SHELL's seam — the engine is never imported outside it
  (M1: zero hits; M5: seam.ts 160 lines, 68 engine-import lines, 38 distinct engine modules).

## S13 ADDENDUM (2026-11-20, the UI-slices + cutover-handoff sitting) — the state of record at the handoff bytes

- **The pin re-verified, per file:** all 69 snapshot files byte-compared against
  `408410477` (`sha256sum` per file vs the pin's blobs) — zero mismatches; the four companion
  paths (flex.json, the suite entry, test/engine/, the four packs) identical. The full per-file
  sha256 table now lives in `deliverables/HANDOFF-SNAPSHOT-2026-11-20.md` (the cutover contract).
- **The battery gates at the final bytes:** engine 430/430 · node **35/35** (+N34 the seam
  golden, +N35 the b36 anchor) · board **16/0** (+L22 the staged-Confirm guard) · slot 28/0 ·
  visual **17/0** (+W12 the restore-shareability law, +W13 the new-seed affordance) · shell
  48/0 · slice 29/0/10/3 · contrast 2/0 · viewport matrix **45/45, zero overflow, zero errors**
  (390/768/1280 × 15 surfaces — `scripts/viewport-matrix.mjs`).
- **The VM→JSON map is a file now:** `batteries/seam-golden.json` + `scripts/golden-seam.mjs`
  (law N34). At the merge it must MATCH; a re-pin regenerates with `--write` and receipts the
  diff. This is the "fix the data export" act the c12 reviews asked for — the shell no longer
  derives its truth from a re-parse of display strings alone; the golden pins the export.
- **The verifier grew its converse check** (hy4's finding): a file on the tree that
  CHECKSUMS.txt does not list is named EXTRA and fails exit 1 (the planted-extra fixture
  proved it; the two self-referential companions are named exceptions).
- **The dispatchAsync arms are documented, not moved:** the four call sites
  (App.svelte START/PICK/UNDO/LOAD) are published in `deliverables/DISPATCHASYNC-WIRING.md`
  for the merge — the sync dispatch stays until Claude's written contract lands (the S13 flag).
- **13b:** the falsifier ran at the final bytes — the by-name verdict is in VERIFY §25.2 and
  `receipts/partH-s13/` (the c12 OPEN item's closing run).

## S14 ADDENDUM (2026-11-20, the ring-revival + P0-collision-fix sitting) — the state of record at the S14 bytes

- **The pin is UNCHANGED and re-proven before any build:** `git cat-file -t 408410477` → commit;
  `git ls-tree -r 408410477 colors/src | grep -c '\.ts$'` → 69; the tree's `src/engine/**` ≡ the
  pin's `colors/src` (`git archive` extract, `diff -rq` clean); `git diff 408410477 ee3b6e1 -- colors/src`
  → 0 bytes; `src/engine/sports/nfl/view/draftBoard.ts` sha256 `e9e6e01a…` both sides. No engine
  file, no pin, no λ, no protected constant touched; the five-path fence untouched.
- **P0 — the shareable-link/autosave collision is FIXED** (`src/App.svelte` `hydrateBoot`): an
  explicit `?seed=` link wins over a DIFFERENT autosave (no restore, no URL rewrite, the visible
  notice `shared link opened; your local save is untouched`, the local save left untouched); a
  SAME-seed reload still restores (W9 — the load-bearing exception); a plain reload still restores
  (S29/W12); corrupt-never-repair verbatim. Law **W14** (visual battery **18/0**), falsified by
  name under **F23-w14** (the naive guard re-planted). Real-browser probe, both directions:
  `deliveries/receipts/w14-probe-latest.log` — RESULT: PASS.
- **P2 — the ring revival, pin-safe (the S14 order §3):** the PRIMARY top three are the first
  three ARRAY POSITIONS of the engine-sorted rows (law **L24**, the scoped no-display-parse law —
  every sort at pick 1 + every checkpoint; falsified under **F24**); the tie extension + the L13
  oracle stay PAIRED, labelled `INTERIM — display-rounded, awaiting rawSort`; the ENGINE half
  (`rawSort: number` on `BoardRowVM`) is a §5 proposal (`inbox/20261120-2218-zai-S14-proposal-rawSort-engine-half.md`,
  **`BLOCKED (engine half)`**) WITH the exact paired diff. The w89 glow is ported (`zpbBtnPulse`,
  bytes VERIFIED against `origin/gh-pages:Football-Sim-Z-post-blue-w89.html` :381/:12849/:12853;
  the reduced-motion guard rides with it; law **L23**, falsified under **F26**; zpbstarglow NOT
  ported — no invented surface). The ring is EXPLAINED (one plain VM-sourced reason per ringed
  row) and PERSISTED (the autosave carries `suggestIds[]`; law **L25**, falsified under **F25**;
  the engine store record untouched — `parseRecord` ignores the extra field). The derivation is
  ONE source: `src/lib/port/suggestWhy.ts` (component + autosave + battery). Board battery
  **19/0** = 16 + L24 + L25 + L23 (stated, not silent).
- **P1 — the receipt-accuracy set** (the S14 order §4): the suite ENTRY is GENERATED (the merge
  REGENERATES it, never `cmp`); `test/engine/**` is RE-POINTED (logic byte-identical); the
  PARTIAL-composite overclaims corrected verbatim; the receipt-path citations corrected to
  `deliveries/receipts/…`; the seedCode `a3f2` comment corrected (470,990); the verifier's converse
  walk skips `node_modules/` + `src/engine-node/` (a BUILT tree verifies); the D-2 stale-server
  guard ported into the four standalone batteries (`scripts/fresh-server.mjs`); ONE
  `ringPresentGuard()` helper for every ring-dependent leg; `dieReport` prints the planted-law line.
- **The gates at the S14 final bytes** (each print receipted in VERIFY §26): engine 430/430 ·
  node 35/35 · board 19/0 · visual 18/0 · slot 28/0 · shell 48/0 · slice 29/0/10/3 · contrast 2/0
  (no new token holes) · viewport 45/45 · golden MATCH · falsifiers F0×2 green +
  F15/F17/F18/F19/F20/F21/F22 + F23-w14/F24/F25/F26 ALL DIED by name (the FULL standalone run,
  exit 0, child logs in `deliveries/receipts/partH-s14/`). **THE COMPOSITE WAS PARTIAL AT
  PACKAGING TIME** (the sitting's time budget): steps 1–13 EXIT_CODE=0, step 13b begun, 13b–17
  absent — the next sitting's first command is `bash scripts/acceptance-run.sh`; the tail goes to
  VERIFY §26.5.
