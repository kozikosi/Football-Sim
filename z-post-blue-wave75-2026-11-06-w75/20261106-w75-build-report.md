# W75 BUILD REPORT — the Owner's w73 review, shipped whole

**Base:** the latest wave with a product HTML on gh-pages = **w73** · md5 `8b72bf725406637790c0457be3e8d97a` · 1,818,133 B (verified before the first patch; w74 shipped as a docs/lab/svelte package with no product HTML, so the chain runs through w73)
**Product:** `Football-Sim-Z-post-blue-w75.html` · **md5 `9f990ab74fb0acba9e55b82395e60647`** · **1,826,882 B** (+8,788)
**Method:** `tools/w75/zpb_w75.py` (R1–R17, asserted exact replacements) + `tools/w75/zpb_w75b.py` (the appended w75 blocks + post-checks) — regenerated from the pristine base on every fix, never hand-edited.
**Measured first:** a live probe pinned the facts the build leans on — the win-math ladder dropped exactly WR4 · TE3 · DL5 · CB4 (DIME) at zero wins; K sits at rank 20 of the shown ladder; the player database is 1,200 players with a **median OVR of 76**; the award names ride the 0.50 halfway ink; the SIM SEASON fill was `var(--panel)` (white in light mode) while its siblings are transparent; the box score rode rosehair while the score rides the accent; the pregame player cards wear the W68 "gold on velvet" gradient — team accent mixed into `rgba(16,9,4,.66)`, a dark panel in both themes.

## What shipped (the Owner's sixteen asks)

