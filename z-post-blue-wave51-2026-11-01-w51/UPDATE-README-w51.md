# UPDATE-README — wave 51 (the Owner's round-51: only the game time is neutral, the map twins share a line, the dot law)

Delivered 2026-11-01 · the product: `Football-Sim-Z-post-blue-w51.html` ·
md5 `e40732a235aa621002bc268c59b36bd0` · 1,571,506 bytes · base: the w50 bytes (md5 `babc5dc1…`).

## 1 · During the game, ONLY THE GAME TIME is neutral — everything else wears the beneficiary's color

The w50 cream set narrows exactly as he corrected it: the scoped `!important` law now pins
`.zrl-t` (the game time) alone to the takeover-proof `--zcream`. The quarter chip and the quarter
marks ride the team's ink again. The TO/INT/FF boxes are colored by WHO BENEFITS: the TO box reads
the team that called the timeout, the INT box reads the interceptor's team, the FF box reads the
defense that forced the fumble. The play descriptions (" rush ", the yardage words) ride each
line's offense color — the names keep their own team spans. Verified live under the takeover:
the clock stays cream, every chip and every bare word reads a team color, zero cream chips.

## 2 · NICKEL and DIME: both at l=339 — one station row, side by side

Both field maps merge the two rows into one: NICKEL at the nickel's station (left of the middle),
DIME mirrored right, the same line — measured live: same parent row, y 507 = 507, nickel x 479,
dime x 951. The Full Depth Chart and the lineup editor keep their stacked rows (his round-50 law).
The empty dime bubble renders the clean middot with the DIME label — the bracket artifact of the
old same-row attempt stays dead (asserted: zero `[` in the map's HTML, the label reads `DIME`).

## 3 · The homepage DRAFT button: the halfway rose on default, the team's halfway ink under the takeover

The button's dark on-gold ink retires. Default reads `var(--text)` — #8e5566 light, #c99cae dark,
the site's 0.50 halfway inks. Under the takeover it reads the team's own 0.50 halfway ink via new
franchise tokens `--tTxM` / `--tTxMd` (txM light / txMd dark — the exact ink the rankings rows
ride), verified live: `rgb(158,45,54)` on the Chiefs. A soft cream halo
(`text-shadow: 0 1px 0 rgba(255,243,214,.5), 0 0 16px rgba(255,243,214,.38)`) lifts the ink off
the liquid metal so the rose stays readable on the darker gold phases.

## 4 · The pregame cinematic on light mode: a step-brighter gold, team-tinted velvet panels

`--zshim` reads `--goldm` (#ad7f2e) on light — one step brighter than the deep #9a6b1f — and keeps
the deep `--gold3` (#8a5f18) on dark. Every key player's panel now wears a TEAM-TINTED VELVET: the
player's own franchise hue mixed into the dark glass (color-mix on `--zrb`, which rides every
panel), a team-tinted border and a faint team glow — gold on velvet, both themes, verified live
(a color-mix gradient replaces the old flat rgba glass; the border leaves the old gold hairline).

## 5 · The gold franchise pill is now the CONTINUE color — SIM SEASON gave it away

SIM SEASON keeps its spot in the row and returns to the quiet pill (the A9 law reads again). The
gold gradient (--g5→--g2→--g4, --ongold ink, the glow) lands on every button that says Continue:
`CONTINUE TO WEEK X` / `CONTINUE TO REGULAR SEASON REVIEW`, `Continue to Divisional Round` /
`Conference Championship` / `Super Bowl`, the replay footer's Continue, the season-story's
Continue, the Super Bowl finale's Continue, `Continue draft in progress`, and the dynamically
created replay Continue (new `.zpb-goldcta`). Verified live: SIM SEASON background-image `none`,
CONTINUE TO WEEK 2 wearing the gradient.

## 6 · The dot law — every displayed colon and semicolon renders as the middle dot

His named message reads `NO. 1 SEED · FIRST-ROUND BYE!` at source. The clock renders dots at
source (1Q 12·34 — both clock composers, the block stamp 4Q 0·00, the drive-chart composers).
For everything else — the game stories, the previews, the Guide, the toasts, the hover words —
a new runtime sweep (the w51 JS block) walks every text node at boot and then watches every
mutation (a QUEUE that never drops a batch, the three spoken attributes included), replacing
`;` and `:` with `·` forever. Live verified: zero colons/semicolons across the Guide, the
rankings, the draft results, the season review, the replay log and the spoken attributes.

## 7 · The playoff cinematic: a flash per key player, dressed in beams, rays, embers and a heartbeat

The center flash now fires the moment EACH star pair lands (one flash per key player — the ring
pops and the panel's heart beats once each; verified live: ring animation-starts = pairs). The
SB's old five-beat cadence retires into the same per-player law. The stage dresses up: two
team-colored light beams (each side's franchise hue, breathing slowly), a slow gold rays
sunburst behind the title, seven rising gold embers, the deep-drama vignette on the intro's
corners, and gold diamonds (◆) flanking the round title. All slow, soft, palette-driven, with
the reduced-motion guard.

## 8 · CONFERENCE CHAMPIONSHIP sits slightly down

The playoff round title gains 16px of top margin (the SB title too) — the top key player's panel
lands in his own room, never literally on top of the title. Verified live: computed margin-top
16px on the Conference Championship intro.

## Nothing else moved

The w50 halfway inks, the anchor chips and their rose fallback, the editor's DIME row below
NICKEL, the map↔card twins on one clock, the 4-3/3-4 staged flip, the badge dots, the tier law,
the theme default — all held by the regression batteries below.

## Verify

- `w51_live.js` **25/25** — the source laws (S1–S3), the DRAFT button ink (R3a–R3c), the dot law
  live (R6a–R6b), the map twins on one line + no bracket (R2a–R2d), the gold continues (R5a–R5b),
  the during-game colors (R1a–R1e), the playoff cinematic (R7a–R7c, R8a) and the velvet + the
  brightened gold (R4a–R4b) · zero page errors.
- `w51_colon_live.js` — **0** colons/semicolons on the draft results, the season review and the
  spoken attributes · zero page errors.
- `w50_live.js` on w51 **28/29** — the one fail is F3 ("the quarter marks are the neutral
  cream"), retired by his own round-51 words: only the game time is neutral now. (A1–A4, the
  anchor chips, the AVG OVR law, the editor's DIME row, the toggle, the map↔card twins, the
  badge dots, H1 — all green.)
- `w50_nodecheck` **12/12** script blocks parse · `w50_domcheck` **10/10** ·
  `w50_mobile` **3/3** (390px, no overflow, the chips still sweep).
- `reg_w47_map_check.js` on w51 **3/4** — the one fail is "the DIME stacks right under the
  NICKEL", retired by his round-51 words; the same probe's geo PROVES the new law (y 507 = 507,
  same row; nickel left, dime right).
- Pixel evidence (`w51_shots.js`): the DRAFT button (rose default / Chiefs ink), the map
  (NICKEL+DIME one row), the week hub (gold CONTINUE, quiet SIM SEASON), the replay (team chips,
  dotted clock, gold Continue), the Conference Championship cinematic dark + light (beams, rays,
  diamonds, velvet panels).

Screenshots in `notes/evidence/` · the batteries in `tools/` · the chain in
`notes/W51-INTAKE-LEDGER.md`.
