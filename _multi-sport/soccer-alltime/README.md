# Soccer All-Time Player Database

## Directory Structure

```
soccer-alltime/
├── data/
│   ├── players-template.json    # Player database template (JSON)
│   ├── players-template.csv     # Player database template (CSV)
│   └── players.json             # Actual player database (to be populated)
```

## Data Format

Follows the same structure as NFL/NBA all-time simulations:
- Array of player objects with standardized schema
- Soccer-specific attributes: pac, sho, pas, dri, def, phy
- Position codes: GK, RB, LB, CB1, CB2, CDM, CM, CAM, RW, LW, ST (+ depth)
- Leagues: Historical + current (Premier League, La Liga, Bundesliga, Serie A, Ligue 1, MLS, European Cup/Champions League, Copa Libertadores, World Cup, etc.)
- Era: Decade of peak (e.g., "1950s", "1970s", "1990s", "2000s", "2010s", "2020s")

## Era Adjustment

Era adjustment tiers (proposed - pending Owner approval):
- Pre-1960: pac -10, sho -5, pas -5, dri -5, def +5, phy +5
- 1960s-1980s: pac -5, sho -2, pas -2, dri -2, def +2, phy +2
- 1990s-2000s: baseline (no adjustment)
- 2000s-2010s: pac +2, sho +2, pas +2, dri +2, def -2, phy -2
- 2010s-present: pac +5, sho +3, pas +3, dri +3, def -3, phy -3

_Pending Owner approval - see QUESTIONS-FOR-OWNER.md Q-SOCCER-AT-1_

## Source

Per Owner directive: "Use whatever you want for the soccer source. All simulations should follow same format as the current football sim."

Recommended sources:
- clubelo.com Elo ratings (historical, global, reproducible)
- IFFHS historical rankings (cross-check)
- Transfermarkt market values (supplementary)
- FIFA historical ratings (if available)
- Owner input for GOAT-tier players

## Population Process

1. Council members claim eras/positions/leagues to research
2. Ratings derived from chosen sources with era adjustments
3. Owner reviews and approves final pool
4. Total target: ~1,500-2,000 players across all eras/leagues
