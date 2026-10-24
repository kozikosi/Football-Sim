# V21 Stats That Explain Wins — Proposal (BOC) — 20 Oct 2026

Read-only on the product file (merged.html `40233d6b…`, 657,486 B). No product edits, no maths changes. This is a proposal for the Architect; the Owner decides which metrics are published.

## (a) Statistics the build ALREADY computes that explain wins (VERIFIED, file:line)

Source: merged.html `40233d6b…`.

Team unit ratings (teamRatings, l.1988–2000):
- `qb`, `rec`, `olPass`, `olRun`, `rb`, `passRush`, `frontRun`, `coverage`, `kicker` (wavgSlots over RATING_SPECS, l.1989)
- `passOff = 0.45*qb + 0.30*rec + 0.25*olPass` (l.1993)
- `runOff = 0.35*rb + 0.65*olRun` (l.1994)
- `off = 0.6*passOff + 0.4*runOff` (l.1995)
- `def = 0.55*(0.5*passRush + 0.5*coverage) + 0.45*frontRun` (l.1996)
- `rbHeavy`, `ret` (returner), `rec11` (l.1990–1992)

Matchup coefficients (MC, l.2094): rb/olRun/front/qb/rec/olPass/rush/cov/lean/toQb/toCov/toRush/skRush/skOl/skCov/kick — drive yards/sacks/TOs/points in matchupModel (l.2100+).

Per-game aggregates (teamAdvancedHTML, l.4281–4316): turnover margin, time of possession, rushing share of yardage, TDs/game, FGs/game, share of points from TDs, 2-Pt Conv tries/success, win rate in one-score games, return yards/game.

Sack attribution (advancedStatsHTML, l.4317–4355): per-player sacks, cause split (own win / weak line / coverage), lines faced; per-OL sacks allowed, pressures, pancakes, rush yards behind.

100-season report "What actually drove winning" (render100, l.6043–6127):
- per-unit correlation r with avg wins (unitCorr, l.6052)
- ridge regression beta (wins/SD, others equal) (l.6057)
- model-implied wins/SD (ptsPP * sdU * 17 / POINTS_PER_WIN) (l.6058)
- position-group correlations and slopes (groups, l.6054)
- plan effects: run-heavy vs pass-heavy points/game, giveaways, win% (l.6095–6100)
- identity distribution (idCount, l.6101)

Game plans (l.2010–2100): personnel × strategy × defensive package × focus, with PLAN_K coefficients.

## (b) Computed but NOT currently visible in the season view (VERIFIED)

- Unit ratings (qb, coverage, passRush, olPass, olRun, rb, rec, frontRun, kicker) and composites (passOff, runOff, off, def): computed in teamRatings (l.1988) and used in matchupModel, but the season view (renderRegularSeasonView, l.3885) shows only matchupMathInner (l.3770) per game, not the team's own unit ratings. The 100-season report (l.6043) shows them only after a 100-season run.
- matchupModel expected points/yards for a specific game: shown in renderMatchupMathHTML (l.3770) as "how the model sees this game" — visible but per-game, not season-aggregated.
- teamAdvancedHTML metrics (turnover margin, TOP, rushing share, etc.) are visible (l.4281) but collapsed in a <details>.
- advancedStatsHTML (sack causes) visible but collapsed (l.4317).
- 100-season "What actually drove winning" section (l.6127) only after running 100 seasons; not in the regular season view.

## (c) Proposed visible stat surface for the season view (ordered by win-driving strength)

Based on the 100-season report's ridge beta + model-implied columns (units sorted by beta, l.6057–6058) and the matchup model's stated coefficients (QB 1.0, coverage 0.7, pass rush 0.6, pass protection 0.6, receivers 0.6, run defense 0.4, run blocking 0.3, backs 0.15, kicker 0.15 wins/SD):
1. Quarterback (qb) — strongest driver. Recommended default: show. Cost of being wrong: low; already computed.
2. Pass coverage (coverage) — 0.7 wins/SD. Show. Cost: low.
3. Pass rush (passRush) — 0.6. Show. Cost: low.
4. Pass protection (olPass) — 0.6. Show. Cost: low.
5. Receiving corps (rec) — 0.6. Show. Cost: low.
6. Run defense (frontRun) — 0.4. Show. Cost: low.
7. Run blocking (olRun) — 0.3. Show. Cost: low.
8. Running backs (rb) — 0.15. Show (lower prominence). Cost: low.
9. Kicker (kicker) — 0.15. Show (lower prominence). Cost: low.
10. Turnover margin (teamAdvancedHTML, l.4288) — visible but buried in collapsed details. Promote. Cost: low.
11. Time of possession (l.4289). Promote. Cost: low.
12. Sack attribution (own win / weak line / coverage) (l.4317–4355). Promote from collapsed. Cost: low.

Recommended default: a single "Unit ratings" panel in the regular season view showing the nine unit ratings (qb, coverage, passRush, olPass, rec, frontRun, olRun, rb, kicker) with their league rank, plus the composites (passOff, runOff, off, def). This reuses existing teamRatings() output with no maths change.

## (d) Metrics the build does NOT yet compute (require Architect/maths change)

- Expected points per game / expected win probability for a given matchup (matchupModel returns points; a per-game expected-win probability would need a new function). Label: requires Architect.
- Per-player WAR (playerWar exists, l.6080 area) but is only used in the 100-season report's player critique; not aggregated to a team "wins above replacement" season view. Requires aggregation code.
- TS+ / efficiency metrics (Owner floated TS+ for basketball; football equivalent not defined). Requires definition + maths.
- Game-plan win contribution (the planRows show win% by plan but confounded; a causal plan-value metric would need new modelling). Requires Architect.
- Pace/possession-adjusted metrics (not applicable to football; note for basketball).

## Coupling / integration assumptions

- teamRatings() is called in leagueBaseline() (l.1998) and per-team in matchupModel. Exposing unit ratings in the season view reads seasonState.teams[t].slotmap via teamRatings() — already done in matchupMathInner (l.3770). No new data path needed.
- The 100-season report's ridge beta/model-implied columns require runLeague100 (l.5880) — not available in the regular season. So the "how strongly each metric drives wins" ordering in (c) uses the model's stated coefficients (MC, l.2094) and the report's published weights, not a per-season fit.

## Owner questions (≤5, consolidated)

1. Should the unit-ratings panel be visible by default in the regular season view, or collapsed? Recommended default: visible. Cost of being wrong: clutter; can be collapsed later.
2. Should TS+/efficiency metrics be defined for football before publishing, or only for basketball? Recommended default: define for basketball first (Owner's stated priority), football second. Cost of being wrong: scope creep.
3. Should the 100-season "What actually drove winning" section be reachable from the regular season view (e.g., a "Run 100 seasons" button already exists) or only from the season-complete view? Recommended default: keep as-is (already reachable via sim100Btn). Cost of being wrong: low.

No maths changes proposed. No product edits. Read-only deliverable.
