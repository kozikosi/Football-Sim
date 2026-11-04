# UPDATE-README — wave 45 (the Owner's round-45 directives)

Delivered 2026-10-31 · the product: `Football-Sim-Z-post-blue-w45.html` ·
md5 `9990aa033b94a34aaf3c2a2a5d844fef` · 1,521,208 chars · base: the w44 bytes (md5 `da3fc202…`).

## The halfway tone now rides the whole site (O1/O2 — the session's bulk)

The 0.50 tone he approved in the player browser is everywhere team-colored TEXT renders on the
site's pages: the comparison dropdowns and everything around them, the row numbers and pos
chips, the box-score final scores and Team-Stats columns, the bracket scores, the winning-cell
ink, the star faceoff on both sides. Two real bugs fell out of the audit, both fixed:

- **LIGHT**: a w34-era rule was still feeding light mode the DARK theme's pale ink on tinted
  rows — 1.59:1, the "super faded for no discernible reason" players (measured: "Brock Purdy
  85" in pale pink on a light panel). Light reads the halfway ink now, everywhere.
- **DARK**: the matchup names, the preview strip, the player cards, the lineup cells and the
  chips had no dark override and read the light halfway ink — 2.27:1, his "a little tough in
  dark mode". Dark reads `txd` now (asserted byte-equal to w44 — dark untouched).

**The Raiders read.** His exact complaint — hard to read in light, tough in dark. The halfway
formula gained a readability floor: it never sits below 5:1 on the light page. Eight franchises
deepen slightly (Miami, Pittsburgh, NY Jets, Green Bay, Philadelphia, **Las Vegas**, New
Orleans, Carolina) — the Raiders' ink goes from a muddy 4.7:1 olive to a richer bronze at
5:1. Same hue, one constant moves it on his word. The 90+ gold law is untouched everywhere.

## The pregame key players wear ONE size (O5)

"Matthew Stafford" at 14.4px beside "Josh Allen" at 21.42px — each panel computed its own
fitted size. The stage now fits the longest name once and every panel wears that size.

## The end of the during-game report keeps its structure (O6)

The blocked-kick lines lost their timer, crest, team and score. They carry the full line
anatomy now — timer, crest, team, play, running score — verified live: "4Q 4:21 KC ANFERNEE
JENNINGS [BLK][PUNT] 30 - 41" beside the regular lines. (The blocks get the report's current
clock — the sim gives blocks no timestamp; nothing is invented. The w33 LAST-DRIVES composer
never fires on the current event stream — pre-existing, untouched.)

## The box score speaks with one voice (O7/O8)

The final score wore the vivid accents while the team name beside it wore the halfway ink
(measured: LV score `#806d34` vs LV name `#866b3e`). Both wear the 0.50 tone now, and the
separator reads with the dot: **"22 · 17"**. The Team-Stats columns and the bracket scores ride
the same tone. The during-game header scores keep the law he verified in round 44.

## The small ones

- The honors "why" wording **"70-rated QB on a 14-win team"** retires at the source — the math
  never moved, the other two wordings remain (O9).
- The playoffs' leaked **"// w41 (W3, Owner): no duplicate…"** comment text is gone from the
  page — it had been written inside a template literal; the note lives as a real comment
  outside the string now (O10).

## Verify

`w45_live.js` 42/42 (both themes) · `w44_live.js` on the w45 bytes 32/32 · `w43_regress_stress.js`
40/43 (the 3 fails are the exact ink asserts his O7 superseded — they pass on the w44 baseline)
· `w42regress_stress.js` 48/50 (the same 2 superseded audits as on w44) · zero console errors
through every drive · every script block passes `node --check`. Screenshots in
`_agents/zai/notes/evidence/`.

§veto candidates live in `notes/W45-INTAKE-LEDGER.md` (the sweep's reach and the 5:1 floor, the
dot's placement, the all-teams check).
