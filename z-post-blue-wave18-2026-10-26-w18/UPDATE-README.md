# UPDATE-README — z-post-blue-wave18-2026-10-26

## What this package is
Wave **18** of Z-post-blue: the **Team Comparison rebuild + Guide pass + Draft board** (Owner round 12),
plus the round-12 micro-directive (the "Lower points allowed…" paragraph gone, "third corner" →
"an extra defensive back"). Base = wave 17 (`ddb9af52…`, Dime + position board) ← wave 16 (`c0b449de…`).
The engine did not move — 10 byte-pins assert-verified.

## The things to test first
1. **Footer → TEAM COMPARISON.** The top panel is gone; the two dropdowns sit where the team names
   were, in the Starter-by-Starter header; **83 vs 79 wears each team's color**; every panel is thin
   (520 px column, even at a max desktop window); the flex-penalty note is gone here but kept in the
   in-season comparison. The unit list runs in your order: OFFENSE · Quarterback · Running Backs ·
   Tight Ends · Offensive Line · Run Game · Pass Game · Pass Defense · Run Defense · Defensive Line ·
   Linebackers · Secondary · Defense.
2. **Guide → WHERE THEY LINE UP.** The WRs line out **on the line of scrimmage** (two right, one
   left), the CBs mirror them **wider**, CB3 is **NICKEL**, **DIME** has its own deep station — and
   **all 19 flex families ride under the rows** as the same gold FREE → wine −6 chips (hover for the
   sentence; on small screens the chips yield to the position board below).
3. **Guide → DEFENSE: 4-3, 3-4, NICKEL, DIME** (new panel between COACHING and THE MATH): four
   fronts drawn in dots — gold dots are cornerbacks, the dashed dot is the dime — with R+/P+ leans
   and hover explainers.
4. **Draft board.** Click the **proposed fill position itself** to change it (the "change" link is
   gone); the player list now **runs to the bottom of the panel, level with the depth chart**; ALL /
   NONE are smaller, quiet and left-aligned; **"Your Roster" fades in and out**; the Pick order /
   Depth chart toggle is the same segmented pill as 4-3/3-4 — base toggle left, view toggle right,
   one row; Dime verified in the depth chart.
5. **COACHING** panel: one philosophy line (uppercase COACHING PHILOSOPHY), then **AUTO** ("The math
   predicts the best personnel") and **CUSTOM** ("You choose how you want to play") side by side;
   the home-field +1.7 line lives in THE MATH; the GLOSSARY opens with **every starting spot in
   depth chart order**.

## Changelog (this chat — wave 18)
1. Team Comparison: top panel removed, dropdowns-as-team-names, team-colored score, 520 px column,
   note gated footer-only (both renderer copies patched — the runtime reassignment included).
2. Unit Comparison order = the Owner's 13 (display keys only; WR / Primary Coverage rows retired,
   Linebackers added — say the word to restore).
3. Field map: WRs on the line 2+1, CBs wider, NICKEL, DIME deep, flex-chip strips under every row
   (19 families incl. FB/K/P), legend gains the FLEX key.
4. Guide text pass: sentence-per-line + "play your own way"; Stars bullet, "They can also flex a
   player.", "(5 minus the backs and tight ends)", the white duplicate philosophy block, and "baked
   into every projection" removed; COACHING PHILOSOPHY + AUTO/CUSTOM pair; home-field line moved.
5. DEFENSE panel (4-3 · 3-4 · NICKEL · DIME dot fronts) between COACHING and THE MATH.
6. Glossary spot list in depth-chart order (28 slots + Dime).
7. Draft board: fill-position-as-control, list to the panel bottom, ALL/NONE 0.62rem left-aligned,
   fading "Your Roster", segmented view toggle opposite the base toggle, roster column 340 px.
8. Terminology: "an extra defensive back" on all seven remaining surfaces; round-12 paragraph gone.

## Interpretations awaiting veto (ledger §K)
Your 13-unit list omits Wide Receivers and Primary Coverage (implemented verbatim; restore on veto) ·
"add Dime here" = the depth-chart view (pick-order stays pick-based; a dime base is engine math) ·
field-map chips hide under 640 px (the board still shows the full chart on mobile) · "opposite side"
= base toggle left / view toggle right on one row · glossary spot lines shared per family.

## Verify (all against md5 `282017bd…`)
- **v18 suite: all green** — comparison (top panel gone, selects in the header, two team colors,
  520 px, note absent footer / present in-season, 13-unit order), field map (3 WRs on the line,
  CBs wider, NICKEL, DIME own row, 41 chips / 19 families, QB "−6 WR, S" hover), guide text pass,
  DEFENSE panel (fronts 4-3-4 / 3-4-4 / 4-2-5 / 4-1-6, gold + dashed dime dots), glossary (29+
  spot lines, CB3 → Dime adjacency), draft board (segmented toggle state, opposite sides one row,
  uncapped list with matching panel bottoms, ALL/NONE 0.62rem left, fading title, fill-as-control →
  inline picker with 6 options, Dime row), mobile 390 px fits, **zero console errors**.
- v17 flex suite on this build: **ALL PASS** (board 8 cats/18 cards, chart v3 verbatim, Dime in all
  depth surfaces, engine pins, mobile).
- v16 regression (35 checks incl. P0 draft-alive + watchdog): **ALL PASS**. Hardening: **7/7 PASS**.
- Evidence: `evidence/w18-fieldmap.png`, `w18-fieldmap-mobile.png`, `w18-defense-panel.png`,
  `w18-coach-panels.png`, `w18-comparison.png`, `w18-comparison-mobile.png`, `w18-draft-board.png`.

## Contents
```
Football-Sim-Z-post-blue.html     the wave-18 product (md5 282017bd32767c518d036917347de827, 1,279,526 B)
UPDATE-README.md                  this file
CHECKSUMS.txt                     md5 over every file in the zip
_agents/zai/                      lane: START-OF-CHAT-ZAI.md · END-OF-CHAT-ZAI.md · ZAI.md
_agents/zai/deliveries/           OWNER-ROUND-8-INTAKE.md (§A–§K) + all standing deliveries
_agents/zai/tools/                zpb_v13…v18 build scripts + v15/v16/v17/v18 verify + hardening suites
_agents/zai/evidence/             wave-14…18 screenshots incl. the field map, DEFENSE panel, draft board
```
