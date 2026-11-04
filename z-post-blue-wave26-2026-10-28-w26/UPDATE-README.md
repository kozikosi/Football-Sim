# UPDATE-README — Z-post-blue wave 26 · 2026-10-28

**Product this zip:** `Football-Sim-Z-post-blue-w26.html` — md5 `5f947bccf2a9392a85fe01ef11164622` · 1,338,465 bytes.
Built from w25 (byte-identical to the w20 product, md5 `60addfca…`) by `_agents/zai/tools/w26_patch.py` — 44 asserted exact replacements + an appended w26 CSS/JS block. Engine untouched; every edit is view-layer.

## What changed (Owner round, verbatim-mapped in `_agents/zai/deliveries/INTAKE-W26-2026-10-28.md`)

1. **NO EMOJIS (new standing law).** ⚓ ◍ ⭐ 🏆 ☾ and the ☀/☾ theme labels are gone. Typographic symbols (— · ★ ▲▼ ← → ↶ ✕) survive as functional text.
2. **ANCHOR / LEAK chips** — symbols removed; the word now renders smaller than the player's name (same format for both chips).
3. **Brave fix (Madden Rankings + Guide).** Root causes addressed: a shimmer could paint invisible (`color:transparent` without a guarded fallback, and a `color-mix()` gradient that dies on older Chromium). Now every shimmer falls back to a solid team color before `@supports (background-clip:text)` allows the gradient; the gradient's clip/size/fill longhands carry `!important` so the important shorthand cannot strip them; a failed panel paints a visible SETBACK note instead of blank space.
4. **Team Comparison page** — the two homepage-style team dropdowns (logo + team colors, alphabetical) now sit above the two vertical team columns; the hidden-holder move bug that left "no buttons" is fixed; "Starter-by-Starter" removed; panel widened.
5. **Guide** — the flexing math and the FLEX legend are gone from "Where they line up"; the "You can flex" panels run in draft-depth-chart order with QB first ("THROWS THE PASS"); the POSITION VALUES panel is removed; the DEFENSE section moved up below the flex section and was rebuilt: DL = squares, LB = triangles, DB = circles; DT2, ILB2, SAM, NICKEL, DIME wear five distinct colors, lit or dimmed per formation, labeled at the bottom; no more R+/P+/dot symbols there.
6. **Position Rankings** — the spot buttons are back (the w24 Series format, minus "THE SERIES"): individual toggles in draft-depth-chart order (QB first), they light up and stay on; the dropdown's Series presets (which listed series contents) are retired.
7. **Draft board** — the group chips are now the same spot-button format with **ALL** and **CLEAR** replacing NONE (HIGHEST PRIORITY item); Nickel sits beside Dime at the bottom of the defense; the 3-4/4-3 toggle actually re-renders the board and relabels fill slots (NT / OLB1 / ILB1 / ILB2 / OLB2) — `rerenderDraft` never existed; the weights badges accept typed numbers (0–700); the "Can't Run / Weak D / Can't Pass" panels and the MODEL·ALL SLOTS select are gone (removing the select also removed its re-injection observer — that observer was an infinite boot loop).
8. **Player browser** — players wear their team's colors, positions wear badges, XF is neutral, team names in team colors; shimmer on THIS page only: the top 90+ player per team on screen, none if no 90+ is on screen; 85+ vibrant unchanged; with no filter selected the score column shows overall (already true).
9. **Season / draft review** — one of the two top-left SEASON buttons removed; the game-review key-player stats wear badges; the fading "missing depth chart … 70" notes are gone once the season starts; your team's breakdown drops down automatically and now wears the badge breakdown — per-player (OVR · round · position rank vs all 32 simulated teams) plus position-group badges.
10. **Tier-law sweep** — honor-card names and depth-chart slot labels no longer shimmer value-blind; the 85+/90+ law holds on every touched page.

## Verify
- `w26_verify.js` — 42/42 PASS (tabs, buttons, chips, dropdowns, guide order, no-emoji sweep, shimmer fail-visible, zero console errors, zero horizontal overflow at 390 px fresh loads).
- `w26_season_test.js` — 9/9 PASS (instant draft → auto-opened badge breakdown → season start → week-1 review with stat badges).
- Evidence screenshots in `evidence/` (8 PNGs).

## §4 Changelog
- 2026-10-28 — **wave 26**: no-emoji law, Brave fail-visible shimmers + view-fail notes, comparison dropdowns, Guide flex/defense rebuild, spot buttons (rankings + draft, ALL/CLEAR), typeable weights, synergy/series-select retirement, player-browser team colors + one-shimmer-per-team, draft-review badge breakdown, tier-law sweep. (Prior: wave 20 six-point fix round.)

## §J · Interpretations awaiting Owner veto
1. Position-rankings "breakdown where you click" — satisfied by the inline player cells (no bottom breakdown exists on this page).
2. The removed SEASON button is the ops-row duplicate (the tabs row keeps SEASON).
3. Old-prompt stat-scale examples (5000 pass yards, 50 TD…) — the sim's generated stat lines already carry realistic magnitudes; no engine change made.
4. NO-EMOJIS boundary — typographic arrows/star/deltas kept as functional symbols.
5. "Starter-by-Starter" removed on the footer comparison page only (the draft-review tab copy was not named).
