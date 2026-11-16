SPEAKER: muse | ROLE: council | TASK: Cakepanz shell assist, Part 7 — the battery gap-find | DATE: 20261116-2117
FOR: R-13

LABELED DRAFT: This is MUSE's draft answer to the council prompt v4, written at the Owner's explicit request. It is NOT a formal council filing and NOT independent verification. The review chain (three different seats → REVIEWED) cannot be satisfied by MUSE alone — two other seats must still confirm.

# Part 7 — The battery gap-find (67 Cakepanz shell, slices 1–5)

**Scope.** The delivery under review is the `67-cakepanz-s5` tree on `origin/council/inkling`
(`_agents/inkling/deliveries/67-cakepanz-s5/`). The battery is exactly one file,
`batteries/slice1.battery.mjs` — there is no other `*.battery.mjs` in the tree (VERIFIED:
`ls batteries/` shows one battery file plus six `probe-*.mjs` smoke probes, two fixtures,
and `slice1-battery.json`). The shipped result is 75 pass · 0 fail · 10 SKIP · 3 DEFER
(REPORTED by Inkling in `batteries/slice1-battery.json`; reproduced VERIFIED by the MUSE
seat's baseline run, 20261116, exit 0, same 75/0/10/3 — see the Part 6 filing for the receipt).
**D3 note:** the box-score mutation-scope question (Ernie's `puntYards`/`touchdowns`/`firstDowns`
survivors at engine commit `86f22d10`) is answered in the separate D3 filing by another
worker, not here.

**What this part unblocks:** Z.ai's next shell round (the exact assertions to add) and
Claude's merge (the states the cutover battery must cover before the shell is called done).
Artifact: this file. Verify/apply: run each proposed assertion as written against the s5 tree;
every proposal names the file it belongs in and the command that would run it.

**Claim labels.** VERIFIED = I ran it, receipt in the text. REPORTED = someone else measured
it, named. INFERRED = reasoned from code I read, not run. UNKNOWN = I do not know.

## §1 — What the battery covers today (inventory, VERIFIED from `slice1-battery.json`)

75 APPLY laws, grouped by screen (law numbers are the JSON result order):

| Screen / area | Laws | Count |
|---|---|---|
| Team Select (incl. mode switch pre-draft) | 1–8 | 8 |
| Draft board (rows, sort, on-clock, picker, pick/undo, mode lock) | 9–26 | 18 |
| Gone-odds tooltip + my-needs row | 27–33 | 7 |
| Saves panel (envelope, reload, corrupt, newer-version, hydrate) | 34–43 | 10 |
| Feed (gate, completion, recompute match, dynamics, yards) | 44–59 | 16 |
| Shareables (game brag, seed card, PNG, season brag) | 60–73 | 14 |
| Reduced motion (beat-in off) + final zero-error sweep | 74–75 | 2 |

10 SKIP (loud, with reasons) — the w77 laws for surfaces that do not exist yet in the shell:
V0 median trio, V2/V3 chip bar, V5 phone laws at 390, V6 playoff cinematics, V8a/V8b/V8c/V13/V14/V16
stage bars / preseason / guide ladder, V9/V10/V11/V12 SIM SEASON ghost / pregame cards / linescore /
award inks, V15 fills column + V17 picker chips in shell form, V7 display scale, V4 command center /
cutdown day, V1 dropdown order + OG casing. 3 DEFER to the cutover battery (gone-odds method
equality, 84-assertion DOM byte-parity, witness export parity).

Screens that exist in the shell and are covered: Team Select, draft board, saves panel, feed,
share screen. Screens named in the prompt that **do not exist at all** in `src/` (VERIFIED:
`grep -rni "standings|bracket|award|stats table|settings|player card|week stepper|stepper"
src/lib src/App.svelte` returns nothing): week stepper, season book / standings, bracket,
awards, Super Bowl review, stats table, settings form, player cards. The battery cannot cover
what is not built — every gap below for those surfaces is a "build it, then assert it" item,
not a missing test on existing code.

## §2 — The gaps, with concrete proposed assertions

### G-01 — Corrupt-save: only ONE corrupt shape is ever injected

**Covered (VERIFIED, law 40):** a corrupt *week* save (payload `roster: []`) is REFUSED
(corrupt) verbatim. **Not covered:** every other refusal path in `restore()` /
`hydrateWeek()` / `hydrateSeasonConsistency()`:

- G-01a corrupt *draft* save — e.g. a draft envelope whose payload fails `parsePayload`
  (bad picks array, bad seed). Proposal: inject `localStorage['sim:nfl:slot:B']` = draft
  envelope with `payload.picks` replaced by `"not-an-array"`, open Saves, assert
  `REFUSED (corrupt)` and the panel shows the engine's message verbatim.
- G-01b corrupt *season* save — `hydrateSeasonConsistency` failing (e.g. `payload.champion`
  naming a team with no table row, or `userOutcome: 'champion'` with a different champion).
  Proposal: same injection pattern with kind `season`; assert REFUSED (corrupt).
- G-01c not-JSON — `restore()` returns `bad('envelope: not JSON')`
  (`src/engine/sports/nfl/app/saves.ts:119-121`, VERIFIED by reading). Proposal: inject the
  literal string `{"kind": "week", broken` into slot B; assert REFUSED (corrupt) with
  `envelope: not JSON` shown, never a crash, never an empty slot misread as empty.
- G-01d wrong sport — `restore()` refuses a non-`nfl` save (`saves.ts:124`). Proposal:
  inject a well-formed envelope with `sport: 'nba'`; assert REFUSED (corrupt).
- G-01e wrong slot key (F8 is write-only) — `assertSlotMatchesKey` is enforced only on
  `write()` (`src/engine/platform/localstorage.ts:42-52`, VERIFIED); `read()` performs no
  slot check and `restore()` never compares `env.slot` to the key it was read from.
  Proposal: store a valid draft envelope stamped `slot: 'B'` under key `sim:nfl:slot:A`;
  assert the panel REFUSES it as a slot mismatch (or, if the Owner rules otherwise, assert
  the panel shows the stamped slot — today it silently shows B's save as A's, INFERRED from
  the read path; no law would catch it).
- G-01f storage unavailable / quota — `readSlot` returns `refused/corrupt: 'storage
  unavailable: …'` and `saveDraftSlot` returns `'storage refused the write: …'`
  (`src/lib/savesApp.ts`, VERIFIED by reading); neither path is ever exercised. Proposal: run
  the Saves panel with `localStorage` throwing (Playwright `page.addInitScript` replacing
  `Storage.prototype.getItem/setItem` with a throw); assert the panel shows the refusal
  instead of hanging on `busy` (note: `Saves.svelte` sets `busy = true` before the loop and
  `false` after — an exception inside `readSlot` is caught by the storage module, but a
  throw *outside* it would leave `busy` true forever; unasserted).

### G-02 — Newer-build refusal: the law cannot tell which field refused it

Law 41 injects an envelope that differs in **two** fields at once — `schemaVersion: 99`
AND `engineVersion: 'future'` (`slice1.battery.mjs:197-198`). But `parseEnvelope`
refuses `newer-version` **only** on `schemaVersion > SCHEMA_VERSION`
(`src/engine/core/envelope.ts:46`, VERIFIED); `engineVersion` is checked only for
non-empty string (`envelope.ts:47`) and is documented "Informational on resume"
(`envelope.ts:17`). Consequence (INFERRED, from the code, not run): a save from a newer
build that keeps `schemaVersion: 1` but carries `engineVersion: 'future'` **loads
silently** — there is no newer-*build* refusal, only a newer-*schema* refusal.

- G-02a Proposal: inject `schemaVersion: 1, engineVersion: 'future'`; assert the panel
  either refuses it (if the Owner wants engine-version gating) or loads it AND the panel
  shows the foreign `engineVersion` next to the save — today neither is asserted, so a
  future re-pin could silently change resume semantics with no law noticing.
- G-02b Proposal: split law 41 into two laws — one with `schemaVersion: 99,
  engineVersion: <current>` (must refuse newer-version) and one with `schemaVersion: 1,
  engineVersion: 'future'` (must state the outcome above). The current combined injection
  should be deleted, not kept alongside: it proves nothing about either field alone.

### G-03 — Fresh-empty states: the battery never boots without `?dev=1`

Every battery page load is `http://localhost:4179/?dev=1`. The **empty boot** — no dataset,
`boot.phase === 'empty'`, the `.cp-empty` section, the "Import a dataset CSV" copy, the
`?dev=1` dev link (`src/App.svelte:64-70`, VERIFIED by reading) — is never loaded by any
law. Neither is the `loading` phase.

- G-03a Proposal: `page.goto('http://localhost:4179/')` (no `?dev=1`); assert `.cp-empty`
  is visible, `.cp-board` count is 0, `.cp-ts` count is 0, and zero page errors; then click
  the dev link and assert Team Select appears.
- G-03b Proposal (empty filter results): the feed's `no drives match the filter` line
  (`Feed.svelte`, `{#if !shown.length}`) is unreachable today — MY DRIVES always yields
  `meDrives > 0` on a finished draft. Assert it by combining filters on a game where the
  user has no drives — or, cheaper, assert the board's needs filter with a slot no row
  fills: select two needs whose OR is empty is impossible (the filter is OR), so the
  honest assertion is on the *feed*: drive the MY DRIVES filter on a `feedVM` whose
  `meDrives === 0` fixture (a game the user's team does not play — needs a fixture where
  the user's team has a bye, which the week-1 schedule never gives; file it as a fixture
  gap, not just a law gap).
- G-03c Proposal (empty lineup advice): `LineupAdvice` renders `slots: []` as an empty
  `<ul>` with a bare heading. Assert the board at 0 picks shows the heading with no
  `<li>` and no crash (today the advice list at draft start is unasserted — law 12 checks
  rows, nothing checks the advice block).

### G-04 — The playoff-complete path: no screen, and the one honest line is unasserted

- G-04a The hydrated card's `fixtureLine` returns `'season complete'` when
  `nextWeek > 22` (`src/lib/savesApp.ts:57-63`, VERIFIED). The battery's real week save
  only reaches week 3 (`weekfixture.mjs`). Proposal: build a week envelope with
  `nextWeek: 23` (season over, no next fixture) via the engine path, hydrate it through
  the panel, assert the card reads `season complete` — not `no user game this week`, not a
  crash.
- G-04b Half-written drafts: law 39 loads a draft saved at **0 picks**. A draft saved
  mid-way (e.g. 17 picks, status mid-draft) is never saved-and-loaded. Proposal: make 17
  real picks, save to slot A, reload the page, load slot A, assert the footer reads
  `17 of 32 starters`, the needs row lists exactly the 15 still-open slots, and the
  on-clock indicator names the correct round/pick.
- G-04c All-32-filled board state: after the draft completes through the store (law 45),
  the battery clicks PLAY WEEK 1 immediately. It never asserts what the *board* shows
  with a done draft (the `vmStore` refresh on a `status === 'done'` record, the footer
  count `32 of 32 starters`, the needs row at 0 open). Proposal: after law 45, before
  PLAY WEEK 1, assert footer `32 of 32 starters` and `.cp-need` count 0.
- G-04d Zero picks: covered in the narrow sense (law 21 undo → `0 of 32 starters`; law 39
  loads a 0-pick draft). **Defensive gap:** a 0-pick draft save loaded *after a reload*
  (law 38–39 does this) is covered; a 0-pick save whose envelope is then *overwritten* by
  a second save to the same slot is not — the panel offers no overwrite confirmation and
  no law asserts overwrite semantics. Proposal: save to A twice (0 picks, then after 1
  pick); assert slot A shows the *second* save's revision/pick count and no duplicate or
  stale entry. (Filed as a gap, not a defect: silent overwrite may be the intended
  semantics — the battery should state it either way.)
- G-04e Draft-done persistence: after the draft completes, reload the page and load the
  saved done draft — does the store restore `status === 'done'` and does PLAY WEEK 1
  appear without re-drafting? Unasserted. Proposal: complete a draft, save, reload, load,
  assert `.cp-play` count is 1.

### G-05 — Bracket resolution: the RE-DERIVED half is asserted by a word, not a value

Law 43 asserts the hydrated card contains the string `RE-DERIVED`. Nothing asserts the
*bracket values* the engine re-derived (seeding, round pairings, champion) against an
independent recompute — the card's claim is checked by substring, the same tautology
shape the Part 6 filing documents for the feed recomputes.

- G-05a Proposal: take the season fixture (`batteries/seasonfixture.mjs`,
  `replaySeason`), load its envelope, read the hydrated card, and assert the card's
  champion/seed lines equal the *replay's* champion and seeding — not the payload's own
  stored champion (which is what the card renders today via `p.champion`). If the card
  cannot show the re-derived bracket, the law should assert the *card's own* bracket
  rendering once the season screen exists; until then, file the gap as "bracket values
  have no UI surface and no law".
- G-05b Non-champion outcomes: `OUTCOME_LINE` in `src/lib/shareVM.ts` has six entries
  (`champion`, `super-bowl-loss`, `conference`, `divisional`, `wild-card`,
  `missed-playoffs`); the season fixture scans seeds **until it finds a championship**
  (`seasonfixture.mjs:40-44`, VERIFIED), so the battery renders exactly one outcome.
  Proposal: parameterise `buildSeasonFixture` by outcome (scan for a
  `super-bowl-loss` seed and a `missed-playoffs` seed) and assert the season brag renders
  `TOKEN[outcome]` and the correct headline form for each — five of the six outcomes
  currently have zero rendered coverage.

### G-06 — Awards screens and Super Bowl review: nothing to assert yet

- G-06a Awards: the engine snapshot ships `src/engine/sports/nfl/engine/awards.ts`, but
  no shell screen renders it and no battery law imports it (VERIFIED: `grep -rn awards
  batteries/ src/lib src/App.svelte` finds only the engine file). Proposal (for the
  awards slice, not now): one law per award the screen shows — the winner's name, the
  stat the award is *for*, and the engine function that computed it, recomputed node-side
  from the same save (the same discipline as laws 48/62, with the same shared-module
  caveat from Part 6: the recompute must not import the module under test).
- G-06b Super Bowl review: no screen exists. When it lands, the minimum law set is: the
  two teams and final score equal the season payload's Super Bowl game; the review renders
  only after `isFinished`; and a season save that never reached the Super Bowl shows the
  review as absent, not as a fabricated game (the defensive case — cf. G-03b).

### G-07 — The `Yards = null` constraint: the law's regex is narrower than its claim

Law 56 asserts `!(await page.locator('.cp-feed').textContent()).match(/\d{2,3} yards/)`.
Two holes (VERIFIED by reading the mapper and the law):

- Hole 1 — the hyphenated form. The engine's own doc example for a drive summary is
  `"JAG drive ends in a 24-yard field goal. 7 plays, 3:12."`
  (`src/engine/sports/nfl/app/feed.ts:38`). The emitted `driveSummary` today never
  contains a yard figure (VERIFIED: it builds `"${team} ${ends[d.end]} — ${d.plays} plays,
  ${mins} min."`), but if any future summary used the doc's own `24-yard` form, law 56
  would pass it: `/\d{2,3} yards/` does not match `24-yard`.
- Hole 2 — single digits. `/\d{2,3}/` requires 2–3 digits, so an invented `"3 yards"`
  or `"9 yards"` passes the law.

Proposals (both belong in `batteries/slice1.battery.mjs`, slice-4 block):

- G-07a Text law, widened: `!feedText.match(/\d+\s*yards?\b/i) &&
  !feedText.match(/\d+-yard/i)` — assert on `.cp-feed`, `.cp-brag`, `.cp-seedcard`, and
  the hydrated card, not just the feed (the brag's `facts` and the seed card are the
  other surfaces that could one day carry a yard figure).
- G-07b Structural law, stronger than the text law: the real guard is the VM field, not
  the rendered text — assert node-side `feedVM(record, seed, userTeam).drives.every((d)
  => d.yards === null)` (the field is `yards: number | null`, v1 null by contract,
  `feed.ts:32`). A UI that rendered `d.yards ?? '—'` would pass the text law while the
  field held an invented number; the structural law catches the invention at the source.
  (Note for the file: `feedVM` already imports `DriveEvent` with `yards`; the assertion is
  three lines.)

### G-08 — Reduced-motion variants of every animation in the w88 slice's classes

Inventory first (VERIFIED by grep over all of `src/`): the shell contains **exactly one**
animation — `@keyframes cpbeat` + `animation: cpbeat 0.55s …` on `.cp-feed-line`
(`src/lib/screens/Feed.svelte:106-110`), with its reduced-motion off-switch on line 110.
The w88 classes are the `zrl-*` family (`zrl-t`, `zrl-team`, `zrl-play`, `zrl-badge`,
`zrl-sc`, plus `zrl-me` in comments) — none of them animates; only the `.cp-feed-line`
wrapper does. Law 74 covers that one animation on one page.

- G-08a Proposal: a **structural** reduced-motion law that cannot go stale — node-side,
  assert that every `@keyframes` name declared in `src/**/*.svelte` has a matching
  `@media (prefers-reduced-motion: reduce)` rule that sets `animation: none` on the same
  selector. Today that is one name (`cpbeat`); the law's value is that the *next*
  animation cannot land without its variant.
- G-08b Proposal: delete or fix the vacuous rule in `BoardRow.svelte:53` —
  `@media (prefers-reduced-motion: reduce) { .cp-gonetip { transition: none; } }` — where
  `.cp-gonetip` defines **no** `transition` property anywhere in the file (VERIFIED).
  Either the tooltip gets a real transition (and the rule then means something) or the
  rule goes. A law asserting `getComputedStyle(tooltip).transitionDuration === '0s'`
  under reduced motion would fail today only in the sense that there is nothing to
  turn off — file the rule as dead CSS, not as coverage.
- G-08c Proposal (per-surface): the share screen, saves panel, team select, and board
  have no animation today — assert that explicitly once, cheaply: under
  `reducedMotion: 'reduce'`, `document.querySelectorAll('*')` filtered to elements whose
  computed `animation-name !== 'none'` is exactly the set of `.cp-feed-line` elements
  (empty on every screen but the feed). This turns "no animation" from an assumption
  into a checked fact on every screen.

### G-09 — The probes are not the battery (coverage that looks covered but is not)

`batteries/probe-slice3.mjs`, `probe-slice4.mjs`, `probe-save.mjs`, `probe-share.mjs`,
`probe-filter.mjs`, `probe-shots.mjs` print values with `console.log` and contain **no
assertions and no `process.exit` on mismatch** (VERIFIED: `grep -n "process.exit|assert"
batteries/probe-*.mjs` returns nothing). `npm run battery` runs only
`slice1.battery.mjs` (`package.json`, VERIFIED). Anything the probes touch that the
battery does not — e.g. `probe-save.mjs`'s console-warning listener (the battery listens
only for `pageerror`, never for `console` errors — see Part 8) — is **uncovered**, however
often the probes are run by hand. Proposal: either promote the probes' checks into
`slice1.battery.mjs` as `ok()` laws, or delete the probes so the coverage picture is
honest. (Filed as a gap, not a defect in the probes: they are labelled dev tools.)

