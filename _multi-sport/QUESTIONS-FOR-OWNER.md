# QUESTIONS-FOR-OWNER.md — fundamental concept questions for the Owner

**Purpose.** Questions for the Owner on fundamental concepts for the multi-sport expansion. The Owner answers by tagging `[ANSWERED <date>]` after each question. Companions: `QUESTIONS-FOR-THE-ARCHITECT.md` (questions for Claude), `README.md` (master roadmap).

**How to use.** Append your question with a unique ID (Q-<sport>-<n>), tag it `[BLOCKING]` / `[NOW]` / `[LATER]` / `[OPEN]`, and ask. The Owner answers by appending `[ANSWERED <date>]: <answer>` after the question. Do not edit another agent's question.

---

## NFL All-Time

- **Q-NFL-AT-1** `[BLOCKING]` Era adjustment methodology — how do we rate players from different eras? Proposed: tiered era adjustments (e.g., 1960s -8, 1970s -6, 1980s -4, 1990s -2, 2000s 0, 2010s +2, 2020s +4) applied to OVR. Or a different approach?
- **Q-NFL-AT-2** `[BLOCKING]` Team assignment — which team does an all-time player belong to? Their primary team? The team they won a championship with? A "best fit" assignment?
- **Q-NFL-AT-3** `[NOW]` Flex rules — same as current NFL, or adjusted for era? (e.g., 1970s players might flex more freely since positions were less specialized)
- **Q-NFL-AT-4** `[NOW]` Draft format — same 26-round snake draft, or shorter (e.g., 16 rounds for a 32-team all-time draft)?
- **Q-NFL-AT-5** `[LATER]` Season length — 17 games (current) or era-appropriate (e.g., 14 games for pre-1978, 16 for 1978-2020)?
- **Q-NFL-AT-6** `[LATER]` Player pool size — ~1,200 (same as current) or larger (e.g., 1,500 to include more eras)?
- **Q-NFL-AT-7** `[OPEN]` All-time players from current rosters — same -5 adjustment, or a different one based on age/experience?

## NBA Current

- **Q-NBA-1** `[BLOCKING]` Position valuation — how do we value PG vs C in basketball? Proposed: PG=300, SG=250, SF=280, PF=270, C=290 (on a 0-700 scale, same as NFL). Or different weights?
- **Q-NBA-2** `[BLOCKING]` Flex rules — which positions can play which slots, and with what penalty? Proposed: PG↔SG (-3), SG↔SF (-3), SF↔PF (-3), PF↔C (-3), PG↔SF (-7), SG↔PF (-7), SF↔C (-7), PG↔PF (-12), SG↔C (-12), PG↔C (-15). Or different?
- **Q-NBA-3** `[NOW]` Matchup model — offensive/defensive efficiency, pace, shooting %? Proposed: expected points = f(offensive rating, defensive rating, pace, home court advantage). Offensive rating = weighted average of starting 5's offensive ratings. Defensive rating = weighted average of starting 5's defensive ratings. Pace = (team pace + opponent pace) / 2. Home court = +3 points.
- **Q-NBA-4** `[NOW]` Season length — 82 games (current) or shorter for sim purposes (e.g., 41 games)?
- **Q-NBA-5** `[NOW]` Playoffs — play-in tournament (7-10 seeds) + 8-team bracket per conference, or simplified (top 8 per conference)?
- **Q-NBA-6** `[LATER]` Awards — which awards matter most? Proposed: MVP, ROY, DPOY, 6MOY, MIP, All-NBA (1st/2nd/3rd), All-Defense (1st/2nd), All-Rookie.
- **Q-NBA-7** `[LATER]` Stats — which per-game stats to track? Proposed: points, rebounds, assists, steals, blocks, turnovers, FG%, 3P%, FT%, minutes, plus advanced (PER, TS%, USG%, WS).
- **Q-NBA-8** `[OPEN]` Draft format — the NFL sim has a 26-round snake draft. Does the NBA sim need a draft? Or is it just a season sim with pre-built rosters?

## NBA All-Time

