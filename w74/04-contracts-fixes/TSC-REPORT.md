# TSC-REPORT.md — the first type-checker pass over colors/ (w74 item 4a)

**Command:** `cd colors && npx tsc` (typescript 5.x, installed as a devDependency for this check only; the
tsconfig.json in this folder is the contract). **Baseline before this folder:** the repo had NO tsconfig —
Claude's 551af1b shipped the type contracts UNVERIFIED by a type-checker (his own label).

## Result after applying folder 04's patches

- **Contract files: 0 errors.** Every file this folder patches or adds type-checks clean under the strictest
  config (`strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `verbatimModuleSyntax`):
  `core/app.ts`, `core/saver.ts`, `core/keys.ts`, `core/envelope.ts`, `sports/nfl/app/{appstate,store,saves,
  weekmap,feed,hydrate,dataset}.ts`, `platform/localstorage.ts`.
- **301 errors remain in pre-existing files** (down from 308 — the store/keys/weekmap fixes cured a few
  transitive ones). Two tail notes: two errors are in `app/legacy.ts`, which P-258 deletes anyway; one is
  `TS2305` in `view/draftBoard.ts`'s import surface, which folder 05's slice replaces.
- **Runtime: 286/286 tests pass** with the patches applied (`npm test`).

## What blocks a fully green `tsc` (named, not closed)

The 301 are mechanical strictness debt in files written before any checker existed — NOT contract problems:

| Code | Count | Meaning | Typical fix |
|---|---|---|---|
| TS2532 | 98 | indexed access possibly undefined (`arr[i]`) | guard or `!` with an invariant comment |
| TS18048 | 88 | a `.find()`/destructure result possibly undefined | early-throw (the repo's own style) |
| TS2345 | 49 | `Dest \| undefined` / `number \| undefined` argument | narrow after a `SLOT_SET.has` check (folder 04's store.ts shows the pattern) |
| TS2322 | 40 | `string \| undefined` not assignable | same narrowing |
| TS2538 | 10 | undefined used as index type | same |
| other | 16 | TS2488/2379/2412/2375/2769 | per-line |

**Per file (top of the list):** drives 37, schedule 32, seasonrun 27, boxscore 26, recap 25, season 24,
standings 20, draft 17, hungarian 15, lineup 14, playerids 11, margin 10, players 9, draftBoard 8, hash 7.

## Recommendation to the Architect

1. Land `tsconfig.json` + the contract-file fixes now (this folder); `tsc` joins CI as `tsc --noEmit` with the
   301 pre-existing errors pinned in a baseline file so the count can only go DOWN.
2. One-hour guard pass per engine file, biggest first (drives, schedule, seasonrun = 96 of 301), each fix a
   mechanical narrowing in the repo's own early-throw style — no behaviour changes, `npm test` after each.
3. Do NOT weaken the two strictest flags to get green faster: `noUncheckedIndexedAccess` is exactly the class of
   bug corrupt-never-repair exists for.

## Does this change the w73 verdict?

No — it sharpens it. w73's verdict was on contract DESIGN, and the design type-checks clean. The w73 claim that
needed this run was "the type contracts are UNVERIFIED by a type-checker": now verified, with the residual debt
named, bounded (301, mechanically fixable, zero in the contract layer), and guarded by a pinnable baseline.
