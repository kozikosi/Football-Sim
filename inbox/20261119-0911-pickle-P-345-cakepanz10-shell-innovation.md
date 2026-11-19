SPEAKER: pickle | TASK: P-345 | DATE: 2026-11-19 09:11 UTC
FOR: P-345
KIND: advisory brainstorm — implications and improvements to 67 Cakepanz / the UI-UX shell for
  Claude's engine. No product code, no engine bytes, no protected constants. Nothing here is
  accepted until the Architect says so; nothing here is a build order.

# Frame

The Owner asked (this session) for a review of Z.ai's c10 close-out package and then a brainstorm
of what it implies for Cakepanz and the shell. The review is filed separately at
`inbox/20261119-0906-pickle-P-287-cakepanz10-closeout-review.md` (VERDICT improved, commit
`8e82489a7`). This filing is the second half: five ranked shell improvements plus five implications
of the c10 sitting. Every code claim below was read from the hosted c10 tree at
`_agents/pickle/deliveries/zai-cakepanz-10-2026-11-19/` (hosting commit `338e9d868`) — except where
labelled REPORTED or INFERRED. I authored none of that code; these are proposals to the Architect
and notes to the Owner, not edits.

Labels: **VERIFIED** = I read/ran it this session and give the receipt below · **REPORTED** = the
package/docs say it · **INFERRED** = reasoned from what I read, not run · **UNKNOWN** = not checked.

# Grounding receipts (all VERIFIED this session)

- `grep -rn "Math.random" src --include=*.ts --include=*.svelte` over `cakepanz-4/src` → **5 hits,
  of which exactly ONE is a live call**: `src/App.svelte:109` `seed = 1000 + Math.floor(Math.random()
  * 9000)`. The other four are two comment pairs (one in `src/engine/`, one mirrored in
  `src/engine-node/`), both reading "never Math.random, so a (rosters, plans, seed) triple always
  gives the same season." The engine's own RNG is `makeRng`/`forkSeed` (`port/seam.ts:32,125`).
- `src/App.svelte:99-106` `boot_()`: `const DEV = new URLSearchParams(location.search).has('dev')`
  (`:54`); `if (!DEV) { boot.set({ phase: 'empty' }); return; }` (`:100`); the empty phase already
  renders an honest landing at `:351`: "Import a dataset CSV to begin — or open a dev build with
  `?dev=1`". So the empty state is **not** a defect — do not "fix" it.
- `src/App.svelte:287-302` `NAV` = 14 entries, all `show: true`; rendered flat at `:336-338`.
  `.cp-nav { display:flex; gap:6px; flex-wrap:wrap; }` in `src/lib/assets/shell.css:71`; the only
  `@media (max-width: 390px)` block (`:165-170`) touches padding, card grid, topbar gap and table
  font — **not** the nav.
- `src/App.svelte:311-318` `awardsNow` sorts `Object.values($seasonStats.players)` on
  `pyd + rtd`; `src/lib/screens/Share.svelte:14,49` passes that to `awardsBrag({ mvp, mvpLine })`.
  Separately `src/lib/port/awardsVM.ts:38-72` calls the engine's `seasonAwards(ss, table)` and that
  is what the Awards screen renders. **Two different MVP definitions ship in one app.**
- `src/lib/port/seasonStats.ts:17-31` `SeasonStatsAccumulator` holds `ss`/`boxes` in session memory
  only; `src/App.svelte:241-250` `restoreSeason()` explicitly sets `statsAcc = null;
  seasonStats.set(null)` with the note "the session-local stats accumulator restarts — the receipted
  note says so (stats re-accumulate from the next played week)."
- `src/lib/port/seam.ts:1-8` is the "ONE DOOR" contract (M1 one door, M2 one directory, M3 swap test,
  M4 SNAPSHOT.md pin, M5 measured app-touch count); `:9-76` imports **only** from `../../engine/**`,
  `:79-159` re-exports the typed surface and the `engine` object. This is why all five ideas below
  are shell-side.

# Ranked improvements to Cakepanz / the shell

## B1 (highest) — make the one RNG site seedable from the URL

- **IDEA:** parse a `seed=` param in the hash route and use it in `startDraft`, falling back to the
  current `Math.random()` when absent.
- **WHERE (anchor):** `src/App.svelte`, `function startDraft(teamIndex: number, slot: number | null) {`,
  the line `seed = 1000 + Math.floor(Math.random() * 9000);`. The router already carries a param
  (`currentRoute()` → `go(screen, param)`), so no new routing is needed.
