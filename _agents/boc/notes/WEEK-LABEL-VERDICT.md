# Week-Label Verdict — BOC (DS assignment) — 20 Oct 2026

Artifact: `NFL Draft Simulator merged.html`, 657,486 B, SHA-256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` (V22 candidate).

## Q1 — 17 rounds (no byes) or 18 weeks with byes? (VERIFIED)

- buildFullSchedule (l.1059) builds `DIV_WEEK_NUMBERS = [2,5,8,11,14,17]` (6 division weeks) and `NONDIV_WEEK_NUMBERS` = weeks 1,3,4,6,7,9,10,12,13,15,16 (11 weeks) — `for(let w=1; w<=17; w++)` (l.1065).
- Every round is a full matching of all 32 teams (16 games/week); no bye is generated. There is no bye-week logic in the schedule builder.
- seasonState initialized with `schedule: buildFullSchedule(names), currentWeek: 1` (l.3457).
  VERDICT: 17 rounds of games, no byes. (17 × 16 = 272 games.)

## Q2 — Is "Week ${week} of 17" correct for the engine, misleading vs real NFL, or wrong? (VERIFIED)

- The engine runs 17 weeks (l.1059–1070); `Week ${week} of 17` (l.3891) matches the engine's week count exactly.
- Real NFL = 18 weeks with one bye per team. The label implies 17 total weeks, which matches the engine but not the real NFL.
- VERDICT: **LABEL CORRECT BUT MISLEADING** — correct for what the engine does (17 weeks, no byes), misleading relative to the real NFL (18 weeks with a bye). Not wrong for the engine.

## Q3 — seasonState.schedule.length on a live run, matches 272? (INFERRED)

- Not executed by BOC. Code path: buildFullSchedule (l.1059) returns games from 17 weeks × 16 games = 272. No code path filters or truncates the schedule before it is stored (l.3457: `schedule: buildFullSchedule(names)`).
- INFERRED: schedule.length = 272. Not independently run (BOC did not execute the browser). MOC/LongCat runs recorded 272 games but those are REPORTED, not BOC-verified.

## Q4 — Other user-visible strings repeating the conflation (VERIFIED)

- Only other "Week 17" reference: l.4486 — `"their season ended after Week 17."` (playoff-elimination recap).
- No "Week 18", no "final week", no "18 weeks" string found in merged.html.
- "bye" references (l.3975, 4486, 5336, 5514, 5912, 5941, 6114, 6123, 6504) all refer to playoff byes, not regular-season byes.

## Verdict

**LABEL CORRECT BUT MISLEADING** — the engine runs 17 weeks with no byes (272 games), so "Week X of 17" is accurate for the engine; it is misleading relative to the real NFL (18 weeks, one bye per team). Not wrong for the engine. Architect decides whether to change the label or the model.

Evidence: l.1059–1070 (buildFullSchedule), l.3457 (seasonState init), l.3891 (Week label), l.4486 (Week 17 recap). No product edits.
