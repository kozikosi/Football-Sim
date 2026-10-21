# MULTI-SPORT VISION — NFL, NBA, and Beyond

**Status:** Architectural guidance document — not yet an Owner ruling  
**Author:** UK (S-2200–2299) on behalf of the Owner's stated vision  
**Date:** 2026-10-20  
**Purpose:** Guide architectural decisions for the next 2-3 years of development

---

## 1. THE VISION (Owner's Directive)

> "My ultimate goal for the website is that the NFL regular season draft simulation is one of many you can access. It would be nice to have at least 8 simulations (Current and All time) for the four major american sports. And then one current and all time for the the top football/soccer leagues (all the ones ranked above MLS and including MLS) for current and all time."

### Target Portfolio (Phased)

| Phase | Sport | Variant | Count | Priority |
|-------|-------|---------|-------|----------|
| **1** | NFL | Current (v20/v21) | 1 | **Active** |
| **2** | NFL | All-Time | 1 | **Next** |
| **3** | NBA | Current | 1 | **High** |
| **4** | NBA | All-Time | 1 | **High** |
| **5** | NHL | Current + All-Time | 2 | Medium |
| **6** | MLB | Current + All-Time | 2 | Medium |
| **7** | Soccer (Top 5 leagues + MLS) | Current + All-Time | 12-16 | Long-term |

**Total target: 20+ simulations** sharing a common engine architecture.

---

## 2. ARCHITECTURAL PRINCIPLES

### Core Principle: ONE ENGINE, MANY SPORTS

The NFL Draft Simulator v20/v21 is the **reference implementation**. Every subsequent sport should:
- **Reuse the engine** (draft logic, season simulation, lineup optimization, game plans, playoffs)
- **Swap the data layer** (ratings, positions, team structures, schedule rules)
- **Configure the math** (position weights, unit definitions, matchup model coefficients)
- **Preserve the UI patterns** (hero/stepper, draft board, season tabs, mobile layout)

### What Stays Constant (Engine)
- Snake draft with 32 teams, CPU GMs using valuation math
- Season engine: schedule → weekly sim → standings → playoffs → championship
- Lineup optimizer (Hungarian algorithm, flex-aware)
- Matchup model: offensive/defensive units → expected points → noise → results
- Game plans: independent offense/defense, scored vs expected opponent
- Verification harness: E2E driver, 390px checks, function-diff gate

### What Changes Per Sport (Configuration)
| Layer | NFL | NBA | NHL | MLB | Soccer |
|-------|-----|-----|-----|-----|--------|
| **Roster slots** | 36 (26 drafted) | 15 (13 active) | 23 (20 active) | 26 (25 active) | 25-30 |
| **Positions** | QB, RB, WR, TE, OL, DL, LB, CB, S, K, P | PG, SG, SF, PF, C | F, D, G | SP, RP, C, 1B, 2B, 3B, SS, LF, CF, RF, DH | GK, D, M, F |
| **Unit definitions** | 9 units (QB, RB, WR/TE, OL run/pass, rush, run D, coverage, K) | 5-7 units (perimeter, interior, transition, defense, bench) | 4-5 units (offense, defense, goaltending, special teams) | 5-6 units (rotation, bullpen, lineup, defense, baserunning) | 4-5 units (attack, midfield, defense, GK, set pieces) |
| **Schedule** | 17 games, 32 teams | 82 games, 30 teams | 82 games, 32 teams | 162 games, 30 teams | 34-38 games, 18-20 teams |
| **Playoffs** | 14-team bracket | 16-team bracket | 16-team bracket | 12-team bracket | Varies (cup + league) |
| **Ratings source** | Madden NFL 27 | NBA 2K | NHL EA Sports | MLB The Show | EA FC / custom |
| **All-time pool** | ~1,200 players | ~1,200 players | ~1,200 players | ~1,200 players | ~1,200 per league |

---

## 3. RECOMMENDED FOLDER STRUCTURE

### Option A: Monorepo with Sport Modules (RECOMMENDED)

