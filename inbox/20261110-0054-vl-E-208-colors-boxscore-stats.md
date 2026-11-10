SPEAKER: VL | ROLE: Council Seat | TASK: E-208 work | DATE: 2026-11-10T00:54:00Z

FOR: E-208

WHERE: colors/src/engine/boxscore.ts — STAT_KEYS quantities only (no invented data).

old -> new: N/A (proposal task, no code change). List of candidate advanced stats computable from boxscore.ts STAT_KEYS only, each with name, formula, league-rate source, rate/index card (stat vs league rate), and the one-line rule that turns it into a 'why you did well / poorly' sentence.

WHY: Architect 31 Oct; Owner V22 addendum — Colors v1 engine advanced stats the box score can already support.

SAFE ALONE?: yes (proposal only; no product or engine edit).

HOW TO CHECK: each stat derives solely from boxscore.ts STAT_KEYS (l.22-29) and DriveCredit/PlayerLine shapes (l.34-46). Verify each formula references only STAT_KEYS fields. grep STAT_KEYS in colors/src/engine/boxscore.ts.

EVIDENCE: VERIFIED that boxscore.ts exposes these STAT_KEYS: passing att/cmp/pyd/ptd/ints/sacked; rushing car/ryd/rtd/fumLost; receiving tgt/rec/recYd/recTd/twoPt; defence tkl/tfl/sack/press/pd/intDef/intDefYd/ff/fr/defTd/safeties; kicking fgm/fga/xpm/xpa/punts/puntYd; returns kr/krYd/pr/prYd (l.22-29). The drive-level split into runs/passes/completions is INFERRED per boxscore.ts l.8-10 (P_COMPLETE=0.645 at l.131, no council data yet). No league-rate file exists in the repo; every league rate below is therefore INFERRED unless a source is named.

--- CANDIDATE STATS (all from boxscore.ts STAT_KEYS) ---

1. Completion Percentage
   Formula: cmp / att
   League rate: ~64.5% (INFERRED — boxscore.ts P_COMPLETE 0.645, l.131; not externally sourced)
   Card: Completion % 64.5 vs league 64.5 (index 100)
   Why rule: cmp/att >= 0.65 → "Your passing was accurate — completions kept drives on schedule."; < 0.60 → "Your passing was erratic — too many incompletions stalled drives."
   INFERRED constants: 0.65 / 0.60 thresholds (no council data).

2. Yards per Pass Attempt
   Formula: pyd / att
   League rate: ~7.0 (INFERRED — general NFL knowledge; not sourced)
   Card: Y/A 7.0 vs league 7.0 (index 100)
   Why rule: pyd/att >= 7.5 → "Your passing gained yards efficiently."; < 6.0 → "Your passing gained too little per attempt."
   INFERRED constants: 7.5 / 6.0 thresholds, 7.0 league rate.

3. Sack Percentage (pass protection)
   Formula: sacked / att
   League rate: ~6.5% (INFERRED — not sourced)
   Card: Sack % 6.5 vs league 6.5 (index 100)
   Why rule: sacked/att <= 0.05 → "Your line kept the QB clean."; > 0.08 → "Your line gave up too many sacks."
   INFERRED constants: 0.05 / 0.08 thresholds, 6.5% league rate.

4. Interception Rate
   Formula: ints / att
   League rate: ~2.4% (INFERRED — not sourced)
   Card: INT % 2.4 vs league 2.4 (index 100)
   Why rule: ints/att <= 0.02 → "Your QB protected the ball."; > 0.03 → "Your QB gave it away too often."
   INFERRED constants: 0.02 / 0.03 thresholds, 2.4% league rate.

5. Yards per Carry
   Formula: ryd / car
   League rate: ~4.4 (INFERRED — not sourced)
   Card: Y/C 4.4 vs league 4.4 (index 100)
   Why rule: ryd/car >= 4.5 → "Your run game moved the chains."; < 3.5 → "Your run game gained too little per carry."
   INFERRED constants: 4.5 / 3.5 thresholds, 4.4 league rate.

