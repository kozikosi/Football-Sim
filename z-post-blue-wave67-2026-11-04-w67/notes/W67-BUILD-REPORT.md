# W67 BUILD REPORT — the Owner's nine UI items, one clock, every team tested

**File:** `Football-Sim-Z-post-blue-w67.html` · md5 `ecf2b295b97739b88e7f60068b588b84` · 1,786,217 bytes
(w66 1,780,103 → **+12,115**)
**Baseline:** the shipped w66 bytes `41d2cb10ab3608fcc879816e61e20002` (gh-pages, hash-verified at chat start) — asserted on every generator run.
**The chain:** FIVE asserted generators (`zpb_w67.py` → `zpb_w67e.py`), each pinning the previous md5, exact anchors with counts, and post-checks; rebuilt from the pristine baseline on every fix (three regenerations this chat: the data-nostack value form, the dropdown city station, the review-row centering + the short-height tiers). The chain re-runs byte-stable.

## The chain

| # | step | what it lands |
|---|------|---------------|
| 1 | zpb_w67.py | the WAVE/CLAIMS header (w66 → w67) · **UI 1** the two homepage dropdown bubbles: one fixed width + height (`--zpbSelW` 260px × 46px, both bigger than either old default; the ≤1180px swap retires; the measured w27 fit extended to the team face — full → **city** → abbreviation, `.zpb-fit-t/.zpb-fit-t2`, never a clipped word, never a second line) · **UI 3** the Series subtitle on the Owner's two lines · **UI 9** SIM PLAYOFFS leaves the w57 big-button law + the review row centers its buttons |
| 2 | zpb_w67b.py | **UI 2** the browser stops flashing: `#playerTable` is `data-nostack="1"` (the Owner keeps the smaller, narrower table) + the phone-stacker counts columns **colspan-aware** (the P-174 sentinel row is colspan=6 but read as ONE cell — the measure/toggle loop flashed the panel every pass) + the table scrolls x so SPD never clips silently |
| 3 | zpb_w67c.py | **UI 4** the fills dropdown's dark ink (`--tTxd`, the neutral dropdown family) · **UI 6** the star cards' neutral inks (meta `--tnd`; the 90+ shimmer sweeps tnd → cream), the kp-title + kp-shm dark swaps (`--zrbd`), the matchup bars' dark swap · **UI 7** the short-height pregame tiers (≤740px / ≤660px compress the static block) |
| 4 | zpb_w67d.py | **UI 5** ONE reveal clock: cards, map (both laws) and depth all ride `beat*0.6s` with `.55s` entrances (the w66 0.3s card clock and the 1s map fallback retire) · **UI 7** the pregame stage ends at the footer (the mount measures the footer's height into the intro's bottom inset — the w66 top clamp's mirror) |
| 5 | zpb_w67e.py | **UI 8** the upper line: one left-aligned cluster (`flex-start` + the 20-0 line at `margin-left:auto`) · the 100-SEASONS door wears the SIM GAME size (the LIVE add100Button reassignment — the w65 wrapper was dead code) |

## The Owner's questions, answered

- **"Tell me what the pace of the 'The season in badges' is."** — **0.6 seconds per badge** (the w59 law: each badge's delay = beat × 0.6s − 0.25s head start, the entrance itself 0.55s). The Owner liked that pace, so **0.6s is the new card pace** — the .80s experiment was not needed; the cards, the where-your-team-lines-up map and the depth rows all ride the same 0.6s beat now.

## The batteries — all green on the shipped bytes

| suite | result | what it proves |
|-------|--------|----------------|
| w67_nodecheck.py | 23 script blocks · SYNTAX OK | every inline script parses |
| w67_owner.js | **40 pass · 0 fail** (twice in a row; path-dependent legs make the count 39-41) | S1/S2 the 0.6s clock laws + live computed delays (card/map/depth beat 2 = 1.2s; the badges keep 0.95s at beat 2) · S3 the two-line Series subtitle (exact Owner text, two visual lines) · S4 the upper-line cluster (max gap 10px, height spread 1px, the 20-0 line far right) · S5 the pregame clearance swept at 800×640, 761×700, 900×640, 1000×620, 1120×600, 390×844 — the stage ends above the footer line and every face-off row is fully visible, none clipped · S6 the star cards live in dark (every meta line = --tnd, worst 13.65:1 on the stage) · S6b the dark bar fill = --zrbd, 7.83:1 vs the track · S7 the review buttons (sim 126×40 @12.8px vs begin 216×50 @16px — clearly smaller, live + probe) · S8 the kp-title rides --zrbd, 4.15:1 · S9 the two bubbles equal WxH with no clipped face at 1280 + 390 |
| w67_teams.js | **8 pass · 0 fail** | T the fills dropdown ink: 32/32 dark ≥4.5:1 (Panthers #d3dbda @ 11.77:1 — was a faint dark navy) and 32/32 light ≥4.0:1 · U the star meta ink on the always-dark stage: 64/64 ≥4.5:1 · V the kp-title: 32/32 dark ≥4:1 + 32/32 light ≥4:1 · W the matchup bars: 32/32 dark (--zrbd, ≥1.8:1 vs the track — the Jaguars' #dedbd8 @ 7.57:1) and 32/32 light sanity (the w19/w52 light law untouched) |
| w67_probe1(w67) | 7 pass · 0 fail | A the two homepage bubbles equal WxH after EVERY selection (8 long-name teams × 1280/1000/760) · B the player browser holds ONE panel size at 500/620/740/761 with zero mstack flips (the w66 baseline flipped every ~150ms at 390/430) |
| page errors | zero | the battery's pageerror hook stayed silent through two full season runs |

## Before → after (the Owner's eyes)

- **The dropdown bubbles** — before: left grew to 253-337px after a pick while the right sat at 190 (and at ≤1180px the left SHRANK to ~105 vs 190); after: 260×46 both, at rest and after every one of the 32 selections, at every width.
- **The player browser on a small screen** — before: the stacked-cards ⇄ compact-table flip every ~150ms while idle (reproduced at 390×844 and 430×700); after: one compact panel, no flips, SPD reachable.
- **The Jaguars' star cards in dark** — before: the meta line + the 90+ shimmer rode the light-tuned accent (#0e1822 navy on the dark stage — invisible); after: the neutral halfway ink (#dedbd8-class tnd), worst 13.65:1.
- **The matchup bars in dark** — before: the light ink (#769ec6-class); after: the dark-tuned ink (#dedbd8-class @ 7.57:1).

## Evidence — shots/

- `w67-bubbles-1280.png` / `w67-bubbles-390.png` — UI 1: both bubbles one size (Washington on the city station, Green Bay full), desktop + phone
- `w67-browser-390.png` — UI 2: the compact browser table on a phone, no cards, no flash
- `w67-series-twolines.png` — UI 3: RANKING BY THE 7 MOST VALUABLE POSITIONS over the slot list
- `w67-upperline.png` — UI 8: NEW DRAFT · 100 SEASONS · SIM GAME · SIM SEASON shoulder to shoulder
- `w67-pregame-800.png` — UI 7: the marquee under the line, the footer clear, no star over the skip button
- `w67-stars-dark.png` — UI 6: the dark stage with the neutral inks
- `w67-review-buttons.png` — UI 9: BEGIN PLAYOFFS the big pill, SIM PLAYOFFS smaller beside it (when the season's story reaches that page)
