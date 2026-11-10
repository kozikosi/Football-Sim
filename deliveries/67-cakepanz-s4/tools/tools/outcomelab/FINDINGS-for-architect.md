# Outcome Lab v0 — findings for the Architect (from `model-report-2026-11-04.md`)

**From:** Z.ai (executor seat) · **To:** Architect (engine/contracts lane) · **Date:** 2026-11-05
**Rule kept:** this tool never touched `src/`. Every number below came from calling the public
engine API exactly the way `test/nfl/season.test.ts` calls it. Rulings wanted on two items.

## What came back clean (no action needed)

| Invariant | Mode A (drafted league) | Mode B (draft per seed) | Mode C (test synthetic) |
|---|---|---|---|
| Zero-sum (wins = losses) | EXACT (54,052 = 54,052) | EXACT | EXACT |
| Mean wins/team (tie-adjusted 8.5 − ties/32) | PASS | PASS | PASS |
| PPG 22.8 ± 0.7 [R] | 22.86 PASS | 22.87 PASS | 22.87 PASS |
| Determinism (same seed → same table + champion) | PASS | PASS | PASS |

Note for the invariant spec: "mean wins per team = 8.5 exactly" is unreachable whenever ties
exist — each tied game removes one win from the 272. Suggested precise form:
`mean wins = 8.5 − tiedGames/32` (software-invariant, 0 tolerance). Costing this nothing —
the sweep checks exactly that and it holds to <5e-4.

## Finding 1 — home win rate sits above the stated band in EVERY population (ruling wanted)

| Population | Home win rate | 95% CI | Band [R] 53.2% ± 1.5pp |
|---|---|---|---|
| A: drafted Madden league | 55.3% | ±0.4% | FAIL (+0.6pp above upper edge) |
| B: fresh draft per seed | 55.4% | ±0.9% | FAIL |
| C: synthetic (test file) | 54.7% | ±0.4% | at the edge, CI pushes outside |

All three ran the engine default `HOME_FIELD = 1.7` pts (`specs.ts:74`); `simulateSeason` and
the week-stepped `seasonrun` path use the same default, so the two entry points agree.
Possible resolutions (Architect's call): (a) the band was measured on a different constant or
population; (b) the band is a misquote of the real-NFL anchor; (c) 1.7 pts should re-tune down.
Note the real-NFL anchor itself is era-dependent (roughly 55–57% pre-2020, ~51–53% in the
empty-stadium and post years) — if the target is nflverse 2020–2024 (the snapshots already in
`_agents/data/`), the band center itself may move. Happy to run a constant-sensitivity sweep
(1.0 / 1.3 / 1.7) to hand you the response curve if useful — say the word, engine untouched.

## Finding 2 — the parity band is a property of the POPULATION, not just the engine (ruling wanted)

| Population | Mean SD of team wins | Band [R] 3.0–3.5 |
|---|---|---|
| A: drafted Madden league (what players actually play) | 2.20 | FAIL |
| B: fresh draft per seed | 2.17 | FAIL |
| C: synthetic OVR 80 ± 2.5 (test population) | 3.10 | PASS |

Reading: the CPU draft compresses talent (every team leaves with viable lineups), so
post-draft seasons are more uniform than real NFL. The stated band reproduces only on the
wider-spread synthetic population. This is a **design** question, not a bug report: is
post-draft parity compression acceptable (arguably realistic — real drafts even talent too),
or should the shipped game show real-NFL win spread? If the latter, the levers live in the
draft/pool layer, and Owner taste should decide before any tuning touches goldens.

Corroborating population effects worth one look each (report-only, no bands yet):
- Seasons containing a 15+-win team: **60%** in Mode C vs **8.5%** in Mode A.
- Seasons containing a ≤2-win team: **63%** vs **8.0%**.
- Champions: Mode C produced 32 different champions in 200 seasons (extremely flat);
  Mode A had a 12% title share for one team (Tennessee). The Mode-A tail may deserve a
  "no dynasty" band once populations settle.

## What this harness is for, going forward

1. **CI nightly distribution report** (your Q7 §prevent-degradation): this file regenerates
   in ~5 min on one core; `sweep.ts` exits 0 regardless of band outcomes today — once you
   rule on the bands, flipping it to exit-nonzero-on-FAIL is a 3-line change.
2. **Model-change PRs**: attach before/after `sweep-results.json`.
3. **nflverse calibration v1**: re-derive the bands from `_agents/data/nflverse-*` (the
   standings CSV and margins JSON are already in-repo) so the bands stop being [R] quotes.

## Housekeeping

- Tool location: `colors/tools/outcomelab/sweep.ts` (+ generated report + `sweep-results.json`).
  One boundary note: it imports `test/nfl/fixture.ts` (the shared fixture) to avoid
  duplicating league construction — if you'd rather tools not import from `test/`, the
  15-line fixture builder can be copied instead; your call.
- Runtime: 200 + 40 + 200 seasons ≈ 5 min single-process; scales linearly.
