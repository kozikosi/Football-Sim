# MERGE-GUIDE.md — for Claude (the Architect): how the engine drops into 67 Cakepanz

**Pin this guide is written against: `5c808472`** (SNAPSHOT.md is the contract; the old 4ca9a071 and d3bd81d2 pins are retired — see README's correction).

## 1. The seam (the ONE door)
`src/lib/port/seam.ts` is the only file importing `src/engine/**`. Everything above it imports the port:
`App.svelte` → `src/lib/bindings/*` + `src/lib/screens/*` → `src/lib/port/*` → `seam.ts` → `src/engine/**`.
- Port modules: `feedVM, seasonVM, weekVM, standingsVM, reviewVM, awardsVM, cardVM, savesApp, seasonSession, seasonFacade, seasonStats, settings, router, tokens, ink, abbr, shareable, fixture, contract`.
- Engine → app call direction only. The engine NEVER imports the shell.

## 2. The interface the shell expects (expected shapes)
- **Draft store**: `createStore(players)` — actions START{seed,userTeam} / PICK{playerId,slot} / UNDO / LOAD{record}; `getState(): DraftStoreState{record,draft,status,error}`; `subscribe(fn)`.
- **Board**: `boardVM(draft, userTeam, goneOddsObj, {sort,limit})` → BoardVM{header,rows[60],footer,sort}; row carries name,pos,nflTeam,ovr,slotId,slotLabel,natural,wins,priority,gone,alsoFits[{slotId,slotLabel,flex}],tone (ALL display strings pre-made by display.ts).
- **Gone odds**: `goneOdds(draft, userTeam, rng, sims=30)` → {picksBetween, sims, gone:Map}; throws when not the user's pick (the shell catches and holds).
- **Season**: `startSeason(teams,{seed,year,run?})` → RunState; `playWeek(teams,state)` → {state,games[{home,away,round,result}]}; `fixtures(s)` previews; `gameSeed(seed,week,home)`; `table(s)`; `seedPlayoffs(played,rng)`; `isFinished(s)` (nextWeek>22).
- **League construction**: `leagueTeams(pool, picks)` (seasonVM) — optimalLineup('4-3') + teamRatings(spots, ret=75) per team; the SAME path the engine tests use.
- **Feed**: `gameFeed(result, home, away)` → GameFeed{drives,scores,homeScore,...}; the shell's feedForGame/feedForRunStateWeek shape it (abbrs, inks, running scores, me-flags).
- **Recap**: `buildRecap(result, box)` → Recap{scoring,turnovers.lines,stars,ball,boxByPeriod}; the review screen renders it VERBATIM (no re-wording).
- **Saves**: `serialize(kind,slot,meta,payload,now)` / `restore(text)` / `hydrateWeek(env)` / `hydrateSeasonConsistency(env)`; WeekPayload carries {seed,year,run,gameSeed,nextWeek,userTeam,roster,ratings,schedule,scores,plan,statsRecorded,prevRank}.

## 3. Screen → data dependencies
| Screen | Reads |
|---|---|
| TeamSelect | TEAMS/DIVS/divisionTeams/TEAM_BY_NAME + snakeOrder (order preview) |
| DraftBoard | boardVM + goneOdds meta + openSlots + slotLabel |
| Complete | store record (seed, picks count) + engineVersion |
| Hub/WeekView | seasonFacade (weekView, totalWeekSlots, gameSeed per card) |
| Standings | standingsThrough(RunState) |
| Bracket | bracketVM(RunState) — seeding.seeds + playoffs |
| Book | RunState.playoffs + champion + draft record pool |
| Awards | seasonAwards(SeasonStats, table) + leaders |
| Stats | leaders + LeagueTeam[].ratings + table |
| Review | seasonReviewVM(RunState) |
| Feed | feedForGame(result) / feedForRunStateWeek(state,teams,name,week) |
| Share | shareable builders (draft/week/season/bracket/awards brag) |
| Saves | savesApp readSlot/save*/load* (LocalStorageModule composed) |

## 4. Hydration/save schema
One blob per slot (`sim:nfl:slot:<S>`), version-checked by restore(); corrupt-never-repair. Drafts: slots A/B/C via Saves.svelte. Season weeks: slot C via the week stepper's SAVE (weekmap.toWeekPayload — the engine is the ONE writer). Finished seasons: SeasonPayload (pruned). A version mismatch is refused and named, never accepted.
**F5 (resume determinism):** resume determinism holds within the build that wrote the save; across builds, logged picks hold and un-made picks may differ.
**F6 (failure tagging):** every save-service refusal is tagged with its slot — `SlotSummary.slot` rides the refusal rows (`readSlot` never returns an untagged failure); there is no global-on-purpose failure channel.
**F8/F9:** the slot/key pair is asserted on the one write path (`savesApp` composes `slotCheck: assertSlotMatchesKey`; node law N20); `retriable` is always-true today — quota-class refusals are reserved for v1.1 (the engine's saver.ts:43 annotation is the contract).

## 5. The exact merge-day steps (the cutover runbook)
1. `git fetch --depth 50 origin architect/engine-and-seats`
2. `git archive <NEW_PIN> colors/src | tar -x --strip-components=1 -C src/engine`
3. `python3 scripts/sync_engine_tests.py` (re-points the carried suite; see header)
4. `npm run test:engine` — the pin's own suite must be green; a fail here = file it, don't patch
5. `npm run distfile` (build + single-file) → `npm run battery` (29 laws) → `npm run battery:node` (24 laws) → `node batteries/shell.battery.mjs` (render) — or the whole receipt set in one staged run: `bash scripts/acceptance-run.sh`
6. Update SNAPSHOT.md pin + sha256s (`node scripts/regen-manifest.mjs`)
7. Ship. If any step fails: FILE the failure (file + output), do not route around it.

## 6. TS core vs bindings vs assets (the framework map)
- **TS core (framework-free, node-testable)**: `src/lib/port/**` (20 modules, ZERO `document` — the
  DOM half of the shareables lives in bindings since the P-368 split), `src/lib/valuation.ts`.
- **Bindings (replaceable at cutover)**: `src/lib/bindings/stores.ts` (the readable/writable
  wrappers + the subscribe-time snapshot push), `src/lib/bindings/shareDownload.ts` (the Blob/
  anchor download) and `src/lib/bindings/tokensApply.ts` (NEW, 2026-11-17: the DOM half of the
  token remap — `document` is out of src/lib outside bindings), plus the RENDER layer: **26 `.svelte` files**
  (1 `App.svelte` + 15 `src/lib/screens/*.svelte` + 10 `src/lib/components/*.svelte`), which are the
  binding in the honest wording of the neutrality claim. App.svelte's script block is the
  `$state`/`$derived` glue. A Vue 3 re-bind replaces bindings/ + App.svelte's script + the 26
  `.svelte` files; every law in batteries/node.battery.mjs runs unchanged.
- **Assets**: `src/lib/assets/tokens-w89.css` (the palette law, Cinzel inlined), `zpb-team-colors.json`, `shell.css`.

## 7. §5 filings (the shell needs, filed — not worked around)
1. **P-317 store slot support**: extend DraftStoreAction START with `order?: number[]` and DraftPayload with `order?: number[]` (+ restoreDraft: `newDraft(pool, rng, cfg, rec.order ?? snakeOrder())`). Proof of need: store LOAD refuses a custom-order record ("save: pick 1 is out of order" — receipted); the UI + engine are ready (TeamSelect orderWith builds the FULL 1,024-entry order; node battery P-317 green).
5b. **`deviceId?: string`** (P-254, 2026-11-17): one OPTIONAL additive field on the envelope (core/envelope.ts) so v1.1 never unfreezes — the freeze text is ENVELOPE-FREEZE.md; a schema-1 reader ignores it, no reader rejects it.
2. **OT clock()** (slice-4 filing, still open): app/feed.ts clock() maps OT drives to Q4 with negative mm:ss; the feed renders an honest OT stamp meanwhile.
3. **Gravity/double-teams measurement**: the Stats screen carries the STAND-IN label; the real call is the Architect's measurement module over matchup.ts.
4. **Awards grades**: seasonAwards returns no grade field; the w89 90+ shimmer has nothing to key on — propose exposing gradeOf-worthy lines.
5. **The parameter property** (NEW, 2026-11-17): `src/engine/platform/localstorage.ts` declares `constructor(private readonly ls: Storage | null, private readonly o: LocalStorageOptions = {}) {}` — a TypeScript parameter property that Node's strip-only TypeScript mode refuses (`ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX`), so BOTH node-side batteries need `--experimental-transform-types` (verified on Node v24.22.3, pinned in SNAPSHOT.md). Proposed old→new (no behaviour change): explicit field declarations — `private readonly ls: Storage | null; private readonly o: LocalStorageOptions;` + `constructor(ls: Storage | null = null, o: LocalStorageOptions = {}) { this.ls = ls; this.o = o; }`. SAFE ALONE: yes (syntax only). HOW TO CHECK: `node --experimental-strip-types -e "import('<pin>/platform/localstorage.ts')"` no longer throws ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX; the engine suite stays 323/0.
6. **The season-length constant** (RESOLVED SHELL-SIDE): savesApp's fixture line now uses the engine's own `isFinished` — no shell-side duplicated week count remains.
