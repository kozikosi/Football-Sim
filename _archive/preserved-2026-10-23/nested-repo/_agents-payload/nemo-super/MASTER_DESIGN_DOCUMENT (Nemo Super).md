# Madden NFL 27 Simulator — Master Design Document

**Version:** v2.0 (Season-First Architecture)  
**Status:** Active / Guiding all future work  
**File:** Single-file HTML, zero dependencies, no build step  
**Audience:** AI coding agents, human developers, reviewers

---

## 1. Project Purpose

The Madden NFL 27 Simulator is a **single-file browser application** that lets a user:
1. **Draft** a 32-team fantasy NFL roster via snake draft (CPU GMs use the same valuation math as the season engine)
2. **Simulate** a full 17-game regular season + 7-team playoff bracket + Super Bowl
3. **Review** game recaps, box scores, advanced stats, awards, and a 100-season regression report

This is **not** a power-ranking calculator first. The **Season / Draft Simulator loop is the core product**. Team rankings, player browsers, and position weights are supplementary tools that support the draft-and-season loop.

---

## 2. Vision & Positioning

### Primary Branding

- **Title:** `NFL Draft Simulator` (or `Madden NFL 27 Draft & Season Simulator`)
- **Tagline:** Draft your team, simulate the season, win the Super Bowl.
- **Primary call to action:** Start Draft → Sim Season → Review Results

### Secondary / Supplementary Tabs

These exist to serve the draft-and-season loop, never to dominate it:
- Team Rankings (real NFL rosters only; user weights do NOT affect season sim)
- Player Browser
- Position Rankings
- Team Comparison
- Guide
- Settings / Model Weights (demoted to a collapsible footer section or Settings tab)

### What Gets Removed / Demoted

- The left-panel weight controls are **not** the main feature. They move to Settings or a collapsible "Model Settings" section.
- "NFL Team Power Ranking Model" header text — removed. Replaced by Draft/Season branding.
- "Adjust any weight on the left..." subtitle — removed.
- "Needs only" toggle on draft board — removed; needs filtering is smoothed into the UX.
- Confusing flex-explanation paragraphs (e.g., "The best flexed player out-values the best natural one...") — removed or dramatically simplified.
- Percentile-rank language from draft results — removed.

---

## 3. Core Invariants (Never Break)

These are inherited from AGENTS.md and remain absolute:
1. **Weight ↔ Wins Consistency:** `modelWeights()` is the inverse of `slotWinsPerOvr()`. The 700-scale is derived, not arbitrary.
2. **Replacement Floor:** CPU drafts never value a slot below 76 OVR replacement (`rlow` in `cpuPick`).
3. **Flex Penalties Apply Everywhere:** `effOvr(player, slot)` used in draft board, lineup editor, season ratings, game simulation.
4. **Hungarian Lineup Optimizer:** Both user (advisory) and CPU (binding) use `optimalLineup()` — same math.
5. **Game Plans Are Independent:** Offense and defense chosen separately; coaches scored vs. _expected_ opponent plan, not actual.
6. **32.5 Points Per Win:** `POINTS_PER_WIN = 32.5` converts point differentials to wins.
7. **Single-Season Record Caps:** `SEASON_RECORD_CAPS` truncates stats at real NFL records (deterministic clamp — never random subtraction).
8. **Deterministic Seeding:** NFL tiebreakers (H2H → division → conference → point diff) in `sortStandings()`.
9. **QB Cannot Flex:** QB is locked to QB slot. Flex guide must state this clearly.
10. **Single HTML File:** No split into multiple files. No CDN dependencies. No build step.

---

## 4. Architecture (Single-File Constraint)

The file remains one HTML document containing:

