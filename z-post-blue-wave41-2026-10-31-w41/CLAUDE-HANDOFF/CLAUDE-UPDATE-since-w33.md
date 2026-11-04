# CLAUDE UPDATE — the Owner's direct instructions since w33

FROM: Z.ai (High Councillor, seat ZAI) · 2026-10-31 · the w41 round just shipped
FOR: Claude/Architect — the V23 engine swap reads this instead of re-deriving the round history.

The Owner's words are law verbatim. Below is EVERY directive he has sent since w33 shipped,
wave by wave, with the law each one fixed. If you swap the engine under the shell
(`Football-Sim-Z-post-blue-w41.html`, md5 pinned in the package's CHECKSUMS.txt), every line
here is a regression test you must keep green. Rounds 34–38 live in the w38/w39 packages'
copies of this file; round 39 is in the w39 package; **round 41 is new below.**

---

## Round 39 — shipped in w39 (carried; the w39 package has the full text)
53–60: the draft board's light ink per theme · the compact board stops ballooning · the compact
sort chips · the pregame top-three columns mirrored · every pregame action +1s · the Honors
cinematic scrolls itself · the Madden rankings cards wrap · the browser scrolls its own panel ·
the Position Rankings scrollbar returns where the table cannot fit · the Guide's two wordings.

## Round 41 — shipped in w41 (2026-10-31)

61. **The dropdown ink law sweeps the site.** The homepage dropdown's neutral per-team pair
    (`--tn` light = zpbLift(txL,.62) · `--tnd` dark = txd) is the site's neutral team ink, and
    the player-name tier law rides every name surface: **90+ shimmer in the team's color, 85+
    bold in the team's colors (the stronger `--nmS` rung in light), everyone else neutral but in
    their team's colors.** The per-team one-shimmer cap (the w26 law) is RETIRED — every 90+
    shimmers. The player browser (names, Cinzel team cells, numbers), the draft board's light
    mode (card headers, breakdown, lineup cells, `.dc-name` names), the Position Rankings' light
    mode + team cells, the schedule tiles' opponents, the box score and the awards all obey. The
    vivid rows keep their own A10 deep-ink law. The strength ladder lives in `zpbRowVars` /
    `zpbNeutralRowVars` (`--nm/--nmS/--nmSd`); the wave's CSS is the `zpb-w41-css` block at the
    END of the body.
62. **The box score wears Cinzel Decorative** — the team names above it carry their crests and
    the dropdown tint; the line score gains the post-blue frame, Cinzel quarter headers, per-team
    neutral washes and the accent F column (`renderGameResultHTML`/`renderLineScoreHTML`).
63. **The award winners wear the dropdown ink** (`honorLineHTML` + the playoff award cards via
    `zpbNeutralRowVars`; the user's own shimmer keeps the accent). The playoff awards render ONE
    LINE PER ROUND: Super Bowl MVP and Postseason MVP centered on their own lines, then
    Conference Championships, Divisional, Wild Card. Three new postseason leaders: Forced
    Fumbles, Tackles For Loss, TDs · non-QB (rush+recv+def).
64. **A blocked kick reads x[BLK][KIND]y** — the blocker in his colors (tier law applied via
    `zpbLawNameHTML`), the BLK + kind chips, then the punter/kicker in HIS colors, from the game
    detail at render time (no engine change). Both renderers (the live timer and the Skip tail).
65. **The pregame cinematic:** the top pair of names stands at 27% (was 22%) — under the box's
    top line. The PLAYOFF pregame (all non-SB rounds) runs slower and heavier: 36s envelope (was
    30s), star fades 5.6s, slower logo fly, a breathing stage wash, the flash later + slower
    decay. The Super Bowl keeps its 60s law.
66. **The playoff hub buttons center**, and the primary ("Play the X") wears `zpb-ctabig` at
    12px 30px — the regular-season preview's glowing CTA. On a playoff loss the secondary
    "Sim Playoffs" button is not rendered (no duplicates).
67. **The bracket cards carry logos only** (seed chip + crest + score; names live in the hover
    title) and the panels are larger (min-height 74px, bigger crests/scores). A played card's
    review TOGGLES — a second click on the same panel closes it.
68. **The unit report card's Kicker badge centers** when it sits alone at full desktop width
    (`@media (min-width:1060px)`: grid-column 1/-1, justify-self center, width calc(25% - 8px)).
69. **The game-ball rule:** a defender (DL/LB/DB) whose line is only tackles (no sack, INT, FF,
    FR or defensive TD) cannot win the ball unless tkl ≥ 15 AND tfl ≥ 2 (the `zpbDefOnly` filter
    walks the ballScore-sorted pool).
70. **The 20-0 panel:** 480px band, the question centered in Cinzel Decorative, the 20-0 keeps
    its shimmer, the buttons breathe.

## The standing laws (unchanged, re-attach them)
Integers on screen (the PRTG decimal; the draft board's WINS/PRIORITY one-decimal) · no white
text · the name tiers (90+ shimmer / 85+ bold — w41: no per-team shimmer cap) · Cinzel
Decorative · NICKEL/DIME caps · DL5 not ELEPHANT · PRTG · CLUTCH GAMES · SK/PRSS · the Owner's
words are the labels · guides carry the explanations · **new: the dropdown ink pair is the
site's neutral team ink, per theme, with the --nmS stronger light rung for 85+ names** ·
**new: dark-theme overrides wrap their naked :root:not([data-theme="light"]) selectors inside
@media (prefers-color-scheme: dark)**.

## E1 — the P1 Engine
The Owner offered the integration but allowed waiting ("he is still working on the details of
the math… if you'd rather wait for a more completed version, then you can wait. All math
differences between yours and Claude's version should default to preferring Claude's version").
W41 WAITED — the ENGINE-MATH-SPEC REV 5 is PROPOSED with the protected constants awaiting the
Owner's §9 approval and the V23 build not yet done. When you declare the math complete, the
suites in each wave package (`w41_verify.js` carries rounds 34–41 as executable drills) are the
regression contract; this file is the directive list.

## What to keep green (the engine-swap regression list)
The per-wave verify suites encode all of the above as executable drills; the stress suites drive
a full draft → season → playoffs → Super Bowl → champion page with zero console errors. If your
V23 engine changes a number, a name, a timing or a layout the Owner legislated, the suite will
name the directive you broke.
