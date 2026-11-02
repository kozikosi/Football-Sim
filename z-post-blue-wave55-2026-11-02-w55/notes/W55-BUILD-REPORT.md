# W55 BUILD REPORT — the phone pass

Wave 55 · built 2026-11-02 · baseline: the Owner's w54 bytes (md5 `512d1885ac0a69120bedcaf8e9041f2b`, 1,584,527 B)

**PRODUCT** · `Football-Sim-Z-post-blue-w55.html` · md5 `49161f118e587701f1d639346e22d4d2` · **1,592,738 bytes**
(one generator: `tools/zpb_w55.py` — asserted exact replacements + post-checks; ran clean from the pristine baseline on every iteration)

## What shipped (the Owner's ten asks, in his order)

| # | His words | The fix | Proof |
|---|---|---|---|
| 1 | Player cards too tall on mobile — condense to one or two lines | The phone draft card collapses to TWO lines (name · OVR · Draft / one quiet stat line), 117px → **71px**; the mini field labels retire on the phone; the CARDS view drops the bar and reads name / one narr line; the team crest sits inline on the stat line | battery M1 (71px, gridRows 2, labels 0) · `evidence-draft-card.png` |
| 2 | The Dime on the lineups and preseason page should look like everyone else | `dimeEd()` now renders the SAME picker as every slot (`select[data-lineup="CB4"]` → the zpbPickList wrapper the wiring swaps in) — staging, APPLY THE CHANGES, UNDO and RETURN TO MODEL LINEUP all cover CB4 | battery M7 (same wrapper as NICKEL, a pick stages) · desktop D3 (stages + lights APPLY) |
| 3 | Small localStorage — a refresh comes back to where you were | `zpb:tab` (the `zpb:theme` family): every tab click saves; the LAST body script restores it on boot — and boot-time defaults never clobber the save (readyState guard) | battery M2 (GUIDE survives a reload) · desktop D6 |
| 4 | The box score is two separate panels on mobile | `table{display:block}` split the linescore into anonymous tables. The linescore (and team stats) keep `display:table`, drop the 320px min-width, compact padding — ONE table, quarters across, the desktop shape; `data-nostack` opt-out | battery M4 (display table, 2 rows, 6-8 cells, fits) · `evidence-boxscore.png` |
| 5 | No side scroll on the game preview / game review pages | Root-caused: body is a flex column + `.wrap{margin:0 auto}` made the page shrink-to-fit its widest child — the preview's star pair rows needed ~530px (221px pan at 390px). `.wrap{width:100%}` ≤1024px + the pairs go one-per-line ≤640px + the strip squeezes ≤360px | M3/N1: **0px pan on preview AND review at 390 and 320** (was 221px) |
| 6 | The season in badges — cards appear in vertical order, honors first, pace untouched | The honors cards take beats 0..n−1 (they rendered FIRST in the rail but held the LAST beats — the blank top stage); everything else shifts by their count. DOM order, the 1s pace and the total untouched | D2 (real season: honors beats 0-5, firstOff=6) · D2b (synthetic: 0,1,2 → firstOff 3, same total) |
| 7 | Key players rating numbers bunched on the position badge | Same squeeze: one card per line on the phone — the header breathes, the rating rides right; the review's name leads its own line, chips wrap below (no mid-word "JOE BUR ROW") | M5 (stacked, zero overlap) · `evidence-preview.png` |
| 8 | SB champions team name not centered on mobile (the cinematic) | On ≤740px the crest stacks above the wordmark (storm AND the page banner); long Cinzel names wrap centered, never drag the pair off-center | M6 (|offset| = 0px, stacked) · `evidence-sb-storm.png` |
| 9 | Remove "(whole corps)" from the receiving unit report card | Both surfaces (the table card's receiving line + the tile card's produced line). The w52 aggregation law itself stays | D1 (string absent from the whole rendered document) |
| 10 | Continue to test mobile, optimize | The 320px leg (a narrower phone than ever tested), the marquee-era overflow guards, the w54 touch laws re-pinned | M8/N1 zero page errors; the standing-law grep sweep |

## The standing laws re-verified
- **w54 touch laws intact**: `text-size-adjust`, `tap-highlight-color`, `touch-action:manipulation`, the 38px tap floors, the rankings containment — all pinned (grep sweep in the report tail).
- **The w52 laws untouched**: the dot law (its script runs last but one; my strings carry no raw colons), the clock ink, the look-gate one-clock release, the SB order, the badge laws, the bar track.
- **Desktop regression**: the linescore is **pixel-identical** on w54 and w55 (386×93, `w55_d4cmp.js`); the storm keeps its crest-beside-name row; the face-off keeps its pairs.
- Zero page errors across every battery leg (boot, draft, season, review, 320px).

## The batteries (all green on the final bytes)
- `tools/w55_nodecheck.js` — 13 inline scripts parse · **13/13**
- `tools/w55_mobile.js` — 390px + 320px, M1–M8 + N1 · **22/22**
- `tools/w55_live.js` — 1280px, D1–D8 (+D2b) · **12/12** (run twice)
- Evidence: `shots/evidence-*.png` (draft card, box score, preview, SB storm, badges)
