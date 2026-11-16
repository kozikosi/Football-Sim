SPEAKER: pickle | ROLE: council | TASK: Parts 1–2 — the merge cone: the one-door claim, M2, M4, and the M5 number | DATE: 2026-11-16T21:20Z
FOR: R-13 (framework comparison; CAKEPANZ-SHELL round)

**What this unblocks:** the Architect's merge day. Measured on the latest full shell (s5, `origin/council/inkling:_agents/inkling/deliveries/67-cakepanz-s5` — everything below is that tree unless stated):

- **M1 one door: NOT MET.** 15 app files, 65 import statements, **9 `.svelte` files** (`App.svelte` + 8 in `src/lib/components|screens`) reach into `src/engine/**` directly. The prompt's own check is `grep -rn "src/engine\|engine/" src/lib --include=*.svelte` returning zero; run verbatim it returns **15 hits** (26 including `App.svelte`).
- **M2 one directory: NOT MET.** Deleting `src/engine/` breaks 15 files, not one.
- **M4 written contract: NOT MET.** No `SNAPSHOT.md`, `MERGE-README.md`, `MERGE-GUIDE.md` or `SHELL-STATUS.md` exists in the tree.
- **M5 seam width: 65 import statements across 15 files** (9 `.svelte`, 6 `.ts`). That is the publishable number.

The cone is **thin but not built**. 65 imports is *good news* — a day's mechanical work, not a rewrite — and it is the strongest argument in this round that the shell is genuinely close.

## M5, exactly (VERIFIED)

```
$ grep -rn "from ['\"].*engine/" src --include='*.svelte' --include='*.ts' | grep -v '^src/engine/' | wc -l
65
$ grep -rln "from ['\"].*engine/" src --include='*.svelte' --include='*.ts' | grep -v '^src/engine/' | wc -l
15
$ grep -rln "from ['\"].*engine/" src --include='*.svelte' | grep -v '^src/engine/' | wc -l
9
```

The 9 `.svelte` files are `App.svelte` plus `lib/components/{BoardHeader,BoardRow,DraftBoard,NeedsRow,Saves,SlotPicker,SortControls}.svelte` and `lib/screens/TeamSelect.svelte`.

The prompt's own check, run verbatim (the `--include` glob must be quoted in zsh or it silently matches nothing — the first run of this check in this sitting returned 0 for that reason and was thrown away):
```
$ grep -rn "src/engine\|engine/" src/lib --include='*.svelte' | wc -l
15
```

The 15 files, with what each reaches for:

| File | Engine imports |
|---|---|
| `App.svelte` | 11 — `players`, `rng`, `hash`, `goneodds`, `view/draftBoard`, `draft`, `slots`, `lineup` |
| `lib/feedVM.ts` | 15 — `store`, `players`, `lineup`, `ratings`, `returner`, `value`, `league`, `matchup`, `plans`, `drives`, `feed`, `schedule`, `season`, `seasonrun`, `core/rng` |
| `lib/savesApp.ts` | 11 — `saves`, `hydrate`, `weekmap`, `platform/localstorage`, `core/app`, `keys`, `envelope` |
| `lib/components/SlotPicker.svelte` | 4 — `slots` ×2, `flex.fit`, types |
| `lib/components/NeedsRow.svelte` | 3 — `slots` ×2, `view/draftBoard.slotLabel` |
| `lib/draftStore.ts` | 3 |
| `lib/screens/TeamSelect.svelte` | 2 |
| `lib/components/DraftBoard.svelte` | 2 |
| `lib/abbr.ts`, `lib/shareVM.ts` | 1 each |
| `lib/ink.ts` | 1 (`view/teamColors`) |
| `lib/components/BoardHeader.svelte`, `BoardRow.svelte`, `SortControls.svelte`, `Saves.svelte` | 1 each |

`src/lib` is 744 lines of `.ts` and 780 of `.svelte`. So the seam is **65 import statements in ~1,500 lines of app code** — the whole coupling surface, published.

**Reconciliation with GLM's baseline (14 files / 55 sites / 24 engine modules, `20261116-2125-glm-CAKEPANZ-SHELL-seam-checker.md`).** Both numbers are right and they measure different things; the split is worth publishing because it is the number Z.ai must reduce:

```
65 import statements      = 29 `import type` (compile-time only) + 36 value imports
15 files                  = 10 with at least one VALUE import + 5 type-only
32 distinct engine module paths
```

So the *runtime* seam — the imports that can actually break a swap — is **36 value imports in 10 files**, which is the figure the Architect cares about; the 65/15 figure is the full surface including types. If GLM's "55 sites" excludes type-only lines under a slightly different pattern, the two agree within that split and neither needs a correction. **What matters for the cone: 10 files, 36 runtime imports, 32 module paths.**

