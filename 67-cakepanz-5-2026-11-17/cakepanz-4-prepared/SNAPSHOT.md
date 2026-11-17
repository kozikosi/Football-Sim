# SNAPSHOT.md — the frozen engine snapshot (M4 · the written contract)

A stranger can re-pin from this file alone.

**STATE: PREPARED, NOT ACTIVATED (2026-11-17 sitting, Part B).** This tree carries the re-pin
PREPARATION: every path moved, everything proved, nothing shipped as the default. The SHIPPED
tree (the sibling `cakepanz-4` directory, pin 5c808472) stays the tree of record until the Owner
says "re-pin"; then activation is ONE STEP — copy these five paths from this prepared tree (or
re-run the procedure below against the new pin), re-run the five checks, re-pin this file's
 receipts. The two trees are never confused: this file's pin line names THIS tree's snapshot.

## The pin (PREPARED — 65673a00)

- **Engine commit: `65673a00`** on `architect/engine-and-seats` ("2a: the pass-class GLM node, with
  the class-then-tuple sampler and the lambda seam"). The old pin (the shipped tree's): `5c808472`.
  Between them one commit, `f9991424` — docs-only (the bake report's pack-hash line; no engine files).
- The shell consumes `colors/src/**` at `65673a00` as a frozen snapshot, copied VERBATIM into
  `src/engine/` — **68 TypeScript files**. Byte-identity VERIFIED this sitting:
  `diff -rq <worktree 65673a00>/colors/src src/engine` → exit 0. The one file added over the old
  pin is `sports/nfl/sim/passclass.ts` (the only snapshot diff of the whole re-pin: `diff -rq`
  against the old pin names ONLY that file and the changed `sports/nfl/sim/game.ts`).
- The carried suite (`test/engine/`, the tip's `colors/test` re-pointed by
  `scripts/sync_engine_tests.py`) passes **406/406** (`npm run test:engine`, 46 suites) —
  the 12 new tests are `test/engine/nfl/passclass.test.ts` (+ `passclass-vectors.json`).
  **NO carried expectation changed**: every pools-node test passes at the tip unchanged — the
  green 406/406 run IS that receipt.
- The flex table (`tools/mathlab/flex.json`) — **byte-identical across the two pins**
  (`cmp` old pin vs tip → exit 0): **99 rules — 17 at 0, 17 at 2, 42 at 6, 23 at 12**; the six
  Owner rules at 2 (EDGE→DT, ILB→OLB, CB→FS, EDGE→OLB, OT→OG, CB→SS); **SS→NICKEL = 0** (never
  approved). Measured this sitting by rule-count script.
- **Four pack files** in `data/packs/`, all byte-identical to the tip (`cmp` ×4): the two pool
  packs (`nfl-pools-fit2016-2022.json`, 4,620,150 B; `nfl-pools-fit2023-2025.json`, 2,990,032 B —
  both ALSO byte-identical to the old pin: carried, never re-baked) plus the two test-only GLM
  packs (`nfl-passclass-fit2016-2022.json`, 1,957 B; `nfl-passclass-fit2023-2025.json`, 1,942 B).
  Nothing in `src/` reads the GLM packs at runtime (grep-verified); the Architect's suite fails
  without them, so a full `data/packs/` copy carries them.
- The engine's self-declared stamp at this pin: **`nfl1.1ac56c28928eff`** — invocation: `node
  --experimental-strip-types --input-type=module -e "import { engineVersion } from
  './src/engine/sports/nfl/app/versions.ts'; console.log(engineVersion())"` (Node v24.22.3; it
  moves with the rules, never pinned).

## Pack-hash citations (ALWAYS with the invocation — a bare hash is UNKNOWN)

`node --experimental-strip-types scripts/pack-hash-cite.mjs data/packs/nfl-pools-fit2023-2025.json`:
- as baked — `loadPools(makePack(JSON.parse(data/packs/nfl-pools-fit2023-2025.json)))`:
  **`pack53:0e78e4db382f9f`** (M1's missing citation, now named with its invocation)
- product world — `rules.values: clock=dt_pf, trans=computed`: **`pack53:0ff47e1de5e2db`**
- clock only — `rules.values: clock=dt_pf`: **`pack53:1fe065713f326b`**

The 2016–2022 pack, as baked (`node --experimental-strip-types scripts/pack-hash-cite.mjs
data/packs/nfl-pools-fit2016-2022.json`): **`pack53:0b60973944ae13`**.

## The default-off guarantee (PROVEN, this sitting — the one that matters most)

The GLM pass-class node is OFF by default. `runGame` takes optional `passClass`/`passGap`;
absent, the game is bit-for-bit the pools node. Nothing in the shell passes either option
(grep over `src/lib`, `src/App.svelte`, `batteries`, `scripts` → EMPTY). Proof,
`node --experimental-strip-types scripts/gamelog-fixture.mjs --out <file>` in BOTH trees:
1. **60 games byte-identical across the pins**: the `defaultOff` sections (key, logHash, points,
   ot, and the FULL event JSON of every game, `gameKeyOf('default-off-proof-<i>')`) of the
   old-pin tree's fixture and this prepared tree's fixture are EQUAL (Python deep-compare →
   True; the files differ only by the tip file's extra proof sections).
2. **Lambda-0 tilt is a no-op**: 60/60 games — `{passClass}` vs `{passClass, passGap: 7}` —
   identical logs bit for bit (the packs carry lambda 0; the packs are never refitted).
3. **The control**: 60/60 games — node ON vs OFF — logs differ. The comparison is live, not
   vacuous.
Theta is a toy shape, lambda is 0, only the class is modelled. You do not turn the node on; you
do not fit theta or lambda; you do not build the yards node.

## The re-pin procedure (the FIVE paths — all five, or the tree goes red)

```bash
git fetch --depth 50 origin architect/engine-and-seats \
&& git worktree add --detach --no-checkout .wt-<pin> <PIN> && (cd .wt-<pin> && git checkout HEAD -- colors/src colors/test tools/mathlab/flex.json data/packs) \
&& rm -rf src/engine && cp -R .wt-<pin>/colors/src src/engine \
&& cp .wt-<pin>/tools/mathlab/flex.json tools/mathlab/flex.json \
&& rm -rf test/engine && cp -R .wt-<pin>/colors/test test/engine \
&& mkdir -p data/packs && cp .wt-<pin>/data/packs/*.json data/packs/ \
&& python3 scripts/sync_engine_tests.py && node scripts/precompile-engine.mjs   # re-point imports + regenerate the Part-D copy \
&& npm run test:engine && npm run battery:node && npm run distfile && npm run battery && node --import ./scripts/node-port-register.mjs batteries/shell.battery.mjs
```
If any step fails: FILE it to the Architect — do not route around it, do not edit the snapshot.
The five paths: **`src/engine/`** (the snapshot) · **`tools/mathlab/flex.json`** (the flex table
the carried tests read) · **`test/engine/`** (the carried expectations) · **`test/engine.test.ts`**
(the entry file sync_engine_tests.py regenerates — a path in its own right: the 2026-11-15 miss
was an entry file that imported nothing) · **`data/packs/*.json`** (the fixtures the carried
suite reads — FOUR files at this pin). One commit-equivalent, green in the same state.

## Running the node-side TS on ANY Node (Part D — the register hook, replaces the transform flag)

The snapshot carries ONE TypeScript parameter property (`platform/localstorage.ts`,
`constructor(private readonly ls: Storage | null, …)` — still at the tip, re-checked). Strip-only
mode cannot parse it, and `--experimental-transform-types` existed only in Node 22.7–24 (removed
in Node 26). Route 2 is BUILT:
- `node scripts/precompile-engine.mjs` (or `npm run precompile`) emits **`src/engine-node/`** —
  a generated copy of the snapshot, byte-identical EXCEPT that one constructor (explicit fields;
  proved inside the generator: exactly one file differs). It is a build artifact: gitignored,
  excluded from CHECKSUMS/MANIFEST, never committed.
- Every node-side TS entry runs through **`node --import ./scripts/node-port-register.mjs`**:
  `npm run battery:node`, the shell battery, the probes, the falsifiers. The register fails loud
  if the generated copy is stale (any snapshot byte change — e.g. a re-pin — regenerates it once,
  then re-asserts).
- Results table (VERIFY carries the full rows): `npm run test:engine` 394/394 (old pin) and
  406/406 (this pin) on BOTH Node v24.22.3 and v26.13.1; `npm run battery:node` 25/25 on BOTH;
  the shell battery 46/0 on BOTH. The snapshot itself is never edited (diff against the pin = 0).

## Dependencies and falsifier behaviour (D-1 / D-2)

- **Playwright is a declared devDependency** (`playwright: 1.57.0`, exact pin — the version the
  receipts' chromium-1200 matches): `npm ci` installs it; the browser is
  `npx playwright install chromium`. The batteries resolve it from the repo's own node_modules
  and FAIL LOUD with a named error if it is missing — the HOME-global fallback is GONE from all
  seven entry points.
- **A falsifier case that cannot run is a FAILURE, never a green light**: no verdict marker, a
  child error (bad option / missing module / type-strip error), or a crash with no law evidence
  → COULD-NOT-RUN, named, exit 1. TAUTOLOGY (a real verdict where the law did not die) is also
  exit 1. Falsifier ports are per-process (PORTBASE from the PID) — two concurrent runs cannot
  cross-serve. `scripts/receipt-falsifier.mjs` mutations are APPLY-ASSERTED (a moved target
  string throws with the file and the anchor; it can never silently no-op again).

## The swap test as a habit (M3, one command)

```bash
CP_REPO=<clone> CP_ENGINE_SRC=<worktree>/colors/src node scripts/swap-test.mjs <sha>
```
Copies the tree, swaps `src/engine/` to the named commit's `colors/src`, runs the engine suite +
the node battery + a build + the slice battery against a preview server, and `diff -rq`s the
whole tree to prove NOTHING outside `src/engine/` changed (engine-node is regenerated inside the
swapped copy and excluded from the diff). Prints PASS/FAIL and names every law that died. This
sitting it ran BOTH directions: the tip into the SHIPPED tree (rehearsal — shell SURVIVED, the
carried goldens red by design) and the old pin into THIS prepared tree (reverse — shell SURVIVED,
the tip-asserting suite fails its LOAD). Receipts in VERIFY.txt §M3.

## What lives outside the snapshot (and why)

- `data/nfl/*.csv` — the dataset fixtures the engine consumes at runtime (never part of colors/).
- `data/packs/*.json` — the pack fixtures (the snapshot's own dev page `main.ts` imports the
  2016–2022 pool pack via a Vite `?url` specifier; `src/vite-env.d.ts` is the shell-side shim
  that types it — a known non-importer; if a future pin drops `main.ts`, the shim goes with it).
- `tools/mathlab/{design.json,flex.json}` — the design constants the engine tests read.
- Everything in `src/lib/port/` is the SHELL's seam — the engine is never imported outside it
  (M1: zero hits; M5: seam.ts 160 lines, 68 engine-import lines, 38 distinct engine modules).
