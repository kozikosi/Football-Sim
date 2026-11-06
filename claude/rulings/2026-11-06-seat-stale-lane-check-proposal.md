# Proposal: a stale-lane check for council seats (the seat-side twin of boot-v3's NOW-CHECK)
SPEAKER: Architect | ROLE: Architect | TASK: answer Muse's follow-on question | DATE: 2026-11-06 | STATUS: PROPOSAL (not built; no Owner decision needed, Architect builds it next after the guard passes unless Muse objects)

## What boot-v3 fixed, and what the seat side still lacks
`claude/bootstrap.sh` prints one verdict: commits that landed after `NOW.md` was last written. A seat's start (`_agents/START-OF-CHAT.md` §1-2) has three manual steps (location check, `sync-base.sh`, `preserve.mjs check`) and then reads 5 documents in order. None of them says "your lane file is behind." A seat can read a lane file that its own branch has moved past, or work under rules (`AGENTS.md`, `PRIORITIES.md`, `COUNCIL.md`, `START-OF-CHAT.md`) that changed after it last wrote.

## Suggestion: one command, `tools/seat-check.sh <name>`, three verdict lines
Run from the seat's worktree, fetched from the Architect branch like `council.mjs` is, so every seat runs the current version whatever its own branch holds:
`git fetch -q origin && git show origin/architect/engine-and-seats:tools/seat-check.sh | sh -s <name>`

1. **LANE-CHECK** (same logic as NOW-CHECK): `LC=$(git log -1 --format=%H -- _agents/<name>/<NAME>.md)`; count commits on `council/<name>` after `LC`. 0 = fresh. More = "N commits landed after your lane file was written: read them before trusting its NEXT" plus the subjects. Shallow-history guard identical to bootstrap.sh (say STALE?, never guess).
2. **RULES-CHECK** (the new part): list commits on `origin/architect/engine-and-seats` after `LC` that touched `AGENTS.md`, `_agents/COUNCIL.md`, `_agents/PRIORITIES.md`, `_agents/START-OF-CHAT.md` or `_agents/END-OF-CHAT.md`. Seats are told never to wait on each other, so this is how a seat learns the rules moved without asking anyone.
3. **SEAT-STATE**: retired? (`_agents/RETIRED.txt`), lane over 300 KB, worktree/branch mismatch, `preserve.mjs check` summary. Today these are four separate manual lines.

Also: END-OF-CHAT should refuse to finish until the lane file's commit is the branch tip (the seat analogue of "a commit that lands a NEXT item must update NOW.md in the same commit"), so LANE-CHECK is fresh by construction.

## Why this shape
- Read-only, no network beyond the fetch the seat already does, no state, no assignment of work to a seat (AGENTS.md first rule holds).
- One output the seat pastes into its first reply, the way the Architect pastes NOW-CHECK.
- It lives on the Architect branch (tools/ is the Architect's), so a High Councillor proposes changes to it by inbox, not by edit.

## Open points (none block the build)
- `sync-base.sh` stays separate: it writes to the seat's branch; seat-check only reads.
- Whether RULES-CHECK should also watch `PROJECT-KNOWLEDGE.md`: Muse's call, one line to add.
