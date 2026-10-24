# NFL Draft Simulator — MASTER DOCUMENT (read this first, every session)

Current build: v20 (published 10-19). Single file: `nfl_power_rankings.html` (~650 KB, one `<script>`). Owner: Kosi. Purpose: portfolio piece for a job interview. The site is **"NFL Draft Simulator"**: draft a team, play a 17-game season, playoffs, Super Bowl. Madden ratings, weights, Player Browser, Position Rankings, Team Comparison and Guide are _supplementary_ bottom links only.

## 1. Product vision (non-negotiable)

1. The whole site is the Draft -> Season -> Playoffs -> Champion journey. Madden/weights language appears ONLY inside the supplementary tabs.
2. The season simulation is neutral, NFL-realistic math (BASE_PTS 21.5, 32.5 points per win). It never uses the user's ranking weights. Supplementary weights stay separate.
3. Plain, informative football language for any fan. No "expected scoring" or "before kickoff" in post-game text. Every team name is plural ("were", "have"). Critique only 85+ OVR players.
4. The user's team and players are blue. Mobile is a first-class target (390px, zero sideways scrolling anywhere, stacked cards, smaller type).
5. Delight matters: confetti, banners, toasts for wins (respect prefers-reduced-motion).

## 2. Hard "do NOT build" list (the user said no)

Draft busts/breakouts, progression, injuries, multi-year/contracts/Hall of Fame, trades, commissioner tools, custom rules, rating editing, CPU scheme-fit, a 5-file source split, Web Workers, PWA, LZ-string, win-probability graph and punter models as must-haves. (Sounds are NOT banned — that was an error; the user never said it.) Colleague suggestions that conflict with these are rejected.

## 3. Engineering rules

- Preserve the invariant: model weights <-> slotWinsPerOvr stay inverse; "Use model weights" restores losslessly.
- One truth per game: score, scoring events, yards, turnovers and recap text must come from the same data. Identity checks to assert in tests: (a) sum of home+away scoring events (incl. OT) == final score; (b) every defensive TD named in a recap exists in the events and the running score; (c) team-stat totals equal player-stat sums; (d) attribution swings never exceed |margin|+1.
- No random changes to already-published stats (records only go up; caps are deterministic).
- Recaps are cached/hash-seeded so re-opening a game never rewrites it.
- Never swallow errors silently in new code (console.warn with a label).
- Prefer render-time `.ub` blue highlighting over MutationObservers; replace the blanket `[style*="grid-template-columns"]{...!important}` rule with explicit classes.
- Test before every publish (in `/home/claude/w`): `bash mk.sh`, `node pw4.js` (full draft->SB), `node phone3.js` (390px overflow audit), `node rv.js`, `node undo.js`, `node cap.js`, `node spread.js`. Add one assertion per new invariant.

## 4. Football philosophy for the stats/recap engine

- Generate advanced stats for every meaningful basic stat (not only sacks): pass rush (sacks, pressures, hurries, pressure rate, QB hits), run defense (stops, tackles for loss, run-stop rate), coverage (targets, completions allowed, yards/target, PD, INT, passer rating allowed), QB (completion %, yards/attempt, TD%, INT%, sack rate, passer rating, ANY/A, EPA-style), RB/WR/TE (yards/carry, yards/target, catch %, yards after contact/catch, TD share), OL (pressures allowed, pancakes, sacks allowed, run-block win rate), K/P/returners, team (3rd down %, red zone %, turnover margin, points per drive, yards/play). Each advanced stat must be a function of the same simulated quantities, shown in the same stat tables, with plain-language labels.
- Overtime uses CURRENT NFL rules: each team gets one possession unless the first team scores a touchdown (game over); a FG gives the other team a chance to match/win; after both possess, sudden death; regular season 10-minute period (ties possible); postseason 15-minute periods, both teams possess regardless, play until a winner. The walk-off belongs in the Overtime section of the recap, never the 4th quarter.
- Turnovers always name who: "Josh Allen threw an interception to Jaylen Watson (Chiefs, 34-yard return)"; fumbles name the forcer/recoverer when known.
- Play-by-play is a list of dated lines (no bullet glyphs) and EVERY line names the team that benefitted (e.g. "Broncos — ...").
- Head-to-head history: when two teams already met this season (regular season or playoffs) say so briefly with the result ("Colts won 24-20 in Week 3"); division-rematch labels must count real prior meetings, not assume "second meeting".