```
/Football Sim/
├── engine/                    # SHARED ENGINE (single source of truth)
│   ├── draft/
│   │   ├── draft-engine.js       # Snake draft, CPU logic, state machine
│   │   ├── cpu-valuation.js      # Value-over-replacement, bias, noise
│   │   └── flex-rules.js         # Flex eligibility, penalties (configurable)
│   ├── season/
│   │   ├── schedule.js           # Schedule generation (configurable)
│   │   ├── standings.js          # NFL tiebreakers + generic interface
│   │   ├── playoffs.js           # Bracket engine (configurable size)
│   │   └── awards.js             # Award computation (configurable)
│   ├── lineup/
│   │   ├── hungarian.js          # Optimization algorithm (generic)
│   │   ├── slot-definitions.js   # Slot → position mapping (per sport)
│   │   └── eff-ovr.js            # Effective OVR with flex penalties
│   ├── matchup/
│   │   ├── model.js              # Exponential yardage/points (configurable coeffs)
│   │   ├── units.js              # Unit definitions (per sport)
│   │   └── game-plans.js         # Off/Def plans (generic)
│   ├── simulation/
│   │   ├── game.js               # Realize yards/TOs/sacks from model
│   │   ├── noise.js              # Controlled randomness (seeded)
│   │   └── late-game.js          # Clock management, comeback logic
│   ├── ui/
│   │   ├── draft-board.js        # Live board (generic, data-driven)
│   │   ├── season-tabs.js        # Phase transitions (generic)
│   │   ├── mobile.css            # 390px patterns (generic)
│   │   └── components/           # Reusable UI components
│   └── verification/
│       ├── e2e-smoke.mjs         # Draft→season→playoffs→390px
│       ├── funcdiff.js           # Function-level diff
│       └── math-baseline.json    # Hash pins
│
├── sports/
│   ├── nfl/
│   │   ├── current/
│   │   │   ├── data/
│   │   │   │   ├── players.json        # 1,200+ Madden 27 ratings
│   │   │   │   ├── teams.json          # 32 team depth charts
│   │   │   │   ├── weights.json        # Position weights
│   │   │   │   ├── units.json          # 9 unit definitions
│   │   │   │   ├── schedule.json       # 17-game schedule rules
│   │   │   │   └── constants.json      # Protected constants
│   │   │   ├── config.js               # Sport-specific wiring
│   │   │   └── index.html              # NFL Current entry point
│   │   ├── all-time/
│   │   │   ├── data/
│   │   │   │   ├── players.json        # 1,200 all-time greats
│   │   │   │   ├── teams.json          # Historical franchises
│   │   │   │   ├── weights.json        # Era-adjusted weights
│   │   │   │   └── era-rules.json      # Era adjustments (-5 for current)
│   │   │   ├── config.js
│   │   │   └── index.html
│   │   └── shared/
│   │       ├── positions.js            # NFL position definitions
│   │       ├── flex-rules.js           # NFL flex eligibility
│   │       └── tiebreakers.js          # NFL standings rules
│   ├── nba/
│   │   ├── current/
│   │   │   ├── data/
│   │   │   │   ├── players.json        # NBA 2K ratings
│   │   │   │   ├── teams.json          # 30 team rosters
│   │   │   │   ├── weights.json        # Position weights
│   │   │   │   ├── units.json          # 5-7 unit definitions
│   │   │   │   ├── schedule.json       # 82-game schedule
│   │   │   │   └── constants.json
│   │   │   ├── config.js
│   │   │   └── index.html
│   │   ├── all-time/
│   │   │   ├── data/
│   │   │   │   ├── players.json        # 1,200 all-time greats
│   │   │   │   ├── teams.json          # Historical franchises
│   │   │   │   ├── weights.json
│   │   │   │   └── era-rules.json      # Era adjustments
│   │   │   ├── config.js
│   │   │   └── index.html
│   │   └── shared/
│   │       ├── positions.js
│   │       ├── flex-rules.js
│   │       └── tiebreakers.js
│   ├── nhl/
│   ├── mlb/
│   └── soccer/
│       ├── epl/
│       ├── la-liga/
│       ├── bundesliga/
│       ├── serie-a/
│       ├── ligue-1/
│       └── mls/
│
├── builds/                     # Generated single-file HTML per sport/variant
│   ├── nfl-current.html
│   ├── nfl-all-time.html
│   ├── nba-current.html
│   ├── nba-all-time.html
│   └── ...
│
├── tools/
│   ├── build.js                # Bundles engine + sport config → single HTML
│   ├── extract-functions.js    # For funcdiff/hash pins
│   ├── sync-mirrors.sh         # Doc sync (updated for monorepo)
│   └── dataset-tools/          # Player rating converters, validators
│
├── docs/
│   ├── ARCHITECTURE.md         # Engine architecture
│   ├── CONTRIBUTING.md         # How to contribute (this document)
│   ├── DATA-STANDARDS.md       # Rating formats, validation rules
│   ├── QUESTION-GENERATOR.md   # Owner guidance questions
│   └── MULTI-SPORT-VISION.md   # This file
│
├── _agents/                    # Agent workspaces (unchanged)
│   ├── uk/
│   ├── ds/
│   ├── pickle/
│   └── ...
│
├── _archive/                   # Frozen builds
├── _reference/                 # Reference assets
├── backup-before-reorg/
│
├── COUNCIL-BULLETIN.md
├── CHRONICLE.md
├── SUBMISSIONS.md
├── STATUS.md
├── QUESTIONS-FOR-THE-ARCHITECT.md
├── AGENTS.md
├── ONBOARDING.md
└── INDEX.md
```

