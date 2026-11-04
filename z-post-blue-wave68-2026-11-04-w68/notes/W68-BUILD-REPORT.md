# W68 BUILD REPORT — the Owner's seven UI items: full names, the dash/dot law, the golden celebration, the Super Bowl page path, the continue gate, the victory page

**File:** `Football-Sim-Z-post-blue-w68.html` · md5 `22bc00ab8cc244da7ba8030a5a67c8da` · 1,796,935 bytes
(w67 1,786,217 → **+10,718**)
**Baseline:** the shipped w67 bytes `ecf2b295b97739b88e7f60068b588b84` (gh-pages, hash-verified against the wave-67 CHECKSUMS.txt at chat start) — asserted on every generator run.
**The chain:** EIGHT asserted generators (`zpb_w68.py` → `zpb_w68f.py`, plus the repair `zpb_w68b3.py` and the polish `zpb_w68b4.py`), each pinning the previous md5, exact anchors with counts, and post-checks; rebuilt from the pristine baseline on every fix. The chain re-runs byte-stable.

## The chain

| # | step | what it lands |
|---|------|---------------|
| 1 | zpb_w68.py | the WAVE/CLAIMS header (w67 → w68) · **UI 2A** the season-in-badges rail: the w50 blanket digit-dash-digit convert RETIRES (it ate the shared digit: `10-6-1` printed `10·6-1` — the Owner's example), the W-L split badges (ONE SCORE / VS DIVISION / AT HOME / ON THE ROAD / VS PLAYOFF TEAMS) read DASHES, RECORD and the game scores keep theirs, the per-game lines keep their dots; the w50 header comment records the amendment · **UI 3** the season-awards summary paragraph retires WHOLE (the counts sentence + its indented honor lines) from BOTH definitions of renderRegularAwardsHTML (the live card renderer and the shadowed table renderer) |
| 2 | zpb_w68b.py | **UI 2B** the dash/dot law across every game-score surface — 34 asserted sites: the replay's final scoreline (`<i>-</i>`), the Super Bowl page's score separator, the sim-playoffs round card's separator, the how-the-game-was-decided `fin`, the series tag, the replay story (the tie, the half, the third quarter ×3, the OT line, the fourth-quarter run, the edged/held-on/poured-on/lead-changes/shootout/hard-come/finished finals), the season-in-words scores (blowout, marquee, low point — the records in parens were already dashes), the playoff retrospectives (SB loss, one-game, run-ended, bracket-without, champ round, close calls), the h2h, the conference history, the meets line, the SB season line, the playoff-games line |
| 2b | zpb_w68b2.py | **UI 2B caught live**: the REAL schedule-tile renderer is the w33-era `renderUserScheduleHTML = function` override — its tile score read `13 · 4`; it reads `13 - 4` now (the battery caught the first pass missing it — measure, don't guess) |
| 3 | zpb_w68c.py | **UI 1** the name ladder: `avail()` measures the TRUE available line for content-sized flex children (parent width − siblings − gaps; the old self-measure let a once-shortened name shrink its own box and lock — "Chris Lindstrom" → "CL" forever); the ladder gains the `floor` arg — at window ≥ 1025px the FULL name (vertical allowed) is the floor, never last names, never initials; the poschip stops shrinking so a wrapping name cannot squeeze it |
| 4 | zpb_w68d.py | **UI 4** the golden celebration: `zpb-mygold` (golden border + outer glow, both themes) on the user's award cards (MVP/OPOY/DPOY/CPOY/OROY/DROY/COY + the statistical champions), on every user All-Pro/Pro-Bowl/All-Playoff chip, and the chip names shimmer for ANY award; the season-in-badges honor cards gain the glow |
| 5 | zpb_w68e.py | **UI 5+6** the run-ends screen retires: `zpbPlayoffEndScreen` always mounts the Super Bowl page; the SIM REST door's inline decision joins; `zpbPlayoffElimCine` and its `.zpb-pofin` face leave the file (the N5 comparison rules in that style block stay); the run cine's 3400ms auto-advance retires — every round card carries the gold Continue pill, the last card's Continue flows into the SB page (mount first, fade second — the w57 law); the gold-pill family gains `.zpb-porun-go` and `.zpb-victory-go` |
| 6 | zpb_w68f.py | **UI 7** the victory page: `zpbSuperBowlVictoryCine` — when the champion IS the user's team, the SB page's Continue mounts it BEFORE the SB overlay fades (opaque from the first painted frame, the w43 law — no flash of the page beneath); the SB Continue hands off and returns early so the reward rides the victory page's own Continue; the CSS + JS blocks planted at the end of body |
| 6b | zpb_w68b3.py | **THE REPAIR the battery demanded**: step 4's plant swallowed the previous style block's `</style>` (the anchor included it; the replacement did not restore it) — the w68 style tag itself was being parsed as CSS text inside the w67-intro block and `.zpb-mygold` never applied. Restored; 42 style opens / 42 closes verified |
| 6c | zpb_w68b4.py | **the visual-polish pass the shots demanded**: the victory god-ray wheels masked tight (the rays glow around the crest and fade before the edges — the full-screen wash was too loud on desktop), the ray alphas softened |

## The dash/dot law — where the dots intentionally STAY (flagged in the ledger, the Owner can overrule)

- The turnover battle count ("won the turnover battle 3·1") — a comparison count, not a record or a game score.
- The projected ratings/coin-flip pairs ("(28.4·24.1)") — projections, not played scores.
- The 100-seasons win ranges ("a typical range of 8·12 wins and extremes of 3·14") — ranges.
- All the word/label separators ("Pts Allowed Per Game · #5", "SUPER BOWL · FINAL", "QB · 3 TD", "Week 1 · division game") — other data, the dot by law.

## Batteries (all green on the shipped bytes)

| suite | result |
|---|---|
| w68_nodecheck | 24 inline script blocks, SYNTAX OK |
| w68_owner (three full runs) | 44 pass / 0 fail — S1 full names at 1280/1440/1025 + the lock heals · S1 W=768 the narrow rungs legal · S2 the badges/tiles dashes + the per-game dot · S3 the awards summary gone (counts, staff line, no leading <p>, 13-14 award cards remain) · S4 the gold (MVP/stat cards, AP1/AP2/PB chips glow + shimmer, rivals clean, the CSS live) · S6 the card holds past 4300ms and advances only via Continue · S5 the SB page (no .zpb-pofin, no "YOUR RUN ENDS IN", the dash score) · S7 the victory handshake (mounted before the fade, 3 rings / 72 confetti / 22 embers, the dash score, the gold Continue, the release + the SUPER BOWL CHAMPIONS reward) · S7c a lost SB releases directly with no victory page · the static laws · zero page errors |
| w68_names | 14 pass / 0 fail — the ladder API floor · full names at 1025/1180/1280/1440/1920 · no ellipsis at 761/700/640/480/390 · the pregame star cards read full names at 1280 · zero page errors |
| w67_owner (standing, re-pointed) | 40 pass / 0 fail (path-dependent legs 39-41) — the w67 laws hold |
| w67_teams (standing, re-pointed) | 8 pass / 0 fail — the 32-team × 2-mode ink laws hold |

## Evidence (`shots/`)

`w68-preview-fullnames-1280.png` · `w68-review-1280.png` · `w68-awards-glow.png` (5 golden elements on the real season) · `w68-porun-card-1280.png` · `w68-porun-card-390.png` · `w68-sb-page-1280.png` · `w68-victory-1280.png` · `w68-victory-390.png` · `w68-after-victory.png`

## The three defects the batteries caught (the w55 lesson, paying for itself again)

1. The live schedule-tile renderer (the w33-era override) still separated the tile score with the middle dot — the first chain pass patched the dead declaration and missed the live one; caught by the tile assertion, fixed in step 2b.
2. The swallowed style-block closer (step 4's plant) — `.zpb-mygold` silently parsed as CSS text inside the w67-intro block; caught by the CSSOM check; fixed in step 6b; 42/42 tag balance verified.
3. The victory god-ray wash read too loud on desktop; caught by the screenshot; masked tight in step 6c.
