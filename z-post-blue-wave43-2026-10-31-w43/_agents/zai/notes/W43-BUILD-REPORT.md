# W43 BUILD REPORT — the Owner's round-43 directives

Delivered 2026-10-31 · product `Football-Sim-Z-post-blue-w43.html` ·
md5 `53ce9def9db948991e8974c76824e0f6` · 1,509,529 B · base: the w42 bytes (md5 `94474a4d…`).

## The chain
`zpb_v43.py` (in `_agents/zai/tools/`) — 41 asserted exact replacements on the w42 bytes,
zero hand edits. Post-checks: the stress suite, the live-browser suite, and the w42 regression
suite all green.

## What shipped (his thirteen)
- **N1** — the stacked Madden rankings cards keep `#` and the rank on one line (`#31`), so the
  cards stop growing as the window compresses; the metric rows and sw-badges nowrap too.
- **N2** — the player browser's PLAYER names wear the tinted ink in dark mode now (a w41-era
  `color:var(--text)` force was the straggler); names, team cells and positions share one ink.
- **N3/N5/N13** — the light-mode ink `txM`: the deep team tone lifted to lightness 0.52 — a
  little more of each team's color, well short of crayola. Dropdown (face + options), browser,
  rankings, Team Comparison, draft board, standings, schedule, score-line names, honors.
  Dark mode untouched (`txd`), exactly as he ordered.
- **N4** — the 90+ name shimmer is the CONSTANT deep gold (`--zshim` law) on every surface and
  every team; the NYG-blue case died with two root causes: The Series' rows missing team vars
  (fixed) and a deep-sheet `tA2/tG2` shimmer gradient out-cascading the patched copies (fixed).
  Stars keep their team colors (pinned `--zshim`); the champions are the one exception (N11).
- **N6** — small windows (≤1024px) scroll sideways at the viewport (body no longer swallows the
  overflow); wide windows keep the no-pan law. The w33 B4 re-clip that sat last in the sheet was
  scoped to wide windows too — it had been beating the fix from behind.
- **N7** — the game preview: matchup names, strip names and key-player cards all read their own
  teams; the tiers hold everywhere (90+ gold, 85+ bold, rest the team ink).
- **N8** — the during-game header scores wear their own teams (KC red vs the opponent's color).
- **N9** — the game review: score-line numbers, Team Stats columns, Key Players titles and stat
  lines all in their own teams' inks, light and dark. Tested across many franchises live.
- **N10** — the SB cinematic computes OPAQUE at mount — the wrapper's fade was the flash; the
  stage inside keeps its entrance. No page pixels before the storm.
- **N11** — the champions shimmer in THEIR colors on the review banner (`--zshimL/--zshimD`) and
  in the cinematic (`--zshim` = the champion's dark accent) — never the user's color again.
- **N12** — the bracket: seeds read `#X` (no N1/A2), every score in its own team's color (with
  dark twins), and the "Click a played game…" hint is gone.
- **Carried and re-verified** — the w42 laws (the look-gate, the NFL-tab sweep, the draft-review
  entrances) ride unchanged; the w42 regression suite passes 50/52 with the only deltas being the
  two audits that assert the OLD one-ink light law (superseded by N13 by design).

## Verification
- `w43_stress.js` (jsdom, full season drive incl. playoffs + Super Bowl): **44/44 PASS**, zero
  console errors end to end.
- `w43_live.js` (real Chromium, both themes, 1280/640/500/430px): **41/41 PASS**, zero page
  errors — computed inks, cinematic opacity, bracket chips, footer reachability, the rank line.
- `w42regress_stress.js`: 50/52 (the two expected law deltas).
- Evidence screenshots in `_agents/zai/notes/evidence/` (light + dark, both themes on every
  flagged surface, the SB cinematic, the bracket, the 430px cards).