### Why This Structure?

| Concern | How Addressed |
|---------|---------------|
| **Single-file delivery** | `tools/build.js` bundles engine + sport config → one HTML per variant |
| **Shared engine** | `engine/` is ONE copy; sports only provide config + data |
| **No code duplication** | Draft logic, season engine, lineup optimizer, matchup model written ONCE |
| **Independent deployment** | Each `builds/*.html` is a complete standalone app |
| **Parallel development** | Agents can work on different sports without conflicts |
| **Verifiable** | Engine tests run once; sport configs validated against schemas |
| **Owner control** | Protected constants per sport in `sports/*/current/data/constants.json` |

---

## 4. CONTRIBUTION SYSTEM

### Agent Assignment Model

Each agent claims **one sport/variant** as their primary lane, with **cross-cutting concerns** as secondary.

| Agent | Primary Lane | Secondary (Cross-Cutting) |
|-------|--------------|---------------------------|
| **Claude (Architect)** | Engine architecture, NFL Current | All sports final integration |
| **GPT (Co-Architect)** | Workflow, verification, NBA Current | Architecture review all sports |
| **DS** | NFL Current data/math verification | Engine test harness |
| **Pickle** | NFL All-Time data/math | Math baseline gates |
| **MiniMax** | E2E driver, 390px verification | Mobile patterns all sports |
| **Nemo Super** | NFL Current UI/UX | CSS system |
| **Nemo Ultra** | NFL All-Time UI/UX | Mobile draft board |
| **Beam** | Communication protocol, docs | Workflow docs |
| **UK** | Architecture docs, multi-sport planning | Decision log, known issues |
| **VL/OR/GLM/LK** | NFL Current verification | As assigned |
| **New agents** | NBA Current / NBA All-Time / NHL / MLB / Soccer | As needed |

### Claiming Work (No Collisions)

1. **Read** `COUNCIL-BULLETIN.md` availability strip
2. **Claim** a sport/variant in your availability line: `- **Agent** — NBA Current (primary), verification (secondary)`
3. **Create** your workspace: `_agents/<agent>/<sport>-<variant>/`
4. **File** a `TASK-<ID>.md` in your workspace with: objective, source revision, acceptance criteria, assigned verifier
5. **Submit** via `SUBMISSIONS.md` (or per-sport task files) with receipts

### Cross-Sport Coordination

- **Engine changes** → Only Claude modifies `engine/`. All sports auto-inherit on next build.
- **Sport config changes** → Agent modifies `sports/<sport>/<variant>/`. No engine touch.
- **Data changes** → Agent modifies `sports/<sport>/<variant>/data/`. Validated by `tools/dataset-tools/`.
- **UI changes** → Agent modifies `engine/ui/components/` (shared) or `sports/<sport>/<variant>/index.html` (sport-specific).

---

## 5. DATA CREATION: ALL-TIME PLAYER POOLS

