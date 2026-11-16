SPEAKER: muse | ROLE: council | TASK: Cakepanz shell assist, Part 6 — mutation-test the shell's battery | DATE: 20261116-2117
FOR: R-13

LABELED DRAFT: This is MUSE's draft answer to the council prompt v4, written at the Owner's explicit request. It is NOT a formal council filing and NOT independent verification. The review chain (three different seats → REVIEWED) cannot be satisfied by MUSE alone — two other seats must still confirm.

# Part 6 — Mutation-test the shell's battery (67 Cakepanz shell, slices 1–5)

**Scope.** The battery is `batteries/slice1.battery.mjs` in the `67-cakepanz-s5` delivery on
`origin/council/inkling` — the *only* `*.battery.mjs` in the tree (VERIFIED: `ls batteries/`
shows one battery file, six `probe-*.mjs` smoke probes, two fixtures). The shipped result
is 75 pass · 0 fail · 10 SKIP · 3 DEFER (REPORTED by Inkling). This filing breaks the
things those 75 laws guard and shows which laws die. **D3 note:** the box-score
mutation-scope question (Ernie's `puntYards`/`touchdowns`/`firstDowns` survivors at
engine commit `86f22d10`) is answered in the separate D3 filing by another worker, per
the task — it is NOT duplicated here.

**What this part unblocks:** Z.ai's next shell round (which laws are real guards and which
are tautologies) and Claude's merge (the laws the cutover battery can trust). Artifact:
this file. Verify/apply: every mutation below names the exact file, the old→new text,
and the battery JSON it produced; re-apply any one mutation to a fresh copy of the s5
tree and re-run `npm run build && CP_PORT=4179 node batteries/slice1.battery.mjs` to
reproduce it.

**Claim labels.** VERIFIED = I ran it, receipt in the text. REPORTED = someone else measured
it, named. INFERRED = reasoned from code I read, not run. UNKNOWN = I do not know.

