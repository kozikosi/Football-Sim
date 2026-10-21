# NBA Current Sim

**Status:** planning
**Priority:** 3 (after NFL all-time)
**Owner:** the user (permissions, publishing, roster, conceptual direction, NBA2K ratings)
**Architect:** Claude (technical authority)

## Overview

An NBA draft/season simulation featuring ~450 current NBA players. Practically the same engine as the NFL sim but with NBA-specific math. The Owner knows NBA even better than football and will provide NBA2K ratings directly.

## Data needed

- ~450 players (current NBA rosters)
- 30 teams (current NBA teams)
- Position weights (PG, SG, SF, PF, C)
- Flex rules (basketball position flexibility)
- NBA2K ratings (Owner can transmit directly)

## Key challenges

1. **Position valuation** — how to value PG vs C in basketball?
2. **Flex rules** — which positions can play which slots, and with what penalty?
3. **Matchup model** — offensive/defensive efficiency, pace, shooting %?
4. **Season length** — 82 games or shorter for sim purposes?
5. **Playoffs** — play-in tournament + 8-team bracket, or simplified?

## Math

Fundamentally different from NFL. Basketball has no "draft" in the same sense. Season engine needs: 82-game schedule, 30 teams, playoffs (play-in + 8-team bracket). Matchup model based on offensive/defensive efficiency, pace, and shooting percentages.

## Questions for the Owner

See `../QUESTIONS-FOR-OWNER.md` — Q-NBA-1 through Q-NBA-8.
