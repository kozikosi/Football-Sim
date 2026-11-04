# W45 BUILD REPORT — the Owner's round-45 directives

Delivered 2026-10-31 · product `Football-Sim-Z-post-blue-w45.html` ·
md5 `9990aa033b94a34aaf3c2a2a5d844fef` · 1,521,208 chars · base: the w44 bytes (md5 `da3fc202…`).

## The chain
`zpb_v45.py` (16 asserted replacements) + `zpb_v45b.py` (the `zpb-w45-css` block on the
stage-1 output) — 17 build steps on the w44 bytes, zero hand edits. Every script block passes
`node --check`. One recon note: the planned "theme page text" edit was withdrawn after live
measurement — the w32 light re-theme wins the `--text` cascade, so the page ink was never the
crayola; the sweep rides the name surfaces instead (the note lives in the build script).

## The halfway sweep — the session's bulk (K0/O1/O2/O3/O4)

**What the sweep covers.** Every surface that renders TEAM-COLORED TEXT on the site's own pages
now wears the 0.50 tone: the row tokens' leftover accent (`--tA2` fed `accL`/the crayola lift —
poschips, unit-comparison winners, the linescore F column), the comparison score numbers
(`--pkc`), the box-score final scores and Team-Stats columns, the bracket scores, the
winning-cell ink (the `.zpb-lu-win` !important crayola retired), the star faceoff (both sides),
and the tinted-row base law. The player browser keeps the exact look he praised.

**The readability floor (O3).** The halfway formula now clamps to ≥5:1 contrast on the light
page (WCAG-measured). This lifted eight franchises slightly deeper — Miami 3.37, Pittsburgh
3.69, NY Jets 4.50, Green Bay 4.52, Philadelphia 4.62, **Las Vegas 4.71**, New Orleans 4.83,
Carolina 4.98 — same hue, richer tone; the Raiders' light ink goes `#866b3e` → `#7f653b` (the
muddy olive retires). One number moves it on his word.

**The two real bugs behind "inconsistent".** Live measurement found:
- LIGHT: the w34-era tinted-row base rule still fed light mode the DARK theme's pale ink
  (`--tnd` — 1.59:1 measured, "Brock Purdy 85" in pale pink on a light panel — his "super
  faded for no discernible reason"). The `zpb-w45-css` block re-states the law: light reads
  `--tn` (the halfway ink), dark reads `--tnd`.
- DARK: `.zpb-mu-name`, the preview strip names, the player cards, the plain lineup cells, the
  poschips and the stat chips had NO dark override — dark mode read the LIGHT halfway ink
  (2.27:1 measured, his "a little tough in dark mode as well"). Dark twins added for all of
  them; dark keeps `txd` untouched (asserted against the w44 values).

**The star faceoff** wears its own team's ink on BOTH sides now — the user side wore the vivid
accent while the other side inherited the page text; both read the halfway tone.

## The pregame stage (O5)

The key-player panels each computed their OWN fitted size ("Matthew Stafford" 14.4px beside
"Josh Allen" 21.42px). The stage now computes ONE fitted size — the lane fit of the longest
name on stage — and every panel wears it. The lane law holds (long names still fit); live: 6
panels, one unique size.

## The ending of the during-game report (O6)

The blocked-kick lines carried NO timer, no crest, no team, no score — the only end-of-game
events that actually render (the w33 LAST-DRIVES composer never fires on the current
scores-only event stream — a pre-existing relic, unchanged). Blocks now carry the full line
anatomy: timer (the report's current clock — the sim gives blocks no timestamp, nothing is
invented), crest, team, play, running score. The drive-line builders got the same anatomy
(running score computed from the events; the standard team cell). Live drill: "4Q 4:21 KC
ANFERNEE JENNINGS [BLK][PUNT] 30 - 41" beside the regular lines.

## The box scores (O7/O8)

The final score fed the vivid accents while the team names beside it wore the halfway ink
(measured: LV score `#806d34` vs LV name `#866b3e`). The scores now wear the same 0.50 tone as
the names (txM light / txd dark), as do the Team-Stats columns, the linescore F column and the
bracket scores. The separator reads ` · ` — "22 · 17". The during-game header scores keep their
w43/w44 law (he verified that surface last round); the replay's final line keeps the w13 law.

## The small ones

- The MVP "why" wording `${rating}-rated ${pos} on a ${wins}-win team` retires at the source —
  the other two wordings remain, the math never moved (O9).
- The playoffs' leaked w41 comment text is gone from the template literal — it printed on the
  page; the note lives as a real comment outside the string now (O10 — the same disease as the
  w43 note he caught in round 44).

## The proof

- `w45_live.js` — **42/42** (both themes): the floor across all 32 packs, the Raiders ink, the
  comparison dropdown options/faces, the tinted lineup cells (Chiefs/Raiders + Bills/Vikings,
  min CR ≥5.02 light), the star faceoff, the dark twins (strip/mu names not dark-on-dark), ONE
  pregame size (6 panels), the block-line anatomy on a real game, the box-score dot + tones
  (scores match names), the Team-Stats columns, no "N-rated … -win team" in any award why, no
  leaked comment in the rendered playoffs, the gold shimmer law, zero page errors, and dark
  `txd` byte-equal to w44 (KC/LV/Bills/Vikings pinned).
- `w44_live.js` on the w45 bytes — **32/32** (every w44 law holds: the halfway per-row inks,
  the gold register 57/57, the wildcard intro 23.5s, the FX gate, the belong map 0.5s/beat,
  the SB cinematic guards, the header scores, "Rush / Pass", clean season drive).
- `w43_regress_stress.js` on the w45 bytes — **40/43**; the 3 fails are the w43 N9 ink asserts
  the Owner's O7 superseded (they pass on the w44 baseline — the order changed those exact
  inks to the 0.50 tone).
- `w42regress_stress.js` on the w45 bytes — **48/50**; the same 2 superseded audits fail on
  the w44 baseline too (retired by his round-43 review).
- Zero console errors through every drive. Screenshots in `notes/evidence/`:
  `cmp-tab-open-light/dark` (the halfway dropdowns), `cmp-tab-lineup-light/dark`,
  `boxscore-light/dark` ("22 · 17", the scores matching the names), `intro-stars-light/dark`
  (one size), `duringgame-end-light/dark` (the ending with its timer), `hub-light/dark`.

## Held interpretations (§veto of the intake ledger)

1. The sweep's reach = team-colored TEXT on the site's pages; the during-game replay keeps its
   dark-stage laws (the halfway-light ink would be dark-on-dark there). The floor = 5:1, eight
   franchises deepen slightly; one constant moves it on his word.
2. The dot = the middle dot on the box-score score-line exactly where the en dash sat; the
   replay final (`ABBR x - y ABBR`, w13 law) untouched.
3. "Check this with all teams" = the floor measured across all 32 packs + the cell asserts.
