# Superseded run history — preserved, not overwritten

**Author.** MOC · 20 Oct 2026 · ID block S-2500–2599
**Purpose.** The E2E result for this suite has been written more than once. This file preserves the
**earlier** account as history, next to the **current** result, so that nothing is silently overwritten.
It is a sidecar: the run's own `result.json` is **not** edited by me.

---

## A. The current result (supersedes nothing on disk)

| field          | value                                                                                                             |
| -------------- | ----------------------------------------------------------------------------------------------------------------- |
| run directory  | `test-results/e2e-1792537022298/`                                                                                 |
| `runAtUtc`     | `2026-10-20T22:57:02.298Z`                                                                                        |
| status         | **PARTIAL** (10 PASS, 1 SKIP — `week-1-display`)                                                                  |
| script         | `test-script.spec.js` — sha256 `ee9aaa44d00557d6ebca13dc0eb9f487fda2c2ce5e42578ae5cc8b392d3c3757`                 |
| schema         | `OPENCHAMBER-E2E-RESULT.schema.json` — sha256 `3f2e07cfc1db9b61b4c21dba37e0d360c4fedfbc0677ba2f51b02b25976de879`  |
| result.json    | sha256 `d64a5f9bb3ab6e7b0b97277beb3afdf8858950be1c3b8434a5e2d46426288396`                                         |
| artifact       | `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` (657,486 B) @ `merge/v20-donor` `ff8c05ae0ef8` |
| trace          | `trace-1792537070181.zip`, 65,863,244 B                                                                           |
| preserved copy | `_agents/moc/evidence/e2e-2026-10-20T225702Z/` (result.json + schema + script)                                    |

## B. The earlier run — SUPERSEDED, artifacts no longer on disk

The only surviving record of the earlier execution is the Owner's PR comment of **2026-10-20T22:45:33Z**
(PR #3, `https://github.com/kozikosi/Football-Sim/pull/3#issuecomment-6303461940`). Reproduced **verbatim**:

> Review of Lightning's run summary: the OpenChamber execution appears to have completed, and the evidence described supports a **PARTIAL** result for the V20 merge candidate. It does not complete the protocol's full draft → season → playoffs → 100-season path: the report says the playoffs control is absent and the 100-season run was skipped.
>
> The PR currently contains only the protocol and result schema; the run's result JSON and screenshot/trace evidence are not present here yet. Please attach the actual `result.json` and the screenshot set (or durable artifact links) before treating this as shared verification evidence. A 32 MB trace should be linked from artifact storage rather than committed directly.
>
> Please reconcile two count mismatches in the result summary before attaching it:
> - "7 steps (5 PASS, 2 SKIP)" conflicts with the three skipped checks listed (week-1 validation, playoffs, 100-season).
> - The JSON summary says four screenshots, while the artifact list names nine screenshot files.
>
> Keep the build hash and `merge/v20-donor` ref in the result. Until the missing evidence is available and the counts are consistent, this is a useful partial smoke run, not a completed acceptance run or PASS.

**Status of the earlier run's artifacts:** none are on disk. A filesystem sweep found exactly one
`result.json` anywhere (`test-results/e2e-1792537022298/result.json`), one trace (65,863,244 B), and no
other screenshot set. The only other run directory, `test-results/e2e-1792537022083/`, is **215 ms
before** the current one (22:57:02.083Z vs 22:57:02.298Z) and is **empty** apart from an empty `trace/`
directory — it is the _first attempt of the same run_, not a separate execution.

**Therefore:** the earlier run's own evidence cannot be re-measured; only its summary survives, and it
survives here and in the PR discussion. It is superseded by the current run **for the counts below** —
not deleted, and not rewritten.

## C. The count trail, as reported by each account

| account                                          | steps                    | screenshots                  | 100-season             | playoffs control              | trace            |
| ------------------------------------------------ | ------------------------ | ---------------------------- | ---------------------- | ----------------------------- | ---------------- |
| Lightning's own summary (quoted above)           | 7 (5 PASS, 2 SKIP)       | 4 claimed / 9 named          | skipped                | absent                        | 32 MB            |
| Ultra's description of that run                  | 10                       | 20, "no light/dark captures" | "both runs skipped it" | —                             | —                |
| The current run's **own note 5** (`result.json`) | 11                       | **24**                       | PASS                   | clicked, champion visible     | 65,863,244 B     |
| **The files, measured**                          | **11 (10 PASS, 1 SKIP)** | **26**                       | **PASS**               | **clicked, champion visible** | **65,863,244 B** |

**Measured truth for the current run** (`_agents/moc/evidence/trace-playoffs-forensics.txt`,
`_agents/moc/evidence/schema-validation.txt`):
- steps: the `steps` array holds **11** entries — 10 `PASS`, 1 `SKIP` (`week-1-display`).
- screenshots: the `screenshots` array holds **26** entries, and **26** PNG files exist on disk, with
  no entry missing a file and no file missing an entry. The array breaks down as **20 viewport-check
  screenshots + 6 light/dark captures** (`startup-{light,dark}`, `draft-results-{light,dark}`,
  `100-season-report-{light,dark}`). The run's own note 5 says "24 screenshots" — that is the run
  under-counting its own light/dark pair by two; it is a defect in the run's self-report, not in the
  evidence. **I have not edited the run's `result.json`; the correction is recorded here and in the PR.**
- 100-season report: the `sim-100-seasons` step is `PASS`; the report locator `isVisible` returned
  `true` at 22:57:48.448Z, and the "What actually drove winning" query count was **2**.
- playoffs control: `#simPlayoffsBtn` was clicked at 22:57:28.850Z with **no error**, and the
  champion-banner `isVisible` returned **true** at 22:57:34.083Z.
- light/dark: **6** `emulateMedia` calls are in the trace, and **6** light/dark PNGs exist — so the
  claim "no light/dark captures" does not hold for this run.
