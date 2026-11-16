# PROPOSAL-PATCH-boxscore-assertions.md — §5 proposal: the box-score assertions no test makes (Rev 10 EXT D3)

Seat: Z.ai · 2026-11-16 · filed for the Architect to integrate; colors/ untouched (the harness
mutates THROWAWAY copies only; the four related test files ship as read-only byte-copies of the
pin's tests under probes/d3-tests/nfl/, hashes receipted).

- target build: colors/src/sports/nfl/engine/boxscore.ts + colors/test/nfl/boxscore.test.ts at the
  engine pin commit d3bd81d2
- WHERE (anchor strings, each exactly once in boxscore.ts at the pin):
  1. `O.pt.line.stats.puntYd += y;` (the PUNT branch)
  2. `const y = d.defTD ? r.int(15, 85) : Math.max(0, Math.round(10 + 9 * r.normal()));` (the INT branch)
  3. `export const STAT_KEYS = [` (the stat-key list — for the firstDowns finding)
- old → new: NO engine change proposed — the proposal is TEST-ONLY (new assertions in
  boxscore.test.ts, plus one product decision named below):
  1. **Punt yards consistency (measured survivor):** in the seeded-games loop, assert
     `punts > 0 ⇒ puntYd ≥ 28 × punts && puntYd ≤ 66 × punts` (the clamp's own bounds) and
     `punts === 0 ⇒ puntYd === 0`. Today removing the accumulator entirely (`puntYd += y` deleted)
     leaves all four related test files green — receipted SURVIVES in
     receipts/d3-boxscore-mutations.txt.
  2. **Interception return integrity (measured survivor):** assert `intDef > 0 ⇒ intDefYd > 0`,
     `intDef === 0 ⇒ intDefYd === 0`, and `box.credits` retYards per INT equals the intercepting
     line's intDefYd delta (one fold vs the other — today the credits fold and the stats fold can
     disagree freely). Today hard-coding every non-TD return to exactly 20 yards (spotted at the
     20 instead of at the catch) leaves all four files green — receipted SURVIVES.
  3. **firstDowns (the ABSENT-AT-PIN finding):** there is NO firstDowns/first_down symbol anywhere
     in src/ at d3bd81d2 and no firstDown STAT_KEY — the field does not exist in this engine, so
     "firstDowns never counted" is trivially true and cannot be mutation-tested here. Either (a)
     the product wants first downs → add the STAT_KEY + accumulate it in the drive reconstruction
     + assert `firstDowns ≥ conversions on downs`, or (b) it does not → record the absence as a
     decision so a future "add first downs" ask is a spec change, not a silent gap. The Architect
     rules which; both options are test-only on the colors/ tree.
  4. **The TD class nuance (measured, differs from the survivor report):** removing the PLAYER-LINE
     receiving-TD increment (`tdRecv.line.stats.recTd++`) is CAUGHT at this pin (the lines-vs-
     credits equality and the team-stat-sum test both fail) — so the surviving "touchdowns never
     counted" mutation Ernie reported must be a different TD field or an older revision. The
     untested TD surface that remains: the credits fold's SCORER identity is not cross-checked
     against the play reconstruction (two folds of the same events, per Ernie's analysis) — assert
     `sum(rtd+recTd+defTd over lines) === sum(credits where kind ends in _TD)`.
- WHY: a box score that silently stops counting punt yards, or shifts every interception spot to a
  constant, passes every test shipped today — "every screen agrees" compares folds that share the
  same misclassification. These are product-facing numbers (the user reads punts/avg and INT
  returns), so this is a product-defect risk, not a tidy-up.
- SAFE ALONE?: YES — test-only; no engine byte moves. If an assertion fails on the CURRENT build,
  that is a FINDING (file it), not a reason to revert the test.
- HOW TO CHECK: apply the new assertions → `node --test --experimental-strip-types
  test/nfl/boxscore.test.ts` green on the unmutated engine; then apply each mutation of
  scripts/d3-boxscore-mutations.mjs (M1, M3) in a scratch copy → the SAME file must go red naming
  the new assertion. The harness + control (green unmutated baseline) ship in the delivery; the
  falsifier is the script itself.
