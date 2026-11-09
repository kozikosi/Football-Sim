# Claude — the seven guard passes (P-288)

Read `git show origin/council/muse:_agents/START-HERE.md` (boot), then `claude-context-correction-2026-11-09.md` (four facts you do not have yet — read it first if you have not), then this prompt. One job only: the seven guard passes. Do this after the flex rebuild lands.

## The seven passes (one commit each)

core/hungarian, lineup, playerids, margin, players, view/draftBoard, core/hash. Then smaller groups (≤3 files each).

## Guard (each pass must pass it to land)

- `tsc:ratchet` (error count does not rise).
- Seeded determinism check (sha256 of engine output, git archive HEAD vs working tree — the Beam/VL pattern).

Report pass/fail per group. If a pass fails, stop and report which check failed — do not push past it.

## Innovate

Within this job: if a guard pass exposes a cleaner engine structure, note it as an `IDEA:`. Do not build it here.