- **old → new:** `seed = 1000 + Math.floor(Math.random() * 9000);` →
  `seed = seedFromRoute() ?? (1000 + Math.floor(Math.random() * 9000));` where `seedFromRoute()`
  reads the `seed` key from the current route param and returns a positive integer or `null`.
- **WHY:** there is exactly one unseeded call in the whole app (receipt above). Close it and every
  draft — and, through the engine's `gameSeed`, every season that derives from it — is replayable by
  any seat with no engine change. This is the concrete answer to the old shell's §3 problem (56–58
  unseeded `Math.random()` sites, no seed): the shell is already 99% there. It also makes a "why did
  my draft go this way" moment explainable.
- **SAFE ALONE? YES** — shell only, default behaviour unchanged when no seed is supplied, no engine
  bytes, no protected constant, no new user-facing copy.
- **HOW TO CHECK:** `grep -rn "Math.random" src --include=*.svelte` → expected: one hit, on the
  fallback line only. Then load twice with the same seed param, draft identically, and compare the
  JSON of `rec.picks` by sha256 — expected: equal.
- **LABEL:** VERIFIED (the single-site count and the anchor), INFERRED (the two-load equality until
  someone runs the browser check).

## B2 — point the Share card's MVP at the engine's own awards

- **IDEA:** delete the shell-side MVP sort; feed `awardsBrag` from `seasonAwards($seasonStats,
  tableNow)` — the same call the Awards screen already uses via `awardsVM.ts`.
- **WHERE (anchor):** `src/App.svelte`, `const awardsNow = $derived.by<{ mvp: string; mvpLine: string }
  | null>(() => {`; and `src/lib/screens/Share.svelte` prop `stats` (`:14`) / `awardsBrag` call (`:49`).
- **old → new:** the `pyd + rtd` sort at `:314-317` → a projection of `seasonAwards($seasonStats,
  tableNow).mvp` into `{ mvp: l.name, mvpLine: l.label }` (both already typed in `port/seam.ts:42-43,130`).
- **WHY:** the engine's MVP comes from the season's own box-score lines; the shell proxy is passing
  yards + rushing TDs only. They can disagree, and a brag card that contradicts the Awards screen
  is a trust bug in the one artifact the Owner sends out. One source of truth.
- **SAFE ALONE? YES** — both paths cross `seam.ts` already; no engine touch, no copy change.
- **HOW TO CHECK:** `grep -n "pyd.*rtd" src/App.svelte` → expected: no hit. After a full season,
  Share→AWARDS `mvp` string === the Awards screen's MVP name (a one-line browser assertion).
- **LABEL:** VERIFIED (two distinct code paths exist), INFERRED (that a given season actually
  diverges).

## B3 — stop the stats accumulator dying on restore

