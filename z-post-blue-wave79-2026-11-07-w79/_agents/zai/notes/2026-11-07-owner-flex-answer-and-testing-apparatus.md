# THE OWNER'S FLEX ANSWER + THE TESTING APPARATUS — w79 evidence (Z.ai, 7 Nov 2026)

Product: `Football-Sim-Z-post-blue-w79.html` · md5 `61acb21e55fac92a6d84eac6acb10bd1` · 1,836,431 B ·
base = the frozen w76 shell (`4f363452…`), 19 asserted replacements, zero hand edits.

---

## 1 · Your flex answer, run on THIS engine (the shell, not the Colors track)

Claude's flexcap experiments ran on the Colors engine. Your w79 runs the same questions on the
product engine — where the w66 unit law already makes the auto-lineup natural-first (a tight end
can only ever fill a tight end slot; cross-unit promotion is structurally impossible). The lab
(`tools/zai-lab/run-lab.mjs` + `zai-lab-inpage.js`) ran **8 seeded drafts × 32 teams × both bases
= 1,504 star placements** (85+ OVR):

| | w76 (before) | w79 (after) |
|---|---|---|
| DRIVE cases (an 85+ best-of-role star promoted by a ≥10 rule into a heavier slot) | 0 | **0** |
| small (2/4-rule placements) | 4 | **1** |
| surplus-star fills (k=2, empty slot) | 0 | 3 |
| emergency | 0 | 0 |

**Your named stars, 8/8 drafts each: McBride TE1 · Bowers TE1 · Kittle TE1 · Kelce TE1 · LaPorta TE1 ·
Bijan RB1 · CMC RB1 · Gibbs RB1 · Henry RB1 · Barkley RB1 · Gonzalez CB1 · Surtain CB1 · Gardner CB1 ·
Thuney OG1 · Lindstrom OG1 · Nelson OG1 · Humphrey C · Jones DT · Brown DT1 · Simmons DT1 ·
Warner MIKE · Roquan MIKE · Baun WILL · Oluokun WILL · Hamilton SS · Winfield SS · Bates FS · Branch (CB/SS) — all natural.**
(27 of 28 tracked stars 100% natural; the one exception is Tyler Linderbaum 7/8 — a **surplus second
center** filling an **empty OT2** at −10 when his team's C slot already held a better C. No star ever
leaves a top slot he could have kept.)

**The answer to your +50-increments question: on this engine, ZERO raises are needed.** WR1 stays 650,
OT1 stays 500, DT1 stays 500, TE1 stays 250, RB1 stays 250, CB1 stays 400 — your table ships verbatim.
The promotion problem you and Claude were solving exists only on engines without the natural-first
unit law; here it is already solved by structure, and the cap now closes the manual side.

**Your "let me know if the 2s and 4s cause a problem" answer: they don't.** The only 4-rule placement
in 8 drafts is Tanor Bortolini (C 86, k=2) at OG1 −4 — a **surplus** center using **your designed
C→OG 4 rule** for a slot that was empty. Reported, never driving. Claude's cap-20 tuning would have
destroyed this rule (C→OG went to 20 in his table); under your cap it survives and works.

The three surplus fills worth knowing about (all containment, all k=2, all empty slots):
Harrison Smith (FS 87) → CB1 −10 · Antoine Winfield Jr (FS 93) → CB1 −10 · Tyler Linderbaum (C 88) → OT2 −10.
A second safety/center filling a vacant spot is the census working, not a promotion.

## 2 · The flex table that shipped (your 7 Nov list, under your cap)