### The Challenge
> "I don't have the obvious data set for the all time players. We will have to collectively create a dataset, assembling around 1200 of the best all time players (all top current players are eligible with around a -5 to their score) in the NFL and NBA."

### Proposed Process

#### Phase 1: NFL All-Time (Parallel to v21)
1. **Source identification** — Pro Football Reference, PFR Hall of Fame, Madden historical ratings
2. **Era normalization** — Create era-adjustment factors (1920s vs 1980s vs 2020s)
3. **Position mapping** — Historical positions → modern slot definitions
3. **Current player integration** — Top 500 current players at -5 OVR
4. **Validation** — Council review with receipts (source + method + sample)

#### Phase 2: NBA Current + All-Time
1. **NBA 2K ratings extraction** — Owner provides or council extracts
2. **Position definitions** — PG/SG/SF/PF/C with flex rules
3. **All-time pool** — Basketball Reference, Hall of Fame, 2K historical
4. **Era normalization** — Pre-shot-clock, ABA merger, three-point era, modern

#### Data Standards (enforced by `tools/dataset-tools/validate.py`)

```json
{
  "player": {
    "name": "string",
    "position": "string",           // Primary position
    "secondary_positions": [],      // Flex-eligible positions
    "team": "string",               // Current or peak team
    "era": "string",                // "2020s", "1990s", "1970s", etc.
    "ratings": {
      "ovr": 99,                    // 50-99
      "speed": 95,
      "strength": 85,
      "agility": 90,
      "awareness": 95,
      "injury": 80,
      "stamina": 90,
      "sport_specific": {}          // NFL: throwing_power, catching; NBA: shooting, defense
    },
    "source": "Madden 27 / 2K24 / PFR / BR / Council consensus",
    "confidence": 0.95              // 0-1, how reliable the rating is
  }
}
```

### Council Data Creation Workflow

1. **Owner** provides seed data (Madden 27, NBA 2K exports)
2. **Council** researches gaps (all-time players not in games)
3. **Agent** proposes ratings in `SUBMISSIONS.md` with source citation
4. **Owner/Architect** approve or adjust
5. **Tool** validates format and integrates into `players.json`
6. **Verifier** runs E2E to ensure no crashes

---

## 6. QUESTION GENERATOR FOR OWNER

### File: `docs/QUESTION-GENERATOR.md`

This file generates structured questions for the Owner on fundamental concepts. Each question includes context, options, and the cost of being wrong.

---

### QUESTION GENERATOR TEMPLATE

**Instructions:** For each concept below, the Owner should answer:
1. **Decision** — Which option, or a new one?
2. **Reasoning** — One sentence
3. **Cost of being wrong** — What breaks if this is wrong?

---

#### A. FLEX RULES (NFL Current — Already Implemented, but verify)

**Context:** Current flex system allows positions to play multiple slots with OVR penalties (e.g., WR can play TE at -5 OVR, CB can play FS at -3 OVR).

**Questions:**
1. **Should flex penalties be symmetric?** (WR→TE same as TE→WR?)
2. **Are there "forbidden" flexes?** (QB cannot flex anywhere — is this absolute?)
3. **Should flex penalties vary by era?** (All-Time: 1970s OL less specialized?)
4. **Can a player flex to MULTIPLE slots simultaneously?** (No — one slot per game)

**Owner's Current Answer (from v20):** Asymmetric penalties, QB cannot flex, one slot per game, era-invariant.

---

#### B. POSITION WEIGHTS & VALUATION

**Context:** `DEFAULT_WEIGHTS` maps positions to valuation scale (QB=320, OT=295, DE=350, CB=350). These derive from `slotWinsPerOvr` → `modelWeights` (QB=700).

**Questions:**
1. **Should All-Time weights differ from Current?** (Era-adjusted: 1970s RB heavier, 2020s QB heavier?)
2. **How to handle two-way players?** (All-Time: Chuck Bednarik, Deion Sanders)
5. **Should weights be derived from data or set by Owner intuition?** (Current: derived from slotWins)

---

#### C. NBA-SPECIFIC CONCEPTS

**Context:** NBA has different roster rules, positions, and game dynamics.

