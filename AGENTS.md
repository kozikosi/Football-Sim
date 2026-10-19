# AGENTS.md — Instructions for AI Coding Agents

## Project Purpose
This is the **NFL Draft Simulator** (Madden NFL 27 ratings, Season-first layout) — a single-file HTML application containing:
- 1,200+ real Madden NFL 27 player ratings (`PLAYERS` array)
- 32 team depth charts (`TEAM_DATA` object)
- Customizable position weights (`DEFAULT_WEIGHTS`) with synergy penalties
- **Draft Simulator**: 32-team snake draft with CPU GMs using the same valuation math as the season engine
- **Season Engine**: 17-game schedule, 14-team playoff bracket, game-by-game simulation with box scores, recaps, advanced stats, awards
- **Matchup Model**: Nine unit ratings (QB, RB, WR/TE, OL run/pass, pass rush, run defense, coverage, kicker) feed an exponential yardage/points model with game-plan adjustments

---

## Architecture Overview

### Data Layer (embedded in HTML)
| Variable | Purpose |
|----------|---------|
| `PLAYERS` | Array of `[name, pos, team, ovr, spd, str, agi, cod, inj, awr, xf?]` — 1,200+ entries |
| `TEAM_DATA` | Object: `teamName -> {slot: {ovr, name}}` for 36 roster slots per team |
| `DEFAULT_WEIGHTS` | Position-weight map (QB=320, OT=295, DE=350, CB=350, etc.) |
| `ROSTER_SLOTS` | 26 starter slots drafted (excludes DL5, LB4, CB4, SS2, FS2, WR4, P, FB) |
| `FLEX` / `NATURAL_SLOT_MAP` | Flex rules: which positions can play which slots, with rating penalties |

### Core Math Functions (do not modify without approval)
| Function | Purpose |
|----------|---------|
| `slotWins(slot, ovr)` | Wins/season added by a player at `slot` with given OVR vs. 70 baseline |
| `slotWinsPerOvr()` | Marginal wins per +1 OVR at each slot (cached) |
| `modelWeights()` | Converts `slotWinsPerOvr` to 0–700 scale (QB=700) |
| `replacementLevels(pool, rosters)` | Replacement OVR by position group based on remaining starters league-wide |
| `cpuPick(teamIndex, state)` | CPU GM logic: value over replacement × bias × noise, with miss rate |
| `matchupModel(O, D, lg, plan)` | Expected points from offensive/defensive unit ratings + game plan |
| `teamRatings(slotmap)` | Nine unit ratings from lineup (flex penalties applied) |
| `simulateGame()` | Realizes yards/TOs/sacks from model, adds noise, late-game script, OT |
| `optimalLineup(slotmap)` | Hungarian algorithm for max-wins slot assignment (flex-aware) |

### UI Tabs (in DOM order)
1. **Season** (default active) — the whole site lives here: onboarding, draft handoff, preseason editor, weekly sim, playoffs, Super Bowl
2. **Draft** — setup, live draft board, priority chart, roster depth chart, results with "Play a Season" CTA
Supplementary bottom links (below the views): **Team Rankings** (weights left, table right), **Player Browser**, **Position Rankings**, **Team Comparison**, **Guide**.

### Season Phases (state machine in `seasonState.phase`)
`preseason` → `regular` (weeks 1–17) → `regularReview` → `playoffs` (wildcard→divisional→champ→superbowl) → `complete`

---

## Critical Invariants (Never Break These)

1. **Weight ↔ Wins Consistency**: `modelWeights()` must remain the inverse of `slotWinsPerOvr()`. The 700-scale is derived, not arbitrary.
2. **Replacement Floor**: CPU drafts never value a slot below 76 OVR replacement (see `rlow` in `cpuPick`).
3. **Flex Penalties Apply Everywhere**: `effOvr(player, slot)` used in draft board, lineup editor, season ratings, game simulation.
4. **Hungarian Lineup Optimizer**: Both user (advisory) and CPU (binding) use `optimalLineup()` — same math.
5. **Game Plans Are Independent**: Offense and defense chosen separately; coaches scored vs. *expected* opponent plan, not actual.
6. **32.5 Points Per Win**: `POINTS_PER_WIN = 32.5` converts point differentials to wins (Pythagenpat-based).
7. **Single-Season Record Caps**: `SEASON_RECORD_CAPS` truncates stats at real NFL records (5400 pass yds, 2060 rush, etc.).
8. **Deterministic Seeding**: NFL tiebreakers (H2H → division → conference → point diff) in `sortStandings()`.

---

## Required Workflow for Any Change

1. **Read the relevant section first** — understand the function, its callers, and its tests.
2. **Propose the change** — explain *what* and *why* before editing. Include the exact lines you'd modify.
3. **Make minimal edits** — touch only the necessary functions/variables.
4. **Test the math** — run the validation checks:
   - `node pw4.js` (draft → season → playoffs → 100-sim regression)
   - `node validate.js` (real 2025 wins: r≈0.66, ρ≈0.69, RMSE≈2.6)
   - `bash tests/run_all.sh` (t30/t32/cal2/cal3)
5. **Verify UI** — `node phone.js` (390px overflow check), manual tab navigation.
6. **Summarize** — what changed, why, how tested.

---

## Prohibited Actions
- ❌ Change `DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC` coefficients, `PLAN_K`, `RATING_SPECS` without approval
- ❌ Invent player ratings, team assignments, or statistical outputs
- ❌ Add paid APIs, CDN dependencies, or build steps
- ❌ Split the single HTML file without explicit request
- ❌ Create git commits/branches/PRs unless asked

---

## Ownership & Write Protocol (submission workflow — adopted 19 Oct, supersedes the pen model)

**Principle: agents propose, Claude implements, the user relays and publishes.**

