# L1 — which tracked artifacts still encode the pre-locator state

**SPEAKER: LONGCAT | ROLE: Council reviewer (S-2400–2499) | TASK: L1 — pre-locator artifact inventory | DATE: 2026-10-21 (UTC)**

**Assignment:** Pickle. Read-only. Build tested against: `NFL Draft Simulator merged.html`, sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` (657,486 B) @ `gpt/council-reliability-scorecard` HEAD `4558e81`. **Nothing edited outside `_agents/longcat/`.**

## (a) Inventory — tracked files with a Week-1 assertion or a seasonState probe

Command: `git grep -l <pattern> HEAD` on branch `gpt/council-reliability-scorecard` @ `4558e81`.

| #   | File                                                              | Contains                                                                                                                                                                   | Kind                              |
| --- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| 1   | `_agents/moc/evidence/e2e-2026-10-20T225702Z/result.json`         | `week-1-display` = **SKIP**, reason _"V20 donor build lacks persistent Week 1 display element (no #weekDisplay, #currentWeek, .week-indicator)"_; `seasonMetrics` all null | stored run evidence               |
| 2   | `_agents/moc/evidence/e2e-2026-10-20T225702Z/test-script.spec.js` | 10 `recordStep` ids, **no** Week-1 step; old probe `window.seasonState?.gamesPlayed`                                                                                       | archived script (sha `ee9aaa44…`) |
| 3   | `_agents/moc/notes/result.v2.proposed.json`                       | `week-1-display` = SKIP, reason _"NOT IMPLEMENTED in the script"_                                                                                                          | MOC's proposed v2 record          |
| 4   | `_agents/moc/notes/W2-run-reconciliation.md`                      | Week-1 SKIP + `#weekDisplay` probe                                                                                                                                         | MOC note                          |
| 5   | `_agents/moc/notes/W3-protocol-to-script-matrix.md`               | §3.4 "NOT IMPLEMENTED (proxy)"                                                                                                                                             | MOC note                          |
| 6   | `_agents/moc/notes/W5-run-reconciliation-index.md`                | Week-1 skip row                                                                                                                                                            | MOC note                          |
| 7   | `_agents/moc/notes/pr3-reconciliation-comment.md`                 | Week-1 skip + old probes                                                                                                                                                   | MOC note                          |
| 8   | `_agents/moc/evidence/e2e-2026-10-20T225702Z/SUPERSEDED.md`       | the earlier run, preserved as history                                                                                                                                      | history (correct as history)      |
| 9   | `CHRONICLE.md`, `COUNCIL-BULLETIN.md`                             | every correction already posted                                                                                                                                            | append-only history               |
| 10  | `tests/openchamber-e2e.spec.js`                                   | **untracked**; BOC's version, sha `6a781e71…`, 13-step, asserts `Week 1 of 17` + `seasonState.currentWeek`                                                                 | current script                    |
| 11  | `test-results/e2e-1792543053379/result.json`                      | **untracked**; 13-step run, `week-1-display` = **PASS**                                                                                                                    | current run evidence              |

The three product builds (`merged.html`, `NFL Draft Simulator v20 Claude.html`, `NFL Draft Simulator.html`) contain `seasonState` as a module-scope lexical binding — they are the **subject**, not evidence files.

## (b) Reproduces on the current candidate, or stale?

| Artifact                                     | Verdict                                        | Why                                                                                                                                                                                                                                              |
| -------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `_agents/moc/evidence/…/result.json`         | **STALE**                                      | Its SKIP reason is **false** — the build renders "Week 1 of 17" (artifact l.3891; I verified `getByText(/Week 1 of 17/)` → 1 match and `seasonState.currentWeek === 1` after Begin Season, M-302). Its `seasonMetrics` nulls are now measurable. |
| `_agents/moc/notes/result.v2.proposed.json`  | **STALE**                                      | Same reason; the script now implements the step.                                                                                                                                                                                                 |
| `_agents/moc/notes/W2/W3/W5/pr3`             | **STALE as current state**; correct as history | They describe the pre-locator state, which was true when written.                                                                                                                                                                                |
| `_agents/moc/evidence/…/test-script.spec.js` | **STALE as an executable**; correct as history | 10 steps; the canonical lane copy `_agents/minimax/tools/post-merge-smoke.mjs` is also the old 10-step shape.                                                                                                                                    |
| `_agents/moc/evidence/…/SUPERSEDED.md`       | **KEEP**                                       | That is its purpose.                                                                                                                                                                                                                             |
| `CHRONICLE.md` / `COUNCIL-BULLETIN.md`       | **HISTORICAL — do not rewrite**                | Append-only; the corrections are already posted.                                                                                                                                                                                                 |
| `test-results/e2e-1792543053379/result.json` | **CURRENT**                                    | 13 steps, `week-1-display` **PASS**, `seasonMetrics` populated (`draftPicks 832`, `regularSeasonGamesPlayed 272` via `seasonState.schedule.length`, `reportDurationMs 14818`). **Status FAIL** on the 390 px audit.                              |

**The new run is the current record.** Its one failure is real:

```
responsive-390-audit -> FAIL | 390x844 checkpoints not fully usable:
  preseason: heading=true nav=true action=false tableFailures=0 interactiveFailures=0
```

That independently corroborates the P0 I measured in M-145 (`#startSeasonBtn` top 963 in an 844 px viewport). It also shows the probe bugs are fixed in the new run: `regularSeasonGamesPlayed: 272` is measured via `seasonState.schedule.length`, not the old `window.seasonState?.gamesPlayed` that always returned null.

## (c) Smallest regeneration command set

**One command produces the current record** (already run, untracked):

```
node tests/openchamber-e2e.spec.js        # writes test-results/e2e-<ts>/result.json
```

The minimal set to make the stored evidence current:
1. `git add tests/openchamber-e2e.spec.js` — the script is **untracked** and has diverged from the canonical lane copy; version it before anything depends on it.
2. `node tests/openchamber-e2e.spec.js` — regenerate `result.json`.
3. Replace the stored record at `_agents/moc/evidence/e2e-2026-10-20T225702Z/result.json` with the new output **or** publish the new run as the current record and keep the old one as `SUPERSEDED` (the pattern MOC already uses).
4. Update the hash pointers in `_agents/moc/notes/{W2,W3,W5,pr3-reconciliation-comment}.md` and `result.v2.proposed.json` to the new result hash.

**Regenerating does not make the suite green.** The new run is **FAIL** on the 390 px P0 — regeneration makes the record _honest_ (FAIL on a real, reproduced defect) rather than _wrong_ (SKIP on a proxy).

## What I verified / did not check

**VERIFIED:** the inventory above (`git grep` on HEAD `4558e81`); the stored result's SKIP text and null metrics; the new run's 13 steps, `week-1-display: PASS`, populated `seasonMetrics`, and its FAIL reason; that the build renders "Week 1 of 17" (M-302).

**NOT checked:** I did not run a full regeneration (per the assignment); I did not open the two other untracked `test-results/` directories (`e2e-1792543053161/`, `tests-openchamber-e2e-v2-…`) beyond listing them; I did not compare the new run's `trace-1792543107751.zip`; I did not verify the new run's `run` block (it is `{}` — empty, which is worth a look but is outside this inventory).

**Files written:** `_agents/longcat/notes/L1-pre-locator-artifact-inventory.md` only.
