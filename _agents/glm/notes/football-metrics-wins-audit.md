SPEAKER: GLM | ROLE: Scribe · GLM lane | TASK: report-back to Pickle — metrics-vs-Wins audit (football build) | DATE: 2026-10-21T01:46Z (stamps approximate; shell receipts carry exact times)

# Metrics-vs-Wins audit — `NFL Draft Simulator merged.html` `40233d6b…` (merge candidate; branch checked: `gpt/council-reliability-scorecard` @ 4558e811)

Delivered for Pickle's parallel-batch assignment. Build under audit verified: `shasum -a 256` → `40233d6be00e…` (657,486 B). All line numbers from the receiption greps this turn. Labels: VERIFIED (I read the lines cited), REPORTED (cited from receipts), UNKNOWN.

## 1. The causal chain that produces Wins

The win engine is a fixed pipeline; every metric below is either *on* it, *downstream of* it, or *outside* it:

```
PLAYERS ovr (+ personalWeights for draft valuation)
  → optimalLineup(slotmap)                       [line 1206]
  → teamRatings(slotmap)  9 unit ratings         [line 1988]
  → matchupModel(O,D,lg,plan) expected rsh/pass/TO/sks [line 2100]
  → simulateGame(...)  realize() → pts() → score → W/L [line 2286]
  → POINTS_PER_WIN = 32.5                        [line 4865]
  → slotWinsTable: k = 17/POINTS_PER_WIN         [line 1329]  ← wins↔points bridge for projections
```

Key quoted lines (recurping receipts):

