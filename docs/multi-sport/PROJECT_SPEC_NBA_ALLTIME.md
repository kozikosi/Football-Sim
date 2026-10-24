# PROJECT SPEC: NBA All-Time Draft + Season Simulation

**Status:** Specification — awaiting Owner approval (R5)  
**Priority:** 4 (after NBA Current)  
**Base:** NBA Current engine (shared core)  
**Branch:** `sims/nba-alltime` (to be created)  
**Dependencies:** NBA Current engine stabilized, NBA all-time dataset

---

## 1. Product Vision

An all-time NBA Draft + Season simulator with ~1,200 of the greatest NBA players across all eras. Users draft from legends across eras, play 82-game seasons with era-appropriate rules, and compete for championships.

**Core Experience:**
- Draft from ~1,200 all-time NBA greats
- Era-adjusted ratings (1950s to present)
- Era-appropriate rule sets (hand-check, 3PT line, defensive 3-second, etc.)
- Historical franchises or custom teams
- Full 82-game season + playoffs + NBA Finals
- All-time records, Hall of Fame simulation

---

## 2. Data Requirements

### 2.1 Player Dataset (~1,200 players)

| Category  | Count      | Source Strategy                      |
| --------- | ---------- | ------------------------------------ |
| PG        | ~150       | 2K historical + council curation     |
| SG        | ~200       | 2K historical + council curation     |
| SF        | ~200       | 2K historical + council curation     |
| PF        | ~150       | 2K historical + council curation     |
| C         | ~150       | 2K historical + council curation     |
| **Total** | **~1,200** | NBA 2K historical + council curation |

**Eligibility Rule:** All top current players eligible for all-time with ~-5 rating adjustment.

### 2.2 Era Definitions (NBA)

| Era                        | Years        | Key Characteristics                              |
| -------------------------- | ------------ | ------------------------------------------------ |
| **Early/Pre-Shot Clock**   | 1946-1954    | No shot clock, low scoring, two-handed set shots |
| **Early Shot Clock**       | 1955-1979    | 24-sec clock, fast pace, no 3PT, physical        |
| **3PT Era Begins**         | 1979-1994    | 3PT introduced, Magic/Bird era, physical         |
| **Expansion/Modern**       | 1995-2004    | Expansion teams, Jordan era, hand-check allowed  |
| **Perimeter/Rule Changes** | 2004-2017    | Hand-check banned, 3PT revolution begins         |
| **Modern/Analytics**       | 2018-Present | Pace/space, 3PT revolution, positionless         |

---

## 3. Era Adjustment Factors (Proposed)

| Position | Pre-1955 | 1955-1979 | 1979-1994 | 1995-2004 | 2004-2017 | 2018+ |
| -------- | -------- | --------- | --------- | --------- | --------- | ----- |
| PG       | 0.80     | 0.90      | 0.95      | 1.00      | 1.05      | 1.05  |
| SG       | 0.75     | 0.85      | 0.95      | 1.00      | 1.05      | 1.05  |
| SF       | 0.80     | 0.90      | 0.95      | 1.00      | 1.05      | 1.05  |
| PF       | 0.85     | 0.95      | 0.95      | 1.00      | 1.00      | 1.00  |
| C        | 1.05     | 1.05      | 1.00      | 0.95      | 0.95      | 0.95  |

---

## 3. Era-Specific Rule Sets

| Rule            | Pre-1954 | 1954-1979 | 1979-1994           | 1994-2001           | 2001-2017  | 2018+               |
| --------------- | -------- | --------- | ------------------- | ------------------- | ---------- | ------------------- |
| Shot Clock      | None     | 24 sec    | 24 sec              | 24 sec              | 24 sec     | 24 sec              |
| 3PT Line        | None     | None      | 23'9"               | 23'9"               | 23'9"      | 23'9"               |
| 3PT Distance    | N/A      | N/A       | 23'9" (22' corners) | 23'9" (22' corners) | 23'9"      | 23'9" (22' corners) |
| Lane Width      | 6 ft     | 12 ft     | 16 ft               | 16 ft               | 16 ft      | 16 ft               |
| Hand Check      | Allowed  | Allowed   | Allowed             | Allowed             | Banned     | Banned              |
| Defensive 3-sec | No       | No        | No                  | No                  | 2001       | Yes                 |
| Zone Defense    | Banned   | Banned    | Banned              | Banned              | 2001 Legal | Legal               |
| Clear Path      | No       | No        | No                  | No                  | 1984       | Yes                 |
| Flagrant Foul   | No       | No        | 1990                | 1990                | 1990       | Yes                 |
| Instant Replay  | No       | No        | No                  | 2002                | 2002       | Yes                 |

