# STYLE GUIDE — Z-post-blue

**From:** Z.ai, High Councillor (seat S-2600–2699) · 2026-10-25 · REV 1
**For:** every councilmember (Claude, DS, and any future seat) who touches the Z-post-blue UI, its copy, or its math displays.
**Status:** these are the Owner's standing design rulings, distilled from the eleven shipped waves of Z-post-blue (v1 → v11b) plus his rounds 1–7 feedback. They are not suggestions. If a new idea conflicts with one of these, the conflict goes to the Owner — do not silently pick one.

---

## The Ten Commandments of Z-post-blue

### 1. No white text. Anywhere. Ever.
White (`#fff`, `#ffffff`, and near-white defaults) is forbidden in every panel, label, score, and body text. Light text must be derived from the active team palette (a light tint of the team color) or from the site's established non-white text colors. This applies to things white text hides inside: `<option>` dropdowns, `details` summaries, table headers, badges, footer text, placeholder text. When in doubt, tint it with the palette.
*Why:* the Owner flagged white text repeatedly (Your Season Stats card, Playoff picture, replay footer, dropdown menus). On the dark, saturated surfaces of this site, white reads as unfinished.

### 2. Integers only.
Every number rendered anywhere is an integer. Internal math may use floats; the moment a value reaches the screen it is rounded to a whole number. No `3.3`, no `+16.0`, no per-game decimals like "1.4 TO/game" — show the integer total instead ("Turnover margin: 9"). Position weights are integers ≤ 1000, ending in 0, with a trailing 5 only where it demonstrably buys accuracy (see `REWEIGHT-BRIEF.md`).
*Why:* the Owner has rejected decimals every single round. Decimals read as fake precision to him; integers read as football.

### 3. The team palette drives everything.
When a team is selected, its colors cascade into: dropdown menus, bubbles, chips, borders, score numbers, the Random box, award cards, the replay score line — every accent. Scores render in each team's own color ("TB 29 – 34 NO", each number in its side's color). Never introduce default greens/blues/purples that belong to no team.
*Why:* the Owner calls this "palette-driven" and notices violations instantly (e.g. comparison verdicts once used green — removed).

### 4. The shimmer sweep is the universal "this is special" signal.
One reusable shimmer-sweep style (a moving highlight in team colors) marks everything the Owner wants celebrated: 90+ OVR players, the Player of the Game (guaranteed after every game — no exceptions), game winners, star players, "#1 <conference>" seed tags, "YOU WON", top-3 draft buttons. If something deserves celebration, it gets the shimmer — do not invent a second celebration effect.
*Why:* the Owner asked to reuse the same sweep everywhere; consistency of the reward signal is the point.

### 5. Cinzel Decorative is the display voice.
Headings, hero wordmarks, panel titles, and the big cinematic lines use Cinzel Decorative (with graceful fallback). Body copy may use the supporting sans stack, but the personality lives in Cinzel Decorative. Game previews are entirely Cinzel Decorative per the Owner's round-7 ruling.

### 6. Motion is slow, soft, and faded — never abrupt.
Titles and subtitles cross-fade slowly (the shipped fade cycle is ~4.2 s). Panels ease in; scroll-revealed words fade back in when scrolled to (the Season-in-Words fix — content observed by the fade `IntersectionObserver` must recover, never vanish). Stars stay put: no name-drift animations on preview cards — the Owner replaced that with stat cards.

### 7. Graphical beats tabular, always.
Prefer cards, bars, bubbles, badges, logos, and visual columns over tables of numbers. Standings rank rows show team logos, not numerals. The Guide page is graphical: engine-derived bars, cumulative series, personnel boxes. If a table is unavoidable, keep it integer, palette-colored, and compact.
*Why:* "make it graphical" is the single most repeated instruction in Owner feedback after integers.

### 8. Labels are short, ALL-CAPS where display-grade, and in the Owner's exact words.
When the Owner names a label, use his name verbatim: `IN DA CLUTCH`, `INDIVIDUAL SKILL`, `SUBPAR BLOCKING`, `EXCELLENT COVERAGE`, `Costly Miss`, `OK`, `SIM PLAYOFFS`, `Play the x` (x = opponent name), `↶ Undo`, `Try AGAIN TO GO 20-0?`. Do not "improve" his wording. Display labels trend all-caps; verdict labels keep his capitalization.

### 9. Explanations live in the Guide, not inline.
Methodology paragraphs, stat explainers, and "how this is computed" text do not go next to the thing they describe — they go in the in-site Guide's Glossary (ROY, CPOY, COY, Undo's once-per-draft rule, position values, etc.). Inline, an explanation may appear only as a hover or slow-fade micro-caption (e.g. Season-Review metric chips: tap → "x led the team to #x in the league"). Default answer to "should I add a paragraph here?" is **no**.

### 10. Layout is floaty, mirrored, and cinematic.
Generous vertical breathing room between sections; no horizontal rules as separators; larger gaps between quarter blocks in the replay. Two-team layouts mirror: the right team's accent border sits on the RIGHT edge and its content right-aligns. Every game gets cinematic pacing: 5 s intro cinematic for regular games, 30 s for playoff games, a full 60 s for the Super Bowl. Never ship a bare score without its shimmering verdict ("YOU WON" / "YOU LOST" + star).

---

## Do-not-regress ledger (verified by the v8/v9/v10/v11 suites)

Each of these was explicitly ruled by the Owner. If your change touches them, re-run the verify suites and eyeball the evidence screenshots:

1. `↶ Undo` — once per draft, documented in the Guide glossary.
2. No "On the clock" text; no CPU pick-priority panel; no sort arrows.
3. 85+ color chips sit **under** OVR; team-icon click-to-sort on the draft board.
4. Random box recolors with the team dropdown.
5. Record tags read `#x <division>`; a #1 seed gets a shimmering `#1 <conference>` tag instead.
6. Replay final line: colored `ABBR x - y ABBR` + shimmering `YOU WON` + star. No "FINAL ·", no "You win", no turnover footer, no "undefined" anywhere.
7. Points line in rest summaries is deleted; "The bracket awaits…" line is deleted.
8. Season-in-Words content never permanently disappears (observer-based fade-back).
9. Player cards: preview shows season stats (OVR only in week 1), review shows game stats; a shimmering PLAYER OF THE GAME always renders.
10. Draft pick analysis: `OK` / `Costly Miss` only — no "(0.6 wins left)", no `FINE`, no `Left value behind`.
11. Turnover margin = integer total, never per-game. `2-Pt Conversions x of y`.
12. Standings: your division panel is exactly **2×** the compact panels' width; PF/PA are integer totals.
13. Playoffs: `SIM PLAYOFFS` button after any non-Super-Bowl loss; `Play the x` before each playoff game.
14. Awards panels (regular + playoff) use the same card style; no explanation paragraphs.
15. FB and Punter are honest 28-slot draft positions with real modeled wins (`REWEIGHT-BRIEF.md` §7b) — no display-only special cases.
16. Season Review: metric board in depth-chart order, clickable fade explanations, no methodology paragraph, no provenance footnote, `Try AGAIN TO GO 20-0?` top-right.

---

## Evidence

Screenshots for every wave live in `_agents/zai/evidence/z-post-blue/` (`v3…v11b`, plus `draft-live.png`, `players.png`, `playoffs.png`, `season-start.png`). When in doubt about what a rule looks like shipped, open the latest (`v11b-*`) screenshots — do not guess from this document alone.

— Z.ai · This guide ships inside the handoff package and the repo at `_agents/zai/deliveries/STYLE-GUIDE-Z-POST-BLUE.md`.
