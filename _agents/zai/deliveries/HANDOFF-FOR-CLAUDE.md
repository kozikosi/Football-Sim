# Z.ai Handoff for Claude — NFL Draft Simulator

**Date:** 2026-10-24
**From:** Z.ai (GLM session equivalent)
**To:** Claude (Architect)

---

## Context

This handoff captures the current state of the NFL Draft Simulator project for Claude's review and implementation. The project is a single-file HTML application (~650KB) containing:

- 1,200+ real Madden NFL 27 player ratings (`PLAYERS` array)
- 32 team depth charts (`TEAM_DATA` object)
- Customizable position weights (`DEFAULT_WEIGHTS`) with synergy penalties
- **Draft Simulator**: 32-team snake draft with CPU GMs using the same valuation math as the season engine
- **Season Engine**: 17-game schedule, 14-team playoff bracket, game-by-game simulation with box scores, recaps, advanced stats, awards
- **Matchup Model**: Nine unit ratings feed an exponential yardage/points model with game-plan adjustments

---

## Current Build State

| Build | Hash | Size | Status |
|-------|------|------|--------|
| **v20 Reference** (Claude's lineage) | `31b7d61f42a53f3b2e1a9f76c9ce9d1e291f8af54aa49e70ee36c2e91f7b1819` | 649,032 B | Reference build (Owner R2) |
| **Donor** (Season-first + DS patch) | `77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f` | 650,127 B | Donor of fixes |
| **Pre-Colors Candidate** | `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` | 657,486 B | Working candidate |
| **V22 Candidate** (with team colors) | `d15f6535...` | ~660KB | Team colors integrated |

---

## Owner Rulings (Binding — 19 Oct & 22 Oct)

| Ruling | Decision | Effect |
|--------|----------|--------|
| **R1** | Deployment out of scope | GitHub Pages was a test; internal project only |
| **R2** | v20 is reference build | `31b7d61f...` is merge base; donor is fix source |
| **R3** | Claude = Architect | Technical authority; advisors advise only |
| **R4** | No deputy, flat council | Equal seats; availability ≠ rank |
| **R5** | No cross-editing without Owner permission | Proposals via SUBMISSIONS.md only |
| **R-2** | Edge = single position | LEDG/REDG unified; flex matrix updated |
| **R-3** | Punter = 1 on model weights | Already implemented in `DEFAULT_WEIGHTS` |
| **R-4** | FB heavier blocking than RB | `RATING_SPECS` gains FB run-block weight |
| **R-5** | "Value Here" removed visually | Keep `r.v` in math; remove all UI |
| **R-6** | Star thresholds: 60 rush yds all / QB 300 pass + 3:1 TD:INT | Replaces `impact >= 1.0` gate |
| **R-7** | 3-4 is a toggle | DT↔LB swap is user switch, not baked |
| **R-9** | Team colors = GPT's table | 32-team palette with primary/secondary/tertiary |
| **R-10** | Defender stars = rating-led | Highest rating in game + winning team or 90+ game |
| **R-12** | Game ball tie = lowest static wins | Defense wins offense/defense ties |
| **R-13** | Flex table = Architect's design | Owner wants to see before it enters `FLEX` constant |
| **R-14** | 3-4: lowest LB comes off for Nickel | Default OLB2 → lowest-rated LB |
| **R-15** | Default tab = Draft | Homepage stays Draft; "make it beautiful" |
| **R-16** | All-time pool = 1,500 football | Per-sport targets (500 BB, 1,500 hockey/soccer, 2,000 baseball) |
| **R-17** | Delete invented ratings | 10 records removed; receipts in `_fixtures/example-ratings/DELETION-LOG.md` |
| **R-18** | Architect designs all tables beautifully | Standing mandate for visual quality |

---

## Critical Invariants (Never Break)

1. **Weight ↔ Wins Consistency**: `modelWeights()` = inverse of `slotWinsPerOvr()` (700 scale, QB=700)
2. **Replacement Floor**: CPU drafts never value slot below 76 OVR (`rlow` in `cpuPick`)
3. **Flex Penalties Everywhere**: `effOvr(player, slot)` used in draft board, lineup editor, season ratings, game sim
4. **Hungarian Lineup Optimizer**: User (advisory) and CPU (binding) both use `optimalLineup()`
5. **Game Plans Independent**: Offense/defense chosen separately; coaches scored vs *expected* opponent plan
6. **32.5 Points Per Win**: `POINTS_PER_WIN = 32.5` converts point differentials to wins
7. **Season Record Caps**: `SEASON_RECORD_CAPS` truncates at real NFL records
8. **Deterministic NFL Tiebreakers**: H2H → division → conference → point diff in `sortStandings()`
9. **Protected Constants**: `DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `RATING_SPECS` change only with Owner approval

---

## Pending Submissions (SUBMISSIONS.md queue)

**Round 1 (Harness — NOT YET DISPATCHED):**
- S-102: `pw4.js` spec (baseline-drift gates, 3 DOM-free entry points)
- S-103: `tests/funcdiff.js` function-level build differ
- S-202: SIM-CORE markers + extraction + manifest check
- S-203: `tests/2025_standings.js` real-2025 standings dataset
- S-301: `tests/run_all.sh` composite runner + mobile thresholds
- S-401: `phone.js` spec: static 390px overflow lint
- S-502: `validate.js` spec: external 2025 validation

**V23 Aesthetic (UK submissions — pending):**
- **S-UK-15**: Pink pastel rose theme, team colors on draft cards, Value Here removal, no blue paneling
- **S-UK-16**: "20-0" branding + floaty homepage (4 rose gold entities, selector pills, floating DRAFT button)

**Other Active:**
- S-V22-01 (Beam): Coaching philosophy/aggressiveness unlock after Week 1
- T5 (Persistence): Auto-save/resume + export/import + seeded RNG
- T11 (Leaders no scroll): Fix horizontal overflow desktop + 390px
- T6 (CPU draft): Verify round-order floors, spread telemetry

---

## Key Technical Notes for Claude

### Merge Status
- **Merge in flight**: v20 (base) + donor (fixes) → merged result has no hash yet
- **Key merge decisions needed** (P1 in SUBMISSIONS.md):
  - `cpuPick`: donor (credible floors + bounded miss) vs v20 (cap + 92-deep miss)
  - `color-scheme`: donor `light dark` vs v20 `light`
  - `render100`: donor (works) vs v20 (crashes `rWeights` ReferenceError)
  - Phone block: donor Variant A vs v20 (stale `msChecked` memo)
  - Wrapper: v20 has dual doctype + duplicate close; fix = clean donor header

### Harness Architecture (Round 1A Order)
1. **S-202**: SIM-CORE markers (`/*SIM-CORE-START*/`...`/*SIM-CORE-END*/`) + 3 headless entry points
2. **S-203**: Real-2025 standings dataset (32 teams, 17 games each, integrity verified)
3. **S-103**: `tests/funcdiff.js` — function-level diff with sha256 hashes
4. **S-102**: `pw4.js` — 100-season regression (r > 0.6), baseline bootstrap
5. **S-301**: `tests/run_all.sh` — composite runner with locked order

**Verifier Plan:** 1A = Nemo Ultra or fresh session; 1B = DS or GLM

### V23 Aesthetic Direction (Owner)
- **Theme**: Soft pink pastel rose (`#fff8f6` bg) + gold (`#d4b87a`) + white
- **"20-0" branding**: Header, footer, title, copy — everywhere in UI
- **Homepage**: Floaty — 4 rose gold stat entities, barely-there selector pills, centered floating DRAFT button
- **Team colors**: Per-player on draft cards (primary/secondary/tertiary from 32-team palette)
- **No blue**: Unless in team's hexes; panels use `color-mix(in srgb, var(--team-primary) 30%, var(--border))`

### Files to Reference
- `_agents/minimax/prototypes/V22-candidate-teamcolours.html` — team colors integrated
- `_agents/minimax/tools/build-team-colours.mjs` — 32-team palette (GPT's table, Owner R-9)
- `_agents/minimax/tools/post-merge-smoke.mjs` — E2E verifier (390px, console, 100-season report)
- `_agents/ds/tools/arch-probe.js` — 40-metric architecture probe
- `_agents/ds/tools/funcdiff-full.js` — function-level diff with hashes

---

## Immediate Next Steps for Claude

1. **Receive build `77bb9ed5...`** (GitHub push or attachment)
2. **Read S-102, S-103, S-401 in full** — per-entry accept/defer/reject
3. **Dispatch Round 1A** in order: S-202 → S-203 → S-103 → S-102 → S-301
4. **Apply V23 aesthetic** (S-UK-15, S-UK-16) — Owner priority
5. **Resolve merge keep-list** (P1 decisions)
6. **Deliver candidate build** → verification gate → promotion

---

## Contacts / Relay

- **Owner**: Direct (user) — permissions, publishing, rulings
- **GLM**: Protocol/docs maintainer — `STATUS.md`, `AGENTS.md`, `CHRONICLE.md`, `COUNCIL-BULLETIN.md`
- **Council**: DS, Nemo Super, Nemo Ultra, Pickle, Beam, UK, others — proposals in `SUBMISSIONS.md`

---

*This handoff is a living document. Update as state changes.*