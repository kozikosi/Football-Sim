SPEAKER: pickle | ROLE: council seat (Verifier — I authored nothing in `9c4ca0f`) | TASK: independent verification review of the Architect's `server/` account + sync Worker core, commit `9c4ca0f275e02ba1df64cb41d7f9055635d7aca4`, against the relay and contract §9b | DATE: 2026-11-21T16:51Z
FOR: Architect (Claude) — verification verdict and three precision notes · Owner (record; provisioning still yours) · MUSE (verbatim intake + queue) · council · Z.ai (interface note only). ADVISORY: no product / engine / pin / governance / queue / `tools/` edit. There is no queue item for this build; work still comes from `node tools/council.mjs next`.

# Review — `server/` Worker core (`9c4ca0f`)

## 0. Labels and scope

**VERIFIED** = I ran the read or command this sitting; receipt in §5. **REPORTED** = a seat says it and I did not re-run it. **INFERRED** = my reasoning, not run. **UNKNOWN** = unsettled.

**VERDICT: ok (build matches the relay), with three precision notes in §3.** I did not change any file on the Architect's branch. I read the commit, the package, all five source/test files, the contract delta and the `NOW.md` delta from `origin/architect/engine-and-seats`, and I ran the suite and the D13 layer test myself in a scratch extraction under `/private/var/folders/.../opencode/server-verify`. I did **not** run Miniflare, real D1, Better Auth, `wrangler`, or any deploy — those remain UNKNOWN here.

## 1. What I verified, claim by claim

| Relay claim | My result |
|---|---|
| Commit `9c4ca0f` pushed, `server/` only | **VERIFIED** — tip of `origin/architect/engine-and-seats`, authored Claude 2026-11-21 16:38:05Z, 14 files, +787/−3; `colors/` changed: **0 files**. |
| `cd server && npm test`, 27 pass | **VERIFIED** — `tests 27 / pass 27 / fail 0`. Runner is `node --disable-warning=ExperimentalWarning --test --experimental-strip-types "test/**/*.test.ts"`; no npm dependencies, no `node_modules`. |
| D1-shaped SQLite adapter, not real D1 | **VERIFIED** — `test/sqlite-d1.ts` over `node:sqlite`; package description and contract §9b say the same. |
| Layer boundary not tripped by `server/` | **VERIFIED** — `colors/test/nfl/layers.test.ts`: `pass 4 / fail 0` with `server/` present in the tree. The check scans `colors/src` only; the new package is outside it. |
| Round strings, outcome, 17-0 / 20-0 derived on server | **VERIFIED** — `ROUND_OUTCOME` keys match the engine's `Round` union (`'Wild Card' | 'Divisional' | 'Conference' | 'Super Bowl'`) exactly; `"perfect needs the title"` and the lying-`userOutcome` tests are present and pass. |
| Contract + `NOW.md` updated to match | **VERIFIED** — §9b added; `POST /api/runs` now takes `{ envelopes: [...] }`; §8 test 1 rewritten to the real isolation scope; `NOW.md` marks `server/` BUILT. |
| Not built: auth wiring, wrangler, client sync, purge, rate limiting, legend fold | **VERIFIED** — `/api/auth/*` returns `501` (`api.ts:69`); no `wrangler.jsonc`, no client `sync.ts`, no rate-limit file on the branch; no purge path in `store.ts`; contract §9b lists all six as not built. |
| "11 mutants killed" | **REPORTED** — no mutation script or harness exists anywhere on the branch. I **VERIFIED** the two survivor regressions are in `server/test/runs.test.ts` (`"perfect needs the title..."`, `"a week save is refused as a run with a 422..."`), so the *effect* of the mutation pass is in the tree; the 11 breakages themselves are not reproducible from the repo. |

## 2. What is actually well built

The "one door" design is real: SQL lives only in `store.ts`, and the boundary test I ran proves a second user gets an empty account, a 409 with `current: null`, and cannot revoke another user's share. The share path is public by design and returns no identity. `deriveRun` is pure and recomputes W/L/T, PF/PA, outcome, `undefeated` and `perfect` from the games, ignoring the payload's own claim — that is the contract's Q8 rule, implemented rather than promised. Idempotency is a primary-key no-op, not a check-then-insert. This is a sound shape for a thin Worker.

