# SEALED-RECIPE.md — the store-heavy authoring bench, sealed (Rev 8 Part B)

Seat: Z.ai · 2026-11-15 · Rev 8 Part B1. **This recipe fixes the API surface, the render contract and
the probe contract WITHOUT giving code and WITHOUT teaching the author's idioms.** It is written so a
competent agent that has NEVER seen this tree can execute it cold, and blind enough that finishing it
does not copy the author's store shapes. The recipe is sealed: record its SHA-256 in the receipt's
FIRST line before writing any code, and author against THIS file only.

---

## §0 · What you build (one paragraph)

A **season week-stepper** on the 2027 fixture season: a store that holds the current week slot and
the season's derived views, and a component that steps through the season's weeks (regular 1–18, then
the playoff rounds through the Super Bowl) showing the week's games and the standings through that
week. Two arms, same surface, same probe: **football-sim-vue** (Vue 3 + Pinia) and
**football-sim-svelte** (Svelte 5). You author the store and the component in BOTH arms.

## §1 · Inputs (where everything is)

1. **§1.1 The repos:** the two fresh-start repos, `football-sim-vue/` and `football-sim-svelte/`, in
   this delivery tree (NOT the four-slice arms under any addendum folder — those are a different,
   older bench). Engine pin `d3bd81d2`, vendored byte-identical in both arms — do not touch it.
2. **§1.2 Ground truth (node-side, pre-build):** `probes/truth.json` in each repo — the fixture SHA,
   the week section (`week.slots` = 22 slots; `week.w1` label + game 0 teams/score; `week.wLast`
   Super Bowl label + score). `probes/season-seed-2027.json` — the minted season (champion,
   finalists, pickCount = 1,024). Your probe asserts against these files' values, NEVER against
   constants you write.
3. **§1.3 Seeds:** authoring-order coin seed **20261115** (the Rev 6 sitting's order: v,s,v,v — reuse
   it so the pairs are comparable; record your per-slice order in the receipt's first line either
   way). The season is the **2027 fixture** (season seed 2027, pickCount 1,024, champion per the seed
   file).
4. **§1.4 Do not read:** the other arm's store or component while authoring an arm; any
   `*Store*.ts`/`*store*.ts` file from a previous sitting beyond the boot files §2 names; this
   delivery's PART-A-CLASS-BRIDGE.md (it reports the author's own numbers — reading it mid-bench
   breaks the seal). Official framework documentation is allowed; so is `npm view`.

## §2 · The store contract (framework-neutral — no code, no idiom hints)

One store file per arm, exporting ONE store object with EXACTLY this surface (names verbatim):

| member | kind | semantics |
|---|---|---|
| `slot` | read + write | the current week slot; starts at 1; writes clamp to `[1, total]` |
| `ready` | read | false until the season is first materialised; true after |
| `view` | read | the current week's view: `{ week, label, games[], done }`; `games[]` rows carry `home, away, homeAbbr, awayAbbr, hs, as, kind, round, replayLabel`; null before ready |
| `total` | read | number of week slots (regular weeks + playoff rounds) |
| `standings` | read | standings THROUGH the current slot: `{ throughWeek, league[], divisions[], clinched[] }`; rows carry `team, abbr, conf, div, w, l, t, pf, pa, winPct`; null before ready |
| `champion` | read | the season champion's full name; empty string before ready |
| `finalists` | read | the two Super Bowl teams, `[home, away]` order; null before ready |
| `pickCount` | read | the draft log's pick count (1,024) |
| `seasonYear` | read | 2027 |
| `gamesCount` | read | `view.games.length` |
| `label` | read | `view.label` ('WEEK 1' / 'WILD CARD' / 'SUPER BOWL') |
| `ensure()` | method | materialise the season once; idempotent |
| `go(n)` | method | clamp + set the slot; materialises first |
| `next()` | method | `go(slot + 1)` |
| `prev()` | method | `go(slot - 1)` |

**Rules (all binding):**
- **The league of record is the fixture's complete 1,024-pick draft log** — not any in-progress draft
  state (the half-drafted-league defect is the trap this bench tests; a store that rates 20 CPU
  pre-picks FAILS the probe by construction).
