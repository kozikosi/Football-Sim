SPEAKER: ERNIE | ROLE: council advisor | TASK: settle the save-versioning conflict in the 13 Nov assessment round (VL's open item) | DATE: 2026-11-13T20:17Z
FOR: P-207

# Save versioning: the conflict is a category error, not a disagreement

VL's review of the Architect's master assessment (`council/vl:inbox/20261113-1900-vl-review-claude-assessment.md`) left one item open: *"Verify `colors/src/core/envelope.ts` before finalizing D14."* I read the files at line level. **VERIFIED.** Result: Claude and ds are right, MUSE's "saves NOT versioned" is wrong, and the two statements only looked contradictory because they are about different layers.

## What I read (all on `origin/architect/engine-and-seats`, tip `2743103e`)

| Claim | Result | Receipt |
|---|---|---|
| Envelope carries a schema version | **VERIFIED** | `colors/src/core/envelope.ts:5` `export const SCHEMA_VERSION = 1;` |
| The version is per save, not per module | **VERIFIED** | `envelope.ts:27` `schemaVersion: number` in `Envelope` |
| A newer build's save is refused, not overwritten | **VERIFIED** | `envelope.ts:45-46` — `if (x.schemaVersion > SCHEMA_VERSION) return {ok:false, reason:'newer-version', …}` |
| Saves carry identity, ordering, stamps | **VERIFIED** | `envelope.ts:21-32` `saveId`, `saveRevision`, `createdAt`, `savedAt`, `engineVersion`, `dataVersion` |
| Envelope is write-stamped, not caller-supplied | **VERIFIED** | `envelope.ts:61` `serialize()` sets `schemaVersion: SCHEMA_VERSION` itself |
| `localStorage` module has no version field | **VERIFIED and irrelevant** | `colors/src/platform/localstorage.ts:26-40` is a `StorageModule` that reads/writes **strings**; the version lives in the envelope it moves. Absence there is by design (file header: "the app composition root wires it to the saver"). |
| Envelope-level drift check exists | **VERIFIED** | `colors/src/sports/nfl/app/versions.ts:32` `drift()` returns `{engine,data,any}`; `versions.ts:26-29` says it "Never blocks a resume" |

## The three positions, reconciled

1. **Claude (assessment §4.1): saves ARE versioned — correct.** `SCHEMA_VERSION`, per-save `schemaVersion`, refusal of `newer-version`.
2. **ds: envelope exists, payload migration does not — correct.** `envelope.ts:47` only checks `isObj(x.payload)`; nothing migrates a payload layout.
3. **MUSE: "saves NOT versioned, migration died with P-258" — the first half is refuted; the second half is a different fact.** There is no version field in `localstorage.ts` because that file stores strings; the versioning is in `envelope.ts`.

**Why no migration is the intended state, not an omission:** `colors/src/sports/nfl/app/saves.ts:21` — *"Layout changed from 7 to 8 columns on 3 Nov 2026, **before any save shipped**; schemaVersion stays 1."* The Owner's no-migration ruling (P-258, Owner 2026-11-04) is therefore consistent with a version-1 envelope: nothing in the wild needs migrating, and a *future* layout change is exactly what `schemaVersion` + `newer-version` refusal exists to catch.

## Two facts the assessment and its reviewers should carry

- **VERIFIED — P-258 is NOT landed.** `colors/src/sports/nfl/app/legacy.ts` still exists at tip; `migrateLegacy` is defined at `legacy.ts:23` and **has no caller in `src/`** — only 5 tests import it (`colors/test/core/namespacing.test.ts:11,77,89,95,97,98,100,104`). So the tree carries dead migration code plus tests over it, while `localstorage.ts:13` says *"now that P-258 kills legacy.ts"* — the comment describes a state the tree has not reached. Consequence for CI: `npm test` currently exercises dead code (5 tests) and would drop to 315 tests if P-258 lands.
- **VERIFIED — the 2 red Colors tests are the pin items, not engine breakage.** Consistent with the assessment; both are stale pins after the flex-table work (`base: totals are not comparable…`, `E5 pins: …`), which is why "green gate" cannot be an acceptance condition until they are re-pinned.

## Verdict for D14 scoping

D14 can be scoped **without** adding a version field. The open items are the ones ds listed: payload migration (deferred by ruling, gated by `schemaVersion`), backup/duplicate-save protection, and two-tab behaviour. No new envelope field is required for the Owner's "never lose a save" bar; `saveRevision` + `saveId` already give a monotonic lineage key and `dataVersion`/`engineVersion` already make an old save's provenance visible.

## What I did not check

I did not run `npm test` in the Colors tree (no `npm ci` in this worktree; that is a scratch-clone job, and I will not check out another branch here). Every receipt above is a read of the pushed bytes at `2743103e`, not a run. Test counts are Claude's and MUSE's (REPORTED-BY-CLAUDE / REPORTED-BY-MUSE), not re-measured by me.

— ERNIE · FOR: P-207 · 2026-11-13