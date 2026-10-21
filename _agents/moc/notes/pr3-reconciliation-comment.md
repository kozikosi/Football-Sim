## E2E reconciliation — resolved against the per-run files (MOC, 20 Oct 2026)

Week 1 is settled (neither run asserted Week 1 of 17; the earlier PASS is superseded by this run's corrected PARTIAL). This post reconciles the remaining disputed details **from the files themselves**, and attaches the evidence. Everything below is measured; where a number could not be measured, that is said plainly rather than inferred.

**Artifact under test:** `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` (657,486 B) @ `merge/v20-donor` `ff8c05ae0ef8` — hash re-derived from the file on disk, **MATCH**.
**Durable evidence (published release, nothing committed to any branch):** <https://github.com/kozikosi/Football-Sim/releases/tag/e2e-evidence-2026-10-20T225702Z>

| asset | sha256 | link |
|---|---|---|
| `result.json` (current) | `d64a5f9bb3ab6e7b0b97277beb3afdf8858950be1c3b8434a5e2d46426288396` | [download](https://github.com/kozikosi/Football-Sim/releases/download/e2e-evidence-2026-10-20T225702Z/result.json) |
| `SUPERSEDED.md` (earlier run preserved as history) | — | [download](https://github.com/kozikosi/Football-Sim/releases/download/e2e-evidence-2026-10-20T225702Z/SUPERSEDED.md) |
| `test-script.spec.js` (the exact script used) | `ee9aaa44d00557d6ebca13dc0eb9f487fda2c2ce5e42578ae5cc8b392d3c3757` | [download](https://github.com/kozikosi/Football-Sim/releases/download/e2e-evidence-2026-10-20T225702Z/test-script.spec.js) |
| `OPENCHAMBER-E2E-RESULT.schema.json` | `3f2e07cfc1db9b61b4c21dba37e0d360c4fedfbc0677ba2f51b02b25976de879` | [download](https://github.com/kozikosi/Football-Sim/releases/download/e2e-evidence-2026-10-20T225702Z/OPENCHAMBER-E2E-RESULT.schema.json) |
| `screenshots.zip` (26 PNG) | `b9a39e9800c7c33b6b8a8eb33961049749fbe3b5bf6e230eb72416d26f28c30d` | [download](https://github.com/kozikosi/Football-Sim/releases/download/e2e-evidence-2026-10-20T225702Z/screenshots.zip) |
| `trace-1792537070181.zip` (65,863,244 B) | `05354b056a43095d0605cee8e292756e9bfbdc5a3c40e74880ed32573d84bc92` | [download](https://github.com/kozikosi/Football-Sim/releases/download/e2e-evidence-2026-10-20T225702Z/trace-1792537070181.zip) |
| `schema-validation.txt` (unedited output below) | — | [download](https://github.com/kozikosi/Football-Sim/releases/download/e2e-evidence-2026-10-20T225702Z/schema-validation.txt) |
| `trace-playoffs-forensics.txt` | — | [download](https://github.com/kozikosi/Football-Sim/releases/download/e2e-evidence-2026-10-20T225702Z/trace-playoffs-forensics.txt) |
| `validate-e2e-result.py` (the validator) | — | [download](https://github.com/kozikosi/Football-Sim/releases/download/e2e-evidence-2026-10-20T225702Z/validate-e2e-result.py) |

---

### 1. Steps, screenshots, light/dark, 100-season — measured, per run

| | **Run A — on disk (2026-10-20T22:57:02.298Z)** | **Run B — the earlier run** |
|---|---|---|
| artifacts on disk | **yes** — `test-results/e2e-1792537022298/` | **none** — nothing to measure |
| steps | **11** (10 `PASS`, 1 `SKIP` = `week-1-display`) | reported as 7 (5 PASS, 2 SKIP) in the summary, and as 10 in a later description of it — neither is measurable |
| screenshots | **26** (array **26**, files **26**, no gaps either way) | reported as 4 / 9 / 20 — not measurable |
| light/dark captures | **6** (`startup-{light,dark}`, `draft-results-{light,dark}`, `100-season-report-{light,dark}`) | reported as "no light/dark captures" — not measurable |
| 100-season report | **PASS** — report locator `isVisible` → `true`; "What actually drove winning" count = **2** | reported as skipped — not measurable |
| trace | 65,863,244 B | reported as 32 MB — not on disk |

**The 26 = 20 + 6.** The `screenshots` array holds 26 entries and 26 PNGs exist; 20 are the viewport-check captures and 6 are the light/dark pair captures. All 6 light/dark captures are at the **390 px** viewport; the 10 desktop captures are at **1280 px**. (Verified from the PNG IHDR: 10 files 1280 wide, 16 files 390 wide; they are full-page captures, hence heights up to 23,732 px.)

**One defect inside the current run's own report:** note 5 of `result.json` says *"24 screenshots"*. The array and the disk both say **26** — the note under-counts its own light/dark captures by two. **I have not edited the run's `result.json`**; the correction lives in `SUPERSEDED.md` and here, so the original stays byte-intact (`d64a5f9b…`).

**Run B's artifacts are gone.** A filesystem sweep found exactly one `result.json` anywhere on the machine (`test-results/e2e-1792537022298/result.json`), one trace, and one screenshot set. The only other run directory, `test-results/e2e-1792537022083/`, is **215 ms before** the current one (22:57:02.083Z vs 22:57:02.298Z) and is **empty** apart from an empty `trace/` folder — it is the *first attempt of the same run*, not a separate execution. Run B therefore cannot be re-measured; its surviving record is the Owner's comment of 22:45:33Z, reproduced verbatim in `SUPERSEDED.md` and **kept, not overwritten**.

### 2. The script for each run

| | script | sha256 | state in the repo |
|---|---|---|---|
| **Run A** | `test-results/e2e-1792537022298/test-script.spec.js` | `ee9aaa44d00557d6ebca13dc0eb9f487fda2c2ce5e42578ae5cc8b392d3c3757` | byte-identical to `tests/openchamber-e2e.spec.js` (same sha256; `cmp` → identical) |
| **Run B** | not recoverable — no script, no result, no trace on disk | — | — |

**"Unchanged" is not the right word for `tests/openchamber-e2e.spec.js`:** it is **not tracked in any ref** (`git status --porcelain -- tests/` → `?? tests/`, `git log --all -- tests/openchamber-e2e.spec.js` → empty). It is a new, untracked file, and it is the same script the run used. The copy in the run directory is a copy of it, not a different script.

### 3. The playoffs button — viewport, simulation state, locator result, screenshot/trace

All from Run A's own Playwright trace (142 calls, **0 errored calls in the entire trace**), times in UTC:

| time | call | result |
|---|---|---|
| 22:57:23.272 | `click #simSeasonBtn` | no error — regular season simulated |
| 22:57:23.718 | `expect '#simPlayoffsBtn, button:has-text("Regular Season Review")' to.be.visible` | **passed** (no error) |
| 22:57:28.679 | `evaluateExpression` → `window.seasonState?.gamesPlayed ?? window.regularSeasonGamesPlayed ?? null` | **`null`** (see §4) |
| 22:57:28.754 | `setViewportSize 1280×900` | **viewport is set explicitly by the spec, 96 ms before the click** |
| 22:57:28.850 | `click #simPlayoffsBtn` | **no error** |
| 22:57:31.226 | `expect '.champion-banner.fxwon, .champion-banner, #finalSeason, #championDisplay, #superBowlResult' to.be.visible` | **passed** |
| 22:57:32.928 | screenshot → `viewport-playoffs-champion-desktop.png` | 1280 px, full page (1280×3953) |
| 22:57:33.306 → 33.800 | `setViewportSize 390×844` → screenshot → `viewport-playoffs-champion.png` | 390 px, full page (390×6045) |
| 22:57:34.083 | `isVisible` on the champion locator | **`true`** |
| 22:57:34.291 / 34.358 | `isVisible #sim100Btn` → `click #sim100Btn` | **`true`** / no error |
| 22:57:48.448 | `isVisible` on the report locator | **`true`** |
| 22:57:48.541 | `queryCount` "What actually drove winning" | **2** |

**The viewport/timing explanation is not needed — the viewport is a constant, not a race.** The spec calls `setViewportSize({width:1280,height:900})` immediately before the playoffs click, and the trace confirms it was in force at 22:57:28.850. The same holds for the other 8 clicks, all of which also ran without error. The button was **present, visible, and clickable**, and the champion banner became visible afterwards.

**Simulation state — the honest part.** The protocol's numeric season probes returned **`null`**, and the trace shows why:

- `window.seasonState` — **0 occurrences in the 657,486 B artifact**. The build declares `let seasonState = null;` (line 3445) and assigns `seasonState = { teams, schedule, currentWeek, … }` (line 3457) as a **global lexical binding**, which is reachable as the bare identifier but is **never a property of `window`**. A CDP probe against this artifact confirms it: `typeof seasonState` → `"object"`, `window.seasonState` → `undefined`.
- There is also **no `gamesPlayed` field** in the build at all, and no `playoffRoundsCompleted` — so even with the right accessor those two names would not resolve.

Consequence: **this run verified the UI path, not the season numbers.** `seasonMetrics.draftPicks`, `regularSeasonGamesPlayed`, `playoffRoundsCompleted` and `reportDurationMs` are `null` in `result.json`, and the step details say "unavailable (expected 272)". The **272** figure was measured by a different instrument — `seasonState.schedule.length` in `tests/e2e-smoke.mjs` — which I ran twice on this same artifact (272 games, exit 0, A/B/C/D true, champion differs per run because the build has 58 unseeded `Math.random()` sites). That is a **different tool**, and it is recorded as such rather than merged into this run's result.

### 4. Schema validation — corrected command and unedited output

Two corrections to the circulated snippet:

1. **The typo.** The property is **`artifactSha256`** (the schema's name, `OPENCHAMBER-E2E-RESULT.schema.json` line 45). `artifactSha26` raises `KeyError` and would silently check nothing. The script below uses `artifactSha256` and **re-derives the hash from the artifact file on disk**.
2. **It is not a schema validation.** The run's note 5 claims "Schema validation: PASS (all 17 required fields, valid enums, …)" — that is a hand-written field check, and it under-counted its own screenshots. The command below performs a **full validation with a real validator**: `jsonschema` 4.25.1, `Draft202012Validator` (the schema declares draft 2020-12), with `FormatChecker` enabled, plus `check_schema` on the schema itself.

```
$ python3 _agents/moc/tools/validate-e2e-result.py \
      "test-results/e2e-1792537022298/result.json" \
      "test-results/e2e-1792537022298/OPENCHAMBER-E2E-RESULT.schema.json"
```

Unedited output:

```
==============================================================================
SCHEMA VALIDATION
==============================================================================
schema   : test-results/e2e-1792537022298/OPENCHAMBER-E2E-RESULT.schema.json
           $schema = https://json-schema.org/draft/2020-12/schema
           sha256  = 3f2e07cfc1db9b61b4c21dba37e0d360c4fedfbc0677ba2f51b02b25976de879
instance : test-results/e2e-1792537022298/result.json
           sha256  = d64a5f9bb3ab6e7b0b97277beb3afdf8858950be1c3b8434a5e2d46426288396
           status  = PARTIAL  suite = OPENCHAMBER-E2E-NFL-1
           steps   = 11  viewportChecks = 20  screenshots = 26

[1] schema is a valid Draft 2020-12 schema: OK
[2] instance validation (Draft202012Validator, FormatChecker on): 0 error(s)
    (no violations)

[3] required fields present: 17/17  (all present)

==============================================================================
ARTIFACT HASH RE-DERIVATION  (property: artifactSha256)
==============================================================================
artifactSha256 (recorded) : 40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd
artifactPath   (recorded) : /Users/kosi/Desktop/Football Sim/merged.html
recomputed from file      : 40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd
bytes on disk             : 657486
MATCH
trace referenced          : /Users/kosi/Desktop/Football Sim/test-results/e2e-1792537022298/trace/trace-1792537070181.zip
trace present             : True  (65863244 bytes)

RESULT: VALID
```

Exit code **0**. The result **is** schema-valid; the disputed part was never the validity, it was the *counts* and the *playoffs claim* — and the files settle both.

### 5. Two protocol defects this run exposed (for the suite owner, not for the build)

1. **The season-metric probes cannot work against this build.** `window.seasonState?.gamesPlayed` → always `null`. Use the bare global lexical binding and a field that exists: `typeof seasonState!=='undefined' && seasonState?.schedule?.length` (this is what `tests/e2e-smoke.mjs` already does, and it returns **272**). `seasonState.currentWeek` is also available for the Week 1 checkpoint.
2. **`week-1-display` was marked SKIP for the wrong reason.** The step's detail says the build "lacks a persistent Week 1 display element". The build does have season state — `seasonState.currentWeek` is initialised to `1` (line 3457) — so the Week 1 assertion may be satisfiable from state rather than from a DOM element. This is exactly the question this run leaves open, and it should be re-tested before the protocol is amended.

### 6. Status and what was deliberately not checked

The current result stands as **PARTIAL** (10 PASS, 1 SKIP). It is a valid, reproducible **UI-path** smoke run with a clean console (0 console errors, 0 page errors), 20 viewport checkpoints with **0 overflowing elements** at 1280×900 and 390×844, and a 65.9 MB trace (1,480 screencast JPEGs, 1,497 `screencast-frame` events, 291 DOM snapshots, 142 calls, 0 errors).

**Not checked:** no seeded RNG (58 `Math.random()` sites — the run is not seed-reproducible and two PASS runs on the same artifact disagree on the champion); no human visual pass; not `pw4.js` / `validate.js` (they do not exist yet); not the protected-function hash gate; the numeric season metrics (games played, playoff rounds) were **not** captured by this run; no accessibility, performance or persistence review. The earlier run's artifacts could not be re-measured at all.

**No branch, product file, or protocol file was modified** — the run's `result.json` is byte-unchanged (`d64a5f9b…`), the three builds are byte-unchanged, and everything I produced lives in `_agents/moc/` and in the release linked above.
