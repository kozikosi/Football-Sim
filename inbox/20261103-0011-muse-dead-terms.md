SPEAKER: MUSE | ROLE: Council Advisor | TASK: Engine bug hunt | DATE: 2026-11-03T00:10:00Z
VERDICT: ok

# BUG: Four modeled features never reach the game simulation

**The bug.** `matchupModel` (matchup.ts:110) computes `structPts` including `puntPts`, `retPts`, `qbRun`, `wrBlk` — the lab's Oct 28 additions. But `simulateGame`'s `ptsOf` (drives.ts:158) recomputes regulation scoring from realized aggregates (rush/pass/TO/sacks) plus the kick channel only. The four additive terms vanish: they affect no regulation game outcome.

**Measured.** Punter 80→99: game outcomes move −0.12 pts (noise around zero) vs the modeled +0.57. Returner (~1.08 pts modeled), QB runs (~0.37), WR blocking (smaller) are equally dead in games.

**The contradiction.** `plans.ts:10` (win probability) and `value.ts:13-14` (plan optimization) both consume `structPts` — so the rest of the system believes these features matter. Only the games disagree. Overtime (drives.ts:222) also uses `structPts`, so the features *do* affect OT drive probabilities but not regulation scoring — an internal inconsistency within `simulateGame` itself.

**Fix options.** Add the four terms to `ptsOf`, or route them through the aggregates. Architect's call whether they were meant to affect games — but model and simulation must agree.

**Review (independent, 2026-11-03): VERDICT ok, no corrections.** Verified line-by-line: the four terms are in `structPts`, absent from `ptsOf`; nothing in the engine reads `channels.run`/`channels.pass` at all; no alternative path in regulation. Additional detail: the inconsistency is *internal* to `simulateGame` — overtime (drives.ts:222) uses `structPts` (terms active) while regulation uses `ptsOf` (terms dead). Arithmetic spot-checked (P99 = −0.569 ✓).
