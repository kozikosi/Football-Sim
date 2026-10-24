# V21 manual playtest protocol + the statistics that explain Wins

**SPEAKER: LongCat | ROLE: Council reviewer (S-2400–2499) | TASK: A10 — V21 playtest protocol + explain-Wins stats (MOC assignment) | DATE: 2026-10-21 (UTC)**

**Build under test:** `merged.html`, sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` (657,486 B), `merge/v20-donor @ ff8c05ae0ef8`. Called **the merge candidate** throughout, never "V21". Read-only; no product edit.

**Owner's words this serves:** _"I will personally play every simulation and decide whether it works. Automated tests are a safety net for total breakdowns, null results, and fringe cases I might miss during ordinary play. Passing tests is not critical as a prerequisite for continuing development, and a test PASS is not product acceptance. Report partial and failed runs honestly, preserve useful evidence, and continue independent work."_

---

## Part A — the manual playtest protocol

### A1. Before you start (30 seconds)

1. Open `merged.html` in a browser at **1280×900**.
2. Note the build hash — it is in the page footer or record `40233d6b…` alongside the run.
3. Pick a team and **remember which one** — every later comparison depends on it.

### A2. The first run — exact clicks

| Step | Click                         | What you should see                      | Record                                                |
| ---- | ----------------------------- | ---------------------------------------- | ----------------------------------------------------- |
| 1    | (none)                        | the landing view; **Draft** tab active   | title + first screen                                  |
| 2    | **Start Draft**               | the live draft board                     | —                                                     |
| 3    | **Instant** speed             | the board fills quickly                  | —                                                     |
| 4    | **Sim to End**                | "Draft Complete" + your roster           | **draft picks** (should be 832 total across 32 teams) |
| 5    | **Season** (results tab)      | the season landing panel                 | —                                                     |
| 6    | **Start Season**              | the preseason setup                      | —                                                     |
| 7    | **Begin Season**              | the regular-season view                  | **"Week 1 of 17" visible?**                           |
| 8    | **Sim Season**                | the regular-season review                | **games played** (expect 272 league-wide)             |
| 9    | **Sim Playoffs**              | the champion banner                      | **champion name**                                     |
| 10   | **Run 100-season simulation** | the "What actually drove winning" report | **report renders?** + how long it took                |
| 11   | the report's **back control** | returns to the season view               | did it return?                                        |

### A3. What to record at each step

- The **screenshot** (one per step is plenty; name it `<date>-<step>.png`).
- The **text you expected vs the text you saw** — especially step 7 (the week indicator) and step 10 (the report's driven-winning section).
- The **build hash**, so the run is pinned.
- Anything that **surprised** you, even if it was not an error.

### A4. Verdicts

| Verdict      | Means                                                                                  |
| ------------ | -------------------------------------------------------------------------------------- |
| **Works**    | the step produced what it should, and the next step was reachable without a workaround |
| **Degraded** | it worked but something was wrong, slow, confusing, or ugly — write down _what_        |
| **Broken**   | it did not work, or the flow stalled, or an error appeared                             |

A run is **"works"** only if every step is at least _degraded-or-better_ and the flow reached step 11.

### A5. Where the evidence lands

- Screenshots: `<your-lane>/playtest/<date>-<team>/`
- A one-line run record per run: `<date> · <build hash> · <team> · verdict · one-line note`
- File naming carries the hash, e.g. `playtest-40233d6b-<date>.md` — so a run can never be confused with another build.

### A6. Comparing runs — did V21 improve?

Compare the **same team, same steps, next build**:
- Which steps moved from _broken_ → _degraded_ → _works_?
- Did the **week indicator**, the **272 game count**, or the **report** change behaviour?
- Did anything that worked **regress**?

Keep the old run's record and the new one side by side; do not overwrite the old one.

### A7. Two rules, in the Owner's own words

> **A test PASS is not product acceptance.** A green automated run means the build did not break; it does not mean the game is good. Only your play decides that.

> **Report partial and failed runs honestly, preserve useful evidence, and continue independent work.** A broken run is a result, not a failure of the process — write down what broke, keep the evidence, and carry on.

---

## Part B — the statistics that explain Wins

**Already delivered in full by BOC (M-136, `_agents/boc/notes/v21-stats-that-explain-wins.md`)** — I reference it rather than duplicate it. Its findings: the build already computes the nine `teamRatings` units (merged.html l.1988–2000) and the 100-season report's three explain-Wins columns (l.6043–6127), but the season view shows neither; `teamAdvancedHTML` (turnover margin, TOP, rushing share — l.4281–4316) and `advancedStatsHTML` (sack attribution — l.4317–4355) are buried in collapsed `<details>`.

**My addition — the decision the Owner must make, stated as options (the Owner's rule: "Define the metrics and decide which ones matter to Wins before publishing them"):**

| #   | Decision                                                           | Options                                                       | Recommended default                                                                                 | Cost of being wrong                               |
| --- | ------------------------------------------------------------------ | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| B1  | Is the unit-ratings panel visible by default in the season view?   | visible / collapsed / behind a tab                            | **visible**                                                                                         | clutter, reversible later                         |
| B2  | Is the explain-Wins report reachable from the regular season view? | link from season view / keep in the 100-season report only    | **keep as-is for now**                                                                              | the Owner must run 100 seasons to see the drivers |
| B3  | Which metrics are defined first — football or basketball?          | football first (V21 priority) / basketball first (priority 3) | **basketball first**, because the Owner named TS+ there and the football report already has a shape | re-work if the Owner wanted football first        |

**Coupling note (the Owner's rule: "Report coupling and integration assumptions, not just isolated diffs"):** the unit-ratings panel can reuse `teamRatings()` directly — it is already called per-team inside `matchupMathInner` (l.3770), so there is **no new data path**. Promoting turnover margin and sack attribution out of the collapsed `<details>` is a **presentation change only**. The metrics in BOC's (d) list (per-game win probability, WAR aggregation, game-plan causal value, pace-adjusted metrics) **require new maths** and are the Architect's call, not this proposal's.

**Labels:** the line numbers and the "already computed / not visible" split are **VERIFIED** (read from `40233d6b…`). B1–B3 are **INFERRED** recommendations. **UNKNOWN:** whether the Owner wants the panel visible — that is a decision.

**Files edited:** none. Wrote `_agents/longcat/notes/v21-playtest-protocol.md` only.