| Section           | Purpose                                                                                                                                      |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `<head>` + CSS    | Theme tokens, layout, mobile-first responsive rules                                                                                          |
| `PLAYERS`         | ~1,200+ player rating tuples                                                                                                                 |
| `TEAM_DATA`       | 32 team depth charts (36 roster slots)                                                                                                       |
| `DEFAULT_WEIGHTS` | Position-weight map                                                                                                                          |
| Math layer        | `slotWins`, `slotWinsPerOvr`, `modelWeights`, `replacementLevels`, `cpuPick`, `matchupModel`, `teamRatings`, `optimalLineup`, `simulateGame` |
| Draft engine      | Snake draft, CPU GM logic, draft board, roster editor                                                                                        |
| Season engine     | 17-game schedule, standings, tiebreakers, playoffs, awards                                                                                   |
| Narrative layer   | Game recaps, play-by-play, dramatic endings, factor analysis                                                                                 |
| UI layer          | Tabs, tables, cards, modals, confetti                                                                                                        |

### Code Organization Within the File

Use clear region comments so colleagues can navigate:

```javascript
// #region DATA — PLAYERS, TEAM_DATA, WEIGHTS
// #endregion

// #region MATH — slotWins, matchupModel, teamRatings, optimalLineup
// #endregion

// #region DRAFT — snake order, cpuPick, draft board, roster
// #endregion

// #region SEASON — schedule, standings, playoffs, awards
// #endregion

// #region NARRATIVE — recaps, playByPlay, dramaticEnding
// #endregion

// #region UI — tabs, renderers, event wiring
// #endregion

// #region INIT — tab setup, first render
// #endregion
```

---

## 5. UI / UX Requirements

### 5.1 Tab Order (New Vision)

| Order | Tab                      | Role                                                          |
| ----- | ------------------------ | ------------------------------------------------------------- |
| 1     | **Season**               | Schedule, standings, recaps, playoffs, awards — the core loop |
| 2     | Draft                    | Draft setup, live board, roster                               |
| 3     | Team Rankings            | Supplementary                                                 |
| 4     | Player Browser           | Supplementary                                                 |
| 5     | Position Rankings        | Supplementary                                                 |
| 6     | Team Comparison          | Supplementary                                                 |
| 7     | Guide                    | Reference                                                     |
| 8     | Settings / Model Weights | Collapsible footer or separate tab                            |

The **Season tab is the default active view** when a season exists. When no season exists, show a "Start Season" prompt that leads to draft setup.

### 5.2 Mobile (Non-Negotiable)

- **No horizontal scroll anywhere at 390px.** Every table stacks into labeled cards (`data-label` attributes).
- All grids collapse to single column at ≤760px.
- Text sizes readable on phone without zooming.
- Draft board compressed vertically: each player is a compact card, not a wide row with many stat columns.
- Audit every view at 390px with a phone test (`phone.js` equivalent).

### 5.3 Draft Board (Compressed Mobile View)

Each player card shows, in minimal vertical space:
- Name (primary)
- Pos / Team / OVR (secondary, inline)
- Wins / Value / Priority / Gone (compressed badges or inline chips)
- Draft button (prominent tap target)
- Expand-on-tap for details (flex penalty, alternative fits)

Remove the "Needs only" toggle. Needs filtering happens via position chips and sorting.

### 5.4 Season View

- Week-by-week schedule with results
- Standings with division/conference rank
- Game recaps that are chronological archives (not re-rolled on each view)
- Playoff bracket with aligned "Final" labels
- Awards (regular season + postseason)
- Season Review page after Super Bowl

### 5.5 Visual Hierarchy

- User's team shown in blue (`.ub` class) — applied at render time, NOT via MutationObserver text-walking.
- Confetti/rewards for: playoff clinch, division title, #1 seed, conference title, Super Bowl win, streaks, 10+ wins.
- Respect `prefers-reduced-motion`.

---

## 6. Math & Simulation Standards

### 6.1 What the Season Sim Uses

The season simulation uses its **own neutral matchup model**. It does **NOT** use the Team Rankings weight sliders. This must be stated clearly in UI so users don't think their weights changed season outcomes.

### 6.2 Math Functions (Do Not Modify Without Approval)

