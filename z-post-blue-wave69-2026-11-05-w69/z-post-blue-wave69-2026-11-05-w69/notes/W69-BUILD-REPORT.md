# W69 BUILD REPORT — the Owner's six UI items: the 20-0 pill ink, the field-map dark ink, the review card tier law, the preseason dropdown alignment, the dropdown player-name family, the award crests

**File:** `Football-Sim-Z-post-blue-w69.html` · md5 `881248cfec19429c3a50326606da7244` · 1,803,514 bytes
(w68 1,796,935 → **+6,579**)
**Baseline:** the shipped w68 bytes `22bc00ab8cc244da7ba8030a5a67c8da` (gh-pages, hash-verified against the beam push note and the wave-68 package CHECKSUMS at chat start) — asserted on every generator run.
**The chain:** EIGHT asserted generators (`zpb_w69.py` → `zpb_w69h.py`), each pinning the previous md5, exact anchors with counts, and post-checks (style-block balance included). The chain re-runs byte-stable from the pristine baseline (re-verified end-of-chat).

## The chain

| # | step | what it lands |
|---|------|---------------|
| 1 | zpb_w69.py | the WAVE/CLAIMS header (w68 → w69) · **UI 4** the base select rule gains the house `padding-left:12px` (the bare selects painted the first letter into the 12px rounded corner — padding-left was 0; every select with its own padding keeps it) · the `zpb-w69-css` plant: **UI 1** the `.zpb-ctabig .zpb-shine` scope (the shine sweeps the on-gold ink family, never the gold ramp) + **UI 5** the pick-list family CSS (Cinzel faces + rows, the team 0.50 ink, the wash+glide hover) |
| 2 | zpb_w69b.py | **UI 2** the field map's ink solve — `bubbleTint` (the offense side now follows the takeover's `--g2`, the color the bubble actually paints) + `_fmComposite` (the tint at its REAL alpha — 18% offense / 16% defense — over the glass panel over the page) → `pickInk` against the effective paint, both themes, at build time |
| 3 | zpb_w69c.py | **UI 3** the award/stat-champion winner cards' names ride the tier law from the winner's own OVR; the AP1-gold name overlay retires from the CARDS (the chips keep their laws; the coach's YOU keeps the w66 shimmer) |
| 4 | zpb_w69d.py | **UI 5** `zpbPickList` rows carry the tier class; the lineup editor's items carry the player's true OVR tier and the closed face follows the ladder |
| 5 | zpb_w69e.py | **UI 6** the crests: the All-Pro/Pro-Bowl chips and the All-Playoff chips lead with the crest (before the name — his lean); the COTY line's written team name becomes the crest; the playoff round cards read crest + dash score + crest; the SB-MVP line's separator joins the dash law |
| 6 | zpb_w69f.py | the pack exposes `--tOn2/--tOnd2` (the on-gradient candidate it did NOT pick) — the shine's glint stop |
| 7 | zpb_w69g.py | **the catch the battery demanded**: the COTY crest moved OUT of the name `<b>` (the w60 name ladder owns the b's content and wiped the crest — `data-nmfull` rebuild) → the crest rides as a SIBLING after the name; the glint stop softens to an 82/18 mix of `--tOn` with `--tOn2` (the raw stop read 2.52:1 on the Steelers' gold) |
| 8 | zpb_w69h.py | **the catch the battery demanded**: the tier reads the player's TRUE OVR — `window.zpbTrueOvr` (the book rows carry the flex-penalized slot ovr: Minkah 89-at-slot vs the 89+6 the draft board shows; a 92-OVR Hamilton read plain, an 88 read bold) — the stat cards, both award winners' cards and the preview star face-offs resolve the true ovr |

## The Owner's items, item by item

1. **The 20-0 on the TRY AGAIN pill** — inside `.zpb-ctabig` the shine now sweeps `--tOn` (the pack's readable-on-gradient ink — cream for the Steelers) through an 82/18 glint of `--tOn2` (the other candidate). The base stop measures 6.17:1 on the Steelers' button gradient (the old gold-on-gold read ~1.2). The sweep keeps the fxshine cadence and the text clip; the page-level shines (the cyg lines, the rest box) are untouched.
2. **The Browns' field map in dark mode** — the ink was chosen against the SOLID swatch while the bubbles paint at 16-18% over the dark panel; dark mode got dark-brown ink on a dark surface. The solve is now against the effective composite (and the offense tint follows the takeover's `--g2`). **The battery: all 32 teams × both modes, measured from the SCREENSHOT PIXELS themselves — 64/64 every bubble ≥4.5:1** (worst cases 4.84–5.66 on the hardest tints).
3. **The review page's player cards** — the ladder is exact: 90+ shimmers, 85+ bold, the rest the team's neutral 0.50 ink — with the tier reading the TRUE ovr (the book rows carried the flex-penalized ovr — the battery caught both directions: a 92 reading plain and an 88 shimmering). The award cards' names join the same ladder; the AP1-gold name overlay retires from the cards (FLAGGED — the Owner may overrule: the chips keep the AP1 gold, the user's glow stays on the card, the game-review Player-of-the-Game keeps its standing shimmer).
4. **The preseason section 2/3 dropdowns** — the bare base select had `padding-left:0`; the first letter painted into the rounded corner. The house 12px left padding lands on the base rule; the trio (and any future bare select) aligns like the draftSetup chrome. Asserted: 12px on all three, no clipping at 390px.
5. **Every dropdown player name in the house language** — the lineup editor's pick lists (33 pickers: every slot + the Dime + the KR row — 400+ menu rows) read Cinzel in the team's 0.50 ink with the tier law riding the rows and the praised hover (the team wash + the 3px glide). **The sweep: every dropdown in the file inventoried and opened live** — the draft-setup bubbles (the w27 family), the compare page pair, the compare-tab pair (the w66 family), the board/browser filters (the rose-gold chrome), the preseason trio, every lineup picker, the KR picker, a real pick round-trip. 14/14 green, zero page errors. (Found along the way: `zpbSeriesSelectHTML` is defined but never rendered — dead code, no live dropdown there.)
6. **The award crests** — the All-Pro/Pro-Bowl chips, the All-Playoff chips, the COTY line and the playoff round cards read the crest instead of the written team name; the crest goes BEFORE the name (his lean, and the chip law) and around the scores (the SB-page law). The written name survives only as the no-crest fallback. The SB-MVP line's score separator joined the dash law.

