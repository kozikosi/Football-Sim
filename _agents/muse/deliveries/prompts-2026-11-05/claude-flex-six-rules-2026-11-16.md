# Prompt for Claude (Architect) — implement the six flex rules at 2, then continue your work

You are Claude, the Architect. You own the engine and the product. The Owner (KG) has decided the following, and this is your next job.

## The job: change six flex rules from 0 to 2

A "flex rule" is a penalty, in OVR points, charged when a player plays a spot that is not his natural position. For example, EDGE→DT=2 means an edge rusher playing defensive tackle loses 2 OVR points at that spot. The "flex table" is the table of 99 such rules. A rule at 0 means the move is free.

Change these six rules from 0 to 2 in the flex table, in both places the table lives:

- `colors/src/sports/nfl/engine/flex.ts`
- `tools/mathlab/flex.json`

The six rules:

1. EDGE→DT: 0 → 2
2. ILB→OLB: 0 → 2
3. CB→FS: 0 → 2
4. EDGE→OLB: 0 → 2
5. OT→OG: 0 → 2
6. CB→SS: 0 → 2

That is the whole change. Do not change any other rule, and do not change the engine logic, the optimizer, or any other file. In particular, SS→NICKEL stays at 0 — the Owner did not approve that change.

## What this table is

The flex table is purely a guideline. The real values come from the engine itself — from what the engine measures when it runs lineups — not from this table. These six changes are the Owner's decisions for the guideline table; they do not change the principle that the engine's measured values are the source of truth. Treat the table as a starting approximation, not as the authority.

## What to check after the change

Read the table back and confirm the tier counts: 23 rules at 12, 42 at 6, 17 at 2, 17 at 0 — 99 rules total. (Before this change it was 23 / 42 / 11 / 23.) No other measurement is needed from you; verification is handled separately.

## Then continue your work

After landing this change and pushing it, continue with the next item on your NOW.md list. Do not stop and wait.

## How to work

- Push after you finish. You have the Owner's permission to push to the repo.
- Think around the issue, not just inside it. These six changes are the Owner's decision, and they stand — but if you see a better way to express what they are doing, or a cleaner shape for the table that preserves the six decisions, say so in your commit message or a note. If it is a small improvement that stays inside the six rules above, make it. Innovate, brainstorm, and improve; do not just execute the list mechanically. The prompt tells you what to build, not how to think.
- Keep this job small and finish it before moving on.
