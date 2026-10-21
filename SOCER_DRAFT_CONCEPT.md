# Soccer League Simulations — Conceptual Framework

## Scope
Design soccer league draft simulations following the same product family architecture. This is a future phase (Phase 5) after V21 stability is achieved.

## Key Questions (Pending Owner Decision)

1. **Draft Structure**: Is it a single-team draft (like fantasy) or a league-wide draft? How many slots per team?
2. **League Representation**: Which leagues? Premier League, La Liga, Bundesliga, Serie A, MLS, etc.? Should we include lower divisions?
3. **Draft Mechanics**: Flex positions in soccer? Rotation constraints? How do bench players factor in?
4. **Evaluation Model**: What drives player ratings? Expected goals (xG), possession, pass accuracy, defensive actions?
5. **Season Format**: How many matches per team? How does the tournament proceed (round-robin, knockout)?

## Proposed Approach (Preliminary)
- **Structure**: Similar to football/soccer folders under `sports/soccer/`
- **Ratings**: Position-adjusted ratings (forward, midfielder, defender) with era adjustments
- **Draft Size**: 8-12 teams, 10-15 picks per round (similar to MLB draft)
- **Evaluation**: xG-based model for individual performance; team success based on points accumulated
- **Simulation Engine**: Extend `core/valuation.js` with soccer-specific features

## Acceptance Criteria (Future Phase)
- [ ] Soccer draft simulation produces valid season outcomes
- [ ] Multiple league configurations tested (Premier League, La Liga, etc.)
- [ ] Integration with core engine works seamlessly
- [ ] Performance comparable to other sports (same quality bar)

*This section is a placeholder until the Owner confirms the direction.*