- **Q-NBA-AT-1** `[BLOCKING]` Era adjustment — how to rate players from the 1960s vs 2020s? Proposed: tiered era adjustments (e.g., 1960s -8, 1970s -6, 1980s -4, 1990s -2, 2000s 0, 2010s +2, 2020s +4) applied to OVR. Or a different approach?
- **Q-NBA-AT-2** `[BLOCKING]` Team assignment — primary team for all-time greats? Same as NFL all-time?
- **Q-NBA-AT-3** `[NOW]` Position flexibility — same as current NBA, or adjusted for era?
- **Q-NBA-AT-4** `[LATER]` Draft format — same as NBA current, or different (e.g., all-time draft with all players eligible)?

## Other Sports

- **Q-OTHER-1** `[BLOCKING]` Which football leagues to include? Proposed: Premier League, La Liga, Bundesliga, Serie A, Ligue 1, MLS (all ranked above or including MLS).
- **Q-OTHER-2** `[NOW]` Same engine template for all sports, or sport-specific engines? (Recommendation: same template, sport-specific math.)
- **Q-OTHER-3** `[NOW]` Player ratings — FIFA ratings? Custom? Collective? (Recommendation: collective creation, like all-time sims, with the Owner providing guidance.)
- **Q-OTHER-4** `[LATER]` Season length — full season (38 games for football leagues) or shortened for sim purposes?
- **Q-OTHER-5** `[LATER]` Which other sports beyond the four major + football leagues? (MLB, NHL, MLS, cricket, rugby?)

## Data Contribution

- **Q-DATA-1** `[BLOCKING]` NBA2K ratings — the Owner can transmit NBA2K ratings directly. What format? (Recommendation: CSV or JSON with player name, position, team, OVR, and key stats.)
- **Q-DATA-2** `[NOW]` NFL all-time ratings — the Owner said "the NFL all time ratings will have to be created by us as a group." How to organize? (Recommendation: a shared spreadsheet with columns for name, position, team, era, OVR, and sources.)
- **Q-DATA-3** `[NOW]` All-time player pool size — ~1,200 per sport (same as NFL current). Or larger/smaller?
- **Q-DATA-4** `[LATER]` Era adjustment verification — how to verify era adjustments are fair? (Recommendation: compare adjusted ratings to known performance metrics, e.g., PER for NBA, EPA for NFL.)

---

## ANSWERS — Owner

*(Owner appends answers here, tagged [ANSWERED <date>])*

## Architecture (new — expanded concepts)

- **Q-ARCH-1** `[BLOCKING]` Should the engine template be extracted as a separate file (`engine-template.html`) or as a section within each sport's sim? (Recommendation: separate file, so improvements port easily.)
- **Q-ARCH-2** `[NOW]` Should the harness be shared (one set of scripts, sport-specific targets) or separate (one set per sport)? (Recommendation: shared scripts, sport-specific config files.)
- **Q-ARCH-3** `[NOW]` Should the data be in the HTML file (like the NFL sim) or in separate JS files? (Recommendation: separate JS files for maintainability, loaded by the HTML.)
- **Q-ARCH-4** `[LATER]` Should the single-file constraint be relaxed for multi-sport sims? (Recommendation: keep single-file per sport, but allow separate data files.)

## NBA-specific (new — expanded concepts)

- **Q-NBA-9** `[NOW]` Should the NBA sim have a draft? If so, what format? (Fantasy draft, rookie draft, or no draft?)
- **Q-NBA-10** `[NOW]` How many games per season? 82 (real) or 41 (shortened for sim speed)?
- **Q-NBA-11** `[LATER]` Should the NBA sim track advanced stats (PER, TS%, USG%, WS) or just basic stats?
- **Q-NBA-12** `[LATER]` Should the NBA sim have a salary cap / trade system, or just a season sim?

## All-time (new — expanded concepts)

- **Q-AT-1** `[LATER]` Should all-time sims use the same draft format as current sims, or a different one (e.g., all-time draft with all players eligible)?
- **Q-AT-2** `[LATER]` Should all-time sims have era-specific rules (e.g., no 3-point line for pre-1980 NBA)?
- **Q-AT-3** `[OPEN]` How to handle players who played in multiple eras (e.g., LeBron in 2000s and 2010s)?

## Other sports (new — expanded concepts)

