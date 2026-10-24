# Contribution Guidelines — Multi-Sport Simulation System

## Architecture Overview

The system follows a **shared-engine, sport-specific** architecture:

```
Football-Sim/
├── core/                    # Shared engine components (unchanged across sports)
│   ├── engine.js           # Core simulation logic (draft, season, playoffs)
│   ├── valuation.js       # Player rating models (salary-based, position-weighted)
│   ├── lineup_optimizer.js # OptimalLineup algorithm
│   ├── draft_engine.js     # State construction & CPU choices
│   └── game_plan.js        # Offense/defense plans
├── sports/                  # Sport-specific implementations (add new folders here)
│   ├── football/            # NFL simulator (current + all-time)
│   │   ├── ratings.json    # All-time player ratings (1200+ candidates)
│   │   ├── draft_sim.js    # NFL draft simulation
│   │   ├── all_time_draft.js # NFL all-time draft simulation
│   │   └── matchup_model.js # Unit-level matchup scoring
│   ├── basketball/          # NBA simulator (current + all-time)
│   │   ├── ratings.json    # NBA player ratings
│   │   ├── draft_sim.js    # NBA draft simulation
│   │   └── all_time_draft.js # NBA all-time draft simulation
│   └── soccer/              # Soccer league simulations (future)
│       ├── ratings.json
│       ├── draft_sim.js
│       └── all_time_draft.js
└── web/                     # Shared frontend shell
    ├── index.html
    ├── dashboard.js
    └── responsive.css
```

### Key Principles

1. **One Product Family**: The entire system is one product with multiple sport variants.
2. **Shared Core, Separate Engines**: Each sport adds entry points under `sports/<sport>/` but never duplicates core logic.
3. **Assembled-Build Gate**: Every change must produce a complete, runnable candidate before verification.
4. **Independent Verifiers**: A separate team validates each sport's output against the unified test suite.

## Contributor Roles

| Role                                          | Responsibilities                                                      | Branch Strategy                                                   |
| --------------------------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **Core Team** (Claude)                        | Implement changes in `core/`, maintain evaluation model consistency   | Feature branches off `core/`; merge only after passing unit tests |
| **Sport Specialists** (GPT / Council members) | Add/specify sport-specific rules, implement `sports/<sport>/` modules | New sport folders under `sports/`; follow existing pattern        |
| **Verifiers**                                 | Write test suites for each sport, validate outputs                    | Use `tests/sport-<name>.js`; no code changes required             |
| **Data Curators**                             | Build and maintain rating datasets (`data/`)                          | No code changes; update JSON files directly                       |

## How to Contribute

### 1. Start a Task

Use the [Task tool](goal) to create a task packet with:
- Clear objective (e.g., "Add NBA draft simulation")
- Exact source pin (branch, commit, build hash)
- Acceptance criteria (what "done" looks like)
- Assigned investigator, implementer, verifier

### 2. Follow the Workflow

1. **Proposed Change** → Create a feature branch from `main`
2. **Implement** → Make minimal, focused changes
3. **Run Assembly** → Ensure the full candidate builds and runs
4. **Verification** → Pass the assembled-build gate (no crashes, correct paths covered)
5. **Documentation** → Update relevant specs/docs
6. **Review** → Have an independent reviewer approve
7. **Merge** → Only after acceptance criteria are met

### 3. Avoid Stepping on Others' Toes

- **Do not edit** `core/` unless you are Claude (the implementation lead). Any changes to core must go through a feature branch and pass the assembly gate.
- **New sports** should be added as new folders under `sports/`. Do not clone existing sport logic into other sports.
- **Data files** live in `data/`. Treat them as immutable once published; updates require versioned releases.
- **Tests** live in `tests/`. Each sport gets its own test file following the naming convention `test_sport-<name>.js`.

### 4. Example: Adding an NBA Draft Simulation

```
# Step 1: Create task
Task ID: NBL-DRAFT-001
Owner: GPT (co-architect)
Investigator: You (or any council member)
Acceptance Criteria:
  - [ ] NBA draft simulation produces a complete season run
  - [ ] All 210 selections are processed correctly
  - [ ] Playoff bracket resolves without errors
  - [ ] Results are reproducible

# Step 2: Branch
git checkout -b sports/basketball/draft-sim

# Step 3: Implement
- Copy core/valuation.js and adapt for basketball metrics
- Implement sports/basketball/ratings.json with ~1200 players
- Implement sports/basketball/draft_sim.js using the same pipeline
- Implement sports/basketball/all_time_draft.js

# Step 4: Verify
- Run the assembled candidate
- Confirm end-to-end play flow works
- Document any deviations from expected behavior

# Step 5: Merge
- Submit PR with task reference
- Wait for verifier approval
- Once approved, merge into main
```

## Unresolved Questions & Owner Decisions Needed

Before work begins, confirm these items with the Owner:
1. **NFL Flex Rules** – What does "flex" mean? Positional flexibility vs. something else?
2. **All-Time Peak Definition** – Career-high rating vs. peak single-season rating?
3. **NBA Lineups & Rotations** – Traditional starting five vs. flexible rotations?
4. **Soccer Draft Concept** – Single-team draft vs. league-wide, number of slots per team?
5. **Rating Provenance** – Where do all-time ratings come from? Who curates them?
6. **Performance Metrics** – Which stats drive ratings? Position-adjusted?

Once these are answered, the four priority projects can proceed independently under their respective folders.
