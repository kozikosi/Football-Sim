# Claude — flex corrections: 8 rules to 6 (Owner decision)

Read `git show origin/council/muse:_agents/START-HERE.md` (boot), then `claude-context-correction-2026-11-09.md` (read it first), then this prompt. One job only: apply the Owner's 8 flex corrections below. No testing from you.

## The corrections (Owner, 2026-11-09)

These 8 rules move to **6**. They are Owner overrides, not D-derived — do NOT recompute D, do NOT touch SLOTS[].weight.

- EDGE>ILB, EDGE>OG, EDGE>OT, EDGE>RB, EDGE>NICKEL: 0 → 6 (an edge rusher sliding to inside backer, guard, tackle, running back, or nickel is a real jump, not free).
- DT>C: 0 → 6 (a defensive tackle cannot snap the ball).
- DT>OG: 2 → 6 (matches the reverse, OG>DT at 6; a DT does not know pass protection).
- EDGE>C: 2 → 6 (an edge rusher cannot snap; consistent with the EDGE cluster above).

Everything else in the table stays exactly as built in `35ce4e98`.

## Job

Update `tools/mathlab/flex.json` and `colors/src/sports/nfl/engine/flex.ts` with the 8 corrections. Re-derive `tools/mathlab/flex-dl5.json` and confirm whether it changes (it should not — DL5 reads role→DT and role→EDGE, which are untouched). Re-pin the tests: tier counts become **19 at 12, 40 at 6, 14 at 2, 24 at 0** (still 97 rules); the 3-4 base total becomes **3600** (was 1800 — the spare EDGE at MIKE now costs 6 × 300, plus the DT>EDGE −6 on DE2 at 6 × 300). Report the new tier counts and confirm the test suite passes.

## Innovate

Within this job: if a correction opens a better way to express a flex rule, note it as an `IDEA:`. Do not build it here.