- `slotWinsTable()` l.1329: `const lg = teamRatings(base), k = 17/POINTS_PER_WIN, b0 = {on:bestUnitPts(lg, lg, true), off:bestUnitPts(lg, lg, false)};` — the per-slot wins table is derived *from* `teamRatings` + `matchupModel` output times the 32.5 conversion. This is the definition of "what explains wins" in this build.
- `simulateGame()` l.2294–2300: realized points come from realized yards, giveaways and sacks: `function pts(m, r, hf){ return BASE_PTS + hf + PT_RUSH*(r.rush-RUSH_BASE) + PT_PASS*(r.pass-PASS_BASE) - PT_TO*(r.to-LAM_TO) - PT_SACK*(r.sacks-LAM_SACK); }` — box-score stats and score "tell one story" (the code's own comment).
- `slotWinsPerOvr()` l.1346 comment: "Approximate linear slope near a typical starter (wins per +1 OVR), kept for display and for fast estimates." — the build itself labels this as display+projection math.
- `teamRatings()` l.1988–2006 composes nine unit ratings via `wavgSlots` over `RATING_SPECS`/`DEF_SPECS` and derived composites (`passOff`, `runOff`, `off`, `def`).

## 2. Inventory and classification

| Metric | Where computed (line) | Where shown | Class | Why |
|---|---|---|---|---|
| Slot OVR / roster ratings | PLAYERS + `optimalLineup` l.1206 | Draft board, lineup editor | **DRIVES WINS** | Input to every game and every projection |
| Personal weight sliders | `modelWeights()` l.459 (inverse of `slotWinsPerOvr`) | Team Rankings page | **DRIVES (draft only); CORRELATED (games)** | Steers `cpuPick` valuations and the displayed 0–700 ranking; the game engine uses `RATING_SPECS` regardless — user weights do NOT change simulated outcomes |
| Flex penalties | `flexPenaltyFor` l.973 / `effOvr` l.978 | Draft board "Value here" | **DRIVES WINS** | Applied inside `optimalLineup`/`teamRatings` |
| Nine unit ratings | `teamRatings` l.1988 | Team pages, matchup views | **DRIVES WINS** | Consumed by `simulateGame` l.2287 every game |
| Expected yards/TO/sacks + plans | `matchupModel` l.2100, `PLAN_K`/`MC` terms | (internal; surfacened in explainers) | **DRIVES WINS** | The expected-values the sim realizes |
| Realized box score (rush/pass yds, TO, sacks,pts) | `simulateGame` l.2286–2305 | Standings, box scores, recaps | **CORRELATED** | Output of the engine; shown and aggregated, never fed back (rosters are static for the season) |
| Advanced stats: sack-cause attribution (rush/OL/coverage shares; per-player skE/skO/skC) | `advancedStatsHTML` l.4317–4345 | Season Review panel | **CORRELATED** | Decomposes realized outputs ("a sack has three possible causes…"); explains what happened, does not drive the model |
| Per-player season stat tables (OL yds behind/pancakes, DL sacks/TFL, LB tkl/TFL…) | l.3692–3694 + stat accumulation | Player Browser / season cards | **CORRELATED** | Realized outputs |
| `verdictSack` narrative verdicts | l.4346 | Advanced stats rows | **CORRELATED (narrative)** | Text summarization of the above |
| `fragOffense` fragility ranks (ppg, rush/g, pass/g) | l.4360+ | Report card | **CORRELATED** | Post-season aggregation of outputs |
| Turnover / swing-play recap lines | l.3024, l.3187 | Game recaps | **CORRELATED** | Realized events |
| Point differential ↔ wins | `POINTS_PER_WIN` l.4865; `k = 17/POINTS_PER_WIN` l.1329 | Team Rankings, projections, Guide | **DRIVES WINS** | The literal conversion constant on the win path |
| Per-slot "wins per +1 OVR" + run/pass split rows | `slotWinsPerOvr` l.1346, `slotRoleRows` l.4876+ | Guide / live math tables | **DRIVES (projections); CORRELATED (as display)** | Derived from the causal chain; informs the draft and the "why this slot wins games" tables |
| 100-season report | `render100` l.6043 | (regression view) | **CORRELATED** | Aggregate validator of the engine, not a user metric |
| Player attribute fields `inj`, `str`, `agi`, `cod`, `awr`, `xf` | PLAYERS data columns | Player profile/card | **DECORATIVE** (mostly) | CORROBORATED: KI-015 (KNOWN-ISSUES.md l.21) — "Player attributes mostly decorative: `inj` used 0 places, `str` 0 player-record places…" — they do not enter `teamRatings`/`matchupModel` |
| Standings W/L, PF, PA | standings renderer l.3806 + sim results | Standings | **DRIVES WINS (they ARE wins/points)** | The record itself; PF/PA realized |

Not present in the displays I inventoried: third-down conversion, red-zone, time-of-possession, win-probability models (grep found no such labels). If a future build adds them, they'd need classification before publication.

## 3. Proposed minimal rule for "publish this as explaining Wins"

A stat may be labeled *explaining wins* only if:
1. **Named consumer**: the function that computes it feeds `teamRatings` → `matchupModel` → `simulateGame` → score, or feeds the projection bridge `slotWinsTable(k=17/POINTS_PER_WIN)` — with line receipts.
2. **Direction stated**: the coefficient that moves expected point differential with more of the stat is cited (e.g., `PT_TO` subtracts, `PT_RUSH` adds).
3. **Labeling discipline**: realized-output stats are displayed as *what happened* — they explain the box score, not the *model that made it*. Round rules like "1-Pt Conv" and the 32.5 bridge stay in their own blocks; advanced-stats text must keep "explaining what produced sacks/yards", which the current `advancedStatsHTML` intro already does correctly.
4. **Decorative exclusion**: attribute fields without engine consumers (`inj`, `str`…) never appear inside a wins-explainer block — they stay on player profiles.

Precedent alignment: mirrors the council's M-124 F-2/F-4 finding ("a receipt must bind the instrument"): a label published as explanatory must cite the consuming function, not merely a number that correlates.

## 4. What I did not audit

- Award-vote mechanics and draft-board copy (side-views, not win-path).
- Game-plan UI (`ensureGamePlans`/`planWhy`) beyond noting plans feed `matchupModel` l.2105–2106 — plans ARE causal (some plan UI labels may warrant a row-2 audit).
- Play-by-play random seed paths (58 unseeded sites, KI-009) — irrelevant to which stats drive wins, relevant to reproducibility.

Receipts: all greps/sed windows run on `40233d6b…` this session, 2026-10-21T01:38–01:41Z. The merge candidate's hash was re-verified after the working-tree branch switch to `gpt/council-reliability-scorecard`.