**Questions:**
1. **Roster size:** 15 total, 13 active, 5 on court. How many drafted slots? (Recommend 13)
2. **Flex rules:** Positionless basketball — should PG/SG/SF/PF/C have fluid flex with small penalties?
3. **Unit definitions:** What are the 5-7 matchup units? (Perimeter offense, interior offense, transition, perimeter defense, interior defense, bench, coaching?)
4. **Game plans:** NBA has "pace," "three-point heavy," "paint heavy," "switch everything" — how many off/def plans?
5. **Schedule:** 82 games, back-to-backs, rest days — simulate fatigue?
6. **Playoffs:** 16 teams, best-of-7, 2-2-1-1-1 home court — same bracket engine?
7. **All-Time era adjustment:** Pre-1980 (no 3PT), 1980-2000 (mid-range), 2000-2015 (post-up), 2015+ (pace/space)

---

#### D. NHL/MLB/SOCCER CONCEPTS (Placeholder for Later)

**NHL:**
- Lines (3 forward lines, 3 D pairs, 1G + 1 backup)
- Special teams (PP, PK) as separate units
- Goaltender as distinct unit with outsized impact

**MLB:**
- 9-man lineup + rotation (5 SP) + bullpen (7-8 RP)
- Platoon splits (L/R) as flex mechanism
- Defense as team-level, not per-position

**Soccer:**
- 11v11, 3-5 subs, formations (4-3-3, 4-4-2, 3-5-2)
- No "draft" in most leagues — transfer market instead
- All-Time: National team vs Club separation

---

#### E. ENGINE CONFIGURATION QUESTIONS

**For Each Sport, the Owner Must Define:**

| Config Item | NFL Current | NFL All-Time | NBA Current | NBA All-Time |
|-------------|-------------|--------------|-------------|--------------|
| Roster slots (drafted) | 26 | ? | ? | ? |
| Flex penalty matrix | Defined | Era-adjusted? | ? | ? |
| Unit definitions | 9 units | Same? | ? | ? |
| Matchup coefficients | MC, PLAN_K | Same? | ? | ? |
| Schedule rules | 17-game | Same? | 82-game | Same? |
| Playoff format | 14-team | Same? | 16-team | Same? |
| Tiebreakers | NFL rules | Same? | NBA rules | Same? |
| Awards | NFL awards | Era-adjusted? | NBA awards | Era-adjusted? |
| Record caps | NFL records | Historical records | NBA records | Historical records |

---

#### F. UI/UX QUESTIONS

1. **Single app with sport selector, or separate HTML per sport/variant?**
   - Current: Separate HTML (simpler, faster load, independent deploy)
   - Alternative: Single SPA with sport switcher (shared cache, more complex)

2. **All-Time UI differences?** Vintage aesthetic? Era filters? Historical team selector?

3. **Mobile patterns:** Same 390px patterns for all sports? (Yes — reuse engine/ui)

---

## 7. IMMEDIATE NEXT STEPS (Priority Order)

| Step | Action | Owner | Target |
|------|--------|-------|--------|
| **1** | Complete NFL Current v21 (merge, verify, publish) | Claude + Council | Week 1 |
| **2** | Build `tests/e2e-smoke.mjs` (single reusable driver) | MiniMax + DS | Week 1 |
| **3** | Establish `engine/` folder structure (extract from merged.html) | Claude | Week 2 |
| **4** | Create `sports/nfl/current/` config from v21 | DS + Pickle | Week 2 |
| **5** | Owner answers NBA conceptual questions (Section 6C) | Owner | Week 2 |
| **6** | Build NBA Current config + data pipeline | New agent(s) + GPT | Week 3-4 |
| **7** | Owner provides/approves NBA 2K ratings | Owner | Week 3 |
| **8** | NFL All-Time data creation kickoff | Council (distributed) | Week 3-6 |
| **9** | NBA All-Time data creation | Council | Week 5-8 |
| **10** | First multi-sport build test (NFL Current + NBA Current) | Claude | Week 4 |

---

## 8. GUIDANCE FOR COUNCIL MEMBERS

### If You're New to the Council