- Every derived value re-derives from the engine's own SeasonResult through the repos' shared
  `weekVM` helpers (`weekView`, `standingsThrough`, `totalWeekSlots` — already present in both arms'
  shared layer). No new engine code. No invented fields. Engine writes nothing reactive.
- Reads must be LIVE: after `next()`, a consumer reading `view`/`label`/`standings` sees the new
  slot's data without re-fetching.
- **The Svelte arm's store MUST be a class instance bridge** — a class with reactive fields holding
  engine snapshots, one exported instance (the repo's own §2 house rule and the one store shape no
  sitting has measured). The Vue arm's store MUST be a Pinia setup store. HOW you make fields live
  inside each idiom is yours to decide — the recipe deliberately does not say.

## §3 · The component contract

One `WeekStepper` per arm (both repos already mount a settings/cards shell — add your screen so it is
reachable at the week route/section). It renders, with `data-testid` hooks:
1. `week-prev` / `week-next` step buttons (disabled at the clamps is fine; clamping is also fine);
2. a `week-label` element showing `label`;
3. the week's games list — each row shows `homeAbbr hs @ as awayAbbr` (one element per game; testid
   `week-game-<i>` on the row);
4. a `week-standings` table with `league` rows (testid `standings-row-<i>`; first row's cells must
   carry abbr/w/l);
5. a jump control that goes to the Super Bowl slot (testid `week-jump-sb`).
Keyboard reachable; no horizontal scroll at 390 px; the shared tokens/screens css already in both
repos provides the chrome — do not add hex colors outside the shared token layer.

## §4 · The probe contract (what must pass, per arm)

1. **Unit:** the store boots the fixture league; `total` = `truth.week.slots`; week-1 label and game-0
   teams/score string-equal to `truth.week.w1`; Super Bowl label/score to `truth.week.wLast`;
   standings clamp to the 18 regular weeks; champion/finalists/pickCount/seasonYear equal the seed
   file's. Run: each arm's unit runner (`npx vitest run`) — exit 0.
2. **Checkers:** the arm's own checker (`npm run check` / `npm run type-check`) — **0 errors AND 0
   warnings**; suppression comments are a FAIL.
3. **Production build:** `npm run build` — **exit 0** (the store must be in the build graph: a module
   nothing imports proves nothing; import it from the entry or a test). A build that passes the
   checker but fails the bundler is a FAIL (state_invalid_export is a build-time error).
4. **Browser battery:** the existing battery script (`node probes/probe-battery.mjs <arm>`) — 24/24
   PASS, vanilla file:// boot, 0 console errors, 0 blocked requests, 390 px clean ×6 screens. Your
   week section must pass its 11 checks; DOM fidelity: the six screens' node counts must come out
   ALL EQUAL across the arms — record them; unequal = FAIL.

## §5 · Receipt format (write it DURING authoring, not after)

`receipts/sealed-recipe-timing.txt` per sitting, lines prefixed `arm=vue` / `arm=svelte`:
`recipe_sha256=<…>` (FIRST line, before any code) · `order=<…>` · then one line per metric:
`repairs=<n>` (a repair = one checker/build/probe failure that required EDITING code you had already
written; reading docs or re-running without edits is NOT a repair) · `first_try_green=<yes|no>` ·
`context_scratch_checks=<n>` (every file read, grep, doc lookup, npm view — keep the tally live) ·
`workaround_lines=<n>` (lines existing ONLY to satisfy the framework, split ts-ignore/any/cast/other)
· `build_exit=<0|1>` · `checker=<0 errors 0 warnings|otherwise verbatim>` · `battery=<n/n>` ·
`node_counts=<cards,stats,board,feed,week,settings>` per arm. Close with the cross-arm pairs and ONE
sentence: was this harder in Svelte or Vue, holding the recipe equal.

## §6 · Blindness rules (the seal itself)

- The recipe + the repos' own README/CLAUDE/AGENTS files are the ONLY surface docs. No prior-sitting
  receipts, no verdict files, no Part-A tables.
- Do not open the other arm's store/component until YOUR current arm's probe is green AND its
  receipt line is written (then you may diff — the second arm always knows what the first learned;
  that asymmetry is the handicap the pairs measure).
- If the recipe is ambiguous, resolve it against the ENGINE's own types (the shared weekVM files) —
  not against the author's stores — and note the ambiguity in the receipt. Ambiguities resolved
  against store files break the seal.