Every penalty ≥6 is now 10 (your −6s and −12s ride there); your 2s and 4s are untouched; your named
calls all read 10 — CB→WR 10 · RB→WR 10 · TE→WR 10 · OG→OT 10 (Thuney) · C→OT 10 (Humphrey) ·
DT→DE 10 (Brown) · ILB→DE 10 (Warner) · OLB→DE 10 (Baun). Destinations your list does not grant are
gone (the −8 emergency fill is the only fallback). QB keeps his one w65 flex (FS at −10). The board's
fills chips and the slot picker read the new penalties directly; the generated chart regenerates from
the live table so the chips can never drift again (the w76 chart was hand-written and had drifted: a
dead QB→WR row, P→K showing −2 against the table's −4).

## 3 · The weights that shipped (your table, verbatim — no raises)

QB 1000 · WR1 650 · DE1 650 · OT1 500 · DT1 500 · WR2/OG1/CB1 400 · OT2/DE2/DT2/MIKE/SS/FS 300 ·
RB1/OG2/CB2/TE1 250 · C/TE2/DL5/WILL 150 · WR3/RB2/CB3(NICKEL)/SAM 100 · TE3/WR4/CB4(DIME)/K/P 50 · FB 25.
LB4/SS2/FS2 (extra depth spots your table does not name) stay tiny at 10. The salary column
(40M QB … 2M P) lives in the engine block as `ZPB_SALARY_REF` — **battery-asserted that nothing renders it**.

**The engine now lands ON your table.** Each slot's measured curve carries one multiplicative
calibration (shape preserved) so the revealed 70→90 impact per slot = weight × 0.00254 wins.
The audit, in the Owner's own units:

- w76 (before): 10 of 32 slots outside your ±50 room — worst CB1 revealed 568 vs displayed 430 (dev +138), MIKE +75, K +84, WR1 −91.
- w79 (after): **32/32 inside the room, QB dev 0.0** (the anchor). One documented exception:
  DL5 displays 150 with engine impact 0 — the fifth-DL slot feeds no unit rating on the shell
  (identical in w76; a pre-existing structure fact, not a regression).

The game-day matchup model and the play-by-play are untouched, per your carve-out — the calibration
lives in the roster-value math (WINS, Priority, CPU draft emphasis, lineup optimization), which is
exactly the layer your table was meant to steer.

## 4 · The testing apparatus (what you asked for)

`tools/zai-lab/` — runs against any build, in-page, seeded, deterministic (same seed = identical
scan, proven twice):

- **flexScan** — seeded drafts → 85+ placement scan with the drive/small/second/emergency classes and
  the "encouraged" test (target slot outweighs the role's best natural slot). `--who`-style tracking
  for the 28 named stars. This is the test that answers "does any 85+ player get pushed off his spot?"
- **sweep** — change ONE slot's weight (±50) → the downstream report: round-1/2/3 CPU pick emphasis,
  drive count, league WINS totals, top-10 rankings order, star placements. First findings: single-slot
  ±50 moves shift draft emphasis (TE1 +50 → more early TEs; MIKE +50 → MIKE 6 of top-3-rounds picks)
  and WINS, but never reordered the top-10 rankings in any of 11 probes.
- **impact audit** — revealed 70→90 per slot vs the displayed weight, per slot, with the ±50 rule.
- **w79-surfaces battery** — 27 assertions pinning the new surfaces (table values, cap law, generated
  chart, chip row, salary silence, dropdown orders, the footer law, the calibration, the chip text).
  Bite-proven: 21 of 27 FAIL against w76.
- **the standing battery** — the cutover accept.js, re-pointed per the battery law: 84 assertions
  byte-identical, ONE law value updated (V1's dropdown order, your SS-before-FS ruling). REFERENCE run
  on w76 = 84/0 · ACCEPTANCE on w79 = 84/0 · zero page errors everywhere.

**One-player weight changes:** the lab's `setWeights({slot: value})` hook is the knob — weights are
per-slot by design (your table is per-slot), and the sweep reports every downstream surface at once.
A true per-PLAYER override would need a player-keyed map in `winsAt`/`playerWar`; the hook point now
exists (`zpbSlotWeight`), and I did not build the player-level UI you never asked for.

## 5 · The UI you asked for

- The Madden rankings weights dropdown now carries **the draft board's position buttons** — the same
  14 chips (QB RB WR TE OT OG C EDGE DT LB CB SS FS K) + ALL/CLEAR in the same format, showing each
  group's live weight total. Lit = the group counts toward the score; a dark chip zeroes its group;
  ALL restores the table (hand-edited values become the restore points).
- The dropdown's badges read the **depth chart order** (QB RB1 RB2 WR1-4 TE1 TE2 TE3 FB · OT1 OT2
  OG1 OG2 C · DE1 DE2 DL5 DT1 DT2 · MIKE WILL SAM · CB1 CB2 NICKEL DIME SS SS2 FS FS2 · K P), the
  position groups kept. TE3 joined (it had no badge at all before — caught by screenshot, fixed).
- The draft position dropdown now reads SS before FS (your depth chart's own order; the w73 order had
  FS first), and the player browser's position list reads the depth chart instead of alphabetical.
- The **mobile footer bug is dead**: the w46b touch-centering used `scrollIntoView` on the footer
  chip, which yanked the page back down to the footer after the scroll-to-top. The centering now
  scrolls the nav bar itself if it ever overflows — never the page. Asserted live on a touch-emulated
  phone: Rankings/Groups/Players/Guide clicks all land at scrollY 0.
- WINS + ratings surfaces: the Guide ladder ("which positions matter"), the Guide tier list, the
  Position Rankings buttons, The Series order — all now read the Owner's table through the calibrated
  engine; the ratings display scale (median-anchored) is untouched by design.

## 6 · Provenance

- Your salary table verbatim: `architect/engine-and-seats · tools/mathlab/salary-reference.json` (6 Nov).
- Your flex list verbatim: `architect/engine-and-seats · _agents/owner-notes/2026-11-07-flex-table-verbatim.txt`.
- The flexcap push you couldn't find: FOUND — `flexcap.mjs` + `results/flexcap10-2026-11-07.json` +
  `results/flexcap10-fixed600-2026-11-07.json` on the architect branch (both marked EXPERIMENT, not
  adopted; his raised weights TE1 600 / RB1 650 / SS 600 etc. were tuned on the Colors engine WITHOUT
  the natural-first unit law, which is why they needed raises this engine does not).
- Claude's other tools (flexscan, flextune) sit beside them; my lab mirrors their class definitions
  so the numbers stay comparable across tracks.