1. **The selected chip is a filled button (P1).** `.zpb-srbtn.on` wears the gold accent fill with the deep-coffee on-gold ink (`#2c1e0c`, the 20-0 law's own family) in BOTH themes — selection reads at a glance, light or dark.
2. **The chip law rebuilt (P2).** The buttons start all OFF while the board is full; a lit button keeps its group's players on the board, a dark one keeps them off; ALL lights all 14; CLEAR returns every button to off — the default full board. The board filter reads `selShow` (empty row = every group). The w73 `soloBase` machine retired whole. ALL/CLEAR now say `all on` / `all off` with titles that tell the truth.
3. **The preseason headers go plain (P3).** WHY THIS STYLE? · OFFENSE · DEFENSE · HOW A 2 POINT CONVERSION WORKS all wear the exact WHAT-DO-THESE-TERMS-MEAN pattern — no box, no glass, the reference's own scale. Measured in the battery: same border (0px), same background (transparent), same font size as the reference.
4. **2 point conversion (P4).** The preseason header, the aggressiveness question and both AGGR descriptions, and the Guide glossary entry. The `2PT` badges and every in-season label (`2-Pt Conversions`, `2-Pt Conv tries/success`, the drive tails) keep the current format — verified in the live review DOM.
5. **(x teams run it) removed (P5).** The offense style options read `CapFirst(k)` only.
6. **SIM SEASON = SIM GAME (P6).** The white panel fill is gone — transparent rest fill, the glassbd border, the sub ink; the battery measures SIM SEASON and the tab family sharing fill and border exactly.
7. **No dark player cards in light mode (P7).** The light theme swaps the W68 dark gradient for the site's own wash — `linear-gradient(160deg,var(--zr1),var(--zr2))` (the faint team tint on white), rosehair border, soft shadow — and the name/meta inks ride `--tn` (the halfway ink). Dark keeps its always-dark stage gradient, untouched. The fix lives in the card, so it holds for all 32 teams.
8. **The box score wears the score's border (P8).** `table.linescore` → `var(--accent)`, the exact color the `.score-line` border rides. Measured equal in the live review.
9. **The 0.60 preset (P9).** A new pack ink `txM60` = `zpbMix('#53382b', teamAnchor, 0.60)` with the same 5:1 readability floor, computed for all 32 teams at pack build; it rides every row as `--nm60`. The award-name rules read it in light mode; the <85 names take the deeper tint and the 85/90 tier laws stand; dark keeps the 0.50 law (`txd`/`txMd` untouched).
10. **The per-round playoff cinematics recovered (P10).** SIM PLAYOFFS no longer jumps to the Super Bowl: the w66 door now collects the user's rounds (a loss ends the story naturally), plays the W47/W68 round cards — WILD CARD ROUND · PIT WIN · the score · ONE STEP CLOSER · a Continue gate per card — and the storm waits for the last Continue (the `__zpbPoRunHold` handshake was already wired for this). Reduced-motion goes straight to the end screen, as before.
11. **DRAFT COMMAND CENTER (P11).** The fix-it board rebuilt: the subtitle line gone; **every room below a B** (the report card's own letterGrade scale, pct < 60) listed best→worst as the report card's own cards, smaller, the tape in the tooltip, the drain gauges gone; **CUTDOWN DAY** lists every player under all three lines — below 80 OVR (the true OVR the card displays), a position at-or-above Kicker on the win-math ladder, and a regular season under the average line on the new scale — each card carrying the performance number, the delta (`−N vs his XX OVR`, `±0` at even), and a CUT badge fading in and out (`zpbCutFade`, opacity .22↔1 — the CAN-YOU-GO-20-0 cadence). The 40 %-of-games sample floor rides over from w73 (sample hygiene, not a fourth criterion).
12. **The rating scale translated (P12).** The backend `_rating` math is untouched (ranks, sorts, the K compression keep their meaning); a display scale rides on top: `display = round(medianOvrOfDatabase + (raw − meanRawOfSeason))`. The median computes live from PLAYERS (1,200 players → 76; no hardcode), the mean at `ensureRatings` time. Measured on a full simmed season: the displayed ratings are integers centered on ~75.4 against the 76 line, bounds 0–99. The scale shows in the season table, the leaders RTG, the player cards and the command center; a one-line explanation joined the ratings explainer ("THE PERFORMANCE SCALE · an average season reads the database's median OVR…").
13. **BACK TO <STAGE> (P13).** `zpbBackBars()` stamps a centered pill at the top and bottom of all five footer pages whenever the simulator has started; the label computes live — DRAFT · PRESEASON · WEEK N · WEEK 17 (regularReview) · WILD CARD ROUND / DIVISIONAL ROUND / CONFERENCE CHAMPIONSHIP · SUPER BOWL — and re-stamps on every tab switch, so it is never stale; the click returns to the simulator. No bars before the draft begins.
14. **The guide ladder shows all 32 slots (P14).** The zero-win filter is gone: TE3 (#30), DIME (#32), WR4 (#29) and DL5 (#31) join the map at their true win values. K at #20 is what makes the cutdown's "kicker or higher" a real line (it excludes RB1 · WR2 · WR3 · TE2 · SAM · FB · P and the four zero-win slots).
15. **OFFENSIVE GUARD (P15).** `WV_NAMES.OG` → `Offensive Guard` (the draft dropdown and every chip/title that speaks WV_NAMES) and both depth-chart label maps read `Offensive Guard 1/2`. Prose descriptors (`left guard`) stay English.
16. **The fills read x (-y) (P16).** `FS (-10)` — the word FLEX retired from the fills. Side scroll: measured at 1280 and 390 with the table and cards views live — `scrollWidth − clientWidth` ≤ −5px in every state; the board never pans.

## Proof (measured, not guessed)

| suite | result |
|---|---|
| w75 battery (`verify_w75.js`, 17 sections) | **65 pass / 0 fail** — the dropdown + Offensive Guard · the full chip law (boot off/full, solo, ALL, minus-one, return, CLEAR) · the filled on-chip (accent bg = border, both themes) · the fills without FLEX · no pan at 1280/390 · BACK TO bars on all five pages at two stages · the preseason page plain + retitled · SIM SEASON = the family · the linescore border = the score border · the scale (integers, median-centered, bounded) · DRAFT COMMAND CENTER (rooms best→worst below B, no gauges, the cut list, the CUT animation, dot law 0, no pan) · the 0.60 preset light/dark · the round cinematics (the card waits, the storm waits, the SB page after the last Continue) · the 32-row ladder with TE3/DIME · the pregame cards light/dark · zero page errors |
| w69 owner suite (re-pointed, standing) | **33 pass / 0 fail** |
| w69 dropdown sweep (re-pointed, standing) | **14 pass / 0 fail** |
| w68 names (re-pointed, standing) | **14 pass / 0 fail** |
| w67 teams (re-pointed, standing) | **8 pass / 0 fail** |
| **total** | **134 pass · 0 fail · zero page errors** |

Every script block node-checked (25 unique blocks), per-style-block quote-parity gated, md5 pinned. Screenshots: `shots/` — chips desktop + 390, the command center, the wild-card round card, the preseason plain headers, the 32-row ladder.

## The one the battery caught

The first V2 wrote its fullness assertion against the cards view's lead-card count (one per group) and the table's row cap (top-20 by design) — both measures lied about the board. The law of the board is its CONTENT mix: the final battery reads the top-of-board positions (mixed at full · all-QB solo · QB-less after the minus-one · mixed again on CLEAR). Harness fixes only — the product never moved for it.

## Veto points (from the intake ledger §flags)

1. P2 supersedes the w73 veto — the initial all-lit law is rewritten by the Owner's own words.
2. P12 rides the translation door; the AVERAGE displayed rating equals the database median (76), and each card prints the points he fell short of his own OVR.
3. The cutdown list keeps the 40 %-of-games floor (sample hygiene) and reads the TRUE OVR for the <80 test.
4. The lineup slot-picker chip keeps its `−10 FLEX` contrast (only the fills category was named) — say the word and it follows.
5. The round cards cover the rounds from the point SIM PLAYOFFS is pressed; already-watched rounds do not replay.
