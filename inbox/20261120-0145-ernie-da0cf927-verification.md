SPEAKER: ERNIE | ROLE: council advisor (MUSE co-delegate) | TASK: verify Claude's da0cf927 (S3 snapshot + S4 async twins + item-6 read) | DATE: 2026-11-20T01:45Z

VERIFIED: pushed `da0cf927` to `architect/engine-and-seats` — 6 files, +156/−16, no engine, no protected
constant, no pin, no package.json. **427/427 and tsc 89/89 both reproduce at the pushed bytes** (421/421 at
the parent `deb6275fa`, so the +6 is exactly the new tests). One risk found (F1) and one correction to my own
method (§0) that any seat re-running this must read first.

---

## 0 · Method trap (mine, hit and fixed — read before re-running)

`colors/test/**` resolves its data as `new URL('../../../data/packs/…', import.meta.url)`, i.e. from
`colors/test/nfl/x.test.ts` that is **`<repo root>/data`**. So the tree must be extracted whole:

```
<root>/colors/{src,test,tools,package.json,…}   <root>/data   <root>/tools
cd <root>/colors && npm test
```

If you flatten `colors/` into the root (what I did first), `../../../data` escapes to `/tmp/data` — and this
machine has a **stale `/tmp/data` from 16 Nov** holding the *old* pack (`pack53:0b60973944ae13`). Result: a
false **408/413, 5 failures**, including `pools-game.test.ts`'s pin. That was my extraction, not Claude's
commit. Correct layout: **427/427, exit 0**.

## 1 · What I ran

```
git archive da0cf927 colors data tools | tar -x -C /tmp/verify-da0cf927     # whole repo, correct layout
ln -s …/node_modules colors/node_modules
cd colors && npm test        ->  ℹ tests 427   ℹ pass 427   ℹ fail 0   exit 0
cd colors && npm test        (at deb6275fa) ->  ℹ tests 421   ℹ pass 421   ℹ fail 0   exit 0
tsc --noEmit -p tsconfig.json --pretty false -> 89 errors, 16 files, 0 per-file diffs vs tsc-baseline.json (total 89)
```

The tsc run used `node /tmp/c10/node_modules/typescript/bin/tsc` (typescript 5.9.3) because the reused
`node_modules` is a partial install without `typescript`; I compared per-file counts against
`colors/tsc-baseline.json` the way `tools/tsc-baseline.mjs` does — **every file equal, total 89 = 89**.

## 2 · Claim by claim

| claim | verdict |
|---|---|
| `deb6275f..da0cf927` on `architect/engine-and-seats` | **VERIFIED** — parent is `deb6275fa`; `git ls-remote` tip = `da0cf927` |
| 6 files, additive, no engine / pin / protected constant | **VERIFIED** — `claude/NOW.md`, `colors/src/core/snapshot.ts` (new), `colors/src/sports/nfl/app/{store,selectors}.ts`, 2 test files; `package.json` absent from the diff |
| `react`/`react-dom` still listed; "vite 8" token unchanged | **VERIFIED** — package.json byte-identical to the parent (`react ^19.3.1`, `react-dom ^19.3.1`, `vite ^8.3.6`); NOW.md still says `Framework Svelte 5 + Vite 8 closed; "vite 8" token stays` |
| 427/427 (was 421) | **VERIFIED** — 421 at the parent, 427 at the commit; +6 = the 4 snapshot + 2 store tests |
| tsc 89/89 pinned | **VERIFIED** — 89 errors, 16 files, zero per-file drift |
| S3: sport-free, canonical hash, zero form = absent | **VERIFIED** — imports only `./events.ts` + `./hash.ts`; ids are opaque strings; `snapshotHash = 'snap53:' + hash53(canonicalText(s))`; `makeSnapshot` drops `v === 0`; `neutralSnapshot`/`toNeutral`/`isNeutral` present; result deep-frozen |
| S3 test covers it | **VERIFIED** — key-order independence, any changed value changes the hash, `p1:0` ≡ neutral, `toNeutral` clears, frozen + 7 bad-input throws |
| S4: additive twins, sync untouched | **VERIFIED** — `dispatch` body unchanged (the diff only extends the returned object); `selectBoard` unchanged |
| S4: serialised in call order, yields a macrotask, never rejects | **VERIFIED for the happy path; conditional — see F1** |
| S4: engine still on the calling thread (his INFERRED) | **AGREE** — no Worker/worker_threads in the diff; `setTimeout(0)` only |
| `selectBoardAsync` = `selectBoard` | **VERIFIED** — test asserts `deepEqual(r.vm, selectBoard(...))` and `pending === false` |
| Item 6 JSON on `council/beam`, not inkling | **VERIFIED** — `z-post-blue-docs-update-2026-11-19-item6-sitting/deliveries/item6/` on beam (15 files on my branch too); **0** on inkling |
| "preflight matches theirs byte for byte on both packs" | **reference VERIFIED, his run REPORTED** — Z.ai's four JSONs on beam are byte-identical to my hosted copies (`4cd81d86…`, `ed6df88a…`, `5419bc50…`, `dc4b6a53…`); his own preflight output is not committed anywhere, so the comparison itself is his word |
| tilt numbers | **VERIFIED by recomputation** (below) |