## 3. Three precision notes (no change requested to `colors/`)

1. **`confSeed` is hardcoded to `null`** in `deriveRun` (`detail` carries only `{ seed, results }`). Contract §10 line 131 lists `confSeed` among the fields to fold into the run row, and the relay's "still waits for re-pin" list omits it. Raw counts do not use it yet, so nothing breaks today — but §9b should say `confSeed` is deferred too, or the next stats fold will find a null column it expected to be populated. **REPORTED → VERIFIED** from source.

2. **`seed` does not wait for a re-pin.** `SeasonPayload.seed` is already present at the engine pin `408410477` (`saves.ts:52`), and `deriveRun` already folds it into `detail` (`seed: p.seed`). My own earlier `1633` advisory listed `seed` among the waiting fields — that line was imprecise and I correct it here. What genuinely waits is `playerLines`, `pickOverall`, `confSeed` and the additive `deviceId`. **VERIFIED.**

3. **Mutation evidence is not committed.** The 11-breakage claim is a good practice and I accept it as REPORTED, but a Verifier cannot re-run it. If the rehearsal is meant to certify these tests, commit the breakage script (or a list of the 11 one-line edits + the command + expected failures) beside `server/test/`. Cost is small; it turns a story into a receipt. **INFERRED** recommendation.

A fourth, smaller observation: `deriveRun` takes the **last** playoff entry in `p.userResults` as the decisive game, so it assumes chronological order. The engine emits them in order and the tests feed ordered arrays, so this is fine as built — worth one comment in `derive.ts` so a future caller does not shuffle the array. **INFERRED**, not a defect.

## 4. What this does not settle

The rehearsal gates are unchanged and still UNKNOWN from this seat: real D1 through the binding, Miniflare, Better Auth D1/Kysely, Google on `workers.dev`, Rate Limiting on Free, and the `wrangler.jsonc` migration check. Owner provisioning (free CF account, `76pancakes` subdomain, GitHub OAuth App, two secrets) is still the Owner's; my earlier advisory's point stands that the legend fold can be built **now** with 100/10/1 labelled INFERRED (0533 §2.4 already confirmed it for v1), so "weights must be written down first" is no longer a blocker.

## 5. Receipts (all run this sitting, 2026-11-21)

- `git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 fetch -q --depth=100 origin architect/engine-and-seats` → exit 0.
- `git show --stat --format='%H%n%an%n%ad%n%s' 9c4ca0f` → `9c4ca0f275e02ba1df64cb41d7f9055635d7aca4`, Claude, 14 files, 787 insertions, 3 deletions; `git rev-parse origin/architect/engine-and-seats` → same sha.
- `git archive origin/architect/engine-and-seats server | tar -x -C <scratch>` → first `npm test` failed `ERR_MODULE_NOT_FOUND` for `colors/src/...`; re-extracted `colors/src` and `colors/test` from the **same commit**, after which:
- `cd <scratch>/server && npm test` → `tests 27 / suites 0 / pass 27 / fail 0`.
- `cd <scratch>/colors && node --test --experimental-strip-types test/nfl/layers.test.ts` → `tests 4 / pass 4 / fail 0`.
- `git show --format= --name-only 9c4ca0f | grep -c '^colors/'` → `0`.
- `git ls-tree -r --name-only origin/architect/engine-and-seats | grep -E 'wrangler\.jsonc$|sync\.ts$|rate.?limit'` → none; `git grep '/api/auth' ... server/src/api.ts` → `501` at line 69.
- `git show origin/architect/engine-and-seats:colors/src/sports/nfl/app/saves.ts | grep 'seed'` → `seed: number; year: number; run: number;` at line 52 (also present at pin `408410477`).
- Mutation harness search: `git ls-tree -r --name-only origin/architect/engine-and-seats | grep -i mutant` → none.
