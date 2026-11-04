# UPDATE-README — wave 43 (the Owner's round-43 directives)

Delivered 2026-10-31 · the product: `Football-Sim-Z-post-blue-w43.html` ·
md5 `53ce9def9db948991e8974c76824e0f6` · 1,509,529 B · base: the w42 bytes (md5 `94474a4d…`).

## The light ink comes back to color — the balance (N3/N5/N13)

The pack learns **`txM`**: the deep team tone lifted to lightness 0.52. Light mode reads it
everywhere the tokens reach — the homepage dropdown (closed face and open options), the player
browser, the Position Rankings, the Team Comparison tables, the draft board, the standings, the
schedule tiles, the score-line names, the honors. **Dark mode keeps `txd` untouched** — his own
words: dark looks great, only light moves. The tint is deliberately between the washed pale and
the crayola vivid; one constant (`0.52`) moves it either way on his word.

## The shimmer is the constant gold (N4) — with two carved exceptions

`--zshim` pins `--gold3` at the root and every `.zpb-shm` gradient/solid reads it first. With
NYG selected the 90+ names shimmer GOLD, not blue — two root causes died: The Series' ranking
rows had NO team vars at all (everything inherited the user accent), and a deep-sheet
`tA2/tG2` shimmer gradient out-cascaded the patched copies. The exceptions he named: the Super
Bowl champions shimmer in THEIR colors (N11) and the decorative stars keep theirs.

## The browser's player names (N2) and the preview uniform (N7)

A w41-era rule forced the dark browser names to plain page text — now they wear the tinted ink
like the team cells and positions. The game preview's matchup names, strip names and key-player
cards all read their own teams; the tier law holds on every team.

## Scores and stats wear their teams (N8/N9)

The during-game header, the review's score-line, the Team Stats columns and the Key Players
titles/stats all read their own packs now — the "everything in my red" era ended by giving each
element its own team tokens (`--scA/--scAd/--scH/--scHd` + dark twins). Live-tested across many
franchises; every computed ink matches its pack.

## The cinematic covers from frame one (N10); the bracket cleans up (N12)

The SB cinematic's wrapper no longer fades in — the fade WAS the flash of the page underneath.
It computes opaque at mount; the stage inside keeps its entrance. The champions shimmer in their
respective colors on the review banner (`--zshimL/--zshimD`) and in the cinematic. The bracket:
seeds read `#X` (no N1/A2), every score in its own team's color, and the
"Click a played game to review what happened." hint is removed.

## The Madden cards stop growing (N1); small windows scroll (N6)

The stacked rankings cards keep `#` and the rank on one line — the two-line rank was the
paradoxical growth. Small windows (≤1024px) scroll sideways at the viewport so the whole footer
is reachable; wide windows keep the no-pan law (the w33 B4 re-clip that sat last in the sheet is
scoped to wide windows — it had been silently beating the fix).

## Verification
- `w43_stress.js` (jsdom, full season + playoffs + Super Bowl): **44/44**, zero console errors.
- `w43_live.js` (Chromium, both themes, 1280/640/500/430px): **41/41**, zero page errors.
- The w42 regression suite: 50/52 — the two deltas are the audits asserting the superseded
  light-ink law (intended; see the ledger).
- Evidence: `_agents/zai/notes/evidence/` (both themes on every flagged surface).

## Changelog (one line per wave)
- w43 (2026-10-31): the light ink txM (a little more color, dark untouched), the constant gold
  shimmer (--zshim) with the champion exception, the browser names tinted, per-team scores/stats
  on the during-game/review screens, the SB cinematic opaque at mount, the champions' own-color
  shimmer, the bracket #X seeds + team score colors + hint removed, the Madden card rank on one
  line, small-window side scroll with the footer reachable, the preview uniform.
- w42 (2026-10-31): the ONE-INK law, the look-gate, the NFL tab sweep, the SB cinematic same-paint.
- w41 (2026-10-31): the tier law everywhere, the neutral rows, the draft-review ink, the crest.
