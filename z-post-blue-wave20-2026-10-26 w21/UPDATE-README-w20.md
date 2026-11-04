# WAVE 20 — Position Rankings rebuild (Owner directive, 2026-10-26)

Build on: wave 19 (md5 1215639c…). Single deliverable:
`Football-Sim-Z-post-blue.html` — md5 42e829bd2acf49a95c9484511aacd327 · 1,322,905 bytes

## What changed (Position Rankings page — the dropdown page)

1. **The dropdown is gone.** Every spot on the season draft board (all 28: QB, RB1, RB2, WR1–WR3,
   TE1–TE2, FB, OT1–OT2, OG1–OG2, C, DE1–DE2, DT1–DT2, MIKE, WILL, SAM, CB1–CB3, SS, FS, K, P) is
   now a toggle button in the draft-board chip style, with ALL and CLEAR at the end. The center
   panel — ranking, scores and the players in every row — rebuilds itself from the active spots.
2. **THE SERIES is now a row of preset buttons 1–26**, each showing the spot it adds (1 QB ·
   2 CB1 · … · 26 TE2) with the full cumulative list in its tooltip. **Items 27 (SAM) and 28 (FB)
   are removed** per directive; the two spots remain as ordinary toggles.
3. **Default selection is Series #19** — the view opens on the exact 19-spot ranking the Owner
   quoted (Rams 85: Stafford 99 → Kobie Turner 85).
4. **Blank spots show nothing.** The weird "(70)" placeholder (and wave 19's bare "70") is gone;
   only players you know appear. The 70 replacement level still drives the score in the background,
   and the small note at the bottom of the panel says exactly that.
5. **Primary-position badges.** Every player wears a boxed badge of his primary position (QB, RB,
   WR, TE, OT, OG, C, EDGE, DT, LB, CB, SS, FS, K, P, FB) in the style of the post-season awards
   badges, in the color of his team. The count line and table header follow the same language.
6. **Coloring rules (tested exhaustively).** Names stay neutral unless 85+ (vibrant team color) or
   90+ (shimmering team gradient); OVR numbers are always in the color of the team the player is
   on; 85+/90+ names and numbers both wear that team's colors — verified per-theme (light accent in
   light mode, dark accent in dark mode) for **every chip of all 32 teams across Series presets
   1/7/12/19/24/26 in both themes**.
7. **Cinzel Decorative everywhere on the page**, including the toggles, Series presets, count line
   and table headers. Players are separated by dots, never commas; no parentheses anywhere.
8. **Fixed a wave-19 defect found during this work:** Series rows rendered "Matthew Stafford
   undefined" (array-shape mismatch), and the 85+/90+ rules never fired on that path.

## Verification
- node --check: 3/3 script blocks clean.
- Ranking suite (light + dark): 86/86 — default state, Owner's 19-player row order/badges/numbers,
  no undefined/parens/commas, toggle + ALL/CLEAR behavior, Series 1/26, blank-spot skipping, zero
  console errors.
- All-team sweep: every chip on 6 presets × 2 themes obeys the 85+/90+/neutral + team-number rules.
- Regressions: full draft stress (5 drafts, 28 user picks each, ticker, priority) clean; season
  flow + regular-season review e2e clean; zero console errors throughout.

— Z.ai · High Councillor seat ZAI
