# Owner Q4 — minimal safety checks for a beta

SPEAKER: DS | ROLE: council reviewer (advisory) | TASK: A4 · minimal safety checks, assigned by MOC
DATE: 2026-10-21T01:25Z

Assigned by MOC (S-2500–2599) as Owner question 4: _"What minimal safety checks are most valuable for
this beta project without making E2E completion a gate to all further work?"_

Method: rather than reasoning from the protocol's clause list, I judged each assertion by one question —
**has it ever failed on a real defect, or only ever passed?** An assertion that has never fired is
candidate ceremony. Two fires are documented this week, and both matter.

Artifact under discussion: `NFL Draft Simulator merged.html`, 657,486 B, SHA-256 `40233d6b…`,
`merge/v20-donor` @ `ff8c05ae`.

---

## 1. What the beta actually needs to catch

The Owner's rule: tests are a safety net for **total breakdowns, null results and fringe cases missed
during ordinary play**, and a PASS is **not** product acceptance. That defines four jobs and nothing
else:

| Job             | Example                                                                          | Would the Owner hit it unassisted?          |
| --------------- | -------------------------------------------------------------------------------- | ------------------------------------------- |
| Total breakdown | file will not load, throws on click                                              | yes, immediately                            |
| Null result     | draft completes but the season has no games; bracket empty; report never renders | **no** — looks fine until you dig           |
| Fringe case     | control below the fold at 390 px; a CSS regression on one tab only               | **no** — desktop play hides it              |
| Wrong artifact  | evidence claims hash X, run used hash Y                                          | **no** — and it invalidates everything else |

Note what is _not_ on that list: clause completeness, per-tab pixel audits, screenshot counts. Those
serve the verifier's confidence, not the beta's safety.

---

## 2. The check set, prioritized

| #   | Check                                                                                                              | Catches                                                                               | Cost             | False-positive risk                          | Block or inform                        |
| --- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- | ---------------- | -------------------------------------------- | -------------------------------------- |
| 1   | **Artifact hash gate** — sha256 of the file actually loaded equals the hash the evidence claims                    | wrong artifact; tests a stale build                                                   | trivial (1 line) | none                                         | **BLOCK**                              |
| 2   | **Load + zero console/page errors**                                                                                | total breakdown; script-level regressions                                             | trivial          | low (browser noise, pin the browser version) | **BLOCK**                              |
| 3   | **Draft reaches 832 picks** (`draftSim.pos === 832` = 32 × 26)                                                     | null result: a draft that stalls or silently ends early                               | low              | none                                         | **BLOCK**                              |
| 4   | **`seasonState.schedule.length === 272`** after the season starts                                                  | null result: season starts with no or partial schedule                                | low              | none                                         | **BLOCK**                              |
| 5   | **100-season report actually renders** — `/100-Season Report/` present, and _not_ left on "Simulating 100 seasons" | the v20 stall failure mode; engine throws mid-render                                  | ~15 s            | medium (timeout tuning)                      | **BLOCK** (on stall only, not on slow) |
| 6   | **No horizontal overflow at 390 px** (`documentScrollWidth > innerWidth`)                                          | phone layout breaking the page                                                        | low              | low                                          | **INFORM** — report it, keep building  |
| 7   | **All-tab 390 px scan** (not just the Players tab)                                                                 | a CSS regression confined to one view — Team Rankings passed both gates this way once | medium           | medium                                       | **INFORM**                             |
| 8   | **Primary action in-viewport at the phase under test**                                                             | CTA below the fold — the live `#startSeasonBtn` case                                  | low              | medium (which control counts as "primary")   | **INFORM**                             |
| 9   | Per-clause protocol completeness (8/8 390 px clauses, 24 viewport checks, screenshot inventories)                  | nothing the Owner would hit                                                           | high, per round  | n/a                                          | **CEREMONY** for beta                  |

Checks 1–5 are the whole safety net. They fit in one script, run in under a minute, and every one of
them has either fired already or guards a null result the Owner cannot see.

---

## 3. The null-result / total-breakdown tripwire (cheapest form)

One compound assertion, five fields, no screenshots:

```
hash matches  ∧  consoleErrors == 0  ∧  pageErrors == 0
              ∧  draftSim.pos == 832
              ∧  seasonState.schedule.length == 272
              ∧  /100-Season Report/ rendered  ∧  not stalled on /Simulating 100 seasons/
```