### G-10 — Light mode: a missing state of every surface

The engine ships light tokens (`src/engine/sports/nfl/view/theme.ts`, `BG_LIGHT`,
82 `--t*` keys, light + dark). The shell never imports `theme.ts` (VERIFIED:
`grep -rn "theme" src/lib src/App.svelte src/main.ts` finds no import), hardcodes the
dark palette in `App.svelte` (`:root { color-scheme: dark; … }` plus literal hexes in
every component), and uses Georgia, not Cinzel — there is no light mode, no mode toggle,
and no law. Proposal: when the light mode lands, one law per screen asserting the same
DOM with `color-scheme: light` (or the toggle's class) — the battery's page factory
already takes a `reducedMotion` option; a `colorScheme` option is the same shape. Until
then the gap is: **every screen's light state is missing**, and the prompt's "beautiful
in both light and dark modes like w89" is unmet and unasserted.

### G-11 — The seed card's replay recipe promises a control the shell does not have

`seedCardForGame` / `seedCardFromSave` (`src/lib/shareVM.ts:141-142,164-165`) print the
steps *"open this build with ?dev=1 and choose ${teamName}"* and *"enter the seed ${seed}
at the start — the board … replays identically"*. There is **no seed-entry UI anywhere
in the shell** (VERIFIED: `grep -rn "<input|<select" src/` returns nothing; `startDraft`
mints the seed with `Math.random()` in `App.svelte:76`). The recipe is therefore a
promise the user cannot act on inside the product. Proposal: either build the seed-entry
control (Team Select takes an optional seed; assert entering a known seed reproduces the
board and the week-1 game) or reword the recipe to what the shell can actually do
("share this card; the seed is the run's fingerprint"). The battery's law 65 asserts the
card *shows* the recipe words; no law asserts the recipe is *performable*.

## §3 — Summary table (gap → surface → proposal location)

| Gap | Surface | Proposal lives in |
|---|---|---|
| G-01a–f corrupt shapes (draft/season/not-JSON/wrong-sport/wrong-slot/unavailable/quota) | Saves panel | `slice1.battery.mjs`, slice-3 block (inject via `localStorage.setItem`, as laws 40–41 do) |
| G-02a–b schema vs engine version | Saves panel | same block; split law 41 in two |
| G-03a–c empty boot / empty filter / empty advice | App / Feed / Board | new `page.goto('/')` block + feed/board assertions |
| G-04a–e season-complete / half-written / 32-filled / overwrite / done-persistence | Saves + Board | slice-3 block + post-law-45 assertions |
| G-05a–b bracket values / five unrendered outcomes | Season brag | `seasonfixture.mjs` (parameterise by outcome) + slice-5 block |
| G-06a–b awards / Super Bowl review | (not built) | future slices; law shapes given |
| G-07a–b yards regex + structural `yards === null` | Feed (+ brag/seed/hydrated) | slice-4 block, three lines |
| G-08a–c reduced-motion structural law / dead rule / per-surface sweep | All screens | battery + `BoardRow.svelte` fix |
| G-09 probes ≠ battery | Batteries dir | promote or delete the probes |
| G-10 light mode | All screens | future slice; `theme.ts` wiring first |
| G-11 seed entry | Share screen | Team Select seed input, or reword the recipe |

**What is NOT a gap (stated so the record is clean):** the `Yards = null` constraint *is*
covered for the feed's rendered text (law 56) — the gap is the regex's width and the missing
structural check, not the absence of a law. Corrupt-save *is* covered for one shape (law 40)
and newer-version for one combined shape (law 41) — the gap is the other shapes, not the
concept. The reduced-motion variant *is* covered for the one animation that exists (law 74).
