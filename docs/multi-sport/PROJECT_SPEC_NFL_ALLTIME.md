# PROJECT SPEC: NFL All-Time Draft + Season Simulation

**Status:** Specification — awaiting Owner approval (R5)  
**Priority:** 2 (after v21 stabilization)  
**Base:** Merged v21 engine (post-v20 merge)  
**Branch:** `sims/nfl-alltime` (to be created)  
**Dependencies:** v21 stabilized engine, NFL all-time dataset

---

## 1. Product Vision

An all-time NFL Draft + Season simulator that lets users draft from ~1,200 of the greatest NFL players across all eras, then play full 17-game seasons with playoffs and Super Bowl using the same engine as the current NFL sim but with era-adjusted ratings and era-appropriate rules.

**Core Experience:**
- Draft from ~1,200 all-time greats (QBs, RBs, WRs, TEs, OL, DL, LBs, DBs, Ks, Ps)
- Era-adjusted ratings that account for era context (e.g., 1950s passing vs 2020s passing)
- Era-appropriate rule sets (e.g., 1970s rules vs 2020s rules)
- Historical team identities or custom franchises
- Full 17-game season + playoffs + Super Bowl
- All-time records tracking and leaderboards

---

## 2. Data Requirements

### 2.1 Player Dataset (~1,200 players)

| Category               | Count | Source Strategy                      |
| ---------------------- | ----- | ------------------------------------ |
| QBs                    | ~150  | Madden historical + council curation |
| RBs                    | ~200  | Madden historical + council curation |
| WRs                    | ~200  | Madden historical + council curation |
| TEs                    | ~100  | Madden historical + council curation |
| OL (LT, LG, C, RG, RT) | ~250  | Madden historical + council curation |
| DL (DE, DT)            | ~150  | Madden historical + council curation |
| LBs (MIKE, WILL, SAM)  | ~100  | Madden historical + council curation |
| DBs (CB, SS, FS)       | ~200  | Madden historical + council curation |
| K/P                    | ~50   | Madden historical + council curation |

**Total:** ~1,200 players

### 2.2 Rating Methodology

**Era Adjustment Formula (Proposed):**
```
adjusted_rating = base_rating * era_factor[position][era] + context_adjustment
```

**Era Definitions:**
| Era                    | Years        | Key Characteristics                           |
| ---------------------- | ------------ | --------------------------------------------- |
| Pre-Super Bowl         | 1920-1965    | Run-heavy, limited passing, two-way players   |
| Super Bowl I-VII       | 1966-1979    | Run-heavy, emerging passing, physical defense |
| Modern Era Begins      | 1980-1993    | West Coast offense emergence, passing growth  |
| Free Agency/Salary Cap | 1994-2005    | Parity, free agency, salary cap               |
| Modern Passing Era     | 2006-2017    | QB protection rules, passing explosion        |
| Analytics/Modern       | 2018-Present | Analytics, aggressive 4th down, QB mobility   |

**Era Factors by Position (Proposed):**
| Position | Pre-1966 | 1966-1979 | 1980-1993 | 1994-2005 | 2006-2017 | 2018+ |
| -------- | -------- | --------- | --------- | --------- | --------- | ----- |
| QB       | 0.75     | 0.85      | 0.95      | 1.00      | 1.05      | 1.05  |
| RB       | 1.10     | 1.05      | 1.00      | 1.00      | 0.95      | 0.95  |
| WR       | 0.80     | 0.90      | 1.00      | 1.05      | 1.05      | 1.05  |
| TE       | 0.85     | 0.90      | 1.00      | 1.00      | 1.05      | 1.05  |
| OL       | 1.00     | 1.00      | 1.00      | 1.00      | 1.00      | 1.00  |
| DL       | 1.05     | 1.05      | 1.00      | 1.00      | 0.95      | 0.95  |
| LB       | 1.05     | 1.05      | 1.00      | 1.00      | 0.95      | 0.95  |
| DB       | 1.05     | 1.05      | 1.00      | 1.00      | 0.95      | 0.95  |
| K/P      | 1.00     | 1.00      | 1.00      | 1.00      | 1.00      | 1.00  |

**Eligibility Rule:** All top current players eligible for all-time with ~-5 rating adjustment.

---

## 3. Engine Modifications Required

### 3.1 Shared Core (Inherited from v21)

