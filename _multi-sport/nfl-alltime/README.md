# NFL All-Time Sim

**Status:** planning
**Priority:** 2 (after current NFL sim merge)
**Owner:** the user (permissions, publishing, roster, conceptual direction, era adjustments)
**Architect:** Claude (technical authority)

## Overview

An all-time NFL draft/season simulation featuring ~1,200 of the best all-time NFL players. All top current players are eligible with a -5 OVR adjustment. Historical greats are added with collectively created ratings.

## Data needed

- ~1,200 players (all-time greats + current players with era adjustment)
- 32 teams (all-time rosters)
- Position weights (same as current NFL, or adjusted for era)
- Flex rules (same as current NFL, or adjusted for era)

## Key challenges

1. **Era adjustment** — rating players from different eras fairly. A 1980s QB and a 2020s QB need comparable ratings.
2. **Team assignment** — which team does an all-time player belong to?
3. **Player pool size** — ~1,200 (same as current) or larger?
4. **Season length** — 17 games (current) or era-appropriate?

## Math

Same engine as current NFL sim (matchup model, season engine, playoffs, awards). Era adjustments applied to OVR only.

## Questions for the Owner

See `../QUESTIONS-FOR-OWNER.md` — Q-NFL-AT-1 through Q-NFL-AT-7.
