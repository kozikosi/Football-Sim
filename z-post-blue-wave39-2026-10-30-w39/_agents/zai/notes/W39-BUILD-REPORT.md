# W39 BUILD REPORT — the Owner's round-39 directives

FROM: Z.ai (High Councillor, seat ZAI) · 2026-10-30 · the w39 round
BASE: the w38 bytes — md5 `4bf6254710e4d7556df916850f9a8b9b`, 1,471,483 B (CHECKSUMS-verified before the first cut)
SHIP: `Football-Sim-Z-post-blue-w39.html` — md5 `3eed4cc5b223449b345de1cd52264b7d`, 1,479,523 B
BUILD: `scripts/zpb_w39.py` — 14 asserted exact replacements on the w38 bytes, one clean chain (the previous session's four-wave pregame chain folded in and re-verified)

## Verify (all on the shipped bytes)
- `tools/w39_verify.js` — **84 PASS / 0 FAIL** (every w36/w37/w38 guard carried; the two superseded w38 shapes re-asserted in their w39 form)
- `tools/w39_stress.js` — **45 PASS / 0 FAIL** (the full draft → season → books → playoffs → Super Bowl → champion page, zero console errors end to end)
- `tools/w39_live.js` — **54 PASS / 0 FAIL** (real Chromium: the responsive drills at 390/500/900/1280, the Honors overlay at 380/500px-tall windows, the compact sort chips, the light-board ink, the pregame columns)
- `tools/w39_mobile.js` — **all green** (the 390×844 phone pass: zero overflow on five views, the map bubbles inside, zero page errors)
- **10 evidence shots** in `notes/evidence/` (the light/dark boards, the pregame lineup, the stacked cards, the Honors overlay at a short window)

## The round, mapped (see `notes/W39-INTAKE-LEDGER.md` for the verbatim ledger)
1. **A1 — the board's light-mode ink**: the per-theme dropdown law (light `--tn` / dark `--tnd` on the neutral rows via the `--zn:1` marker; the vivid rows untouched) + the name in the rankings ink (`--nm`/`--nmd`) + the light-mode stat tokens deepened. The measured light-board contrast went from ~1.35:1 to readable; the dark theme keeps the ink he loves.
2. **A2 — the compact cards tighten** (the ≤1120px board stops ballooning).
3. **A3 — the compact sort chips**: PLAYER/POS/TEAM/OVR/WINS/PRIORITY/GONE above the thead-less cards, the accent marks the active sort; live-verified (WINS click reorders the board).
4. **A4 — the top three per side, columns across from each other**: mirrored heights 50/22/78, shared beats, per-side slicing (no pool starvation), the lane-aware fit loop finally reaches the name (`font-size:1em`), lanes 18/82 desktop · 28/72 phone, the dead `--sx` overrides retired.
5. **A5 — one second slower, every action**: fade 4.4s, first star 2.2s, beat gaps +1s, flashes +1s, the regular intro's envelope grows to fit (playoff/SB lengths keep their law).
6. **A6 — the Honors cinematic scrolls itself**: `overflow-y:auto` + `overscroll-behavior:contain` + safe-center spacers + `flex-shrink:0` on the stage/box (a shrunken box painted its Continue below its own layout box — the recon catch). Live-verified at 380px and 500px-tall windows.
7. **B1 — the Madden wonk**: `table.mstack td{flex-wrap:wrap}` — the name keeps its line, the chips wrap, the 1200px silent inflation is gone (recon-proven: wrap 1200 → 490 at a 500px window).
8. **B2 — the browser scrolls**: `#viewPlayers #playerTable.mstack{overflow-y:auto !important}` — the w20 override had killed the panel's internal scroll and the pager with it.
9. **B3 — the groups scrollbar**: the w35 clip → `overflow-x:auto`; the stacked chips wrap; the GROUP dropdown capped (`max-width:100%`) — its widest series option had sized the closed select 1529px, silently clipped since w35.
10. **B6/B7 — the guide's two questions** (verbatim swaps).
11. **B9 — the leaked `// w32` note** out of the `zpbRowVars` string; `--zr2` returns.
12. **A7 — the mobile sweep**: every view measured; the page never scrolls sideways; no panel silently clips.

## Interpretations awaiting the Owner's veto (see the ledger §Interpretations)
- "the dropdown's team-name treatment" = the per-theme mapping (light `zpbLift(txL,.62)` / dark `txd`), names in the w38 rankings ink.
- "top three" = the three best 85+ non-kicker starters per side; fewer on one side caps BOTH (nobody faces nobody).
- "slow by one second for each action" = +1s on the action cadence and the fade; the intro's total keeps its standing law (the regular game's envelope grows only to fit the slower actions).

## What the next wave must not regress
- The dark-mode dropdown ink on the board (his named favorite) · the compact chips' accent law · the mirrored-columns pregame · the overlay's own scroll · Team Comparison and the Guide compressing perfectly (his words).
