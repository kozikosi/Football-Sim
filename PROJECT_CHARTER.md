# Project Charter — Multi-Sport Simulation System

## Priority Order

1. **Current Football Sim & V21 Quality** — Stabilize the existing NFL draft simulation before expanding.
2. **NFL All-Time Draft Season** — Build an all-time version of the current NFL simulator.
3. **Current NBA Draft Season** — Create an NBA draft simulation using similar but distinct math.
4. **NBA All-Time Draft Season** — Build an all-time NBA draft simulation.
5. **Other Sports** — MLB, NHL, soccer catalog (post-V21 stability).

## Scope Definitions

### "All Time"

- **NFL**: Top 1200 players ranked by peak performance value (career peak vs. career average). Includes current players (eligible with ~−5 score adjustment) and historical legends.
- **NBA**: Top 1200 players ranked by peak performance value. Similar cutoff includes current players.
- **Soccer**: Top 1200 players across major leagues (Premier League, La Liga, Bundesliga, Serie A, MLS, etc.). Excludes lower-tier leagues unless explicitly requested.

### "Current"

- Active roster players who are currently eligible for selection (NFL draft picks, NBA draft picks, active rosters).
- Uses the most recent official ratings (NBA2K for NBA, NFL all-time ratings to be created).

### "Draft Season"

- Standard single-season draft where teams select players in order of priority.
- Uses the same evaluation model as the regular season but over one year.
- Results in a full season of games after the draft.

### "All Time Draft Season"

- Selects players from the entire historical pool (all time) rather than just current-eligible players.
- Plays out a full season with those selections.
- Used primarily for NFL and NBA to showcase historical talent depth.

## Data Assumptions

| Item                                    | Assumption                                                                                                | Evidence / Source                                |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| Number of all-time candidates per sport | ~1,200 per sport (NFL, NBA, soccer)                                                                       | Owner confirmation needed; currently unconfirmed |
| Rating scale                            | -5 to +∞ range; peak values derived from career best performance                                          | To be defined in `core/valuation.js`             |
| Rating update frequency                 | Ratings updated annually (NBA2K edition cycle); NFL ratings built from historical databases               | To be confirmed with data providers              |
| Player eligibility                      | Current players get −5 score adjustment; historical players use raw ratings                               | Owner decision required                          |
| Sport-specific math                     | NFL uses flex-position penalties; NBA uses different rotation rules; soccer uses different unit weighting | To be documented in each sport's spec            |

## Unresolved Questions (Require Owner Decision)

1. **NFL Flex Rules Meaning** — What does "flex" mean in our NFL sim? Should it represent positional flexibility (e.g., a quarterback who can play RB), or something else?
2. **All-Time Peak Definition** — Does "peak" mean highest single-season rating, career-high rating, or some composite measure? How do we handle players whose peak was in a different era (e.g., 1980s QB vs. 2020s QB)?
3. **NBA Lineups & Rotations** — How should NBA lineups work? Traditional starting five vs. flexible rotations? Should there be bench units with different roles?
4. **Soccer Draft Concept** — What does a "soccer draft season" look like? Is it a single-team draft (like fantasy) or a league-wide draft? How many slots per team?
5. **Rating Provenance** — Where do all-time ratings come from? Are they sourced from external databases (Pro Football Focus, Basketball Reference, Transfermarkt)? Who curates them?
6. **Performance Metrics** — Which statistical categories drive ratings? (e.g., PFF grades, box scores, advanced metrics). Should ratings be position-adjusted?

## Contribution Model

Each project gets its own folder under `sports/`:
- `sports/football/` — NFL simulator (current + all-time)
- `sports/basketball/` — NBA simulator (current + all-time)
- `sports/soccer/` — Soccer league simulations (future)

Core engine stays in `core/` and is shared via import. Each sport adds entry points that call into the core.

Contributors should follow the [Council Workflow](COLLECTIVE-PROMPT.md) for task assignment and review.

## Success Criteria

By the end of Phase 1 (V21 stabilization):
- [ ] Current NFL draft simulation passes end-to-end tests (no crashes, correct path coverage)
- [ ] V21 release is deployable (single HTML artifact, no merge conflicts)
- [ ] Clear documentation for adding new sports
- [ ] All four priority projects have defined scopes and acceptance criteria

By the end of Phase 2 (All-time versions):
- [ ] NFL all-time draft simulation produces consistent results
- [ ] NBA all-time draft simulation produces consistent results
- [ ] Both support the full workflow (draft → season → playoffs)
- [ ] Data sets contain ≥1,200 high-quality player entries per sport

---

_This charter is a living document. Updates require an Owner ruling._
