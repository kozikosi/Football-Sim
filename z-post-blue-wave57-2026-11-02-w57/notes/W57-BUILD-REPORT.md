# W57 BUILD REPORT — the matching priority, the two-line card, the cleared pregame

Wave 57 · built 2026-11-02 · baseline: my w56 bytes (md5 `42af55f794180910f1f9086fe0c68a3d`, 1,600,958 B)

**PRODUCT** · `Football-Sim-Z-post-blue-w57.html` · md5 `765ee5cffb65db03dabf183e3f72c0c4` · **1,611,548 bytes**
(one generator: `tools/zpb_w57.py` — asserted exact replacements + post-checks; regenerated from the pristine baseline on every fix)

## R1 · The card returns to two lines (asks 1+2+3)
The w56 three-line block is superseded by the Owner's round-57 shape:

- **Row 1**: the name (cols 1-9) + the Draft button (cols 9-13). The button renders on the clock
  (`canPick = draftSim.awaitingUser`) and keeps the w55 tap floor (`min-height:40px`). FILLS sits
  at cols 10-13 of row 2 — directly under the button, right edges aligned.
- **Row 2**: POS (1-2) · TEAM (2-4, crest inline) · OVR (4-5) · WINS (5-6) · PRIORITY (6-8) ·
  GONE (8-10) — exactly the Owner's order, labels kept (the w56 label law stands), the w56 OVR
  chip retired on the phone (OVR is a plain labeled stat now; `zpb-ovrchips` hide).
- Card height measured: 57.7px idle · 78.7px on the clock. The GONE cell grew to 2 columns after
  the zoom review caught its label clipping to "GONI" in the 1-column cell (label 24.5px vs a
  22.3px cell; now 48.5px at 390).
- The layout is CSS-only on the same DOM (the grid reassignment wins the cascade inside the
  ≤760px block; the w56 three-line rules are overridden line by line).

## R2 · The priority wears the gone/wins ink (ask 1)
The value joins the exact gone ink in every state, card and desktop:
- dark: the shared `color-mix(in srgb,var(--accent2,var(--accent)) 50%,var(--text))` rule that
  wins+gone already carry (R6 4e);
- light: gone's exact `color-mix(in srgb,var(--accent2,#cf8a60) 45%,var(--zcream,#53382b))` —
  the R6pre deepened mix, applied globally (R6pre2) and on the card (R1 block);
- the w56 gold (`--gold` on the phone, `gold3` on the desktop) retires.
Verified on the LIVE page: pri/gone computed colors are IDENTICAL STRINGS in all six
viewport×theme states (`w57_inklaw.js`); wins joins the equality in dark and keeps its approved
light `good` mix (the Owner named only the priority number).

## R3 · The pregame cinematic clears the logos (ask 4)
Measured root cause (the pre-fix probe): the first key-player pair landed y=400-447 directly on
the logo band y=386-442 at 390px. The fix, on the same panels and text:
- ≤600px: the marquee (title · logos · sub) pins to the top of the stage
  (`justify-content:flex-start;padding-top:22px;gap:9px`), logos 50px, gap 12px;
- the fan lanes REMAP on narrow: `syMap {50:38, 27:60, 78:82, 34:40, 66:68}` — every pair
  lands below the marquee stack (the JS applies the map only when `narrow`);
- the Super Bowl intro: logos 54px, VS 1.5rem, title 1.3rem, the rising cup keeps its own sky
  (intro padding-top 56px, cup at top 2%), and the LIVE banner seats at bottom 2% — its landed
  rect (456-470) clears the last fan pair (bottom 449) by 7px (the backwards-filled entrance
  rect sat 12px lower and fooled the first measurement).
Battery law: every element is judged LANDED and VISIBLE (the cup's animation starts at 4.2s; the
first check measured its hidden pre-animation rect and failed an element nobody could see).
Proof: M12 (390+320 regular: stars=6, hit=0, marqueePinned, fanBelow) · M12b (320 SB: hit=0,
cupHit=false, banHit=false, imgs=[54,54]).

