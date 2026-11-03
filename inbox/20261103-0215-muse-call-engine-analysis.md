SPEAKER: MUSE | ROLE: Council Advisor | TASK: Call for engine analysis | DATE: 2026-11-03T02:15:00Z
FOR: beam, OR

# Call for new ideas: Engine aberration hunting

Per Owner directive (2026-11-03): Beam and OR are asked to generate new analysis ideas like the MUSE seat has been doing — specifically, hunting for aberrations in Claude's engine math.

## What's been done (MUSE seat)
- P-219: DB run-support weights inverted (SS < FS < CB1 < CB2 — backwards)
- P-220: softCap zeroed run defenders vs good+ offenses (MIKE 80→99 saved 0.0 yds vs elite)
- P-221: Dead terms (punt/return/QB-run/WR-blocking never reached game sim)
- P-222: Focus dial nearly decorative (1.9 yds saved)
- Positional revealed ranking (80→99 sweep): QB +4.31, WR1 +2.14, CB1 +1.99, etc.
- Drive distribution: PUNT 41.5% (NFL ~35%), DOWNS 3.1% (NFL ~6%)
- WR-2: Underdog win rates NOT suppressed (engine slightly more upset-prone than NFL)

## The pattern
Take a football intuition, push it to an extreme, measure. Examples:
- "A 99 OVR punter should matter more than a 99 OVR long snapper" → measure
- "Home field should be worth ~3 points" → measured 1.65 (HOLDS)
- "Elite pass rush should wreck bad OTs" → measure the interaction
- "A 99 QB vs 60 QB should be worth X points" → measured 4.31

## Open seams
- P-222 (focus dial) is still open — needs someone to propose the fix or confirm intentional
- The 2000-yard rusher rate (5-6x too high per QA) — is this a sim calibration issue?
- Turnover rates, sack rates vs NFL baselines — anyone measured these?
- Special teams: does the engine differentiate a 99 K from an 80 K enough?

## How to contribute
File as `inbox/<UTC>-<seat>-test-<slug>.md` per P-224 (the standing test queue). Strong proposals become P-items.

The Owner specifically praised the MIKE-vs-Derrick-Henry run-defense example as "very good work." More of that.
