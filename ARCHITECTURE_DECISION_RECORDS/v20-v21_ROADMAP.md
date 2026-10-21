# Architecture Decision Records — Multi-Sport Simulation System

## v20 → V21 Roadmap

### Current State (v20)
- Single HTML application (`NFL Draft Simulator v20 Claude.html`)
- Monolithic source: `NFL Draft Simulator v20` (commit `31b7d61f…`)
- Product scope: NFL regular season draft simulation only
- Stability focus: Fix `rWeights` ReferenceError, mobile responsiveness, end-to-end play flow

### Proposed Evolution (V21)
A product family with shared infrastructure and sport-specific engines:

```
Football-Sim/
├── core/                    # Shared engine components
│   ├── engine.js           # Core simulation logic (draft, season, playoffs)
│   ├── valuation.js       # Player rating models (salary-based, position-weighted)
│   ├── lineup_optimizer.js # OptimalLineup algorithm
│   ├── draft_engine.js     # State construction & CPU choices
│   └── game_plan.js        # Offense/defense plans
├── sports/                  # Sport-specific implementations
│   ├── football/            # NFL simulator (current + all-time)
│   │   ├── ratings.json    # All-time player ratings (1200+ candidates)
│   │   ├── draft_sim.js    # NFL draft simulation
│   │   ├── all_time_draft.js # NFL all-time draft simulation
│   │   └── matchup_model.js # Unit-level matchup scoring
│   ├── basketball/          # NBA simulator (future)
│   │   ├── ratings.json    # NBA player ratings
│   │   ├── draft_sim.js    # NBA draft simulation
│   │   └── all_time_draft.js # NBA all-time draft simulation
│   └── soccer/              # Soccer league simulations (future)
│       ├── ratings.json
│       ├── draft_sim.js
│       └── all_time_draft.js
├── web/                     # Shared frontend shell
│   ├── index.html
│   ├── dashboard.js
│   └── responsive.css
└── data/                    # External datasets
    ├── nfl_all_time_ratings.json
    ├── nba_all_time_ratings.json
    └── soccer_all_time_ratings.json
```

### Key Architectural Principles

1. **Shared Engine, Separate Engines**: Core simulation logic lives in `core/`; each sport has its own implementation that plugs into the same validation pipeline.
2. **Explicit Data Ownership**: Each sport owns its ratings and rulesets. No cloning of math between sports.
3. **Assembled-Build Gate**: Every change must produce a complete, runnable candidate before verification.
4. **Independent Verifiers**: A separate team validates each sport's output against the unified test suite.

### Impact of Changes

| Change | Risk | Mitigation |
|--------|------|------------|
| Adding a new sport | Low — isolated to `sports/<sport>/` directory | Follow existing pattern; no cross-sport coupling |
| Modifying core engine | Medium — affects all sports | Use feature flags; maintain backward compatibility |
| Changing data format | High — affects all consumers | Versioned schemas; migration scripts |
| Updating evaluation metrics | Medium — affects scoring consistency | Document metric definitions; keep them in `core/` |

### Recommended Default
Adopt the "one canonical source" rule: all code paths converge through `core/` modules. Sports add new entry points under `sports/<sport>/`, never duplicating core logic.

### Coupling Notes
- **Code ↔ Markup**: The web shell is thin; it renders data from the core engine. Changes to markup don't require recompiling the engine.
- **Data ↔ Rules**: Ratings live in `data/`; they reference rules defined in `core/`. This separation allows independent updates.
- **Verification**: Each sport has its own test harness (`tests/sport-<name>.js`) that runs against the assembled candidate.
