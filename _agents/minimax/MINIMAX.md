# MiniMax — consolidated seat file

**Who I am.** MiniMax. Council seat, ID block **S-1900–1999** (claimed in `CHRONICLE.md` on
20 Oct 2026 — the first-logged claim; the "Kilo"/"Cohere"/"LK" placeholder entries belong to other
sessions and were left untouched per R5).

**What I am not.** Not the Architect. Claude holds technical authority on everything that enters the
build (R3); I advise with receipts. I have never edited a product file, opened a PR, pushed a branch,
or renamed anything. I do not hold a rank (R4) and I do not outvote anyone.

**How I work.** Every claim I file carries the command that produced it and the build hash it was
measured on. If I cannot re-derive a number, I label it *reported* / *inferred* / *unverified* rather
than asserting it. Shared documents: I append, and I touch only my own sections.

**My lane:** `_agents/minimax/` — everything below is mine; no other seat writes here without my
say-so, and I write nowhere else.

---

## 1. Contribution ledger (what is on the record, and where)

| # | Where | What |
|---|---|---|
| M-22 | bulletin | The two BLOCKING defects, with the merge sheet: one-line-delta proof, drop-in helper census, `setActiveTab` tail trap |
| M-30 | bulletin | Round 4: house-rules v2 acknowledged, lists v4 deltas, one-command post-merge gate introduced |
| M-37 | bulletin | Option A review — verdict **sound with changes**; six answers with receipts; corrections C-8…C-13; risks R-7/R-8 |
| M-40 | bulletin (+ a lane note **lost in the 12:13 workspace rollback**; its substance survives in the bulletin message and the board post) | The next prompt to Claude, drafted (paste-ready for the Owner) |
| — | `QUESTIONS-FOR-THE-ARCHITECT.md` → `## MiniMax's questions` | Q-MINIMAX-1…6 (2 BLOCKING, 3 NOW, 1 LATER) |
| — | `PROMPTS-TO-ARCHITECT.md` → three `### MiniMax` sections | fact-check of Beam's consolidated draft; review of DS's lane consolidation; review of the final relay candidate |
| M-53 | bulletin | The one runtime defect in the relay candidate (`renderSeasonTabInner` is markup-dependent) |
| M-55 | bulletin | **New:** the settled oracle applied literally ships a dead "Play a Season" button (see §3) |
| M-66 | bulletin | **Correction to my own M-59** (the deviation is ONE function, not a pair) + the measured surface map + the merge oracle as data |
| M-70 | bulletin | The expansion programme as a folder, a claim board and a working question channel: `SIM-PLATFORM/` |
| M-75 | bulletin | Review of PR #1 (GPT multisport proposal): ten measurement-driven findings, F2 corrected in place |
| M-80 | bulletin | The second shared-document loss event; the gate rebuilt and re-validated; GPT's new branches reviewed |
| M-81 | bulletin | **A correction to my own F2 finding** (measured, not asserted) + the validator gate + the dead-code `TIER_BONUS` finding |
| M-82 | bulletin | The council E2E driver claimed with a full scope statement + the current prompt to the Architect (v2) |
| M-348 | bulletin | The Owner's spelling ruling applied to the NBA 2027 pool; a dropped name recovered (539 = complete); the parallel transcription reconciled |
| M-350 | bulletin | The spelling ruling applied, the dropped name recovered, the parallel transcription reconciled (five changes recorded in the file's own metadata) |
| M-364 | bulletin | The third brief applied, a V22 candidate carrying all three briefs, and the Owner's "V21 Suggestions" document |
| M-369 | bulletin | **The council deliverable for V22**: `V22-Suggestions.md` (priority-ordered, code with comments) + the board's display-slot bug diagnosed from Kosi's Cooper DeJean report |
| M-363 | bulletin | The Owner's second brief — BUILT and verified: the Team Comparison and Guide changes in a runnable artifact, a new probe, the five weight adjustments measured to the digit, and the colleagues' review corrected where it is wrong |
| M-364 | bulletin | **The third brief applied, a V22 candidate carrying all three briefs, and the Owner's "V21 Suggestions" document** |
| M-362 | bulletin | The Owner's second brief against merge.html — BUILT and verified: the Team Comparison and Guide changes in a runnable artifact, a new probe, the five weight adjustments measured to the digit, and the colleagues' review corrected where it is wrong |
| M-363 | bulletin | **The Owner's second brief, built and verified** (artifact `f4c26e3b…`, 657,870 B) + the five weight adjustments measured + the run-game model finding + the circularity in the default weights + 17 advanced-stat proposals |
| M-357 | bulletin | The Owner's brief against merge.html — BUILT and verified: items 1–5 in a runnable artifact, a re-runnable builder, a new probe, six corrections to the circulated spec, and the default-weights question settled by measurement |
| M-358 | bulletin | **The Owner's brief, built and verified** (artifact `4c42f6c…`, 657,605 B) + the six corrections to the circulated spec + the default-weights measurement (the Owner's table == the live `modelWeights()` output, 34/34) + the item-3 reading (penalty sections vs per-team chips) |
| M-354 | bulletin | **The "Value here" column removal, independently verified**: BOC's seven-location change set built on the exact candidate, the CSS grid reflow measured and closed, the council gate + a 390 px board probe green, and three decisions left to the Owner/Claude |

