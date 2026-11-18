# SNAPSHOT.md — the frozen engine snapshot (M4 · the written contract)

A stranger can re-pin from this file alone.

**STATE: SHIPPED TREE OF RECORD (2026-11-17 sitting, pin 5c808472).** This tree's snapshot is the
pin below, byte-verified. The re-pin PREPARATION to `65673a00` (Part B — built, proved, NOT
activated) is delivered as the sibling **prepared copy**; its own contract is that copy's
SNAPSHOT.md. The two trees are never confused: this file names THIS tree's snapshot. If the
Owner says "re-pin", activation is one step: move the five paths from the prepared copy (or
re-run the procedure below against `65673a00`), re-run the five checks, re-pin this file.

## The pin

- **Engine commit: `5c808472`** on `architect/engine-and-seats` ("Pooled-node conformance: the
  lab's own Pack is the oracle for the baked pack and the TS loader"). The prepared (not
  activated) next pin: `65673a00` — "2a: the pass-class GLM node" (one engine file added:
  `sports/nfl/sim/passclass.ts`, 68 files; `f9991424` between them is docs-only).
- The shell consumes `colors/src/**` at that commit as a frozen snapshot, copied VERBATIM into
  `src/engine/` — **67 TypeScript files**. Byte-identity VERIFIED this sitting against a worktree
  checkout of the pin: `diff -rq <worktree 5c808472>/colors/src src/engine` → exit 0.
- The carried suite (`test/engine/`, the pin's `colors/test` re-pointed by
  `scripts/sync_engine_tests.py`) passes **394/394** (`npm run test:engine`, 45 suites) — VERIFIED
  this sitting, including from a FRESH CLONE (`npm ci && npm run test:engine` → 394/394).
- The flex table (`tools/mathlab/flex.json`) at this pin: **99 rules — 17 at 0, 17 at 2, 42 at 6,
  23 at 12** (rule-count script this sitting). The six Owner-approved rules are at 2 (EDGE→DT,
  ILB→OLB, CB→FS, EDGE→OLB, OT→OG, CB→SS) and **SS→NICKEL stays at 0** (never approved). The
  table is byte-identical across the two pins (`cmp` old pin vs `65673a00` → exit 0) — measured,
  not assumed.
- **Two pack files** in `data/packs/` at this pin (`nfl-pools-fit2016-2022.json`,
  `nfl-pools-fit2023-2025.json`), byte-identical to the pin. The prepared pin carries FOUR (the
  two test-only GLM packs join them; nothing in `src/` reads them at runtime — grep-verified —
  but the Architect's suite fails without them).
- The engine's self-declared stamp at this pin: **`nfl1.1ac56c28928eff`** — invocation: `node
  --experimental-strip-types --input-type=module -e "import { engineVersion } from
  './src/engine/sports/nfl/app/versions.ts'; console.log(engineVersion())"` (Node v24.22.3).

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
  battery:node` → 26/26; `npm run test:engine` → 394/394.
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