- **Q-OTHER-6** `[NOW]` Should football leagues (Premier League, etc.) use the same engine as the NFL sim or a different one? (Recommendation: different engine — no playoffs, round-robin table, different scoring.)
- **Q-OTHER-7** `[NOW]` Should MLB use a completely different engine (162 games, no draft in the same sense)? (Recommendation: yes, different engine.)
- **Q-OTHER-8** `[LATER]` Should we prioritize MLB or NHL over football leagues? (Recommendation: football leagues first — the Owner mentioned them specifically.)

## New questions from Beam (20 Oct)

- **Q-BEAM-MULTI-1** `[BLOCKING]` NBA2K ratings format — you said you can transmit NBA2K ratings directly. What format? CSV, JSON, or paste? And which NBA2K version (2K25, 2K26)? I need to know so I can build a parser.
- **Q-BEAM-MULTI-2** `[BLOCKING]` NFL all-time era adjustment — you said "the NFL all time ratings will have to be created by us as a group." How do you want to organize this? A shared spreadsheet? A submission template (I created one in `_multi-sport/nfl-alltime/data/SUBMISSION-TEMPLATE.md`)? Or you provide a list and the council fills in ratings?
- **Q-BEAM-MULTI-3** `[NOW]` NBA engine — you know NBA better than football. What's the single most important thing the NBA sim must get right? (e.g., pace, shooting %, positional value, playoff format) I want to prioritize the right thing.
- **Q-BEAM-MULTI-4** `[NOW]` All-time player pool — for NFL all-time, should current players be included with -5 OVR, or should the all-time sim be entirely historical players? (Current players with -5 means the sim has both eras competing, which is interesting but might be unbalanced.)
- **Q-BEAM-MULTI-5** `[LATER]` Data submission cadence — how often do you want to transmit data? (e.g., all at once, in batches of 50 players, or as you find time?) This affects how I structure the data pipeline.
- **Q-BEAM-MULTI-6** `[OPEN]` Multi-sport priority — you listed 5 priorities. Is #3 (NBA current) still next after NFL all-time, or would you prefer to do NBA all-time before NBA current? (All-time might be more interesting since current NBA is well-covered by NBA2K.)

## New questions from Owner's product direction (20 Oct)

### Architecture
- **Q-ARCH-5** `[BLOCKING]` Separate repos or folders? The Owner said the earlier question was too abstract. Concrete options: (a) separate repos per sport (clean isolation, independent releases, but harder to share engine improvements), (b) one repo with folders per sport (shared engine template, easier to port improvements, but larger repo), (c) one repo with a monorepo structure (apps/web + packages + data). Recommendation: (b) one repo with folders per sport, following the `_multi-sport/` structure. Cost of being wrong: if we later need separate repos, migration is mechanical (git subtree split). If we start with separate repos and need to merge, it's harder.
- **Q-ARCH-6** `[NOW]` Shared engine extraction — when and how? Recommendation: extract post-merge from the NFL sim by stripping NFL data and math. Keep the engine template in `shared/`. Port improvements from NFL to other sports manually. Cost of being wrong: if we extract too early, the template is wrong; if too late, we duplicate code.

### Data model
- **Q-DATA-5** `[BLOCKING]` Person identity vs player-season vs team/franchise vs source vs simulation rating — how to keep these distinct? Recommendation: each player record has: `person_id` (unique identifier), `name`, `era` (decade of peak), `primary_team` (team most associated with), `career_years` (start-end), `prime_seasons` (best multi-year window), `source` (how rating was derived), `ovr` (simulation rating, with era adjustment), `attributes` (sport-specific). The OVR is the simulation rating, not the person's "true" rating. Cost of being wrong: if we conflate person identity with simulation rating, we can't re-rate a player without changing their identity.
- **Q-DATA-6** `[NOW]` OVR as general summary — should OVR be the primary display stat, or should individual attributes be equally prominent? (Recommendation: OVR primary, attributes secondary, but both visible.)
- **Q-DATA-7** `[NOW]` Today's franchises — use current team names even for historical players (e.g., Oscar Robertson on Sacramento Kings, not Cincinnati Royals). The draft board may show historical team context. (Recommendation: yes, use current franchises. Cost of being wrong: low — it's a display choice, not a math change.)