1. **Read** `ONBOARDING.md` → `INDEX.md` → `MULTI-SPORT-VISION.md`
2. **Pick a lane** — claim a sport/variant in your availability line
3. **Start small** — verify a function, fix a typo, add a test case
4. **Ask questions** — file in `QUESTIONS-FOR-THE-ARCHITECT.md` with your tag
5. **Provide receipts** — every number needs a command + output

### If You're Working on NFL Current (v21)

- Focus on **verification** and **polish** — the engine is solid
- Don't redesign — refine (mobile, console, awards, recaps)
- Use `VERIFICATION-TEMPLATE.md` for every check

### If You're Starting NFL All-Time

- **Data first** — ratings, era adjustments, team mappings
- **Config second** — weights, units, schedule
- **UI last** — reuse NFL Current patterns
- **Coordinate** — don't duplicate research; claim players in `_agents/<you>/nfl-all-time/players-claimed.md`

### If You're Starting NBA Current

- **Wait for Owner's NBA 2K data** — don't guess ratings
- **Map concepts** — NFL unit → NBA unit, NFL flex → NBA positionless
- **Reuse engine** — only configure, don't rewrite
- **Test early** — run E2E driver on partial config

### If You're Working on Engine (`engine/`)

- **Only Claude** modifies engine code directly
- **Propose** changes via `SUBMISSIONS.md` with full receipts
- **Test impact** — run funcdiff on ALL sport configs before merge
- **Document** — every function needs a comment: purpose, inputs, outputs, config dependencies

### General Rules

| Rule | Why |
|------|-----|
| One agent per sport/variant primary lane | Prevents conflicts, creates ownership |
| Cross-cutting work (engine, verification) assigned explicitly | Prevents duplication |
| All data changes validated by `tools/dataset-tools/` | Prevents corrupt data |
| Engine tests run on every sport config | Catches regressions early |
| `STATUS.md` tracks canonical state per sport | Single source of truth |
| Owner approves all protected constants per sport | Maintains simulation integrity |

---

## 9. ENCOURAGEMENT

> **To every council member reading this:**
>
> You are building something unprecedented: a **unified simulation engine** that can model the draft, season, and championship of **every major sport** with historical depth. The NFL Draft Simulator v20/v21 is the proof of concept. The architecture you're establishing now will serve 20+ simulations for years to come.
>
> **Your work matters.** Every hash pin, every function diff, every 390px check, every data validation — it all compounds into a reliable, extensible platform.
>
> **Don't be afraid to:**
> - Ask "stupid" questions (file them in QUESTIONS-FOR-THE-ARCHITECT.md)
> - Propose "obvious" improvements (submit via SUBMISSIONS.md)
> - Flag inconsistencies (post in COUNCIL-BULLETIN.md)
> - Claim a sport and own it (update your availability line)
>
> **Do be careful to:**
> - Never edit another agent's workspace
> - Never modify the product HTML directly (Claude only)
> - Always provide receipts for numbers
> - Stay in your lane unless explicitly assigned cross-cutting work
>
> The Owner has set a bold vision. The Architect has built a remarkable foundation. The council has proven it can produce receipt-backed facts. Now we scale.
>
> **One engine. Many sports. Infinite seasons.**
>
> — UK, on behalf of the council

---

## 10. RELATED FILES

| File | Purpose |
|------|---------|
| `docs/CONTRIBUTING.md` | Detailed contribution guide (this section expanded) |
| `docs/DATA-STANDARDS.md` | Rating formats, validation schemas, era normalization |
| `docs/ARCHITECTURE.md` | Engine architecture (to be extracted from v21) |
| `tools/build.js` | Bundler: engine + sport config → single HTML |
| `tools/dataset-tools/validate.py` | Data validation for all sports |
| `tools/dataset-tools/era-normalize.py` | All-time era adjustment calculator |
| `sports/nfl/current/config.js` | NFL Current wiring (reference for other sports) |
| `sports/nfl/current/data/constants.json` | NFL Current protected constants |
| `sports/nba/current/config.js` | NBA Current wiring (template) |

---

*This document is living guidance. It will be updated as the Owner makes decisions, the Architect implements, and the council discovers new constraints. Always check `CHRONICLE.md` for the latest rulings.*