## 5. CPU draft realism (priority)

Goal: the user's well-played draft should usually finish as a top-5 drafted team. CPU behavior:
- Round 1: every CPU pick must be >= 90 OVR and within ~8 OVR of the best available player (unless a QB run); no 3rd-overall Braden Smith, no 2nd-overall kicker.
- Throughout: CPU picks stay within ~8 OVR of the top available player by marginal wins.
- Unconventional positions (K, P, LS, FB, bottom-10 positions) drafted early must take the BEST player in that position group, and bottom-10 positions go in order of quality. Kicker in round 2+ is fine.
- Variation between teams comes from three separate GM traits (philosophy: what they prefer; evaluation accuracy: small noise; decision quality: occasional reach within the 8-OVR band) — never busts.
- Keep the 76 replacement floor and the top-16-per-position limit under review; experiment and measure with `spread.js` (target weighted spread ~77–85).

## 6. Open work (ordered)

A. Recap/season correctness (bundle): OT section + modern OT rules; turnover names; defensive-TD/score consistency + "he went the distance" wording; plural team grammar; division-meeting counter; head-to-head mentions (regular + playoffs); play-by-play bullet-style lines labelled by team; league-leaders page without lateral scroll (desktop + mobile).
B. CPU round-1 realism (section 5). Post-draft first sentence compares the team to the other DRAFTED teams (never real NFL teams).
C. Advanced stats for every meaningful stat (section 4).
D. Single event generator: derive score, scoring events, yards, turnovers and recap from one drive/play sequence (or at minimum assign events once and reuse); OT as real possessions.
E. Standings: NFL tiebreakers (division record, common games >= 4, conference record, strength of victory/schedule, then point differential last; multi-team ties); schedule check (home 8–9, conference balance, catch failures in `startSeason` and retry).
F. Persistence: localStorage autosave + "resume?" prompt, export/import save, optional seed (single mulberry32 for simulation code only).
G. Performance/robustness: lite 100-season path (no full game detail), cancel button for long runs, memoize board entries per pick, unique player IDs (not names) for pool removal, validateRoster at startSeason.
H. Honesty/copy: awards footnote must match the code (OL honors, role bonus, sack leaders incl. LB in playoffs and 100-sim); Coach of the Year described as results-driven; frozen validation paragraph (r=0.66) re-computed or dated; fixed line "These results use the matchup model, not your ranking weights."; "Realism" note says totals are capped to historical ceilings; letterGrade inflation check.
I. UX polish: draft confirm only when it matters; undo copy states what it undoes; sticky "recommended pick" bar on phones; draft board sticky headers; aria labels on star toggles/switches; Escape/click-outside closes dialogs; scroll position kept per tab; dark/light toggle (low priority); reset-draft button.
J. Docs: finish Madden Sim Explained doc (blocks .357–.360, Part 6 "rookie-style leaders", flex table, new stats, returner math, OT, validation); sharing explanation (artifact Share menu or Netlify Drop); guided tour (future); AGENTS.md invariants; README of how to run tests.
K. Validation: draft value vs simulated wins (monotonic, calibrated), seed sensitivity (10 seeds), perturbation test, diagnostics page.

## 7. Division of labor

- Claude (cloud): football philosophy, math, architecture, hard recap/narrative logic, final verification and publishing.
- Local agents (OpenCode/OpenChamber): implementation of well-specified patches, mobile tests, Playwright screenshots, unit tests, README/AGENTS.md. Always re-run the test list in section 3 and paste output.
- Avoid Git commands; keep timestamped backups (`nfl_power_rankings.vNN.html`). Publish with Netlify Drop.
- Colleague/agent advice is accepted only if it is consistent with sections 1–2; otherwise rejected and recorded here.

## 8. Rejected or deferred colleague suggestions

Rewrite in TypeScript/Vite, multi-file modules, Web Workers, IndexedDB-first redesign, feature flags, trade simulator, multi-year franchise, coach carousel, hot-reload websocket, structured logging framework, virtual scrolling, PDF export. Optional later: win-probability graph, dark/light polish.