**Method (VERIFIED).** All work on copies in `/tmp` — the repo working tree and the
deliveries were never mutated. Pristine copy `/tmp/mut-base` (`npm install`, Playwright
1.55.0 + `chromium_headless_shell-1187` installed locally; the battery requires a
Playwright Chromium, which was not present before — `npx playwright install
chromium-headless-shell` was run once). Each mutation run: fresh copy of the s5 tree
with `node_modules` symlinked from the base, mutation applied by exact-string
replacement, `npm run build`, `vite preview` on port 4179, then the battery unmodified.
The battery itself was never edited in any run. Baseline first, then five mutation runs
(M7, M-A, M-B, M-B2, M-C). Two first-attempt failures are reported honestly below
(M7 crashed once mid-run; M-A's first build failed on a malformed mutation comment) —
both were fixed and re-run to completion.

## §1 — Baseline (VERIFIED): the battery reproduces green as shipped

```
$ cd /tmp/mut-base && npm run build
✓ built in 2.97s
$ node batteries/slice1.battery.mjs
== SLICE 1 BATTERY · 75 pass · 0 fail · 10 skip (loud, with reasons) · 3 deferred to cutover ==
battery exit=0 elapsed=233s
```

75 pass · 0 fail · 10 skip · 3 defer — identical to the shipped
`batteries/slice1-battery.json`. The baseline is real: the battery runs end-to-end on
this VM (headless Chromium, `vite preview` on 4179).

## §2 — The survivors (the headline finding)

**Two deliberately introduced, plainly wrong behaviours survived the whole battery with
zero law deaths. The battery stayed 75/0/10/3, byte-identical in verdicts to baseline.**

### Survivor run M7 — shared-module bugs are invisible to the battery

Mutations (both in `/tmp/mut-m7`, verified live at runtime afterwards):

1. `src/lib/feedVM.ts:158` — `userWon: gf.homeScore === gf.awayScore ? null :
   (gf.homeScore > gf.awayScore ? userHome : !userHome),` → `userWon: true,`
   (every game is a VICTORY, whatever the score).
2. `src/engine/sports/nfl/engine/goneodds.ts:36` — `export const goneChance = (o, id) =>
   o.gone.get(id) ?? 0;` → `=> 0;` (every gone% is 0%).

Runtime proof the mutations were live (VERIFIED, node `--experimental-strip-types`):

```
goneChance(fake 0.5) = 0 (mutated expects 0; pristine expects 0.5)
feedVM source contains userWon:true = true
```

Battery result (VERIFIED):

```
$ /tmp/run-mutation.sh m7 4179
battery exit=0 elapsed=224s
== SLICE 1 BATTERY · 75 pass · 0 fail · 10 skip (loud, with reasons) · 3 deferred to cutover ==
(no FAIL lines)
```

JSON diff baseline-vs-M7: **zero verdict diffs** (`python3`: `verdict diffs: []`).

The killer receipt is inside the M7 log itself — the battery *passed* this line:

```
PASS  the brag card's scoreline IS the engine game (node recompute match, exact)
      — UI CHI 0 · HOU 21 / VICTORY — FINAL · engine CHI 0 · HOU 21 / VICTORY — FINAL
```

Chicago lost 0–21 and the brag card says **VICTORY — FINAL**, and the law passed it.
(Baseline's genuine game was CHI 26–24 VICTORY; M7's game was CHI 0–21, labelled a
victory by the mutated module.)

### Why they survive — the recompute imports the thing under test

Laws 48 and 62 ("the UI game IS the engine game", "the brag card's scoreline IS the
engine game") recompute the expected value by importing **the same module the UI uses**:

- `slice1.battery.mjs:248-249` imports `feedVM` from `../src/lib/feedVM.ts` node-side
  and compares it against the DOM, which renders the *same* `feedVM` through the built
  bundle. A bug in `feedVM` moves both sides of the comparison together.
- Law 62 does the same through `gameBrag` → `feedVM` (`src/lib/shareVM.ts`).
- The gone% *values* have no law at all: law 12 asserts only the *format*
  (`/^\d+%$/`) of the gone column, and law 28 asserts the tooltip's *method numbers*
  (`picksBetween`, `sims`) — neither asserts any gone% value. `goneChance → 0` changes
  every displayed gone% to `0%` and every Wins/Priority (both are multiplied by the
  gone chance in `draftBoard.ts:43`) — and no law notices, because no law holds an
  independent gone% oracle.

**Survivors by name (VERIFIED by the M7 run):**

| Survivor (wrong behaviour) | Laws that should have caught it | Why they did not |
|---|---|---|
| `feedVM.userWon` always `true` — a 0–21 loss renders as VICTORY | 62 (brag scoreline/outcome exact match) | Recompute imports the same `feedVM`; both sides wrong identically |
| `goneChance` always 0 — every gone% `0%`, every Wins/Priority scaled by 0 | (none — no law asserts a gone% *value*) | Law 12 checks format only; law 28 checks method meta only |
| Any bug in the shared `feedVM`/`goneOdds` modules generally | 48, 49, 50, 51, 62, 63 (all "node recompute" laws) | Same shared-module shape; see §4 for which of these are killable from the UI side |

Precision matters here, and the filing states it plainly: laws 48/62 are **not**
tautologies in general — a *UI-side* break (e.g. rendering the final score +1 in
`Feed.svelte` only) would kill them, because the DOM would then differ from the
recompute (INFERRED — the UI renders `feed.homeScore`/`feed.awayScore`, the recompute
reads the same fields from the module; breaking one side breaks the match). What M7
proves is narrower and worse in one way: **the laws guard the plumbing (the UI displays
what the module computed), not the computation.** The computation's correctness is the
engine tests' job — but `feedVM` is *shell* code (`src/lib/`), not engine code, and no
test suite covers it except this battery. The shell's own view-model layer is therefore
the one place where a wrong number can ship with a green battery. Proposed remedy (for
Z.ai / the cutover battery, not built here): at least one **independent oracle** per
recompute law — e.g. law 62's outcome asserted against the *scores* (`homeScore >
awayScore` ⇒ VICTORY for the home team) computed from the DOM's own numbers, not from
`feedVM.userWon`; and a gone% value law asserting `goneChance` against a hand-computed
replay on a tiny fixed draft (the battery already builds such drafts in its fixtures).

### First-attempt failure, reported (VERIFIED)

The first M7 attempt crashed mid-run (not a law failure — the battery process died):

```
locator.click: Target page, context or browser has been closed
    at /tmp/mut-m7/batteries/slice1.battery.mjs:184:35
battery exit=1 elapsed=40s
```

Cause unknown; the preview server had answered `http 000` on the readiness probe seconds
earlier (a startup race — the server took ~8s to bind on the re-run, where the script
waited only 3s the first time). The re-run with a readiness loop completed cleanly
(224s, 75/0). Noted because a battery that can die this way mid-run deserves a
`page.on('close')` guard or a retry in the harness — filed as an observation, not a
verdict.

## §3 — The kills (VERIFIED): 13 laws died when their guards were broken

### Run M-A — board + mode guards (69 pass · 6 fail, exit 1, 84s)

| Mutation | File:line | Laws killed (verbatim from the log) |
|---|---|---|
| M1: gone% without the `%` — `gone: goneDisplay(g) + '%'` → `gone: goneDisplay(g)` | `src/engine/sports/nfl/view/draftBoard.ts:50` | 12 — every row reads … gone% — detail shows `"gone":"90"` (no `%`) |
| M2: default sort OVR — `let sort: BoardSort = 'wins'` → `'ovr'` | `src/App.svelte:42` | 10 — the default sort is wins/priority, never raw OVR |
| M3: flex chips without the minus — `` `-${x.pen} flex` `` → `` `${x.pen} flex` `` | `draftBoard.ts:46` | 16 — the flex chips read the flex cost — `14 pickers probed · 0 flex chips · BAD ["4 flex","4 flex"]` |
| M4: default mode Owner preset — `mode: 'measured'` → `mode: 'owner'` | `src/lib/valuation.ts:18` | 4, 22, 25 — the measured mode is the DEFAULT (Team Select + board) and the mode label travels with the numbers |

M4 is also the Part 9 live proof: the three label laws died and **no number law moved**
— the board under the "Owner preset" label shows byte-identical numbers to the measured
board. (Method note: M-A's first build failed on a malformed mutation — a `//` comment
I placed before the line's closing `}));` commented it out (`esbuild: Expected "}" but
found "rows"`). The mutation was fixed to put the comment after the full statement and
the run repeated. The failure was mine, not the battery's.)

### Run M-B — feed yards, PNG, reduced motion (71 pass · 4 fail, exit 1, 84s)

| Mutation | File:line | Laws killed |
|---|---|---|
| M6a: `· 120 yards` appended to the feed footer text | `src/lib/screens/Feed.svelte:79` | 56 — no yards are faked |
| M8: PNG export emits JPEG — `toBlob(…, 'image/png')` → `'image/jpeg'` | `src/lib/bragCard.ts:160` | 66, 72 — SAVE PNG produces a real static image — detail: `65848 bytes · magic 255 216 255 224` (JPEG SOI bytes, caught exactly as designed) |
| M6b: reduced-motion off-switch removed | `Feed.svelte:110` | 74 — prefers-reduced-motion: the beat-in animation is OFF — detail: `animation-name: svelte-tsx9t1-cpbeat` |

**Not killed in M-B (and why — see §4):** law 40 (corrupt save refused). The M5
mutation broke the wrong layer: it made `readSlot`'s hydrate-failure branch return
`ok`, but the injected corrupt save is refused *earlier*, by `restore()` → `parsePayload`
(`saves.ts:93`, "roster must be 32 frozen players"). The law correctly stayed green —
the mutation never reached the guard. This is a method error in the mutation, not a
survivor; the corrected attempt is M-B2.

### Run M-B2 — corrupt-save, correct layer (75 pass · 0 fail, exit 0, 77s)

Mutation M5b: `src/engine/sports/nfl/app/saves.ts:93` — dropped the roster-length check
(`p.roster.length !== 32 ||` removed), so the injected empty-roster save passes shape
validation. **Law 40 still passed** — but with a *different* refusal message:

```
baseline: PASS … — Slot B REFUSED (corrupt) — corrupt-never-repair week: roster must be 32 frozen players
M-B2:     PASS … — Slot B REFUSED (corrupt) — corrupt-never-repair week: score Chi vs Det (week 1) lacks htd/atd — seeding tiebreaks would silently change
```

The second layer caught it: `hydrateWeek`'s H2 check (every stored score carries its
touchdown counts, `hydrate.ts:57-59`). The injected corrupt fixture is corrupt in
*several* ways at once (empty roster **and** a score with no `htd`/`atd` **and** an empty
schedule) — so law 40 guards the *outcome* (REFUSED corrupt) through defense in depth,
and breaking any single layer cannot kill it. That is good robustness and bad
diagnostics at once: the law cannot tell you *which* layer fired, and the fixture
cannot distinguish a shape refusal from a hydration refusal. Together, M-B and M-B2
prove two layers each independently suffice for this fixture. Killing law 40 would
require breaking every layer simultaneously (gutting the validation chain) — not run,
because it would prove nothing beyond "the law guards the outcome". Proposal (already
filed as Part 7 G-01): split the corrupt fixture into one-corruption-per-law so each
layer has its own killing mutation.

### Run M-C — needs row, play gate, season brag (72 pass · 3 fail, exit 1, 77s)

| Mutation | File:line | Laws killed |
|---|---|---|
| M9: needs row drops K — `&& s.id !== 'K'` in `byUnit` | `src/lib/components/NeedsRow.svelte:21` | 29 — the needs row lists all 32 OPEN slots — detail: `31 chips` |
| M10: PLAY WEEK 1 always shown — `{#if draftDone}` → `{#if true}` | `src/lib/components/BoardFooter.svelte:12` | 44 — PLAY WEEK 1 is ABSENT while the draft runs |
| M11: champion outcome reworded — `'CHAMPIONS — …'` → `'WON IT ALL — …'` | `src/lib/shareVM.ts:90` | 69 — the season brag renders the SAVE's own numbers — detail shows the reworded text failing the `CHAMPIONS` token check |

**Total killed by run: 13 of 75 laws** (4, 10, 12, 16, 22, 25, 29, 44, 56, 66, 69, 72,
74), each by breaking exactly the thing the law names. Every killed law died with a
diagnostic detail naming the break (gone `"90"`, `BAD ["4 flex"]`, `31 chips`, JPEG
magic bytes, `animation-name: …-cpbeat`).

## §4 — The laws not run-mutated, assessed statically (INFERRED unless noted)

Five mutation runs cannot cover 75 laws at ~90–230s per run, so the remaining laws are
assessed by guard shape, not by running a break. Each is labelled INFERRED; the shape
it shares with a run-proven kill is named so a later seat can verify it with one run.

**Same shape as a run-proven kill — expect death (INFERRED):**

- *Count/existence laws* (same shape as run-proven 29, 44): 1 (opens at Team Select),
  2 (32 teams), 3 (alignment), 6 (team details), 7 (rivals), 8 (choice flows to board),
  9 (60 rows), 13 (gone-odds present on every row), 14 (sort controls), 17 (natural
  slot first), 23 (Owner preset one click away), 34 (three slots), 35 (slots empty),
  37 (slot A loadable), 47 (feed renders), 60 (shareable offered), 61 (brag + seed
  card render). Breaking the counted/rendered element kills each — the battery counts
  real DOM nodes, not constants.
- *Text/regex laws* (same shape as run-proven 12, 25, 69): 11 (on-clock text), 18 (pick
  confirms), 19/21 (footer counts), 27 (tooltip visible on hover), 36/38/39 (envelope
  lands/survives/loads), 42/43 (week save hydrates / hydrated card), 53 (quarter marks),
  54 (provenance stamp), 65 (seed card recipe), 68 (season save classifies), 70
  (season brag proof identity), 67 (no link in the card — adding an `href` kills it).
- *Interaction laws* (same shape as run-proven 16, 29): 15 (OVR sort actually sorts),
  20 (CPU picks on after the user's pick), 30 (needs row sticky), 31/32/33 (need filter
  + every-row-fills + ALL clears), 45 (draft completes through the store), 46 (PLAY
  WEEK 1 appears), 57/58 (NEWEST FIRST / MY DRIVES).
- *Lock/state laws* (same shape as run-proven 4/22): 5 (mode switch not disabled
  pre-draft), 24 (mode switch disabled mid-draft).
- *Zero-error laws* 26/59/73/75: one accumulator (`errs`, never reset — VERIFIED,
  `slice1.battery.mjs:22,29`); an uncaught page error kills all four together. They are
  one guard restated four times, not four independent guards. (And they catch only
  `pageerror`, never `console.error` — see Part 8.)
- Law 41 (newer-version refused): **not** run-mutated. Breaking `parseEnvelope`'s
  `schemaVersion > SCHEMA_VERSION` check (`envelope.ts:46`) would kill it (INFERRED).
  But the fixture confounds two fields (`schemaVersion: 99` *and* `engineVersion:
  'future'`), so the law cannot say which field refused it — see Part 7 G-02.
- Law 64 (proof names the pinned engine + dataset stamp): killable by changing the
  `ENGINE_PIN` literal in `App.svelte:37`, because the battery recomputes the dataset
  sha from the CSV file independently (INFERRED — the two sides do not share the
  literal).
- Law 71 (seed card PROVEN by node-side replay): killable by printing a wrong seed on
  the card, because the replay (`replaySeason` in `seasonfixture.mjs`) is battery-side
  code independent of the app (INFERRED — this one has a genuine independent oracle).

**Shared-module shape — survive a module bug, die on a UI-side break (INFERRED, by the
M7 mechanism):** laws 48, 49, 50, 51, 55, 62, 63. Each compares the DOM against a
node-side recompute that imports the same shell module (`feedVM`, `goneOdds`) the UI
renders. A bug in the shared module moves both sides together (PROVEN for 48/62's
`userWon` by M7). Two of them have a partial escape hatch: law 55 (running scores END
at the final) compares the *accumulated* running scores against the final score, so a
mutation of the final alone (e.g. `gameFeed`'s `homeScore`) would break 55 while 48/62
stay green — the cross-check law is the one that catches what the direct-match laws
cannot (INFERRED, not run). Law 49 (drive count) has no such hatch: dropping a drive
in `feedVM` drops it from both sides.

**Not assessed (stated, not hidden):** laws 5, 20, 27, 30, 45, 57, 58 were not
run-mutated; their INFERRED killability rests on the shape argument above. The three
DEFER laws and ten SKIP laws are not laws of this battery at all — they assert nothing
here, so there is nothing to mutate; the SKIP list is inventoried in Part 7.

## §5 — Verdict

- **13 laws proven killable by run** (listed in §3 with receipts). The battery is a real
  guard for the board, the mode label, the flex chips, the needs row, the play gate, the
  yards constraint, the PNG artifact, the reduced-motion switch, and the season brag's
  outcome token.
- **Survivors (VERIFIED by the M7 run):** the shared-module recompute laws (48, 62 and
  kin) cannot catch a bug in the module they recompute through — the battery passed a
  0–21 loss labelled VICTORY and a board whose every gone% was 0%. And gone% *values*
  have no law at all. These are the battery's real holes, and they are in the shell's
  own view-model layer, the one place no other test suite covers.
- **Defense in depth (VERIFIED by M-B/M-B2):** the corrupt-save refusal survives any
  single-layer break — `parsePayload` and `hydrateWeek` each independently refuse the
  shipped corrupt fixture. Good robustness; poor diagnostics (one fixture, several
  simultaneous corruptions, outcome-only assertion).
- **The battery reproduces green as shipped** (baseline 75/0/10/3, VERIFIED), and every
  run in this filing exited as its mutations predicted (exit 1 exactly when laws died,
  exit 0 exactly when they did not — except the one crashed first M7 attempt, reported
  in §2).

Mutation log (all in `/tmp`, nothing pushed): baseline `/tmp/battery-baseline.log` +
`/tmp/battery-baseline.json`; M7 `/tmp/battery-m7.log` + `.json`; M-A
`/tmp/battery-ma.log` + `.json`; M-B `/tmp/battery-mb.log` + `.json`; M-B2
`/tmp/battery-mb2.log` + `.json`; M-C `/tmp/battery-mc.log` + `.json`. Mutation sources:
`/tmp/mut-m7`, `/tmp/mut-ma`, `/tmp/mut-mb`, `/tmp/mut-mb2`, `/tmp/mut-mc` (pristine
base `/tmp/mut-base`). All four inbox files for this round share the UTC stamp
20261116-2117.
