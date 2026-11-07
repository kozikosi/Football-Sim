# UPDATE-README — Football-Sim-Z-post-blue-w79 (Z.ai · High Councillor · 7 Nov 2026)

**Wave:** w79 (the Owner's counter) · **Base:** the frozen w76 shell `4f363452…` (1,830,164 B) ·
**Product:** `Football-Sim-Z-post-blue-w79.html` · md5 `61acb21e55fac92a6d84eac6acb10bd1` · 1,836,431 B ·
19 asserted replacements from pristine w76 (script `zpb_w79.py`), zero hand edits.

## What changed, in the Owner's own order

1. **The weight table is the model.** The Owner's 32-slot table (QB 1000 … P 50; salary-reference.json,
   6 Nov) is now `DEFAULT_WEIGHTS`, the MODEL preset (the QB=700 rescale retires), and every displayed
   weight — input caps moved 700→1000. `ZPB_SALARY_REF` stores the salaries internally; a battery
   asserts nothing renders them.
2. **The flex table = the Owner's 7 Nov list under the −10 cap.** ≥6 → 10; his 2s/4s untouched; named
   calls at 10 (CB→WR, RB→WR, TE→WR, OG→OT, C→OT, DT→DE, ILB→DE, OLB→DE). Destinations the list does
   not grant are gone; QB keeps FS at −10 (standing w65 law). Divisible by 2 throughout.
3. **The engine lands ON the table.** One multiplicative calibration per slot's measured curve: the
   revealed 70→90 impact = weight × 0.00254. w76 was up to 138 off (CB1 568 vs 430); w79 is 32/32
   inside the Owner's ±50 room, QB dev 0. DL5 documented (flat curve — feeds no unit; same as w76).
   The game-day matchup model and the play-by-play untouched (the Owner's carve-out).
4. **The testing apparatus** (the Owner's central ask): `tools/zai-lab/` — seeded drafts (deterministic,
   proven), the 85+ flex scan with drive/small/second/emergency classes, the weight sweep (one-slot ±50
   → CPU pick emphasis · drive count · WINS totals · top-10 rankings · star placements), the impact
   audit, and `batteries/w79-surfaces.js` (27 assertions; bite-proven 21-fail on w76). Results JSONs in
   `results/`; the answer report in `notes/2026-11-07-owner-flex-answer-and-testing-apparatus.md`.
5. **The flex chart GENERATES from the live FLEX table** (the hand-written chart had drifted: a dead
   QB→WR row, P→K −2 vs the table's −4). New `.zpb-ft-10` cap chip (solid ink ring). Guide narrative
   rewritten to the new ranking; the ladder/tier/Series/Position-Rankings surfaces re-derive.
6. **The Madden rankings dropdown:** the draft board's 14 position chips + ALL/CLEAR (same format,
   group weight totals, lit = counts, dark = zeroed, ALL restores — hand edits become restore points);
   badges in depth-chart order; TE3 joined (and its LABELS gap — found by screenshot — fixed).
7. **The dropdowns read the depth chart:** draft filter SS before FS (the w73 order had FS first);
   player browser position list in depth order (was alphabetical); TE3 in the Position Rankings groups.
8. **The mobile footer bug is dead:** the w46b touch-centering `scrollIntoView` was dragging the page
   back to the footer after the scroll-to-top; the centering now scrolls the nav bar only. Asserted on
   a touch-emulated 390px phone: four footer pages, scrollY 0 each time.

## The flex answer (what the Owner asked this chat)

Zero drive cases in 1,504 star placements — on THIS engine no weight raises are needed (the w66
natural-first unit law already holds every 85+ star at his role; the cap closes the manual side).
The named stars are 8/8 drafts natural (McBride, Bowers, Bijan, CMC, Gibbs, Gonzalez, Thuney,
Humphrey, Brown, Warner, Baun … 27 of 28 tracked stars 100% natural). The 2s/4s cause no problem:
the one 4-rule placement found is the Owner's own designed C→OG 4 used by a surplus second center.

## The proof

- REFERENCE: `accept.js` + w76 adapter on the w76 bytes → **84 pass · 0 fail** (labels byte-identical).
- ACCEPTANCE: `accept-w79.js` (ONE re-pointed law value: V1 dropdown order, the Owner's SS-before-FS)
  + w79 adapter on w79 → **84 pass · 0 fail** · zero page errors.
- NEW SURFACES: `w79-surfaces.js` on w79 → **27 pass · 0 fail**; on w76 → 6 pass · **21 fail** (bites).
- LAB: 8 seeded drafts × 32 teams — 0 drive · determinism proven · impact audit 32/32 in room.
- Screenshots: `shots/` — the chips dropdown (desktop + phone), the generated flex chart, the Guide
  ladder reading the Owner's table as WINS, the phone rankings at scrollY 0.

## Placement on gh-pages (on push)

Unzip at the gh-pages root → `z-post-blue-wave79-2026-11-07-w79/` beside the wave folders; `_agents/zai/`
via `tools/import-zip.sh zai <zip>` on `council/zai` if Beam carries it.
