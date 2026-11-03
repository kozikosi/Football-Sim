# ARCHIVED from the claude.ai Project on 1 Nov 2026 (was `claude/master_plan.md`, written 19 Oct 2026 for the v20 single-file build). Frozen: superseded by AGENTS.md, `_agents/V23-OWNER-REQUESTS.md` and `claude/00-READ-FIRST.md`. Kept because its product vision, do-not-build list and football rules are still the Owner's intent. The Project copies of `master_task_list.md` and `rulings_r1_predispatch.md` are NOT archived here: both already exist at the repo root. `council-sync-prompt.md` was a stub that pointed at AGENTS.md.

# NFL Draft Simulator — MASTER DOCUMENT (19 Oct 2026, v20)

Single file `nfl_power_rankings.html` (~650 KB). Owner: Kosi. Purpose: portfolio piece for a job interview. The site: draft a team, play a 17-game season, playoffs, Super Bowl. Madden ratings, weights, Player Browser, Position Rankings, Team Comparison and Guide are supplementary bottom links only.

## 1. Product vision (non-negotiable)
1. The whole site is the Draft -> Season -> Playoffs -> Champion journey. Madden/weights language appears ONLY inside the supplementary tabs.
2. The season simulation is neutral, NFL-realistic math (BASE_PTS 21.5, 32.5 points per win). It never uses the user's ranking weights.
3. Plain, informative football language for any fan. No "expected scoring" or "before kickoff" in post-game text. Every team name is plural. Critique only 85+ OVR players.
4. The user's team and players are blue. Mobile is first-class (390 px, no sideways scrolling, stacked cards).
5. Delight matters: confetti, banners, toasts for wins (respect prefers-reduced-motion).

## 2. Hard "do NOT build" list (the Owner said no)
Draft busts/breakouts, progression, injuries, multi-year/contracts/Hall of Fame, trades, commissioner tools, custom rules, rating editing, CPU scheme-fit, a 5-file source split, Web Workers, PWA, LZ-string, win-probability graph and punter models as must-haves. Sounds are NOT banned. Colleague suggestions that conflict are rejected.

## 3. Engineering rules (v20 era)
- Model weights <-> slotWinsPerOvr stay inverse (later amended: monotone quantisation, see AGENTS.md section 3).
- One truth per game: score, scoring events, yards, turnovers and recap text come from the same data. Identity checks: (a) home+away scoring events (incl. OT) == final score; (b) every defensive TD named in a recap exists in events and running score; (c) team-stat totals equal player-stat sums; (d) attribution swings never exceed |margin|+1.
- Records only go up; caps are deterministic. Recaps are cached/hash-seeded. Never swallow errors silently.

## 4. Football philosophy for the stats/recap engine
- Advanced stats for every meaningful basic stat: pass rush (sacks, pressures, hurries, QB hits), run defense (stops, TFL), coverage (targets, completions allowed, yards/target, PD, INT, passer rating allowed), QB (comp %, Y/A, TD%, INT%, sack rate, rating, ANY/A), RB/WR/TE (Y/C, Y/T, catch %, YAC, TD share), OL (pressures allowed, pancakes, sacks allowed, run-block win rate), K/P/returners, team (3rd down %, red zone %, turnover margin, points per drive, yards/play). Each is a function of the same simulated quantities.
- Overtime uses CURRENT NFL rules: each team gets one possession unless the first scores a touchdown; a FG lets the other team match; then sudden death; regular season 10-minute period (ties possible); postseason 15-minute periods, both teams possess, play to a winner. Walk-offs belong in the Overtime section.
- Turnovers always name who. Play-by-play lines name the team that benefitted.
- Head-to-head: when two teams already met this season say so with the result; rematch labels count real prior meetings.

## 5. CPU draft realism
The user's well-played draft should usually finish as a top-5 drafted team. Round 1: every CPU pick >= 90 OVR and within ~8 OVR of the best available (unless a QB run). Throughout: within ~8 OVR of the top available by marginal wins. Unconventional positions (K, P, LS, FB, bottom-10) drafted early take the BEST player in the group. Team variation comes from three GM traits (philosophy, evaluation accuracy, decision quality), never busts. Replacement floor 76 and top-16-per-position limit were under review.

## 6. Rejected or deferred colleague suggestions (19 Oct)
TypeScript/Vite rewrite, multi-file modules, Web Workers, IndexedDB-first redesign, feature flags, trade simulator, multi-year franchise, coach carousel, hot-reload websocket, structured logging framework, virtual scrolling, PDF export. (Note: the TypeScript engine in `colors/` later superseded the first two by Owner decision, 28 Oct.) Optional later: win-probability graph, dark/light polish.

(Sections 6A-6K "Open work", 7 "Division of labor" of the original were operational for v20 and are dropped; they are recoverable from the Project's revision history of 19 Oct if ever needed.)
