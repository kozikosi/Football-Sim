# UPDATE-README — z-post-blue-wave17-2026-10-26

## What this package is
Wave **17** of Z-post-blue: **Dime + the position board**. The Owner added Dime to the position
list — visual only this wave ("YOU ARE NOT RECALCULATING THE MATH IN THE ENGINE. THIS IS PURELY
VISUAL FOR NOW"). Base = wave 16 (`c0b449de…`, flex chart v2) ← wave 15B (`d053d4fe…`, P0
dead-draft fix pack + all round-9 directives).

## The one thing to test first
**The Guide → YOU CAN FLEX.** The old list is now a **position board**: eight categories —
DEFENDS THE PASS · PRESSURES THE QB · STOPS THE RUN · MOVES THE OFFENSE · RUNS THE BALL ·
CATCHES PASSES · PROTECTS THE PASSER · THE KICKING GAME — with 18 position cards (Nickel / Dime
included). Each card carries its flex chips; **hover (or tap) a card for the job it does** —
Dime's hover is your own snap-share sentence. Nothing sentence-long is visible on the board.

## Changelog (this chat — wave 17)
1. **Position board** (Guide): 8 categories → 18 cards, awards-badge language, gold FREE → wine
   −6 chips, hover/focus tooltips, mobile-checked (no card overflows 390 px).
2. **Flex chart v3 verbatim** on the cards: RB −6 TE (S leaves the row); WR/TE lists gain
   Nickel, Dime; DE −4 MIKE, ILB, **FB** (wave-16 slip fixed) and −6 TE, RB, Nickel; MIKE −6
   gains Nickel, Dime; OLB −4 DE, Nickel and −6 gains Dime; SS/FS FREE Nickel, Dime;
   CB FREE FS, Nickel, Dime; **Punter −2 K** (was −4).
3. **Dime everywhere, display-only**: Dime rows in Your Full Depth Chart, Roster (as drafted),
   the draft-sidebar depth panel, and Starter-by-Starter comparisons (real teams show their
   data's dimeback — KC vs LV: Nohl Williams vs Jermod McCoy; drafted rosters show the roster's
   4th-best CB with a small PKG tag). DIME station + legend on the field map; Dime in the
   Glossary with your sentence; slot-name hover gains "Dime Cornerback (CB4)".
4. **Engine untouched and pinned**: 28 roster slots, DEPTH_CHART_GROUPS unchanged, slot-wins /
   flexPenaltyFor / effOvr byte-pinned, grade table still 28 rows, full sim-to-end draft still
   completes 28 slots. Dime joins the real math when Claude's engine lands.

## Interpretations awaiting veto (ledger §J)
Nickel/Dime card chips read inbound ("FREE · CB, SS, FS") · drafted dimeback = 4th-best CB ·
Dime excluded from lineup selector/grade/wins until the engine lands · the five offense/kicking
category names are mine · one hover-hint line under the board.

## Verify (all against md5 `ddb9af52…`)
- v17 suite: **all green** — board (8 cats / 18 cards / verbatim chips / tooltips hidden by
  default, shown on hover), Dime rows in all four depth surfaces, glossary + field map,
  engine pins (28 slots, DEPTH_CHART_GROUPS unchanged, QB→RB 6 / RB→FB 0 / TE→RB 4 / SS→CB 4 /
  K↔P 0), grade table 28, mobile 18 cards no overflow, zero console errors
- v16 regression (35-check round-9 + P0 draft suite) on this build: **ALL PASS**
- Hardening on this build: **7/7 PASS** (filter lifecycle, full 26-round instant draft,
  watchdog revival, pick-1 clock, zero errors)
- Evidence: `evidence/w17-board-*.png`, `evidence/w17-comparison-dime.png`

## Contents
```
Football-Sim-Z-post-blue.html     the wave-17 product (md5 ddb9af524604d136e95d2f97eab6421e, 1,267,349 B)
UPDATE-README.md                  this file
CHECKSUMS.txt                     md5 over every file in the zip
_agents/zai/                      lane: START-OF-CHAT-ZAI.md · END-OF-CHAT-ZAI.md · ZAI.md
_agents/zai/deliveries/           OWNER-ROUND-8-INTAKE.md (§A–§J) + all standing deliveries
_agents/zai/tools/                zpb_v13…v17 build scripts + v15/v16/v17 verify + hardening suites
_agents/zai/evidence/             wave-14/15/16/17 screenshots incl. the position board
```