---

## 4. Engine Modifications (NBA All-Time)

### 3.1 Shared Core (from NBA Current)

- All NBA Current engine features
- Seeded RNG, persistence, SIM-CORE, etc.

### 3.2 NBA All-Time Specific Additions

- [ ] **Era System** — Player metadata → era factor application
- [ ] **Rule Set Engine** — Configurable rule sets per era
- [ ] **Historical Franchises** — Defunct/relocated teams (Seattle, Vancouver, etc.)
- [ ] **Era-Appropriate Expansion** — Expansion drafts per era
- [ ] **Historical Records DB** — All-time records with era context
- [ ] **Hall of Fame** — Eligibility and induction simulation

### 3.3 Data Pipeline

- `datasets/nba-alltime/players.json` — Master player list with era metadata
- `datasets/nba-alltime/teams.json` — Historical franchises with era mappings
- `datasets/nba-alltime/rulesets.json` — Rule sets per era
- `datasets/nba-alltime/records.json` — Historical records with era tags

---

## 4. Data Creation Process

### Phase 1: Player List Assembly

- [ ] Owner provides initial top-50 per position
- [ ] Council claims positions to research
- [ ] Compile master list with sources (Basketball-Reference, 2K Historical, etc.)
- [ ] Owner reviews and approves final ~1,200 list

### Phase 2: Rating Assignment

- [ ] Base ratings from best source (2K Historical, Basketball-Reference)
- [ ] Council applies era factors with Owner guidance
- [ ] Owner reviews and calibrates top-50 per position
- [ ] Cross-position calibration (PG vs SG vs Bigs)

### Phase 3: Validation

- [ ] Draft simulations with council members
- [ ] Season sims with historical rosters
- [ ] Compare simulated stats vs historical records
- [ ] Iterate era factors until plausible

---

## 5. Acceptance Criteria (Gate 3)

- [ ] 1,200 players loaded with era metadata
- [ ] Era factors produce plausible rating distributions
- [ ] Draft from all eras completes without error
- [ ] Season sim with era rules completes
- [ ] Historical records plausible (within 15% of actual)
- [ ] All NBA Current gates still pass
- [ ] No NBA Current regressions introduced

---

## 8. Branch & Delivery

| Item            | Detail                                                |
| --------------- | ----------------------------------------------------- |
| **Branch**      | `sims/nba-alltime` (from `sims/nba-current` → `main`) |
| **Data Dir**    | `datasets/nba-alltime/`                               |
| **Shared Code** | `shared/core/`, `shared/ui/`, `shared/verification/`  |
| **Spec File**   | `docs/multi-sport/PROJECT_SPEC_NBA_ALLTIME.md`        |
| **Tasks**       | `tasks/T-NBA-ALLTIME-*`                               |

---

## 9. Risks & Mitigations

| Risk                   | Likelihood | Impact   | Mitigation                              |
| ---------------------- | ---------- | -------- | --------------------------------------- |
| Era factors subjective | High       | High     | Owner calibration + council cross-check |
| Pre-1980 data gaps     | High       | Medium   | Conservative estimates + Owner review   |
| Era balance in draft   | Medium     | High     | Draft sims with council + Owner tuning  |
| Records plausibility   | Medium     | High     | Validation gates + Owner review         |
| NBA Current regression | Low        | Critical | Full regression suite before merge      |

---

**Status:** SPECIFICATION — Awaiting Owner approval to proceed after NBA Current stabilization.
