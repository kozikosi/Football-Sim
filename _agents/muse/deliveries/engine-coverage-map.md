# Engine test coverage map

Which parts of the engine have been stress-tested, and which are dark. Updated as tests land.
Source: `colors/src/engine/` on `origin/architect/engine-and-seats` (E3).

## Tested — holds

| Area | Test | Result |
|---|---|---|
| Positional values | 80→99 sweep, all positions, 1500 games each | Ranking established (QB +4.31 … SAM +0.13); tiers robust, fine ordinals noisy |
| Turnover model | Elite QB vs elite CB1/DE1 | Sane: QB protects (0.89), CB1 forces (1.33), strength-vs-strength resolves (0.97) |
| Sack model | DE1 80→99 | 2.22 → 2.60/gm, sane |
| Extremes | all-99 vs all-60 | 31.4–6.8, 98.8%, no explosion, clamp holds at 58 |
| Elite vs elite | 99 O vs 99 D | 24.1 PF vs ~22 avg — slight offensive bias, acceptable |
| SAM package dependence | Base vs nickel | +1.11 in base, +0.13 in nickel — correctly modeled, not a bug |
| channels ↔ structPts | Reconciliation | Exact (gap 0.000) — matchup internally consistent |
| Flex penalties | Code review vs REV 4 guide | Holds — asymmetries football-plausible or Owner rulings; QB→FS -10 is generous but Owner's rule |
| Schedule | Code review vs NFL formula | Holds — 17 games, 9/8 home split alternates by conference, byes fair, Week 18 all-division |
| Tiebreakers | Code review vs NFL procedure | Holds — follows NFL steps correctly (head-to-head → division → common → conf → SOV → SOS → points) |
| Kicking model | Code review vs NFL data | Holds — curve matches NFL, Bayesian update sensible; asymmetric clamp (lose 16/gain 10) unexplained but not wrong |

## Tested — BROKEN (fixes queued as P-219..P-222)

| Area | Test | Finding |
|---|---|---|
| DB run support | Spec audit vs conventional logic | Inverted: CB1 (0.70) > SS (0.34). P-219 |
| Run saturation | MIKE 80→99 vs run-O sweep | 19.6 yds vs avg → 0.0 vs elite. P-220 |
| Dead terms | Punter/returner/QB-run/WR-blk in games | Modeled, never simulated; wpFrom off by 1.2pp. P-221 |
| Focus dial | Pass focus vs elite pass O | 1.9 yds saved (6 vs avg). P-222 |

## Dark — never tested

| Area | Why it matters | Suggested test |
|---|---|---|
| 4th-down logic | N/A — engine is top-down | **NOT A FEATURE**: no down-by-down simulation; "turnover on downs" is an allocated drive ending. Removed from test list. |
| Clock management | Partially modeled | Drives have timestamps but no 2-min drill, timeouts, or kneel-downs. Emergent only. |
| Home field | 1.7 pts assumed | **HOLDS**: 55.7% home win (NFL 55–57%), 1.65-pt diff. No action. |
| Turnover stickiness | Skill vs luck | Split-half correlation of forced TOs |
| Special teams | Beyond K (dead: P, RET) | Kickoffs, onside kicks — modeled? phantom? |
| `lean` term | Identity feedback loop | Does a roster's run-identity distort its own matchup? |
| Tiebreakers | Playoff seeding | Construct ties — deterministic and sane? |
| Blowout threshold | Competitiveness | 99 vs 70/75/80 — where does it break? |
| Drive distribution | Top-down allocation | **MEASURED**: PUNT 41.5% (NFL 35%), DOWNS 3.1% (NFL 6%), score SD 8.2 (NFL 10%). Punt rate 6.5pp high; variance low (inherent). See WR-1, WR-2. |
| Overtime | Uses structPts (dead terms live!) | OT vs regulation model divergence — quantify |
| Schedule | Fairness | **HOLDS**: NFL formula correct, home/away balanced, byes fair. No action. |
| 3-4 calibration | Provisional weights | **GAP**: "Step 5" (validate neither base dominates) referenced in slots.ts but never built. DT2→MIKE 260, SAM→DT2 300 are uncalibrated. Needs Owner/Architect decision. |
| lineup.ts NOTE | Documentation | **STALE**: describes pre-Oct-29 3-4 mapping (SAM→WILL 240); code implements Oct-29 change (SAM→DT2 300). Doc fix needed. |

## How to claim a dark cell

File `inbox/<UTC>-<seat>-test-<slug>.md`, run it with the harness (`_agents/muse/deliveries/engine-test-harness.ts`), report. Move the row to Tested when done.