- [ ] SIM-CORE boundary with SIM-CORE markers
- [ ] 3 headless entry points (`buildDraftState`, `simulateDraftHeadless`, `buildLeagueFromDraft`)
- [ ] Seeded RNG (`rng(seed)` indirection)
- [ ] Persistence (localStorage auto-save/resume)
- [ ] 17-function oracle + hash gate
- [ ] Seeded RNG for reproducibility
- [ ] 390px element-level overflow gate

### 2.2 NFL All-Time Specific Additions

- [ ] **Era System**: Era detection from player metadata → era factor application
- [ ] **Rule Set Engine**: Configurable rule sets per era (pass interference, QB protection, etc.)
- [ ] **Historical Team Rosters**: Optional historical franchise rosters
- [ ] **Era-Appropriate Scheduling**: Balanced schedules per era
- [ ] **Historical Records Database**: All-time records tracking with era context
- [ ] **Hall of Fame Integration**: Hall of Fame eligibility and induction simulation

### 2.3 Data Pipeline

- [ ] `datasets/nfl-alltime/players.json` — Master player list with era metadata
- [ ] `datasets/nfl-alltime/teams.json` — Historical franchises with era mappings
- [ ] `datasets/nfl-alltime/rulesets.json` — Rule sets per era
- [ ] `datasets/nfl-alltime/records.json` — Historical records with era tags
- [ ] Data validation pipeline (schema validation, cross-reference checks)

---

## 4. UI/UX Additions

- **Era Selector** in draft setup (choose era or "All Eras")
- **Era Badges** on player cards (era badge + era factor display)
- **Historical Records View** with era-filtered leaderboards
- **Hall of Fame** simulation and display
- **Era Rule Tooltip** system (hover rule → see era-specific rule)
- **Draft Board** era filter and era-appropriate sorting

---

## 5. Verification Gates (Extended)

### Extended Gates for NFL All-Time

1. **Era Factor Verification** — Verify era factors produce expected rating distributions
2. **Historical Record Validation** — Simulated records plausible vs actual history
3. **Era Rule Enforcement** — Rules correctly enforced per selected era
4. **Draft Balance** — No era dominates draft value disproportionately
5. **Record Plausibility** — Simulated all-time records within historical bounds

---

## 6. Data Creation Process (Council Work)

### Phase 1: Player List Assembly (Owner + Council)

- [ ] Owner provides initial top-50 per position from memory/knowledge
- [ ] Council members claim positions to research
- [ ] Compile master list with sources (PFRef, Madden historical, etc.)
- [ ] Owner reviews and approves final ~1,200 list

### Phase 2: Rating Assignment

- [ ] Base ratings from best available source (Madden historical, PFRef AV, etc.)
- [ ] Council applies era factors with Owner guidance
- [ ] Owner reviews and calibrates top-50 per position
- [ ] Cross-position calibration (QB vs RB vs WR value)

### Phase 3: Validation

- [ ] Draft simulations with council members
- [ ] Season sims with historical rosters
- [ ] Compare simulated stats vs historical records
- [ ] Iterate era factors until plausible

---

## 7. Acceptance Criteria (Gate 2 for NFL All-Time)

- [ ] 1,200 players loaded with era metadata
- [ ] Era factors produce plausible rating distributions
- [ ] Draft from all eras completes without error
- [ ] Season sim with era rules completes
- [ ] Historical records plausible (within 10% of actual)
- [ ] All v21 gates still pass
- [ ] No v21 regressions introduced

---

## 8. Branch & Delivery

| Item            | Detail                                                        |
| --------------- | ------------------------------------------------------------- |
| **Branch**      | `sims/nfl-alltime` (from `merge/v20-donor` → `main` post-v21) |
| **Data Dir**    | `datasets/nfl-alltime/`                                       |
| **Shared Code** | `shared/core/`, `shared/ui/`, `shared/verification/`          |
| **Spec File**   | `docs/multi-sport/PROJECT_SPEC_NFL_ALLTIME.md`                |
| **Tasks**       | `tasks/T-NFL-ALLTIME-*`                                       |

---

## 9. Risks & Mitigations

| Risk                   | Likelihood | Impact   | Mitigation                              |
| ---------------------- | ---------- | -------- | --------------------------------------- |
| Era factors subjective | High       | High     | Owner calibration + council cross-check |
| Data gaps for pre-1970 | High       | Medium   | Conservative estimates + Owner review   |
| Era balance in draft   | Medium     | High     | Draft sims with council + Owner tuning  |
| Records plausibility   | Medium     | High     | Validation gates + Owner review         |
| v21 regression         | Low        | Critical | Full regression suite before merge      |

---

**Status:** SPECIFICATION — Awaiting Owner approval to proceed to implementation phase after v21 stabilization.
