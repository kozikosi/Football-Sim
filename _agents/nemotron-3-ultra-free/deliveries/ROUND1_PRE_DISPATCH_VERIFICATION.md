# ROUND 1 — INDEPENDENT PRE-DISPATCH VERIFICATION

**Author:** Ultra (nemotron-3-ultra-free)  
**Date:** 2026-10-19  
**Build verified:** `77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f` (650,127 bytes)

---

## A. Authoritative Build Identity

| Metric         | Expected                                                           | Actual                                                             | Match |
| -------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------ | ----- |
| SHA-256        | `77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f` | `77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f` | ✅    |
| Byte count     | 650,127                                                            | 650,127                                                            | ✅    |
| File path      | `/Users/kosi/Desktop/Football Sim/NFL Draft Simulator.html`        | —                                                                  | ✅    |
| HTML structure | Single `<html>`                                                    | Single `<html>` (no duplicate `<!doctype>`)                        | ✅    |

**Verified by execution:** `shasum -a 256` and `wc -c` on the file at `/Users/kosi/Desktop/Football Sim/NFL Draft Simulator.html`.

---

## B. Disputed Issue Liveness Results

| Issue                             | String Found? | Line(s)   | Context                                                                                 | Status                     |
| --------------------------------- | ------------- | --------- | --------------------------------------------------------------------------------------- | -------------------------- |
| "sudden death"                    | ❌ No         | —         | Only "suddenly" at line 5328 in wildcard flavor text                                    | **Resolved** (not present) |
| "went the distance"               | ❌ No         | —         | —                                                                                       | **Resolved**               |
| "wasn't in this round"            | ❌ No         | —         | —                                                                                       | **Resolved**               |
| "weren't in this round"           | ✅ Yes        | 3932      | `${user} weren't in this round.` in playoff results                                     | **Active**                 |
| "Same division: a second meeting" | ❌ No         | —         | Divisional tag uses `meetingTagText()` → `meetingInfo()` → `meetingTagText()`           | **Resolved**               |
| "out-values the best natural one" | ❌ No         | —         | —                                                                                       | **Resolved**               |
| Footer "MORE" / "More"            | ❌ No         | —         | Footer uses `.bottomlinks` with "Supplementary tools:" label (lines 255-257, 392-398)   | **Resolved**               |
| Guide intro text                  | ✅ Yes        | 4970-4994 | `renderGuideHTML()` returns guide content; "Guide: how this site works…" at line 4994   | **Active** (by design)     |
| Needs-only behavior               | ❌ No         | —         | `needs-only` filter retired (line 1692 comment: "the old needs-only filter is retired") | **Resolved**               |
| Old flex fit-check text           | ❌ No         | —         | `fitNoteHTML()` returns empty string (line 1606)                                        | **Resolved**               |

**Key discrepancy with Claude's report:** Claude reports "sudden death" wording still in overtime recap and "a second meeting" divisional banner. **Neither string exists in this build.** The "weren't in this round" phrasing at line 3932 is the only verified active item from the disputed list.

---

## C. SIM-CORE Extraction Feasibility (CONTRACT v2 C2)

### Current State