## Batteries (all green on the shipped bytes)

| suite | result |
|---|---|
| w69_nodecheck | 24 inline script blocks, SYNTAX OK (after every step) |
| w69_owner (three full runs) | 33 pass / 0 fail — S1 the pill ink (the base stop 6.17:1, the on-gold stop in the computed gradient, the clip alive) · S2 the map's paints ride their own theme solve (28/28 cells, light+dark, four teams) · S3 the tier law exact on every review card name · S4 the trio's 12px + no 390px clipping · S5 the pick lists (Cinzel faces+rows, the txM ink, the hover rule, the tier ladder on the faces, a real pick round-trip) · S6 the chips crest-first 125/125, the COTY crest, no written team names in the award cards · S6b the synthetic playoff awards (the All-Playoff chips, the round card's crest+dash+crest, the SB-MVP dash) · zero page errors |
| w69_dropdowns | 14 pass / 0 fail — every dropdown in the file opened live and measured (see item 5) |
| w69_map | 3 pass / 0 fail — the 32 teams × both modes, the map's bubbles measured from the pixels: 64/64 ≥4.5:1 |
| w67_owner (standing, re-pointed) | 41 pass / 0 fail (path-dependent legs 39–41) — the w67 laws hold |
| w67_teams (standing, re-pointed) | 8 pass / 0 fail — the 32-team ink laws hold |
| w68_names (standing, re-pointed) | 14 pass / 0 fail — the ladder laws hold (full names at full size, no ellipsis) |

## Evidence (`shots/`)

`w69-tryagain-steelers.png` (the pill, light) · `w69-fieldmap-browns-dark.png` (the Browns' dark map, cream names) · `w69-fieldmap-steelers-light.png` · `w69-preseason-dropdowns.png` (the 12px alignment) · `w69-review-awards.png` (the chips crest-first, the dash records, the pill) · the probe shots (`probe-*.png`)

## The catches (the batteries earning their keep again)

1. **The w60 name ladder ate the COTY crest** — the crest planted inside the name `<b>` was wiped by the ladder's `data-nmfull` rebuild; caught by the S6 assertion, moved to a sibling in step 7.
2. **The raw glint stop read 2.52:1 on the Steelers' gold** — the pack's `--tOn` for gold-gradient teams is CREAM (the readable pick), so the other candidate (coffee) is the WORSE ink; the sweep now glints an 82/18 mix near the readable stop.
3. **The tier read the flex-penalized ovr** — the book rows carry the slot-adjusted ovr (Minkah 89-at-slot vs his true 89); a 92-OVR Hamilton read plain and 88s shimmered. `zpbTrueOvr` resolves the dataset number; the battery caught it in both directions.
4. **The battery's own ghosts** (fixed in the harness, never the product): the flipped mix weights, the element-relative screenshot mapping (the pixel sweep now uses viewport-truth clips), the compare pair probed before its tab rendered, the synthetic round-card payload carrying a `line` that short-circuited the score, and the map's empty middot placeholders counted as name cells.

## Flagged readings (the Owner may overrule)

- "Only 90+" rules the CARD NAMES on the review page — the user's award winners still wear the golden border + glow (the w68 celebration), and their names follow the same ladder (a sub-90 user winner reads bold, not gold). Say the word and user names shimmer again regardless of OVR.
- The All-Pro/Pro-Bowl/All-Playoff CHIPS keep the standing laws (First-Team All-Pro names always shimmer, the user's any-award shimmer) — the crest now leads them.
- The game-review Key Players keep the Player-of-the-Game shimmer (the w19/commandment-4 law).
- The field map's 90+ tier classes are inert on the w68/w69 bytes (the bubbles pass `effOvr` an object, so the tier never fires) — the map reads by its own ink law and nothing regressed; say the word and the map's 90+ names join the shimmer.
- The offense bubble's ink now follows the takeover's `--g2` — the w66 "the offense follows the team theme" law carried to the ink solve.
