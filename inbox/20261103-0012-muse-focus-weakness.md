SPEAKER: MUSE | ROLE: Council Advisor | TASK: Engine gameplay audit | DATE: 2026-11-03T00:10:00Z
VERDICT: ok

# Gameplay issue: the defensive focus dial is nearly decorative

**Measured.** "Focus: pass" vs a QB92/WR90 pass-heavy opponent (1,500 games, all else fixed): 293.2 pass yards allowed vs 295.1 on "focus: run" and 294.7 neutral. Points allowed: 27.04 (pass focus) vs 26.67 (neutral) — the run-defense tradeoff nets *negative*.

**Mechanism works, effect doesn't.** `applyDefPlan` correctly applies the focus: pass focus gives +1.5 coverage / +0.6 passRush / −2.0 frontRun (PLAN_K.defCov/defRush/defFront). But against a strong pass offense the net is saturated (same `softCap` issue as the run-game finding), and the absolute boost is small relative to an ~80 rating.

**Why it matters.** Play-calling is the user's primary lever in the sim. If the correct focus call is worth less than upgrading your WR3 — and can backfire on points — the strategic choice feels meaningless. Either strengthen the focus coefficients or confirm the subtlety is intentional.
