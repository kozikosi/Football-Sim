# PROMPT — for Z.ai: run the "etc." exercise and report the engine's hidden constants
**From:** INKLING (council seat) · **Date:** 2026-11-14 · **For:** Z.ai (Executor)
**Delivery:** one file in the handover folder + MANIFEST; courier per the protocol (a seat pushes after `verify-delivery` passes).

## 0 · Context you need (do not re-derive)
The Owner's clause, verbatim, from the 2026-11-11 ruling note (`council/muse:_agents/owner-notes/2026-11-11-fluctuating-dial-and-dynamic-engine-verbatim.txt`): *"Every structure of the engine should/could fluctuate by personnel, situations, rivalry, playoffs, opponent's structure, key players, aggressiveness, dominant groups, etc."*
The engine as it ships today lives at `colors/src/sports/nfl/engine/` @ `03640133` (read-only). Known sites so far (INKLING, this sitting): `EMERGENCY_PENALTY = 8` (`flex.ts:34`), `PERS` package dict (`specs.ts:47`), `BASE_PTS = 21.5` / `HOME_FIELD = 1.7` / `PTS_NOISE = 6.0` (`specs.ts:74`), static margin pmf `SOURCE_PCT`/`OT_RATE_PCT = 5.88` (`margin.ts`, pinned to one 10,880-game simulation snapshot), `softCap` (`matchup.ts:29`), `kicking.ts` `KEY_KICKER_MIN = 80` (the one in-season rating mechanism live), `returner.ts` static weights, `PERS`-driven regime weights, plan constants (`PLAN_K`), kicking `SCALE = 24`/`MAX_DROP = 16`/`MAX_GAIN = 10`, `PT_RUSH/PT_PASS/PT_SACK/PT_TO` channel weights.
Record whether the Q4 automatics exist anywhere in this source set (they do not; they are your D.1 design).

## 1 · What to do (ONE deliverable)
A table, one row per clause of the Owner's sentence plus the "etc." tail you find yourself, columns: `clause | status today (constant / function / nothing) | file:line | measurable? | null case | display class`. Then one paragraph: the single "etc." candidate nobody has filed that is cheapest to measure, with the four parts (data file · null case · held-out rule · display class), and say what would kill it.

## 2 · What NOT to do
- Do not propose injuries (ruled out, every sport), per-player clutch metrics (ruled out), flex-price fluctuation (rejected this wave), calibration-target fluctuation (static), draft-slot-value fluctuation (MOOT).
- Do not touch `draft.ts`, `lineup.ts`, `slots.ts`, `value.ts` (Claude's until P-318 lands). Read-only, always.
- Do not re-derive what INKLING already filed (see §0); re-do a line only if you doubt it, and say so.
- No implementation. This is a grep-and-report job.

## 3 · How to verify (the receipt)
`grep -n` commands for every row's `file:line`, run by any seat from `03640133`; an independent seat spot-checks 10 of your file:line cites and expects 10/10 correct. Passing = 0 wrong line refs, every clause labelled, one-paragraph etc. candidate with the four parts.

## 4 · How to deliver
Single file `zai-etc-exercise-2026-11-14.md` + MANIFEST (2-field, `git ls-files` list) in the handover folder; courier protocol as usual.

## 5 · Labels
VERIFIED / REPORTED / INFERRED / UNKNOWN; wrong-line-count > 0 blocks the delivery.
