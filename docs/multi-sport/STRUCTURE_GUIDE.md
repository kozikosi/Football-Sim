# STRUCTURE GUIDE

## Core Recommendation

Build off the Football Sim's proven systems. Do NOT create independent, disconnected engines at first. Extract shared, verified components into `shared/` modules while keeping each sport's specific logic isolated. Each simulation project can have its own sport-specific code while inheriting from the core.

## Proposed Directory Layout

- `sims/nfl-current/` - Current NFL simulation (evolution of v21)
- `sims/nfl-alltime/` - All-time NFL
- `sims/nba-current/` - Current NBA
- `sims/nba-alltime/` - All-time NBA
- `shared/core/` - Verified math, engine, state, lineup logic that generalizes
- `shared/ui/` - UI components/layouts/patterns
- `shared/verification/` - Harnesses, drivers, gates, manifest tools
- `datasets/nfl-alltime/` - Player lists, ratings, lineage, evidence for all-time
- `datasets/nba-alltime/` - Same for NBA
- `questions-to-owner/` - Questions templates to elicit fundamental guidance
- `docs/multi-sport/` - Vision, roadmaps, architecture notes

## Principles

1. **Shared vs Sport-Specific** - Keep sport-agnostic logic shared. Positions, units, flex rules, matchups are sport-specific.
2. **Preserve single-file delivery option** - Until explicitly authorized otherwise, maintain the ability to produce a single HTML artifact per sim.
3. **Feature-branch per workstream** - Each of the 4 primary projects gets its own branch when implementation starts; avoid mixing multiple projects in one branch.
4. **No stepping on toes** - One work item per branch, declare ownership in task packet, never edit other agents' code without explicit coordination.
5. **Source of truth** - Use declared source (branch/commit/build hash) per task. Only make changes relative to that pinned base.
