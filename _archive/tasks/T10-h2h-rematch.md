# T10 — Head-to-head in previews (regular season + playoffs) + meeting-count tag

> STATUS after Oct 19 v10 edit batch: the division-tag half is DONE — `meetingInfo()` + `meetingTagText()` (inserted just before `matchupTagHTML`) count the pair's scheduled meetings from `seasonState.schedule` + `playoffRounds`, and either say `the first of N meetings` or name the earlier result (`They already met in Week W: X won A–B`). Verified in-browser on a Week 2 division preview. Remaining for this packet: extend the same treatment to PLAYOFF rematches (non-divisional tags + tournament preview copy) and the preview-paragraph H2H mention — the helpers above are reusable.

File: `NFL Draft Simulator.html`. Targets: ` division tag at ~3362`, `matchupMathInner` (~3571), the preview-paragraph builder inside `ensureGamePlans`/preview assembly (grep `planWhy` and preview `<h4>` blocks), playoff round previews inside `renderPlayoffsView`.

Steps:
1. Meeting-count helper: `function meetingsSoFar(seasonState, teamA, teamB, currentG)` — count scheduled same-season games between the two (division rivals usually meet twice). For the division tag at 3362: if no earlier meeting happened, say `first of ${n} meetings`; if an earlier game is played, say `second meeting — they played in Week ${w}, ${winnerNick} won ${a}–${b}` (or tied); never claim "second meeting" when it is the first.
2. Preview enrichment: when the current game is a rematch, add ≤2 sentences (plain language) summarizing the earlier meeting — score, one headline detail ( turnover count, biggest margin), and if the SAME player scored a TD, mention it. Data source: the played `game` objects already store result + detail; use `latestPlayedBetween()`; do NOT rehash the whole recap.
3. Playoff rematches count (user hit this: divisional round vs. week-3 foe). The same helper works because playoff games live in `seasonState.playoffRounds` — include those in the search set.
4. Placement: preview paragraph after the unit-grades table, before the model projection row; keep under 60 words so the preview panel stays scannable.
5. Done-when: any rematch (weeks or playoffs) shows meeting history; first meetings show the "first of two" tag correctly; no case of "second meeting" before a first meeting; desktop + 390px layout intact.