| Function                           | Purpose                                  |
| ---------------------------------- | ---------------------------------------- |
| `slotWins(slot, ovr)`              | Wins/season added vs 70 baseline         |
| `slotWinsPerOvr()`                 | Marginal wins per +1 OVR (cached)        |
| `modelWeights()`                   | 0–700 scale from slotWinsPerOvr (QB=700) |
| `replacementLevels(pool, rosters)` | Replacement OVR by position group        |
| `cpuPick(teamIndex, state)`        | CPU GM logic                             |
| `matchupModel(O, D, lg, plan)`     | Expected points                          |
| `teamRatings(slotmap)`             | Nine unit ratings                        |
| `simulateGame()`                   | Realizes yards/TOs/sacks, noise, OT      |
| `optimalLineup(slotmap)`           | Hungarian algorithm                      |

### 6.3 Automatic Lineup Application

After the draft completes, **automatically apply the recommended lineup** to the user's roster. Even if the user drafted inefficiently, the math's best arrangement is applied. The user can override it later.

### 6.4 Overtime Rules (Modern NFL)

- **Regular season:** One 10-minute OT period. Both teams get a possession unless the first drive scores a TD. If still tied after OT, it's a tie.
- **Postseason:** Multiple OT periods until a winner. Both teams get at least one possession.
- **No sudden death walk-off FG on first possession** unless it's a TD.
- Fix narrative: walk-off touchdown belongs in the OT section, not Q4.

### 6.5 Turnover Narrative

Every turnover must name the players involved: who threw/fumbled, who forced/recovered, quarter, and score impact. No generic "turnovers canceled out" without specifics.

### 6.6 Head-to-Head

If teams met earlier in the season (or playoffs), mention the result briefly. Do not claim a "second meeting" in Week 2 if they haven't played yet.

---

## 7. Narrative Standards

### 7.1 Style Rules

- Plain informative language
- No "expected scoring" or "before kickoff" in post-game text
- Critique only 85+ OVR players
- Stats kept near real NFL records
- "2-Pt Conv" not "two-point conversion" (except in Guide)
- No "with no strong lean either way" anywhere
- User's team in blue

### 7.2 Recaps

- Chronological scoring + turnovers + game ball
- Every score and turnover narrated with scorer names
- Final drive integrated into the flow
- Game ball to winning team unless losing team had 90+ performance grade
- Indent the game-ball sentence, end with exclamation point

### 7.3 Game Plans

- Paragraph broken into indented sections, new paragraph when switching teams
- "through this defense" → "through your defense" when opponent attacks user

### 7.4 2-Pt Conv

- Explain when a team goes for 2 vs XP
- Preseason option: Cautious / Balanced / Aggressive
- Teams always go for 2 when down 8 or 11 late

---

## 8. Data Integrity

### 8.1 Player Identity

- Assign every player a **unique internal ID** for draft selections, roster assignments, stats, search, saves.
- Do not identify players by name alone (name-based `findIndex` is fragile).

### 8.2 Record Caps

- Deterministic clamp at `SEASON_RECORD_CAPS`. No random subtraction.
- A stat never goes down once recorded.

### 8.3 Schedule

- Division games: real home-and-home.
- Non-division: structured pairings with reasonable home/away balance (8–9 home games).
- Conference split roughly maintained.
- Fail gracefully if schedule generation cannot complete (show retry UI, not console error).

### 8.4 Standings & Tiebreakers

- Win pct → head-to-head → division record → conference record → common games → point diff
- Multi-team ties handled safely (no circular H2H ambiguity breaking sort)
- Point differential is **not** an early tiebreaker

---

## 9. Persistence & Reproducibility

### 9.1 Auto-Save (Tier 2, high priority)

- `localStorage` save after every draft pick, lineup change, completed week, playoff game, weight change.
- On load: "Resume where you left off?" (Resume | Start New)
- Versioned save blob with discard path

### 9.2 Seeded RNG (Tier 2)

- Optional simulation seed for reproducible seasons
- Same seed + same draft = identical season
- Useful for debugging and agent comparisons

### 9.3 Export / Import

- Download save as JSON
- Load save from JSON
- No accounts, no server, no backend

---

## 10. Testing Requirements

### 10.1 Validation Scripts