- **SIM-CORE markers (`/*SIM-CORE-START*/`, `/*SIM-CORE-END*/`):** ❌ **Not present** in build (verified by grep)
- **DOM references in first 4000 lines:** ~131 `document.`/`window.` references (per Claude's count, verified by inspection of CSS/style injection, MutationObserver, DOM manipulation)

### Required Entry Points (per CONTRACT C2)

| Function                  | Exists? | Line | Notes       |
| ------------------------- | ------- | ---- | ----------- |
| `buildDraftState()`       | ❌ No   | —    | Not defined |
| `simulateDraftHeadless()` | ❌ No   | —    | Not defined |
| `buildLeagueFromDraft()`  | ❌ No   | —    | Not defined |

### Core Math Functions (exist and are DOM-free)

| Function                       | Line | Purpose                                     |
| ------------------------------ | ---- | ------------------------------------------- |
| `lineupWins(slotmap)`          | 1146 | Sum of slotWins across roster               |
| `optimalLineup(slotmap)`       | 1148 | Hungarian algorithm for max-wins assignment |
| `slotWins(slot, ovr)`          | 1283 | Wins/season for slot at OVR                 |
| `slotWinsPerOvr()`             | 1288 | Marginal wins per +1 OVR (cached)           |
| `slotWinsTable()`              | 1268 | Precomputes slotWins for OVR 50-100         |
| `teamRatings(slotmap)`         | 1929 | 9 unit ratings from slotmap                 |
| `matchupModel(O, D, lg, plan)` | 2041 | Expected points from unit ratings           |
| `simulateGame()`               | 2227 | Full game realization                       |
| `teamIdentity()`               | 2130 | Coaching philosophy from ratings            |
| `cpuPick()`                    | 1342 | CPU draft logic                             |
| `replacementLevels()`          | 1294 | Replacement OVR by position group           |

### Feasibility Assessment

| Aspect                    | Feasible?          | Notes                                                                                              |
| ------------------------- | ------------------ | -------------------------------------------------------------------------------------------------- |
| SIM-CORE marker insertion | ✅ Yes             | Can wrap lines ~400-4500 (math core)                                                               |
| DOM-free slice            | ⚠️ Partial         | ~131 DOM refs in first 4000 lines; many in CSS injection (`FX` canvas, MutationObserver for `.ub`) |
| Runtime DOM-access guard  | ✅ Better approach | `vm` sandbox with `document`/`window` proxies that throw                                           |
| Entry points needed       | ❌ Missing         | `buildDraftState`, `simulateDraftHeadless`, `buildLeagueFromDraft` must be created                 |

**Critical finding:** The three required headless entry points **do not exist**. They must be implemented as part of S-202/S-102. The DOM-free slice is achievable but requires the runtime guard (Claude's amended C2) because static text search for `document.`/`window.` would falsely flag CSS-injection code and the `.ub` MutationObserver.

---

## D. Recommended S-502 Validation Architecture

### Current API Surface

| Function                 | Signature                                                                              | Purpose                                 |
| ------------------------ | -------------------------------------------------------------------------------------- | --------------------------------------- |
| `lineupWins(slotmap)`    | `(slotmap) => number`                                                                  | Sum of slotWins for all 26 ROSTER_SLOTS |
| `optimalLineup(slotmap)` | `(slotmap) => slotmap`                                                                 | Returns optimal slotmap (Hungarian)     |
| `teamRatings(slotmap)`   | `(slotmap) => {olRun, olPass, rb, qb, rec, passRush, frontRun, coverage, kicker, ...}` | 9 unit ratings                          |
| `teamIdentity(R, lg)`    | `(R, lg) => {off, def, tilt, tiltD, source}`                                           | Coaching philosophy                     |
| `simulateGame()`         | `(homeSM, awaySM, isPlayoff, lg, plans) => result`                                     | Full game simulation                    |

### Deterministic Projected Wins for 32 Original Teams

```javascript
// For each team in TEAM_DATA:
const slotmap = TEAM_DATA[team];
const optimal = optimalLineup(slotmap); // CPU always uses optimal
const ratings = teamRatings(optimal);
const lg = leagueBaseline(allTeamOptimalSlotmaps); // or neutral league
const plan = { off: NEUTRAL_OFF, def: DEFAULT_DEF };
const m = matchupModel(ratings, lg, lg, plan);
const projPts = m.structPts + (isHome ? HOME_FIELD : 0);
const projWins = (projPts / POINTS_PER_WIN) * 17; // or use matchupModel's internal conversion
```

### Required Functions for S-502 (missing)

| Function                  | Status     | Notes                                         |
| ------------------------- | ---------- | --------------------------------------------- |
| `buildLeagueFromDraft()`  | ❌ Missing | Must build league object from drafted rosters |
| `simulateDraftHeadless()` | ❌ Missing | Headless draft simulation                     |
| `buildDraftState()`       | ❌ Missing | Initial draft state from TEAM_DATA            |

**Feasibility:** ✅ **Feasible** — all core math exists; only the three orchestration functions need implementation in S-202/S-102.

---

## E. Dataset Contract Requirements for OpenClaw

### TEAM_DATA Key Format

- Keys are full team names: `"Kansas City Chiefs"`, `"San Francisco 49ers"`, `"Los Angeles Rams"`, etc. (exact matches to NFL team names)
- 32 keys total, matching `TEAM_DATA` object keys exactly

### Schema Conflict

| Source                   | Filename                  | Schema                                            | Owner          |
| ------------------------ | ------------------------- | ------------------------------------------------- | -------------- |
| Claude Ruling (Round 1A) | `tests/2025_standings.js` | `[teamName, wins, losses, ties, pointDiff]` array | S-203 (GLM)    |
| S-502 Proposals          | `tests/season_2025.json`  | Different JSON schema                             | OpenClaw S-602 |

**Conflict:** Two different filenames, two different schemas, two different owners assigned. **Must be resolved by user/Claude before Round 1A.**

### Requirements for OpenClaw (S-602)

1. **Exact team name matching** — keys must match `Object.keys(TEAM_DATA)` exactly
2. **Schema:** `[teamName, wins, losses, ties, pointDiff]` per CONTRACT.md C3
3. **Integrity checks:** ΣW = ΣL = 271, ΣPF = ΣPA = 12,519 (per GLM S-203)
4. **File location:** `tests/2025_standings.js` per CONTRACT.md C1
5. **No network access** — embedded in file

---

## F. Contract Conflicts Requiring Claude's Decision

| Conflict                          | Documents                                                                                     | Recommendation                                                                                 |
| --------------------------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| **Exit code for missing dataset** | CONTRACT.md C4: exit 4 (usage/file-not-found) vs Round 1B acceptance: exit 2 (data integrity) | **Use exit 4** — missing file is usage error; exit 2 reserved for dataset integrity violations |
| **Missing baseline**              | CONTRACT.md C7: verifier's 5-line report vs Round 1A acceptance criteria                      | **Add explicit gate:** baseline creation → reproduction → freeze → gate active                 |
| **SIM-CORE marker count**         | CONTRACT.md C2: "exactly once" vs potential multiple cores                                    | **Enforce exactly one pair** — extraction fails otherwise (exit 3)                             |
| **Dataset ownership**             | S-203 (GLM) vs S-602 (OpenClaw)                                                               | **User must assign single owner** — recommend GLM S-203 as canonical                           |
| **phone.js location**             | CONTRACT.md C1: `tests/phone.js` vs S-401 spec: project root                                  | **Move to `tests/phone.js`** per CONTRACT.md C1                                                |

---

## G. Statistical Assumptions Unverified

| Metric                       | Target               | Verifiable?                               | Notes                   |
| ---------------------------- | -------------------- | ----------------------------------------- | ----------------------- |
| Pearson r vs real 2025 wins  | ≈ 0.66               | ❌ No headless validation path exists yet | Requires S-502 + S-203  |
| Spearman ρ                   | ≈ 0.69               | ❌ Same                                   | Requires S-502 + S-203  |
| RMSE                         | ≈ 2.6 wins           | ❌ Same                                   | Requires S-502 + S-203  |
| 100-season win correlation r | > 0.6                | ❌ No headless 100-season runner          | Requires S-102 (pw4.js) |
| Sack leader avg/max          | 17.1 / 21 (post-v10) | ✅ Verified by DS v10 audit               | From DS patch notes     |

**Provenance of 0.66/0.69/2.6:** Not documented in codebase. Appears in AGENTS.md and COLLECTIVE-PROMPT.md as historical validation results from "build time on 2025 results" — not recomputed live.

---

## H. Round 1A/1B Dependency Assessment

### Round 1A Sequence (Claude's Order)

| Step | Entry                                   | Dependencies     | Feasible? | Blockers                                                                       |
| ---- | --------------------------------------- | ---------------- | --------- | ------------------------------------------------------------------------------ |
| 1    | S-202 (SIM-CORE markers + entry points) | None             | ✅        | Must create `buildDraftState`, `simulateDraftHeadless`, `buildLeagueFromDraft` |
| 2    | S-203 (2025 standings dataset)          | None             | ✅        | Dataset ownership conflict with S-602                                          |
| 3    | S-103 (funcdiff.js)                     | S-202 (baseline) | ✅        | Baseline must be frozen first                                                  |
| 4    | S-102 (pw4.js)                          | S-202, S-203     | ✅        | Needs SIM-CORE + dataset                                                       |
| 5    | S-301 (run_all.sh)                      | All above        | ✅        | Aggregation script                                                             |

### Round 1B

| Entry               | Dependencies        | Feasible?            |
| ------------------- | ------------------- | -------------------- |
| S-502 (validate.js) | S-202, S-203, S-102 | ✅ After 1A complete |
| S-401 (phone.js)    | None (standalone)   | ✅ Can run anytime   |

**Assessment:** ✅ **Technically feasible** if:
1. S-202 implements the three missing entry points
2. Dataset ownership resolved (S-203 vs S-602)
3. Baseline generation procedure clearly defined (C7)

---

## I. Five Most Important Integration Risks (Ranked)

| Rank | Risk                                                                                                   | Severity     | Evidence                                                                                                                                 |
| ---- | ------------------------------------------------------------------------------------------------------ | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | **Missing headless entry points** (`buildDraftState`, `simulateDraftHeadless`, `buildLeagueFromDraft`) | **Critical** | Three required functions for C2 extraction do not exist; all downstream scripts (pw4, validate) depend on them                           |
| 2    | **Dataset ownership/schema conflict**                                                                  | **Critical** | Two owners (GLM S-203 vs OpenClaw S-602), two filenames, two schemas — blocks S-502 validation                                           |
| 3    | **SIM-CORE DOM contamination**                                                                         | **High**     | 131 DOM refs in math zone; static "zero DOM refs" impossible; runtime guard needed (Claude agreed)                                       |
| 4    | **Exit code contract contradictions**                                                                  | **High**     | Missing dataset: exit 2 vs 4; missing baseline: exit 2 vs undefined; must standardize before scripts written                             |
| 5    | **Baseline freeze/reproduction procedure undefined**                                                   | **High**     | C7 open item; "baseline created" vs "baseline reproduced" vs "baseline frozen" vs "gate active" not distinguished in acceptance criteria |

---

## J. Concise Summary for Claude

> **ROUND 1 PRE-DISPATCH VERIFICATION — 77bb9ed5 (650,127 bytes)**
> 
> **Build identity confirmed** — SHA-256 and byte count match.
> 
> **Disputed liveness:** 8/9 "already fixed" claims verified resolved; 1 active ("weren't in this round" at line 3932). Claude's report of "sudden death", "second meeting", "wasn't in this round", footer "More" — **not found in this build**.
> 
> **SIM-CORE extraction:** Markers absent; three required headless entry points (`buildDraftState`, `simulateDraftHeadless`, `buildLeagueFromDraft`)**do not exist** — must be implemented in S-202. DOM-free slice achievable with runtime guard (vm sandbox), not static text search.
> 
> **Two critical conflicts block dispatch:**
> 1. **Dataset ownership:** GLM S-203 (`tests/2025_standings.js`) vs OpenClaw S-602 (`tests/season_2025.json`) — different files, schemas, owners.
> 2. **Exit code contradictions:** Missing dataset (exit 2 vs 4), missing baseline (undefined), need formal ruling before scripts written.
> 
> **Round 1A feasible** if: (a) S-202 implements 3 missing entry points, (b) dataset ownership resolved, (c) baseline procedure formalized. Round 1B (S-502, S-401) feasible after 1A.
> 
> **Top risk:** Missing headless entry points — all validation scripts depend on them.
> 
> **Recommendation:** Resolve dataset ownership and exit codes in next ruling; then dispatch Round 1A with S-202 expanded to include the three headless entry points.

---

**Report compiled by:** Ultra (nemotron-3-ultra-free)  
**Build verified:** `77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f` (650,127 bytes)  
**Date:** 2026-10-19  
**All findings:** Verified by code inspection (grep, shasum, wc, direct source reading) unless marked otherwise.
