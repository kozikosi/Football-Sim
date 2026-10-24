# Multi-Sport Documentation Index

**Purpose:** Central navigation for all multi-sport simulation documentation.

---

## Core Specifications

| Document                                         | Status      | Description                                                 |
| ------------------------------------------------ | ----------- | ----------------------------------------------------------- |
| [VISION_AND_ROADMAP.md](./VISION_AND_ROADMAP.md) | ✅ Complete | Vision, priority order, data philosophy, guiding principles |
| [STRUCTURE_GUIDE.md](./STRUCTURE_GUIDE.md)       | ✅ Complete | Directory layout, principles, contribution rules            |
| [QUESTIONS-TO-OWNER.md](./QUESTIONS-TO-OWNER.md) | ✅ Complete | Template for eliciting Owner guidance                       |

---

## Project Specifications

| Spec                                                         | Status           | Branch             | Priority |
| ------------------------------------------------------------ | ---------------- | ------------------ | -------- |
| [PROJECT_SPEC_NFL_ALLTIME.md](./PROJECT_SPEC_NFL_ALLTIME.md) | ✅ Spec Complete | `sims/nfl-alltime` | 2        |
| [PROJECT_SPEC_NBA_CURRENT.md](./PROJECT_SPEC_NBA_CURRENT.md) | ✅ Spec Complete | `sims/nba-current` | 3        |
| [PROJECT_SPEC_NBA_ALLTIME.md](./PROJECT_SPEC_NBA_ALLTIME.md) | ✅ Spec Complete | `sims/nba-alltime` | 4        |

---

## Shared Architecture

| Document          | Location                | Purpose                           |
| ----------------- | ----------------------- | --------------------------------- |
| `ARCHITECTURE.md` | `/docs/ARCHITECTURE.md` | Core engine architecture (shared) |
| `TEST-PLAN.md`    | `/docs/TEST-PLAN.md`    | Unified test strategy             |
| `DECISIONS.md`    | `/docs/DECISIONS.md`    | Binding decision registry         |
| `RFC-LOG.md`      | `/docs/RFC-LOG.md`      | Architecture Decision Records     |
| `GLOSSARY.md`     | `/docs/GLOSSARY.md`     | Shared terminology                |

---

## Data Directories (To Be Created)

| Directory               | Sport        | Purpose                           |
| ----------------------- | ------------ | --------------------------------- |
| `datasets/nfl-alltime/` | NFL All-Time | Players, teams, rulesets, records |
| `datasets/nba-current/` | NBA Current  | Players, teams, ratings, ruleset  |
| `datasets/nba-alltime/` | NBA All-Time | Players, teams, rulesets, records |

---

## Shared Code Structure (To Be Extracted)

```
shared/
├── core/           # Math engine, valuation, lineup, draft, season, game
├── ui/             # Shared UI components, patterns, mobile patterns
└── verification/   # Harnesses, gates, manifest tools, diff tools
```

---

## Question Templates

| Template                | Purpose                                        |
| ----------------------- | ---------------------------------------------- |
| `QUESTIONS-TO-OWNER.md` | Standard template for eliciting Owner guidance |

---

## Project Status Summary

| Project           | Phase         | Status            | Next Milestone              |
| ----------------- | ------------- | ----------------- | --------------------------- |
| NFL Current (v21) | Stabilization | Merge in progress | v21 merge complete → Gate 0 |
| NFL All-Time      | Specification | Spec complete     | Data assembly → Gate 1      |
| NBA Current       | Specification | Spec complete     | Data acquisition → Gate 1   |
| NBA All-Time      | Specification | Spec complete     | Depends on NBA Current      |

---

## Contribution Entry Points

| Role              | Entry Point                                               |
| ----------------- | --------------------------------------------------------- |
| **Data Assembly** | `datasets/*/` — player lists, ratings, metadata           |
| **Engine Work**   | `shared/core/` — math, draft, season, game engines        |
| **UI/UX**         | `shared/ui/` — components, mobile patterns, accessibility |
| **Verification**  | `shared/verification/` — harnesses, gates, diff tools     |
| **Data Curation** | `datasets/*/` — player lists, ratings, historical data    |
| **Architecture**  | `docs/` — specs, RFCs, decisions, incidents               |
| **Process**       | `docs/CONTRIBUTING.md`, `docs/ONCALL-ROTATION.md`         |

---

## Quick Start for New Contributors

1. Read `VISION_AND_ROADMAP.md` → understand the vision
2. Read `STRUCTURE_GUIDE.md` → understand the layout
3. Read `CONTRIBUTING.md` → understand the process
4. Pick a task from `tasks/` or propose new in `SUBMISSIONS.md`
5. Follow `QUESTIONS-TO-OWNER.md` format for questions
6. Log work in `CHRONICLE.md` with evidence

---

## Document Status Legend

| Badge       | Meaning                                 |
| ----------- | --------------------------------------- |
| ✅ Complete | Document finalized and reviewed         |
| 🟡 Draft    | Work in progress, not yet reviewed      |
| 🔴 Blocked  | Waiting on Owner decision or dependency |
| ⚪ Planned  | Not yet started                         |

---

_Last Updated: 2026-10-20_  
_Maintained by: Council (append-only, see CHRONICLE.md for history)_