| Script                  | Purpose                                        |
| ----------------------- | ---------------------------------------------- |
| `node --check`          | Syntax check on extracted script               |
| `node pw4.js`           | Draft → season → playoffs → 100-sim regression |
| `node validate.js`      | Real 2025 wins: r≈0.66, ρ≈0.69, RMSE≈2.6       |
| `node phone.js`         | 390px overflow check                           |
| `bash tests/run_all.sh` | Full test suite                                |

### 10.2 Unit Tests

Test pure math functions in isolation:
- `slotWins`, `slotWinsPerOvr`, `modelWeights`
- `cpuPick`, `optimalLineup`, `replacementLevels`
- `matchupModel`, `teamRatings`
- `flexPenaltyFor`

### 10.3 Edge Fixtures

- Score of exactly 1 (coin flip in `realisticScore`)
- 0–0 regulation into OT
- Two players sharing a full name (draft integrity)
- Three-team wildcard race at 10–7, no common opponent (tiebreaker)
- User 2-pt conv in SAF bucket with zero defensive safeties

---

## 11. What We Do NOT Build (User-Agreed Exclusions)

- 5-file split / multi-file architecture
- Multi-year franchise, contracts, Hall of Fame
- Player busts, progression, injuries, aging
- Trades, commissioner tools, custom rules, rating edits
- CPU scheme-fit beyond existing bias/noise
- Web Workers, PWA, LZ-string compression
- Sounds (user never said "no sounds" — sounds are allowed if desired later)
- Guided interviewer tour (future, not now)

---

## 12. Master Task Order (Top to Bottom)

### Phase 1 — Foundation (This Release)

1. Restructure HTML: clean document, Season tab first, Draft second
2. Demote weights to Settings / collapsible section
3. Mobile draft board: compressed cards, no horizontal scroll
4. Remove "Needs only" toggle; smooth needs filtering into chips
5. Remove confusing flex-explanation text
6. Fix overtime to modern NFL rules
7. Fix turnover narrative (name all participants)
8. Fix head-to-head / "second meeting" bug
9. Remove percentile-rank language from draft results
10. Auto-apply recommended lineup after draft

### Phase 2 — Tier 1 Correctness

11. Season record cap: deterministic clamp, no random subtraction
12. Sack leaderboard: include LBs
13. Postseason MVP: restrict to Super Bowl teams
14. Cache season review prose (prevent `pick()` reshuffle)
15. Undo last draft pick
16. "Use model weights" button: only save custom weights if different
17. Replace `alert()` with `FX.toast()`
18. Remove dead code (double `buildControls`, unused vars)

### Phase 3 — Tier 2

19. Auto-save / resume (`localStorage`)
20. Seeded RNG option
21. CPU draft floor experiment + recalc each pick
22. Draft board metric explanations (Wins / Value / Priority / Gone)
23. Schedule / tiebreak / seeding validation
24. Dark/light toggle + reset-draft button
25. Win-probability graph

### Phase 4 — Polish

26. Confetti / rewards (already partially done — verify all trigger)
27. Accessibility: aria-labels, focus management, Escape on confirmDialog
28. Theme toggle persistence
29. Export/Import save files
30. 100-season lite path (score-and-stats only, no full detail)

---

## 13. Development Workflow

### For AI Agents

1. Read the relevant section of the code first
2. Propose the change (what and why, exact lines)
3. Make minimal edits
4. Test: `node --check`, run validation scripts, check mobile at 390px
5. Summarize what changed and how it was tested

### For Human Developers

- Open the single HTML file in any browser — it just works
- Use browser devtools for inspection
- Edit directly in the file; no build step
- Publish via Netlify Drop (drag and drop the HTML file)
- Share by sending the HTML file directly

---

## 14. Environment Notes

- **Node:** v24 available for validation scripts
- **Testing:** Playwright CLI available; agent-browser available
- **Publishing:** Netlify Drop (free plan)
- **No Git commits** unless explicitly asked
- **Local AI dev environment:** OpenCode + OpenChamber + Superpowers available on Mac

---

_End of Master Design Document. All future work should reference this file first._