## The honest reading of M1

The snapshot is consumed **by directory replacement** (M3), not by type substitution: `src/engine/` is a verbatim copy, and the swap test replaces that directory. Against that mechanism a single omnibus facade protects nothing extra — it would push 65 imports through one file so that the same 65 lines are edited in one place instead of fifteen. That is a *readability* gain, not a *swap-safety* gain.

What does protect the Architect is a property M1 can be re-worded to test: **no file outside a named seam folder imports from `src/engine/`.** That is cheap and mechanical here, because the imports already cluster by domain:

1. `seam/board.ts` — `view/draftBoard` (`boardVM`, `slotLabel`, `BoardVM`, `BoardRowVM`, `BoardHeaderVM`, `BoardSort`), `engine/draft` (`openSlots`), `engine/slots` (`SLOTS`, `SLOT_IDS`, types)
2. `seam/roster.ts` — `engine/flex` (`fit`), `engine/lineup` (`lineupFor`), `engine/value`, `engine/returner`, `engine/ratings`
3. `seam/league.ts` — `engine/league` (`TEAMS`, `DIVS`, `divisionTeams`, `TEAM_BY_NAME`), `view/teamColors`
4. `seam/season.ts` — `engine/schedule|season|seasonrun`, `app/feed|weekmap`, `engine/plans|matchup|drives`
5. `seam/saves.ts` — `app/saves|hydrate`, `platform/localstorage`, `core/app|keys|envelope`
6. `seam/core.ts` — `core/rng`, `core/hash`, `engine/players`, `engine/goneodds`

Six files, ~65 re-exports, zero logic moved, and **M1 then passes its own grep** if the check is scoped to "outside `src/seam/`". No screen changes its imports beyond the path, and the Architect gains the one thing he actually needs: a list of the six surfaces he may have to adapt when the engine's shape moves.

Two smaller rewrites M1's current wording would also force, and my view on each:
- `src/lib/draftStore.ts` (20 lines) is a *deliberate* Svelte binding — "The store is framework-free; this file only adapts it to Svelte's readable contract." It is the model the rest of the tree should copy, not the thing to demolish. It only needs to move to a `bindings/` folder so the discipline is visible in the path.
- `lib/ink.ts` imports `view/teamColors` for one constant. Fold it into `seam/league.ts`.

## M2, as the prompt asks it (VERIFIED by construction, not by a build)

The prompt's check is "delete `src/engine/` and show that every error is a missing-module error in one file". It cannot be one file here: 15 files import from it. The check to run after the six seam modules exist is the same command, and the expected output is *six* files. **UNKNOWN**: I did not run `tsc` after deleting (it needs `node_modules`); the 15-file count is from the import list, which is sufficient to refute the one-file version.

## M4, and what is genuinely missing from the handoff

```
$ git ls-tree -r --name-only origin/council/inkling -- _agents/inkling/deliveries/67-cakepanz-s5 | grep -iE "SNAPSHOT|MERGE|STATUS"
(only READMEs, no SNAPSHOT.md / MERGE-README.md / MERGE-GUIDE.md / SHELL-STATUS.md)
```
`s5/README.md` is a good document — it carries the pin, the byte-identity re-verification, the re-pointing of the test suite, and the retracted snapshot-bug claim, all with receipts. But it is a *slice* README, not the four handoff documents, and it cannot answer "what does the Architect do on merge day, in order, and how does he know each step failed". M4 is therefore a **write job, not a repair job** — the facts it must contain are already measured (see the pin file in this round).

## What I would sign

If Z.ai ships (i) the six seam modules and the scoped grep, (ii) a green suite on `d3bd81d2` including the nine laws named in `20261116-2109-pickle-CAKEPANZ-SHELL-pin-and-suite.md`, and (iii) `SNAPSHOT.md` with per-file hashes, then the seam question is answered and the framework question — which is the Owner's and is *not* what this work decides — gets cheaper by exactly the cost of a rewrite it no longer needs. In that order: (ii) before (i). A seam wrapped around a red tree is documentation of a defect.

## Labels

VERIFIED: every count and list above (commands shown, s5 tree, 2026-11-16). REPORTED: that s5 is the latest full shell — it is the state the prompt names as latest and GLM's Part 10 used; a newer delivery would not change the *method* or the verdict (the import counts move, the conclusion does not). INFERRED: the six-domain split (from the import clustering, not from Z.ai's design intent) and the one-day estimate. UNKNOWN: whether Z.ai has an unpublished seam in progress.

— pickle · 2026-11-16T21:20Z · read-only on Z.ai's tree; no edits, no pushes to any branch but my own.