- **IDEA:** re-derive `SeasonStats` from the played-game log the week save already carries, instead
  of clearing it on restore. (`addBox` is the engine's only writer — `seasonStats.ts:3-4,28`.)
- **WHERE (anchor):** `src/App.svelte`, `async function restoreSeason() {`, lines `statsAcc = null;
  seasonStats.set(null);` (`:247-248`); and `src/lib/port/seasonStats.ts` `addWeek(...)`.
- **old → new:** clear-and-wait → replay the saved played games through `addWeek` on restore, so
  Awards / Stats / the Awards share card are populated immediately. A durable save-side fix would
  need the engine `WeekPayload` to carry the box log — that crosses the seam and is NOT safe alone;
  the replay variant stays behind `seam.ts`.
- **WHY:** a refresh mid-season blanks three screens until you replay the remaining weeks — the one
  place the shell holds truth the saves do not. The package *documents* this as expected
  (VERIFIED, the `:239-240` note), but documented is not the same as good.
- **SAFE ALONE? YES for the replay variant** (shell only); **NO for adding fields to the envelope**
  (Architect/engine call).
- **HOW TO CHECK:** save at week 8, refresh, restore; expected: Awards MVP and the Stats leaders
  table are populated without playing another game. Currently empty (INFERRED from the code path;
  not run).
- **LABEL:** VERIFIED (the clear-on-restore code and the note), INFERRED (the runtime UX and the
  replay feasibility from the week payload).

## B4 — collapse the 14-button flat nav on a phone

- **IDEA:** group the NAV into phases (SETUP / DRAFT / SEASON / REVIEW / SYSTEM) with a 4–5 item
  primary bar plus a "MORE" disclosure, and mark state-inappropriate screens `show: false` before a
  season exists (WEEK, PLAYOFFS, BRACKET).
- **WHERE (anchor):** `src/App.svelte`, `const NAV: { id: ScreenId; label: string; show: boolean }[]
  = [` (`:287`) and `<nav class="cp-nav" aria-label="Screens">` (`:336`); `src/lib/assets/shell.css`
  `@media (max-width: 390px) {` (`:165`).
- **old → new:** the single flat `NAV` → grouped entries with a `group` field and a phase selector;
  the 390px block gains a nav rule. Route ids and `go()` calls do not change.
- **WHY:** 17 routes in a wrapping chip wall is the shell's clearest phone debt; none of the existing
  phone rules touches the nav. This is pure chrome — no engine, no data, no copy beyond existing
  labels.
- **SAFE ALONE? YES** — chrome only; all routes remain reachable.
- **HOW TO CHECK:** at a 390px viewport, `document.documentElement.scrollWidth === clientWidth`,
  nav height reduced against a saved baseline, and all 17 routes still clickable (the package's own
  battery already asserts route reachability).
- **LABEL:** VERIFIED (14 entries, all `show: true`, no phone nav rule), INFERRED (the UX benefit).

## B5 — stamp imported-dataset provenance in the production path

- **IDEA:** show the sha256 of an imported dataset CSV next to the imported data, as the dev path
  already does for the bundled ratings.
- **WHERE (anchor):** `src/App.svelte:103` `sha256Hex(DATASET_RATINGS).then(x => dataVersion =
  'sha256:' + x)` (DEV only) and the empty-phase import affordance at `:351`; plus the CSV import
  binding.
- **old → new:** dev-only `dataVersion` badge → the same badge computed on the imported file in the
  non-dev path, reusing the existing `sha256Hex` from `seam.ts`.
- **WHY:** AGENTS.md §7 is "no factual data is invented"; provenance is a council law. The dev path
  already has the stamp; the production import path is where a screenshot would actually be taken.
- **SAFE ALONE? YES** (shell only) — but any *new visible text* is Owner-gated by the current brief
  ("no new user-facing text beyond the w89/package inventory without the Owner's word"), so treat
  as a proposal pending that call, reusing the existing `sha256:` label verbatim.
- **HOW TO CHECK:** import a CSV, confirm a `sha256:...` badge matching `sha256sum` of the file.
- **LABEL:** VERIFIED (the dev-path sha call), INFERRED (the import binding's shape — I did not
  trace it).

# Further implications of the c10 sitting (advisory)

1. **The seam is the reusable asset, not the screens.** `port/seam.ts` M1–M5 (receipt above) is a
   shipped, typed, one-door answer to "how does a UI-UX shell consume Claude's engine without
   editing it." The pattern is framework-independent even though this instance is Svelte. Name it
   in the cutover plan. **LABEL: VERIFIED** (the contract text), **INFERRED** (its suitability for
   the final cutover).
2. **The shell is one line away from fully seeded runs.** Pre-Colors has 56–58 unseeded sites
   (AGENTS.md §3); this tree has exactly one live `Math.random()` (receipt above), and it is at a
   documented, seeded boundary. Close B1 and every draft/season is reproducible. **LABEL: VERIFIED**
   for both counts.
3. **Shell-owned computation has already drifted from engine truth twice** — the Share MVP (B2) and
   the lost accumulator (B3). Both should be re-pointed through `seam.ts` *before* the shell becomes
   the product, or two numbers ship. **LABEL: VERIFIED** (the code), **INFERRED** (the claim that
   these are the only two such drifts — I did not audit every VM).
4. **The framework verdict stays advisory.** c10's Svelte-leaning framing is a seat's measurement,
   not an Owner decision; the timed-build arm (F1) is **UNKNOWN** — never run, as far as I can see.
   Cutover remains the Owner's and Architect's call. **LABEL: REPORTED** (the verdict), **UNKNOWN**
   (F1 status).
5. **c10 demonstrates the offline bar is achievable in the Svelte tree.** The package is a complete,
   checksummed, self-contained delivery (zip sha `54b63123…`, 52/52 SHA256SUMS OK — VERIFIED in the
   hosting commit `338e9d868`). That the shipped dist opens from file:// is **REPORTED** from the
   package docs; I verified the checksums, not the dist's runtime.

# Non-goals of this filing

No product bytes, no engine edits, no protected constant, no pin, no queue edit, no build, no
admission/retirement. This is one advisory inbox note; the review chain and the Architect's decision
are unchanged by it.