### NBA-specific (new)
- **Q-NBA-13** `[BLOCKING]` Which NBA attributes matter most? The Owner said "rim protection and three-point shooting may matter more than they did in the football sim." Proposed: rim protection (blk, reb, def rating) and 3-point shooting (tp%, volume) are primary; speed, strength, agility are secondary. Or different weights?
- **Q-NBA-14** `[NOW]` Flexible, positionless thinking — the football flex system is a guideline, not a system to copy. For NBA, positionless play means a 6'8" player might play PG or C. Proposed: flex penalty based on height/weight mismatch, not just position code. Or different?
- **Q-NBA-15** `[NOW]` Computer-managed rotations vs user-set rotations — computer-managed makes initial version easier; user-set is advanced. (Recommendation: computer-managed for v1, user-set for v2.)
- **Q-NBA-16** `[LATER]` Stats that explain Wins — which stats to show? Proposed: points, rebounds, assists, steals, blocks, turnovers, FG%, 3P%, FT%, plus advanced (PER, TS%, USG%, WS, plus-minus). TS+ for draft-board context.
- **Q-NBA-17** `[OPEN]` All-time player pool — current players with -5 or historical only? (The Owner said -5 is NOT approved. Need to decide purpose, eligible players, and calibration before applying.)

### All-time
- **Q-AT-4** `[BLOCKING]` Era-specific rules — should all-time sims have era-specific rules (e.g., no 3-point line for pre-1980 NBA, no salary cap for pre-1994 NFL)? (Recommendation: yes for basketball (3-point line, hand-checking), no for football (rules too complex). Cost of being wrong: moderate — affects gameplay feel.)
- **Q-AT-5** `[NOW]` Players in multiple eras — how to handle (e.g., LeBron in 2000s and 2010s)? (Recommendation: one record per player, era = decade of peak. Career stats are career averages, not era-specific.)
- **Q-AT-6** `[NOW]` Modern training hypothesis — Kevin Garnett's long-two profile → at least league-average 3P shooter. Chuck Hayes/Ben Wallace/DeAndre Jordan's poor FT% → not strong 3P shooters. (Recommendation: FT% as a predictor of 3P% potential, with a floor. Cost of being wrong: affects all-time player ratings significantly.)

### Other sports
- **Q-OTHER-9** `[NOW]` Soccer draft structure — the Owner said "soccer and baseball may be closer to football's draft structure." Proposed: dream-league draft (20 clubs × 25 = 500 slots → 20 rounds). Or transfer-market manager (different product). (Recommendation: dream-league draft for v1, transfer-market manager for v2.)
- **Q-OTHER-10** `[LATER]` MLB — completely different engine (162 games, no draft in same sense)? (Recommendation: yes, different engine. But defer until after NBA.)
- **Q-OTHER-11** `[LATER]` Prioritize MLB or NHL over football leagues? (Recommendation: football leagues first — Owner mentioned them specifically.)
- **Q-OTHER-12** `[OPEN]` Pool size — ~1,500-2,000 per sport (Owner's preference). Or smaller for sports with fewer players (e.g., 450 for NBA current)?

### Data contribution
- **Q-DATA-5** `[BLOCKING]` NBA2K ratings format — CSV, JSON, or paste? Which NBA2K version? (Recommendation: CSV with columns for name, pos, team, OVR, and key stats. Owner can paste or upload.)
- **Q-DATA-6** `[NOW]` NFL all-time data organization — submission template (created), shared spreadsheet, or list of names + council assigns ratings? (Recommendation: submission template, one player at a time, with career highlights and era adjustment justification.)
- **Q-DATA-7** `[NOW]` All-time player pool size — ~1,200 per sport (same as NFL current) or larger? (Recommendation: ~1,200 for NFL all-time, ~1,200 for NBA all-time. Pool only needs enough players to fill positions + rosters.)
- **Q-DATA-8** `[LATER]` Era adjustment verification — how to verify era adjustments are fair? (Recommendation: compare adjusted ratings to known performance metrics — PER for NBA, EPA for NFL.)
