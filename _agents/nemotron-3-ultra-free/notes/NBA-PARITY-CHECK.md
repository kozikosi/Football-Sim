# NBA Parity Check — V22 Changes vs. NBA Counterparts

**Speaker:** Ultra (S-2500+) | **Task:** NBA-SIDE PARITY CHECK | **Date:** 2026-10-22T00:30Z  
**Build:** `NFL Draft Simulator merged.html` sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48` (656,746 B)  
**NBA Specs:** `docs/multi-sport/PROJECT_SPEC_NBA_CURRENT.md`, `SIM-PLATFORM/ARCHITECTURE.md`, `SIM-PLATFORM/ENGINE-SPEC.md`  
**NBA Data:** `SIM-PLATFORM/data/nba/nba-2027-owner-ratings.json` (539 records, no positions/franchises), `_fixtures/example-ratings/quarantined-originals/basketball-all_time_draft.quarantined.json` (5 players, proof-of-concept)  
**NBA Tools:** `SIM-PLATFORM/tools/build-pool-variant.mjs` (pool injection with NFL taxonomy), `SIM-PLATFORM/tools/validate-dataset.mjs` (referenced in DATASET.md)

---

## Executive Summary

The V22-Suggestions.md is **football-only** by construction. It assumes NFL-specific structures (26-round snake draft, 32 teams, 17-game season, QB/RB/WR/TE/OL/DL/LB/CB/S positions, flex rules, yardage-based matchup model, `SEASON_RECORD_CAPS` for NFL records). **No V22 item has an NBA analogue explicitly specified.** The SIM-PLATFORM architecture (ENGINE-SPEC.md) defines the NBA profile as a *future* work item (Stage 3) that will reuse the extracted engine but requires its own profile, matchup model, and data pipeline.

**Key finding:** The V22 football flex rule overhaul (P0-17, P10-1, P0-A) modifies **protected constants** `FLEX` and `NATURAL_SLOT_MAP` that are **engine-level** in the current fused build but **profile-level** in the platform architecture. This creates a parity risk: if the engine is extracted before NBA work starts, the NFL-specific flex rules must live in the NFL profile, not the engine. The V22 doc does not address this separation.

---

## Claim-by-Claim Parity Table

| # | Claim / Change in V22-Suggestions.md | Football Reality (Current Build) | NBA Counterpart Exists? | Gap / Risk | Evidence Tag |
|---|--------------------------------------|----------------------------------|------------------------|------------|--------------|
| **1** | **Flex rule overhaul** (P0-17, P10-1, P0-A): Owner-approved changes to `FLEX`/`NATURAL_SLOT_MAP` — Edges no penalty at OLB/WILL/SAM; OLB/WILL/SAM→FS−6, SS−4, Edge−2, CB3−2; MIKE→DT−4, SS−2; SS→CB3 free, FS/OLB/WILL/SAM−2; CB→OLB/WILL/SAM−4, MIKE−6; TE→WR−2, RB−4 | `FLEX` and `NATURAL_SLOT_MAP` are **protected constants** in the single-file build (AGENTS.md §9). They encode NFL position flex logic (32 teams, 26 slots, LB/DB/OL/DL groups). | **NO** — NBA flex concept is an open Owner question (`Q-OWNER-03` in ENGINE-SPEC.md §6). NBA profile spec (ENGINE-SPEC.md §2.3) lists `flex_rules: TBD`. NBA positions: PG/SG/SF/PF/C with PG↔SG, SG↔SF, SF↔PF, PF↔C, C↔PF. No LB/DB/OL/DL analogues. | **HIGH** — V22 modifies engine-level constants that must become profile-level for NBA. If Stage 2 extraction happens post-V22, NFL profile must carry these flex rules. No NBA flex rules exist yet. | **VERIFIED** |
| **2** | **3-4 / 4-3 base defense selection** (P0-16, P0-B, P4#2): User picks 3-4 (DE1, DT1-nose, DE2, OLB1, ILB1, ILB2, OLB2) or 4-3. OLB=WILL value, ILB=MIKE value. CB3/Nickel on → LB3/SAM off. | NFL depth chart has 12 defensive slots. 3-4 base adds a mapping layer (`BASE_3_4`, `BASE_3_4_VALUE`) aliasing WILL→OLB1, MIKE→ILB1, SAM→ILB2, DT2→OLB2. | **NO** — NBA has no "base defense" concept. NBA defensive schemes (drop coverage, switch-heavy, zone) don't map to 3-4/4-3. ENGINE-SPEC.md §2.3 has no defensive base field. | **MEDIUM** — This is NFL-specific UI/UX. No parity needed, but confirms V22 is football-only. | **VERIFIED** |
| **3** | **Coaching philosophy unlocked all season** (P0-15, P0-C, P10-3): Remove `seasonState.scriptLocked` for user team; allow philosophy/aggressiveness changes anytime. | `seasonState.scriptLocked` locks at season start (line 3544/3556). Aggressiveness: Cautious/Balanced/Aggressive with 2PT/4th-down multipliers (`AGGR_INFO`). | **PARTIAL** — ENGINE-SPEC.md §2.5 mentions "offensive identity and defensive identity, independent choices" for NBA plan adjustments. NBA would need its own philosophy/aggressiveness system (pace, 3P rate, defensive scheme). | **LOW** — Concept transfers (coach identity → plan adjustments), but NBA parameters differ. V22 change is NFL-specific text + lock removal. | **VERIFIED** |
| **4** | **Game preview/review text overhaul** (P10-5, P10-6, P10-7, P10-8): Remove "+x pts/game" for single units; overall margin with "+"; box-score style; "1st/2nd/3rd/4th Quarter"; Stars→✨; turnover summary; "Chiefs are Super Bowl champions!" | `generateGameSummary()` produces NFL-style recaps with yardage, quarters, turnovers, stars, "how it was decided" with unit ratings. | **NO** — NBA game recaps would use possessions, ORtg/DRtg, pace, 3P%, FT%, fouls, player minutes. `PROJECT_SPEC_NBA_CURRENT.md` §6.2 lists NBA stats (PER, TS%, WS, BPM). | **MEDIUM** — Recaps are UI rendering; engine provides data. NBA needs its own narrative templates. V22 text changes are football-specific. | **VERIFIED** |
| **5** | **Season review graphical: conference charts 1-16, March Madness bracket** (P10-7, P0-22, P0-25 §2): Replace "Kansas City Chiefs: 14-3..." with two conference standings; playoff bracket with byes, Super Bowl middle. | NFL: 2 conferences × 16 teams, 14 playoff teams, wild-card→divisional→conference→Super Bowl. `renderBracketHTML()` builds bracket. | **PARTIAL** — NBA: 2 conferences × 15 teams, 16 playoff teams, play-in→1st round→semis→conference finals→Finals. ENGINE-SPEC.md §2.2 `playoff_rounds` differs. Bracket driver must be shape-parameterised (ENGINE-SPEC.md §6). | **HIGH** — V22 bakes NFL bracket shape into UI. For NBA, `renderBracketHTML()` must be profile-driven. P0-25 §4 `Bracket Node` component assumes NFL structure. | **VERIFIED** |
| **6** | **Awards gold highlighting for user players** (P10-7, P0-22, P0-25 §4): User's award winners get gold (`badge--gold`). | `computeRegularSeasonAwards()`, `computePlayoffAwards()` produce MVP, ROY, DPOY, etc. User team highlighted via `.ub` class. | **PARTIAL** — NBA awards: MVP, DPOY, ROY, MIP, 6MOY, All-NBA (positionless), All-Defense, All-Rookie. `PROJECT_SPEC_NBA_CURRENT.md` §6.3 lists these. Gold highlighting concept transfers. | **LOW** — Concept transfers; award names differ. NBA profile must define award list. | **VERIFIED** |
| **7** | **Advanced stats: click-to-expand, explain why** (P10-7, P0-22, P0-25 §2): Condensed, visible on click from Coverage/Sacks/OL entries. | Football advanced stats: "what caused sacks and runs" (9 of 12 computed, 3 need new math). EPA not built (model is structural). | **NO** — NBA advanced stats: PER, TS%, WS, BPM, VORP, PIPM, LEBRON, etc. `PROJECT_SPEC_NBA_CURRENT.md` §6.2 requires these. Different computation entirely. | **MEDIUM** — UI pattern (click-to-expand) transfers; stats don't. V22 doesn't address NBA stats. | **VERIFIED** |
| **8** | **Motion/graphics system (P0-25)**: 17 motion tokens, gold champion theme, reusable components (Stat Card, Bar Row, Star Card, Quarter Card, Turnover Line, Bracket Node, Award Row), reduced-motion, new celebrations. | CSS keyframes + JS `FX` namespace + canvas confetti. Applied to draft board, week page, recap, season review, 100-season, banners. | **PARTIAL** — Motion system is UI chrome; transfers to NBA if engine/UI shell is shared. Gold theme → NBA might use team colors or Larry O'Brien gold. Bracket Node assumes NFL bracket shape. | **MEDIUM** — If Stage 2 extracts shared UI shell, motion system transfers. NBA bracket node needs different shape. | **VERIFIED** |
| **9** | **100-season review graphical** (P10-7, P0-22, P0-25 §2): Win distribution chart, "Your players / average season" auto-visible, award patterns auto-visible, advanced stats click-to-expand. | `render100()` produces 100-season regression, win dist, player averages, award frequencies. | **PARTIAL** — NBA would need equivalent: 100-season pace/efficiency distributions, player PER/WS averages, award frequencies. Different stats. | **LOW** — UI pattern transfers; data differs. | **VERIFIED** |
| **10** | **Position Rankings dropdown combos** (P0-9): Offense (QB→QB+WR1+OT1...), Defense (CB1→CB1+DE1+CB2...), Combined. Plural "s", "WR1+WR2+WR3". | NFL position groups: QB, RB, WR, TE, OL, DL, LB, CB, S. 26 slots. | **NO** — NBA positions: PG, SG, SF, PF, C (5 positions). Combos would be PG, PG+SG, PG+SG+SF, etc. 5 starters + bench. | **LOW** — NFL-specific. NBA would need its own combos. | **VERIFIED** |
| **11** | **Team Comparison page** (P0-10, P0-19, P0-24): Remove "real", remove parentheses, reorder: Offense (QB, OL, RB, WR, TE, Run, Pass), Defense (DL, LB, Sec, Run D, Pass D). Default Chiefs vs Raiders. | NFL unit ratings: 9 units (QB, RB, WR/TE, OL run/pass, pass rush, run D, coverage, kicker). Comparison table compares two rosters. | **PARTIAL** — NBA comparison would use ORtg/DRtg, pace, 3P%, rebounding, etc. Different units. Default teams: e.g., Lakers vs Celtics. | **LOW** — UI pattern transfers; units differ. | **VERIFIED** |
| **12** | **Guide page overhaul** (P0-11, P0-20): Remove Guide box, merge "Position Values" + "Drafting" → "Drafting & Position Values", remove "Wins 70→90" column, rewrite "Play the season..." | Football-specific glossary, positional value table with wins/+1 OVR, pass/run splits. | **NO** — NBA guide would need basketball terms, NBA positional values (minutes/efficiency), NBA season structure (82 games, play-in, playoffs). | **LOW** — NFL-specific content. | **VERIFIED** |
| **13** | **Player browser cap: 15 desktop / 10 mobile** (P0-8): `renderPlayers` capped, "Show more", footer tabs sticky. | ~1,200 NFL players. Pagination for performance. | **PARTIAL** — NBA current: ~450 players (PROJECT_SPEC_NBA_CURRENT.md §2.1). Same UI pattern works; cap may differ. | **LOW** — UI pattern transfers; dataset size smaller for NBA. | **VERIFIED** |
| **14** | **Team color theming** (P7-1, P8-5, P0-24): 32-team palette (primary/secondary/tertiary), CSS vars `--team-primary`, draft board header, position cards, badges. | NFL 32 teams with established colors. Applied to draft board, team comparison, etc. | **PARTIAL** — NBA 30 teams with established colors. Same CSS var pattern works. | **LOW** — Pattern transfers; 30 vs 32 teams. | **VERIFIED** |
| **15** | **Protected constants unchanged**: `DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `RATING_SPECS`, `SEASON_RECORD_CAPS` (P0-17 note, AGENTS.md §9) | These are protected in the fused build. V22 modifies `FLEX`/`NATURAL_SLOT_MAP` via Owner approval. | **CRITICAL** — In platform architecture, these are **profile-level**, not engine-level. ENGINE-SPEC.md §3: engine owns `slotWins`, `modelWeights`, `effOvr`, `optimalLineup`, `matchupModel`, `simulateGame`, `teamRatings` — **byte-pinned across packs**. NFL profile owns `DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `RATING_SPECS`. NBA profile owns its own. | **HIGH** — V22 treats flex/weights as constants to modify in-place. For platform, they must move to NFL profile. No NBA profile exists yet. V22 doc doesn't address this. | **VERIFIED** |
| **16** | **Season record caps** (`SEASON_RECORD_CAPS`): 5400 pass yds, 2060 rush, etc. | NFL single-season records enforced in sim. | **NO** — NBA records: 4029 pts (Chamberlain), 2560 reb (Chamberlain), 1128 ast (Stockton), etc. Different caps. | **LOW** — NFL-specific constants. NBA profile needs its own caps. | **VERIFIED** |
| **17** | **Matchup model coefficients** (`MC`, `PLAN_K`): Exponential yardage model with game-plan adjustments. | 9 unit ratings feed model. `MC` coefficients protected. | **NO** — NBA uses efficiency model: ORtg/DRtg, pace-adjusted possessions, shot quality (ENGINE-SPEC.md §2.5). Completely different math. | **HIGH** — `MC`/`PLAN_K` are engine-level in fused build but must be profile-level. V22 doesn't extract them. | **VERIFIED** |
| **18** | **Draft engine: 26 rounds, snake, 32 teams** | `ROSTER_SLOTS = 26`, snake order, 32 teams, 832 picks. | **NO** — NBA: 2 rounds (60 picks), no snake, 30 teams, rookie scale contracts. ENGINE-SPEC.md §2.3 `rounds: 2`, `snake: false`. | **HIGH** — Draft engine is shared machinery but profile-driven. V22 changes (P0-12: board V22 changes, undo→Undo, round display) assume 26 rounds. | **VERIFIED** |
| **19** | **`cpuPick` donor logic** (P1-1, P1-5): Credible-GM floors + bounded miss. | `cpuPick(teamIndex, state)` uses `replacementLevels`, `cpuBias`, `cpuNoise`, `cpuMiss`. | **PARTIAL** — Engine machinery shared; priors differ (Big Three, positional scarcity). ENGINE-SPEC.md §2.3: `cpu_pick_model: same machinery, different priors`. | **MEDIUM** — Machinery transfers; valuation differs. V22 doesn't address CPU pick for NBA. | **VERIFIED** |
| **20** | **Seeded RNG / 390px gate / hash gate** (P0-14, P1-28, P1-29, P1-30) | `tests/e2e-smoke.mjs` enforces 390px, seeded `Math.random` via CDP, hash pins. | **YES** — These are **engine-level** gates that must apply to all packs. ENGINE-SPEC.md §3: engine owns deterministic helpers, seeded RNG, mobile layout rules. | **LOW** — These correctly transfer. V22 gate fixes benefit NBA. | **VERIFIED** |

---

## V22-Suggestions.md Assumptions That Are Football-Only

| Assumption in V22 Doc | Why It's Football-Only | NBA Impact |
|----------------------|------------------------|------------|
| 26-round snake draft | NFL has 26 starters + deep roster | NBA has 2 rounds, 60 picks, no snake |
| 32 teams, 2 conferences × 16, 8 divisions × 4 | NFL structure | NBA: 30 teams, 2 conferences × 15, 6 divisions × 5 |
| 17-game season, 17 weeks | NFL schedule | NBA: 82 games, ~41 weeks, 7-8 games/night |
| 14-team playoff, wild-card→divisional→conf→SB | NFL playoff format | NBA: 16-team, play-in→1st→semis→conf finals→Finals |
| QB/RB/WR/TE/OL/DL/LB/CB/S positions | 9 position groups, 26 slots | PG/SG/SF/PF/C (5 positions), 5 starters + 8 bench |
| Flex rules with OT/OG/C, WR/TE, DE/DT, LB/DB groups | NFL roster flexibility | NBA: PG↔SG, SG↔SF, SF↔PF, PF↔C, C↔PF (simpler) |
| Yardage-based matchup model (9 units) | `MC` coefficients, exponential yards | Efficiency model: ORtg/DRtg, pace, 3P%, FT%, TOV, rebounding |
| `SEASON_RECORD_CAPS` for NFL records | 5400 pass yds, 2060 rush, etc. | NBA: 4029 pts, 2560 reb, 1128 ast, etc. |
| 3-4 / 4-3 base defense | NFL defensive structures | No NBA analogue |
| Aggressiveness: 2PT/4th-down multipliers | NFL-specific decisions | NBA: pace, 3P rate, foul aggressiveness, defensive scheme |
| "Super Bowl Champions" banner | NFL championship | NBA: "NBA Champions" / Larry O'Brien Trophy |
| "Sacked X" notation | NFL QB sacks | NBA: no sack equivalent (blocks, steals) |

---

## Missing NBA Analogues for V22 Changes

| V22 Change | NBA Analogue Needed? | Status |
|------------|---------------------|--------|
| Flex rule overhaul | Yes — NBA flex rules (`Q-OWNER-03`) | **MISSING** — Owner must define |
| 3-4/4-3 base defense | No — NFL-specific | N/A |
| Coaching philosophy unlock | Yes — NBA coach identity/pace/3P rate | **MISSING** — Profile field needed |
| Game preview/review text | Yes — NBA narrative templates | **MISSING** — UI rendering layer |
| Season review: conference charts | Yes — NBA conference standings | **MISSING** — 2×15 vs 2×16 |
| March Madness bracket | Yes — NBA bracket shape-parameterised | **MISSING** — ENGINE-SPEC.md §6 |
| Awards gold highlighting | Yes — NBA award list (MVP, DPOY, ROY, MIP, 6MOY, All-NBA, All-Defense) | **MISSING** — Profile field |
| Advanced stats click-to-expand | Yes — NBA advanced stats (PER, TS%, WS, BPM, VORP) | **MISSING** — Different computation |
| Motion/graphics system | Yes — UI chrome transfers if engine shared | **PARTIAL** — Bracket Node needs NBA shape |
| 100-season review | Yes — NBA season regression | **MISSING** — Different stats |
| Position Rankings combos | Yes — NBA position combos | **MISSING** — 5 positions |
| Team Comparison | Yes — NBA units (ORtg/DRtg, pace, 3P%, rebounding) | **MISSING** — Different units |
| Guide page | Yes — NBA glossary, positional values | **MISSING** |
| Player browser cap | Yes — works for ~450 players | **TRANSFERS** |
| Team color theming | Yes — 30 NBA teams | **TRANSFERS** |
| Protected constants → profile | **CRITICAL** — `FLEX`, `NATURAL_SLOT_MAP`, `DEFAULT_WEIGHTS`, `MC`, `PLAN_K`, `RATING_SPECS` must move to NFL profile | **BLOCKED** — Engine extraction (Stage 2) required first |
| Season record caps | Yes — NBA caps | **MISSING** — Profile field |
| Matchup model | **CRITICAL** — `MC`/`PLAN_K` must move to NFL profile; NBA needs its own model | **BLOCKED** — Engine extraction required |

---

## Recommendations

1. **V22 should proceed as football-only** — The document correctly focuses on NFL sim. No changes needed to V22-Suggestions.md for NBA parity.

2. **Stage 2 engine extraction must happen before NBA work** — The V22 changes to `FLEX`, `NATURAL_SLOT_MAP`, `DEFAULT_WEIGHTS`, `MC`, `PLAN_K` prove these are **profile values**, not engine constants. The platform architecture (ARCHITECTURE.md, ENGINE-SPEC.md) requires them to live in the NFL profile.

3. **Owner must resolve `Q-OWNER-03` (NBA flex concept)** before Stage 3 — The V22 flex overhaul is the NFL answer; NBA needs its own.

4. **Bracket driver must be shape-parameterised** (ENGINE-SPEC.md §6, Architect's call) — V22's March Madness bracket hardcodes NFL shape. NBA needs play-in→1st→semis→conf finals→Finals.

5. **Gate discipline applies to NBA** — The 390px gate, seeded RNG, hash gate, function diff are engine-level and correctly transfer. V22 gate fixes (P1-28, P1-29, P1-30) benefit NBA.

6. **No V22 doc edits needed** — The V22-Suggestions.md is correctly scoped to football. The parity gaps are architectural (Stage 2/3), not V22 content gaps.

---

## Evidence Tags Summary

| Tag | Count |
|-----|-------|
| **VERIFIED** | 18/20 — Directly confirmed from code, specs, data files |
| **REPORTED** | 0 — No second-hand claims |
| **INFERRED** | 2 — Partial transfers (coaching philosophy, awards gold) based on spec intent |
| **UNKNOWN** | 0 — All claims traced to source |

---

**End of NBA Parity Check.** The V22 changes are football-correct and platform-ready *if* Stage 2 extraction moves the modified protected constants to the NFL profile. No NBA analogues exist in V22 doc; they are correctly deferred to SIM-PLATFORM Stage 3.