| Path | Who may write | Everyone else |
|------|---------------|---------------|
| `NFL Draft Simulator.html` | **Claude only** (build arrives via the user) | read-only for every agent |
| `SUBMISSIONS.md` | each agent: **its own section only**, above its end-anchor | user/verifier: Status lines and decision notes |
| `_agents/<name>/` | that agent only | never edit or rename another agent's files |
| `_reference/`, `_archive/` | nobody — frozen | read-only |
| `AGENTS.md`, `STATUS.md`, `MASTER_GUIDE.md`, `master_task_list.md`, `tasks/` | GLM session maintains at the user's request; decisions are the user's | propose changes via `SUBMISSIONS.md` |
| `Football Sim/` (repo) | user pushes; GLM commits snapshots at the user's request | propose |

1. **No agent edits the product file or publishes.** All improvements, fixes and code go into `SUBMISSIONS.md`.
2. **Claude is the sole implementer** — decides accept/defer/reject and how to build; resolves conflicting proposals; delivers complete files through the user.
3. **Self-contained submissions** — quote the exact current code being replaced, then give the full replacement; Claude sees only what the paste contains. Always state the build hash the proposal applies to.
4. **Read-only rule** — files you didn't author and don't own per the table above are read-only.
5. **Test obligations** — before submitting code: `node --check`, and note what you verified. After Claude delivers a build: a read-only verification pass (end-to-end draft → season → playoffs, clean console) gates the hash bump in `STATUS.md`.
6. **Attribution lives in git commits and `_agents/` folders — never in filenames.**
7. **Reading is free, messaging is not** — sessions may read anything; only the user relays between sessions.

---

## Key Files & Entry Points
- **Canonical app**: `NFL Draft Simulator.html` at the project root — the GLM verified Season-first build + the DS session's finished patch (restyle + three fixes including the division-tag look-ahead bug), verified playable end-to-end in-browser Oct 19 ~02:05. Change log: `_agents/ds/deliveries/Patch Notes (DS Flash).md`. Rollback: `backup-before-reorg/NFL Draft Simulator (GLM verified build).html` (also on the clone's `glm` branch)
- **Protocol layer** (root): `AGENTS.md` (this file) · `STATUS.md` (writer lock + build hash + parked decisions) · `master_task_list.md` (shared ledger) · `MASTER_GUIDE.md` (Season-first handoff doc) · `tasks/T1…T12` packets for colleague agents · `tests/madden-sim.spec.js`
- **`_agents/`**: per-session workspaces — `glm/` (this session), `ds/` (Master Doctrine, Patch Notes, its snapshots), `nemo-super/` (design doc + Season-First rewrite), `nemo-ultra/` (19 patch scripts; session still active). Nothing here is authoritative — see `_agents/README.md`
- **`_archive/`**: superseded builds, frozen — `(7)` (Claude base + Nemo Ultra fixes), `(8)` (pure Claude), `(9) (OC)` (recovered); lineage in its `BUILD-LOG.md`
- **`_reference/`**: the user's uploads (`Sacks.webp`, `Sacksmol.webp`), byte-identical copies — never edited, never renamed
- **`Football Sim/`**: the repository — git clone of `github.com/kozikosi/Football-Sim`, checked out on `main`; branches `main` (Claude-line only) + `glm`, `ds`, `nemo-super`, `nemo-ultra`, ownership map in its `BRANCHES.md`; push pending (user credentials required)
- **Backups**: `backup-before-reorg/` (7 verified snapshots) + full-folder tar snapshots in the OpenCode temp dir
- **Validation scripts** (`pw4.js`, `validate.js`, `phone.js`, `mk.sh`) are named in old docs but absent — recreate before any regression run

---

## Quick Reference: Where to Look

| Task | Search For |
|------|------------|
| Draft board columns | `boardEntries()`, `renderDraftBoard2()` |
| CPU draft logic | `cpuPick()`, `cpuBias()`, `cpuNoise()`, `cpuMiss()` |
| Season simulation | `simulateGame()`, `playGame()`, `simulateCurrentWeek()` |
| Matchup math | `matchupModel()`, `applyOffPlan()`, `applyDefPlan()` |
| Lineup/flex | `optimalLineup()`, `effOvr()`, `flexPenaltyFor()`, `lineupEditorHTML()` |
| Game plans | `ensureGamePlans()`, `teamIdentity()`, `planWhy()` |
| Recaps/narrative | `generateGameSummary()`, `playByPlay()`, `factorParagraph()` |
| Awards | `computeRegularSeasonAwards()`, `computePlayoffAwards()` |
| Mobile CSS | `@media (max-width:760px)` block |
| Weight controls | `buildControls()`, `modelWeights()`, `personalWeights` |

---

## Style Rules (from project conventions)
- Plain informative language; no "expected scoring"/"before kickoff" in post-game text
- Critique only 85+ OVR players in recaps
- Stats kept near real NFL records (enforced by `SEASON_RECORD_CAPS`)
- User's team shown in blue (`.ub` class, MutationObserver on `.ub`)
- "2-Pt Conv" not "two-point conversion" (except Guide)
- No "with no strong lean either way" anywhere
- Flex is realistic (not an exploit); QB **cannot** flex

---

## Testing Checklist Before Delivery
- [ ] Draft completes without errors (all 32 teams, 26 rounds)
- [ ] Season sims to completion (regular + playoffs + Super Bowl)
- [ ] 100-season validation (`pw4.js`) produces r > 0.6
- [ ] Phone layout: no horizontal scroll at 390px (`phone.js`)
- [ ] Weight changes recalc instantly in Team Rankings
- [ ] Flex penalties visible in draft board "Value here" column
- [ ] Game recaps show chronological scoring + turnovers + game ball
- [ ] No console errors in browser devtools