If that fails, the build is broken in a way the Owner would either hit immediately or fail to notice
until well into a playthrough. If it passes, nothing else needs to gate continuation — checks 6–8 run
and are reported, not enforced.

Field names verified against the live build this round: `draftSim` and `seasonState` are top-level
lexical bindings, **not** `window` properties — probe with `typeof draftSim !== 'undefined'`, or the
check reports a false null. There is no `gamesPlayed` field; `schedule.length` is the regular-season
count. `playoffRoundsCompleted` is unavailable and must stay `null` rather than be invented.

---

## 4. Which current 390 px clauses are worth keeping

Measured against the "has it ever fired?" test:

| Clause                                                                  | Verdict                       | Why                                                                                                                                      |
| ----------------------------------------------------------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| page overflow = 0                                                       | **keep, inform**              | fires on real CSS regressions                                                                                                            |
| clipped / covered / unscrollable controls                               | **keep, inform**              | fired on v20; cheap                                                                                                                      |
| all-tab scan at 390 px                                                  | **keep, inform**              | this is the one that caught the Team Rankings-only regression; an earlier version probing only the Players tab let it through both gates |
| heading in-viewport                                                     | **keep, inform** — but see §5 | never fired                                                                                                                              |
| primary action in-viewport                                              | **keep, inform** — but see §5 | **fired this week** on `#startSeasonBtn`                                                                                                 |
| 8/8 clause coverage, screenshot count, per-viewport matrix completeness | **ceremony for beta**         | measures the harness, not the build                                                                                                      |

The distinction that matters: all of these are worth _running_. None of them is worth _blocking on_,
because the Owner will see a phone-layout problem on the first phone playthrough, and a blocked build
that the Owner could still usefully play is a worse outcome than an imperfect build with a note.

---

## 5. One correction to the gate, verified

`tests/e2e-smoke.mjs` (468 lines, sha256 `3d2d95f1765be0c8…`) **computes** heading and primary-action
visibility in its probe (lines 125–138, via an `inVp()` helper) but its gate **does not assert either**:

```js
// tests/e2e-smoke.mjs:410
E_viewportUsable: probe.clippedCount === 0 &&
	probe.coveredCount === 0 &&
	(probe.unscrollable || []).length === 0;
```

Meanwhile `tests/openchamber-e2e-v2.spec.js` (669 lines, sha256 `f0f49e8c005fcac1…`) does assert it —
line 193 requires `primaryAction.fullyInside`, and line 639 reports `action=` per checkpoint. That
assertion is what produced this round's finding: at 390 × 844 in preseason, `#startSeasonBtn` sits at
`top=963.03, bottom=1007.03` against an 844 px viewport, with page overflow still 0 and no clipped or
covered control.

So the old gate would have **passed** a build the new one fails. Any claim that "all 390 px clauses are
implemented" in the older harness is narrowed by exactly this: implemented in the probe, unasserted in
the gate.

Consequence for the beta: do not treat the older gate's PASS as evidence for clause 390.3. It is a
reporting field there, nothing more.

---

## 6. The rule to write down

Proposed wording, so no one later reads a green run as acceptance:

> **A passing run is evidence about a build, not acceptance of it.** The beta acceptance signal is the
> Owner's own playthrough. Automated checks exist to catch total breakdowns, null results and fringe
> cases — they may block a _release claim_, never the _next round of work_. A run that fails an
> advisory check is reported with the failure attached, not suppressed and not escalated to a stop.

And the single blocking case, stated on its own so it is never traded away:

> **A hash mismatch blocks unconditionally.** If the artifact the evidence names and the artifact that
> ran are not the same bytes, the run reports nothing — not a partial pass, not a caveat.

---

## 7. What I did and did not do

- **Did:** read `tests/e2e-smoke.mjs` and `tests/openchamber-e2e-v2.spec.js` in the working tree; cite
  their hashes and the assertion lines above; reuse the measured numbers from my own v2 run
  (`test-results/e2e-1792543053379/result.json`, FAIL, 12 functional steps pass + the 390 px audit).
- **Did not:** re-run either suite for this note; modify `tests/` (GPT's and Claude's files); change any
  acceptance criterion; touch product code. This note proposes, it does not enact.
- **UNKNOWN:** whether the older harness's probe ordering (it probes after `tabPlayersBtn` rather than
  at preseason) would produce the same `primaryAction` element on every phase. Not measured this round.

Script changes implied here are proposed only. They are MOC's, GPT's and Claude's to adopt or reject.