6. Fumble-Lost Rate
   Formula: fumLost / car
   League rate: ~0.8% (INFERRED — not sourced)
   Card: FumLost % 0.8 vs league 0.8 (index 100)
   Why rule: fumLost/car <= 0.008 → "You held onto the ball on the ground."; > 0.015 → "You coughed the ball up too often running."
   INFERRED constants: 0.008 / 0.015 thresholds, 0.8% league rate.

7. Catch Percentage
   Formula: rec / tgt
   League rate: ~65% (INFERRED — not sourced)
   Card: Catch % 65 vs league 65 (index 100)
   Why rule: rec/tgt >= 0.70 → "Your receivers caught what was thrown."; < 0.55 → "Too many targets fell incomplete."
   INFERRED constants: 0.70 / 0.55 thresholds, 65% league rate.

8. Yards per Target
   Formula: recYd / tgt
   League rate: ~6.5 (INFERRED — not sourced)
   Card: Y/T 6.5 vs league 6.5 (index 100)
   Why rule: recYd/tgt >= 7.5 → "Your passing game created big chunks."; < 5.0 → "Your passing game gained too little per target."
   INFERRED constants: 7.5 / 5.0 thresholds, 6.5 league rate.

9. Defensive Pressure Rate (team)
   Formula: press / att   (att = opponent pass attempts, summed across the two sides of the box score)
   League rate: ~25% (INFERRED — not sourced)
   Card: Pressure % 25 vs league 25 (index 100)
   Why rule: press/att >= 0.30 → "Your front got after the passer."; < 0.15 → "Your pass rush never arrived."
   INFERRED constants: 0.30 / 0.15 thresholds, 25% league rate, requires cross-side opponent att.

10. Takeaways per Game
   Formula: (intDef + fr) / games   (games from box score count; defensive takeaways only)
   League rate: ~1.5 per game (INFERRED — not sourced)
   Card: Takeaways/game 1.5 vs league 1.5 (index 100)
   Why rule: (intDef+fr)/g >= 2.0 → "Your defense took the ball away."; < 1.0 → "Your defense didn't create takeaways."
   INFERRED constants: 2.0 / 1.0 thresholds, 1.5/game league rate, games denominator not a STAT_KEY (derived from box score line count).

11. Field-Goal Percentage
   Formula: fgm / fga
   League rate: ~83% (INFERRED — not sourced)
   Card: FG% 83 vs league 83 (index 100)
   Why rule: fgm/fga >= 0.90 → "Your kicker was automatic."; < 0.75 → "Your kicker missed too many."
   INFERRED constants: 0.90 / 0.75 thresholds, 83% league rate.

12. Punt Average
   Formula: puntYd / punts
   League rate: ~45 (INFERRED — boxscore.ts punt base 45 at l.207)
   Card: Punt avg 45 vs league 45 (index 100)
   Why rule: puntYd/punts >= 46 → "Your punts flipped field position."; < 40 → "Your punts were too short."
   INFERRED constants: 46 / 40 thresholds, 45 league rate (boxscore base).

13. Kickoff Return Average
   Formula: krYd / kr
   League rate: ~23 (INFERRED — not sourced; boxscore return base 24 at l.237)
   Card: KR avg 23 vs league 23 (index 100)
   Why rule: krYd/kr >= 25 → "Your returns started drives well."; < 20 → "Your returns gave up field position."
   INFERRED constants: 25 / 20 thresholds, 23 league rate.

14. Punt Return Average
   Formula: prYd / pr
   League rate: ~8.5 (INFERRED — boxscore return base 8.5 at l.238)
   Card: PR avg 8.5 vs league 8.5 (index 100)
   Why rule: prYd/pr >= 10 → "Your punt returns gained ground."; < 6 → "Your punt returns gained little."
   INFERRED constants: 10 / 6 thresholds, 8.5 league rate (boxscore base).

--- NOTES ---
- stats 9 and 10 need a cross-side lookup (opponent att) or a games denominator that is not itself a STAT_KEY; they are derivable from the BoxScore (two side lines + credits) but not from a single PlayerLine alone.
- No stat uses pointsOf() beyond TD/FG/safety (l.252-253) — points per drive would need drive count from credits, which is available.
- Every league rate above is INFERRED; none is cited to a sourced table. Replace with real sourced rates when available.