## R4 · The badge cascade runs 0.25s faster (ask 5)
`animation-delay:calc(var(--beat,0)*1s - .25s)` on three rules: the season-in-badges rail's
badges (zpbsbeat .7s) and the star-card + unit-report-card entrances (zpbsbeat .8s). The reveal
veil follows: `total*1000 + 650` (was +1200) so the page still opens just after the last badge
lands. Durations untouched, the 1s stagger pace untouched (the w55 honors law stands), the
cinematic cut untouched and still leading. M13 verifies the delays and the durations on the
final bytes.

## R5 · The contrast pass (ask 6)
The audit harness (`w57_contrast.js`): every rendered text/surface pair across the real pages
(draft board, preview, review, Super Bowl, pick grades, unit report, takeover) × 32 teams ×
light/dark, WCAG math with the team packs composited (3,712 pairs at 390, 3,264 at 1280).
Fixed this wave (the failing pairs, root-caused one by one):
- 4a · the raw `--tA2` consumers read the LIGHT accent in dark — the unit report card's title
  measured **1.13:1 (invisible)**. The root token now swaps per theme
  (`--tA2:var(--tA2d) !important` under dark + the prefers-dark mirror).
- 4b · the unit report title + grade wear the halfway ink in light, gold2 in dark; the dark
  grade rides tTxMd above the tile's inline row vars.
- 4c · the pick-grade slot chip's ink (1.6:1 on dark-accent franchises) → fixed `#2c1e0c`.
- 4d · the Draft button's label joins the halfway-rose law (tTxM light / tTxMd dark).
- 4e · the card's dark values (wins · priority · gone) lift to `color-mix(accent2 50%, text)`.
- 4f · the FILLS slot-change links ride the halfway ink.
- 4g · the honors title mix deepens (`gold3 45% → text`).
- 4h · the light shimmer deepens to bronze (2.32 → 3.54) — still the animated w45 sweep.
- R6i · the light sub-ink deepens (#885261) incl. the takeover's mix.
- R6j/R6k · the badge value and the pg grade sizes step to the large-text bar (1.17rem).
- R6pre · the light value mixes deepen to the same bar (wins 65% into zcream — 4.0 → 4.7;
  gone 45% into zcream — 4.4 → 5.3).
- R6pre2 · the desktop priority retires gold3 (3.9-4.4 on 15 teams) for the gone mix.
**Residual (deliberate, documented)**: the w45 shimmer sweep's palest animation frame —
3.54:1 light / 4.26:1 dark on the 90+ shimmer names. The Owner's standing sweep law (§0), bold
1.02-1.17rem names, passing the 3:1 large-text bar; the gradient cannot hold one ratio across
its animation. Every one of the 32 teams shows the identical residual tally — no team-specific
failure remains in either theme.

## The batteries (all green on the final bytes)
- `tools/w57_nodecheck.js` — 13 inline scripts parse · **13/13**
- `tools/w57_mobile.js` — 430px + 390px + 320px (M1 card, M2 tab memory, M3-M6 re-pins, M7
  Dime, M8 errors, M9 slim stage, M10 funnel, M11 grades, M12/M12b cinematic, M13 timing) · **53/53**
- `tools/w57_live.js` — 1280px desktop · **12/12**
- `tools/w57_d4cmp.js` — the linescore pixel-identical to w56 · **identical**
- `tools/w57_sweep.js` — every page × 390/320 pan + wide-child hunt · **15/15**
- `tools/w57_inklaw.js` — the card's ink + shape laws, 6 states · **ALL GREEN**
- `tools/w57_otc.js` — the real on-the-clock Draft button, 3 legs · **ALL GREEN**
- `tools/w57_contrast.js` — 390 + 1280 legs · only the documented w45 residual
- `tools/w57_btnprobe.js`, `w57_cupprobe.js` — the diagnosis probes (kept for the record)
- Evidence: `shots/w57-*.png` (card idle+dark+OTC at 390/430, the 320/390 cinematics, the SB
  cinematic, the bracket funnel, the pick grades, the review stage)

## Session-30 recovery note
Session 29 built the wave but died before packaging (its transcript ended mid-cinematic-fix).
Recovered state: the lane (`w57/`) with the base, the build, the generator, the batteries, the
ledger, and the prefix shots. This session verified the generator byte-deterministic, resolved
its 2 stale post-checks (the pri light exactness; the SB 54px), fixed the landed banner seat,
unclipped GONE, and added the OTC + inklaw harnesses the dead session's batteries lacked (its
M1 button checks measured the idle empty cell — the button only exists on the clock).