Chronicle: 8 signed lines (`CHRONICLE.md`, "MiniMax" lines 64, 65, 88, 89, 91, 92, 97, 102, 103).

## 2. Lane inventory

| File | What it is |
|---|---|
| `notes/v20-hands-on-review.md` | the hands-on review of v20: full draft → 17-week season → playoffs → Super Bowl → Season Review, 0 console errors; the 390 px pass; findings F1–F6 |
| `notes/next-prompt-to-claude.md` | my canonical prompt draft for the Architect (M-40) |
| `notes/finding-m55-donor-season-entry.md` | **M-55** — the donor's Season entry path, the dead-CTA defect, and the decision it forces |
| `notes/next-prompt-to-claude.md` | **restored from `stash@{1}`** (the 12:13 checkout deleted it) — the M-40 canonical prompt, 17,192 B |
| `notes/decision-support-F1-F6.md` |
| `notes/e2e-evidence-audit-W1-W4-W6.md` | W1 independent re-verification (with three findings the brief's list does not contain), the W4 publication plan, and the W6 id census |
| `recon/` | the parallel batch's four reports (Lightning sweep, all-time data quality, proposed Run Reconciliation, adversarial recheck) | the measurements under the Owner's six multi-sport decisions (OR's F1–F6 = my PR#1 findings condensed) with recommended defaults |
| `notes/next-prompt-to-architect-v2.md` | the current prompt to the Architect (supersedes M-40's lost draft): the merge is verified and reproducible — what is left is promotion, plus two product decisions |
| `notes/finding-m60-surface-map.md` | **M-66** — the correction to M-59, the three measured branches, the surface map, the manifest |
| `SURFACES.md` | the measured UI-surface map: 131 shared ids, 9 donor-only, 4 v20-only; the three coupling rules; the branch table |
| `MERGE-MANIFEST.json` | **the merge oracle as data** — the lint reads it; the pin rules, decisions, surface variants, branches and acceptance commands live in one machine-readable file |
| `tools/build-owner-brief3-variant.mjs` | builds the third brief (flex table order, "offensive tackle" wording, the picks sentence, the merged "Drafting & Position Values" section, the glossary terms) |
| `V22-Suggestions.md` (repo root) | **the council's V22 deliverable** — the priority-ordered work list in code-with-comments form, [DONE] items pointing at the V22 candidate and [NEW] items written for the first time, plus the board-bug diagnosis and the open decisions |
 builds the third brief (flex table order, "offensive tackle" wording, the picks sentence, the merged "Drafting & Position Values" section, the glossary terms) |
| `tools/v22-probe.mjs` | one pass over everything the three briefs changed: the board columns, the footer, the weights buttons, the Team Comparison page, the guide sections, the flex order, the tier line, the values table, the glossary, and the surviving "value here" / bare-"tackle" counts |
| `prototypes/V22-candidate-2026-10-21.html` | **the V22 candidate** — V21 with all three briefs applied (`e5fa7e0e…`, 660,046 B), gate exit 0, 390 px clean, live-verified |
| `V21 Suggestions.md` (repo root) | the Owner's requested document: all of my comments from the last three prompts, with receipts, the consolidated decision list and the instruments table |
| `tools/build-owner-brief2-variant.mjs` | builds the Owner's second brief (Team Comparison + Guide) onto any base build: every anchor asserted, the input never edited |
| `tools/owner-brief2-probe.mjs` | drives the live page and checks the second brief: the subtitle, the effective-ratings note, the verdict, the default pair, the Unit Comparison order and labels, the guide box, the season line, the tier list and the values table |
| `notes/owner-brief2-merge-changes.md` | **M-363** — the second brief built and receipted, the change set, and what to know before it lands |
| `notes/position-value-adjustments.md` | the five weight adjustments as measured factors, the reconciled table, the TE condition, the run-game model change, the corrections to the four reviews, and the default-weights circularity |
| `notes/advanced-stats-proposals.md` | 17 advanced-stat proposals for the Owner, and the finding that the sim already computes most of them |
| `prototypes/owner-brief2-2026-10-21.html` | the Owner's second brief on the merge candidate (`f4c26e3b…`, 657,870 B) — gate exit 0, live-verified |
| `tools/build-owner-brief-variant.mjs` | builds the Owner's brief (items 1–5) onto any base build: every anchor asserted, the input never edited |
| `tools/owner-brief-probe.mjs` | drives the live page and checks the brief: board columns, the footer label, the weights-panel order, the button state machine (transparent → blue "My Weights" → save → Default → reload), the sort label and the guide text |
| `notes/owner-brief-merge-changes.md` | **M-358** — the brief built and receipted, the change set, the six corrections to the circulated spec, the three decisions |
| `prototypes/owner-brief-2026-10-21.html` | the Owner's brief items 1–5 on the merge candidate (`4c42f6c…`, 657,605 B) — gate exit 0, 390 px clean |
| `tools/cdp-phone-check.mjs` | dependency-free 390 px layout probe (plain Node over CDP) |
| `tools/board-columns-probe.mjs` | which columns the draft board actually renders, and whether they are populated (header labels, first-row cell labels and text) |
| `tools/board-mobile-probe.mjs` | 390 px board layout: overlapping cells, clipped cells, horizontal overflow, per-row cell coordinates (used to settle the CSS reflow) |
| `notes/value-here-column-removal-verification.md` | **M-354** — BOC's change set applied to the exact candidate, the measured CSS reflow, the receipts, the two artifacts and the three open decisions |
| `prototypes/v1-boc-change-set-with-measured-reflow.html` | BOC's seven locations + the measured reflow, verified (`5ee6960b…`, 656,876 B) — the build Claude should diff against |
| `prototypes/draft-board-no-value-here.html` | my variant: the column gone, the guide and the sort option kept (`cd64d1ce…`, 657,202 B) |
| `tools/post-merge-smoke.mjs` | **the gate**: draft → season → playoffs → 100-season report → 390 px element-level overflow → uncaught page errors; exit 0/1/4 per `tests/CONTRACT.md` v2 |
| `tools/candidate-lint.mjs` | **static merge oracle**: the 8 protected math functions, 6 protected constants, `MC`/`PLAN_K`, donor `cpuPick`, donor `render100`, the 14 donor takes, `renderDraftBoard2`, the Season-path id cross-check, the parent-only symbol check, and the text-level debt — with `--selftest` proving every pin re-derives from the parent builds |
| `tools/build-pool-variant.mjs` | puts a player POOL into a build at build time (the stage-1 seam, demonstrated); translates legacy position codes through the taxonomy and never invents a rating |
| `tools/id-census.mjs` | which DOM ids the code asks for and which the markup provides (W6); reports missing, runtime-assigned and unused ids |
| `tools/export-current-pool.mjs` | exports a build's own pool in the platform schema (nothing authored) — produced the first validated pool |
| `tools/quarantine-sample-pool.mjs` | one-command quarantine of an illustrative pool into an unmistakable example (never touches the input) |
| `tools/message-content-ids.mjs` | computes a content id (sha256 of the message block) per board message, so a citation resolves to one message; writes an id-stamped copy for review |
| `tools/make-lint-fixture.mjs` | builds a synthetic merge in `/tmp` (never in the repo) to prove the lint and the gate can pass |
| `../../SIM-PLATFORM/data/nfl/current.json` | **the reference pool** — 1,200 records exported verbatim from the reference build and validated (exit 0): the first validated pool in the project |
| `../../SIM-PLATFORM/` | **the expansion programme** (Owner-directed): the vision, the platform architecture, the contribution system, the claim board, the dataset protocol, the decision log, the Owner's concept-question channel (`tools/owner-questions.mjs`, 53 questions) and the data tools (`validate-dataset.mjs`, `rating-worksheet.mjs`) |
| `evidence/` | raw receipts: session log, smoke JSONs for v20/donor/fixtures, rejoin smoke runs |

## 3. Findings that are live (each with its receipt)

**F1 — `[BLOCKING]` the 100-season report crashes on v20.** `ReferenceError: rWeights is not defined`
at v20:6018 (thrown from :5900); the identifier is used once and never declared. `grep -n rWeights`
→ v20 ×1, donor ×0. The donor's `render100` (`cc1016eacc78`) is the drop-in fix; every helper it calls
already exists in v20. *Caught by driving the build, not by reading it — it is also invisible to the
static lint of a merged candidate until the donor body lands.*

**F2 — `[BLOCKING]` mobile table stacking is lost after any viewport change.** v20:6409–6432 removes
the `mstack` class on desktop (:6416) but keeps the `dataset.msChecked` memo, so the next mobile pass
skips the table (:6418). Measured **7,208 overflowing elements** after mobile→desktop→mobile on v20,
**0** on the donor. The donor's block (donor:6458–6488) dropped the memo.

**F3 — `[NOW]` a 390 px check written as `documentElement.scrollWidth` is blind here.**
`body{overflow-x:hidden}` masks clipping: in the broken state `scrollWidth` = 390 = `innerWidth` while
the Player Browser table is 515 px inside a 344 px card. The check must be element-level and must wait
≥200 ms for the 150 ms transform debounce.

**F4/F5 — copy debt.** "to steal a 18–16 win" (v20:3082 / donor:3101 — wrong article for 8, 11, 18)
and "the 49ers's answer" (v20:5433 / donor:5483) — shared debt. "sudden death" (v20:2880) and "went the
distance" (v20:2898) — merge-debt, the donor already removed both (inside `dramaticEnding` and
`turnoverParagraph`).

**M-53 — `[BLOCKING]` the relay candidate marks `renderSeasonTabInner` as donor while instructing a
v20 base.** The donor's Season-entry path does not exist in v20 (`viewSeason` 0/6, `tabSeasonBtn` 0/7,
`seasonHost` 0/4, `goSeason` 0/1) and the donor's `setActiveTab` view loop (donor:777) has no null
guard while its tab loop does (donor:778) → a donor copy throws a TypeError at "Start Season". A green
load is not a green build.

**M-55 — `[BLOCKING]` the settled oracle, applied literally, ships a dead "Play a Season" button.**
The donor's `renderDraftResults` (@6179) renders `#ctaPlaySeasonBtn` whose handler calls
`setActiveTab('viewSeason','tabSeasonBtn')` and `getElementById('seasonHost')` — **neither exists in
v20's markup** — while v20's `renderDraftResults` renders the season inline (`renderSeasonTab(body)`,
v20:6159). Measured on two fixtures built mechanically from the settled decisions: oracle-as-stated →
static lint exit 0 but dynamic gate exit 1 (check D false, `gamesPlayed: null`); with v20's
`renderDraftResults` + `finishDraft2` → **gate exit 0** (272 games, champion, 100-season report
renders, 390 px 0 offenders, 0 page errors). Detail: `notes/finding-m55-donor-season-entry.md`.

**Framing correction (MOC's M-85 §3, accepted).** The build has **58 `Math.random()` sites and no
seed**, so the same artifact yields a different champion on every run (measured across three runs of
`40233d6b…`: New England Patriots, Houston Texans, Los Angeles Chargers — 272 games and a PASS verdict
every time). My receipts cite a champion; the honest statement is *"a champion was produced"*. **The gate
is a smoke test, not a statistical one**: it certifies that a build runs, and it can never be cited as
evidence of season balance, champion realism or win correlation — and two PASS receipts on the same
artifact will not agree on the champion.

**M-81 — correction to my own F2 (PR #1): the mechanism was wrong, the conclusion is stronger.**
I wrote that legacy position codes would make every player ineligible for every slot and produce an empty
roster. Measured: the flex rule does **not** exclude them (`flexPenaltyFor` turns `null` into the 8-point
emergency penalty, v20:908-916) — the **pool filters** do (`PLAYERS.filter(p=>POS_SLOT_MAP[p[1]])`
v20:1434, CPU skip v20:1375, replacement levels v20:1334), and `simToEnd` advances the pick counter when it
cannot fill a pick (v20:1494-1497). Measured on a probe: 400 legacy-coded records → the draft still
reported **832/832 and "Draft Complete"** while only **748 players were drafted and 748 of 832 slots
filled**. The build's own 52 non-drafted records (P, FB, LS) are invisible the same way. Enforcement now
exists in `SIM-PLATFORM/tools/validate-dataset.mjs --fromBuild <build> --teams 32 --slots 26`
(position-taxonomy + draft-capacity checks). Also: **`POSITION_TIER`/`TIER_BONUS` are never read** — the
"+14 QB tier bonus" several notes cite is not applied anywhere in the build.

**M-66 — correction to my own M-59: the deviation is ONE function, not a pair.** M-55 said the
donor's draft-results → season entry is a unit, so `renderDraftResults` **and** `finishDraft2` must be
taken together from one build. Measured: **one is enough** — with v20's `renderDraftResults` and the
donor's `finishDraft2`, the season is reachable through v20's results Season tab (`resultsSeasonBtn`,
v20:6134) → branch **C** = 12 donor / 3 v20 / 2 synthesize, static lint exit 0 **and** dynamic gate
exit 0. My M-55 was wrong because the gate assumed a single season-entry path; the gate now
**enumerates** them (`ctaPlaySeasonBtn` → `resultsSeasonBtn` → `tabSeasonBtn` → already-rendered).
Branch table (lint/gate): A 1/1 (the oracle as stated → dead CTA), B 0/0 (v20's pair, 11/4/2),
C 0/0 (one function, 12/3/2), C2 not built (12/2/3, proposed). Matrix:
`evidence/gate-matrix-2026-10-20.txt`. Detail: `notes/finding-m60-surface-map.md`.

## 4. The oracle I own (pins, with the rule that makes them pins)

Function bodies: first `<script>` block, split on `\n`; a body runs from its column-0
`function NAME(` line through the last line whose `trim()==='}'` before the next column-0 `function`
line; joined with `\n`; sha256 without a trailing newline; first 12 hex. Constants: sha256 of the
first `^const NAME` line, trailing newline stripped.

| symbol | v20 | donor | decision |
|---|---|---|---|
| `cpuPick` | `3dc9d12f500a` | `94b878605b73` | **donor** |
| `render100` | `1ea6e8414397` | `cc1016eacc78` | **donor** |
| `renderDraftBoard2` | `6f77deaf263f` | `3736a5bfb36f` | **v20** |
| `setActiveTab` | `ae1a1425186e` | `d3a34f7c930b` | synthesize — markup-dependent |
| `renderSeasonTab` | `06116b2fa88a` | `39ee2333b960` | synthesize — markup-dependent |
| `renderSeasonTabInner` | `b5d8adf9910b` | `441697cc5b99` | **undecided — markup-dependent** (M-53) |
| 11 more donor takes | — | `fitNoteHTML` `buildDefenseDetail` `dramaticEnding` `turnoverParagraph` `playByPlay` `generateGameSummary` `matchupTagHTML` `renderPlayoffsView` `renderGuideHTML` `finishDraft2` `renderDraftResults` | donor — **except `renderDraftResults`/`finishDraft2`, see M-55** |
| 8 math + 6 constants + `MC`/`PLAN_K` | identical in both parents | identical | **must not move** |

Counts with the unit named: **408 common = 391 identical (true body) + 17 differing**; the raw
extractor prints 390/18 because `checkRewards` over-reads the adjacent column-0 `#glue` IIFE (a
boundary artefact, excluded). The all-declaration census is 430 = 408 top-level + 22 nested.

## 5. Instruments (mine, dependency-free, no npm install)

```
node _agents/minimax/tools/candidate-lint.mjs --selftest          # every pin re-derives — exit 0
node _agents/minimax/tools/candidate-lint.mjs "<candidate.html>"   # static merge oracle — exit 0/1
node _agents/minimax/tools/post-merge-smoke.mjs "<candidate.html>" # dynamic gate — exit 0/1/4
node _agents/minimax/tools/cdp-phone-check.mjs "<file>"           # 390 px element-level probe
node _agents/minimax/tools/make-lint-fixture.mjs [out] [--v20-results|--v20-results-only]
```
The lint reads `_agents/minimax/MERGE-MANIFEST.json` (the oracle as data) — it no longer hardcodes
pins, and its `--selftest` re-derives every pin and every surface anchor from the parent builds. The
dynamic gate **enumerates** the season entry paths rather than assuming one. Both browsers need a
Chromium-family browser with `--remote-debugging-port=9222`; Brave is at
`/Applications/Brave Browser.app/Contents/MacOS/Brave Browser`.

Reference runs (lint/gate): v20 `31b7d61f…` → **1/1** (A false, B 7,208 offenders, C the `rWeights`
ReferenceError); donor `77bb9ed5…` → **1/0** (its tail is the Season-first line, so it fails the
static lint by design). Fixtures: A (the oracle as stated) 1/1, B (v20's pair) 0/0, C (one function
from v20) 0/0. The merged candidate must be **0/0**.

## 6. Open items / what I am waiting on

1. **The Architect's M-53/M-55 decision** — which Season branch the merged build takes (v20 markup →
   11/4/2 or 11/3/3; donor surface → 14/1/2 but larger scope). Everything else in the merge depends on it.
2. **The answer pack** — Q-MINIMAX-1…6 are unanswered (2 BLOCKING, 3 NOW, 1 LATER).
3. **Branch protection / ruleset** on `main` and **MCP push confirmation** — I have no admin view;
   labelled unverified by every reviewer.
4. **The intake's shared docs are one round behind** (bulletin, chronicle, questions, INDEX differ;
   `STATUS.md`/`AGENTS.md` match). The pack Claude can read still reads 4 `[BLOCKING]` against the
   root's 10.
5. **Three decisions on the "Value here" removal** (M-354) — (a) the Fills cell still shows a value
   number (`also fits: CB1 +1.72`), the last value figure on the board: keep it, keep the slot name
   only, or drop the line; (b) the guide's Priority bullet still says "Value here minus …" after the
   tooltip and the section title were reworded — one stale phrase; (c) the sort option
   `Sort: value here` — remove it (BOC's set) or keep it reworded (BOC's and MOC's recommendation).
   My variant keeps the guide and the sort, so the Architect can compare the two readings.

## 7. Standing offers (no new permanent document; nothing needed from anyone else)

* Run the two instruments against the Architect's candidate and file the receipts as the verifier
  input — the static lint first (it is instant), then the dynamic gate.
* Seed `tests/phone.js` from `cdp-phone-check.mjs` / `post-merge-smoke.mjs` — no npm install, plain
  Node over CDP, exit codes already in `tests/CONTRACT.md` v2's league.
* Write the one-page merge runbook (preconditions → pinned base → verifier command → rollback cases)
  if the Owner wants it; it would live here, not in a shared document.

## 8. Rejoin log

This session was archived by the Owner and restored on 20 Oct 2026. On restoration I re-verified the
whole footprint rather than assuming it: product builds untouched (`31b7d61f…` 649,032 B,
`77bb9ed5…` 650,127 B), all eight of my lane files present, my bulletin/chronicle/questions entries
intact, and the two instruments re-run live — **v20 → exit 1, donor → exit 0**, identical to the
Round-4 receipts (`evidence/rejoin-smoke-v20.json`, `…-donor.json`). Nothing had been lost; the
session had been.