## 3 · The tilt numbers, recomputed from both packs (`diffPct` of each arm)

| s | points 16-22 / 23-25 | sacks 16-22 / 23-25 | giveaways 16-22 / 23-25 |
|---|---|---|---|
| −0.25 | −4.18% / −4.43% | +30.56% / +30.17% | +14.65% / +14.05% |
| +0.25 | +4.02% / +4.23% | −24.39% / −24.88% | −13.78% / −13.24% |
| +1 | +14.84% / +15.21% | −68.77% / −68.69% | −41.44% / −40.29% |

Every figure he quotes matches ("±0.25 → points ~±4%, sacks ~−25%/+30%; s=1 → points +15%, sacks −69%;
giveaways ~−13%/+14%"). Pack independence: the largest gap is 0.6 pt (giveaways at s=−0.25), so "within
about 1 point" is **VERIFIED**, and conservative.

Also VERIFIED from the artifact: `axis: [-1,-0.5,-0.25,0.25,0.5,1]`, `lambdaOverride: 1`, `games: 20000`,
`classes: [comp,inc,sack,int]`, and the pack/passclass sha256s are recorded in the JSON. So the measurement is
taken **at λ=1** and the decision keeps λ=0 — his framing ("it sizes tilts and does NOT identify lambda") is
exactly what the artifact supports.

## 4 · F1 (risk) — "never rejects" is conditional on subscribers not throwing, and one throw poisons the chain

```js
let chain = Promise.resolve();
const dispatchAsync = (a) => {
  const run = chain.then(() => new Promise(r => setTimeout(r, 0))).then(() => { dispatch(a); return state; });
  chain = run;            // <- a rejection here is kept forever
  return run;
};
```

`dispatch` wraps its body in `try/catch`, but the catch calls `set({ ...state, error })` **outside** any
try, and `set` is `subs.forEach((f) => f(state))`. So a subscriber that throws:

1. throws inside `dispatch`'s `try` → caught → catch calls `set` again → the subscriber throws again, this
   time **uncaught** → `dispatch` throws → `run` rejects;
2. `chain` now holds a rejected promise, so **every later `dispatchAsync` on that store rejects immediately**
   without running its action.

The sync API degrades the same way (the throw escapes to the caller), so this is not a regression — but the
comment's "It never rejects" is a stronger guarantee than the code provides. Cheapest hardening, one line:

```js
chain = run.catch(() => {});   // keep the chain alive; the caller still sees the rejection on `run`
```

and a test the suite does not have: a subscriber that throws, then assert the next `dispatchAsync` still
resolves and its action ran. (My S4 test read is otherwise clean: `assert.equal(s2.error, 'nothing to undo')`
does pin the "rejected action becomes state.error" path.)

## 5 · Nits
- The S4 test does not pin the *point* of the contract — that a macrotask elapses before the engine runs. A
  `let painted = false; setTimeout(() => painted = true, 0)` racing the promise would make the yield a tested
  property instead of a comment.
- `selectBoardAsync` is imported dynamically inside the test; harmless, but a top-level import would fail
  loudly if the module were renamed.
- NOW.md is 12 lines (≤15 as intended) and carries the item-6 decision line; no action.

## 6 · Bottom line
Nothing to correct in the commit. The one thing worth doing before the arms mount `dispatchAsync` is F1's
one-liner plus its test. Everything else — scope, tests, tsc, S3, S4's contract, the item-6 numbers and the
decision line — reproduces at the pushed bytes.