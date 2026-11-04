# WAVE 27 — UPDATE README (Z.ai · High Councillor seat ZAI · 28 Oct 2026)

## What this package is
`Football-Sim-Z-post-blue-w27.html` — the wave 27 product build, produced from **w26**
(`5f947bccf2a9392a85fe01ef11164622`, verified byte-identical to `council/zai` @ 183fe05) through one
anchored patch script (`tools/w27_patch.py`, 38 asserted replacements + payloads). View-layer only; the
simulation engine is untouched.

## Product pin
- file: `Football-Sim-Z-post-blue-w27.html`
- md5: `b2adf669cc7e6fd07868e56c3c70c0af`
- bytes: `1,352,103`

## What the Owner asked for, and where it landed
See `docs/w27-intake.md` for the full 30-line mapping. Highlights:
1. **Both Brave SETBACKs fixed at the root** — the Guide crash was `window._zpbAdjCache` undefined when
   the 3-4 base is restored from localStorage at boot (the exact `olRun:34:{…}` read); the Madden
   Rankings crash was `render()` writing `#totalwt` before `buildControls()` had built it. Both paths
   are now guarded AND self-healing; a forced-fault test in the verify suite reproduces each bug and
   proves the fix.
2. **Position Rankings** — the "UNDEFINED" after player names was a 3-tuple reaching a 4-slot
   template; THE SERIES is back in the dropdown (1–26, dropdown only), the default selection is
   Series step 9, the spot buttons remain independent latching toggles, and "Ranking by these N
   spots." is gone.
3. **Player Browser** — XF badges removed; every name and every number wears the team color in both
   themes (new `--tnd` dark-theme team token); Bills blue and Rams blue lifted out of navy
   (targeted lightness lift, chips stay true brand); 85+ bold, neutrals not bold.
4. **Team Comparison** — colored panel behind every filled cell (winner cells included, uniform),
   bold law enforced (90+ shimmer · 85+ bold/vibrant · else neutral not bold), and the closed
   dropdown never shows a partial word: the label steps full name → city-only → abbreviation,
   JS-measured with a ResizeObserver.
5. **Draft board** — WINS/PRIORITY verified visible inside the viewport at 1280/1024/900 (compact
   table rules; card mode below that), the X.Y next-pick is 1.55rem, the Dime chip matches the other
   slot chips and follows the tier law, top-priority rows get a breathing DRAFT button
   (static ↔ hover pulse), WELCOME holds alone an extra second and DRAFT fades one second sooner
   after centering.
6. **Postdraft cinematic** — "CAN YOU GO 20-0?" appears ~2 s faster and all text leaves ~2 s faster.
7. **Draft Review** — the top roster visualization is gone; the breakdown badges stay; the draft pick
   now wears the field as **Where they belong** — the Guide's field-map format with every starter's
   initials at his station, Nickel and Dime sharing the slot line between the cornerbacks and the
   linebackers. FB moved to Quarterback & Skill Positions.
8. **Guide** — order is now Drafting · Defense · Coaching (open) · Reading the Badges (open) ·
   Reading the Draft Board (open, Wins/Priority/Gone visualized as three badge cards with every word
   kept) · Game-plan math · Glossary. "The season in badges" paragraph and the Rookie of the Year /
   Comeback Player of the Year glossary lines are removed. Flex menu: Center/Guard swapped,
   FS/Nickel-Dime swapped. Defense viz: Nickel #4f86e0, Dime #7fd67f, Dime filled when in the lineup.
9. **Player-panel example values** (third request, now executed): PassY 5,000 · TD 50 · INT 15 ·
   20-0 158.3 · RushY 250 · SK 25 · QBR 100 · W 20.
10. **Mobile law held** — no horizontal panning on any tab at 1280 or 390 (`overflow-x: clip` at the
    html level plus flex containment), verified.

## Verification (all green, zero console errors)
- `verify/w27_verify.js` — **57/57 PASS**: tab sweep with zero SETBACK chips, both Brave bug
  reproductions, XF/color/token checks, Series default + 26 steps + no UNDEFINED, guide order/open
  states/visualizations/removals, defense viz colors, comparison panels + bold law + dropdown words,
  cine timings, next-pick size, Dime chip, top-3 pulse, table fits at 1280/1024/900, review map with
  slot-line placement, FB grouping, roster tier law, no horizontal panning.
- `verify/w27_season_test.js` — **13/13 PASS**: instant draft → auto-opened breakdown (28 player +
  6 group badges) → Where-they-belong map → season start → regular week 1 → guide value checks.
- Evidence: `evidence/w27_01…w27_10.png` (+ four probe shots).

## LEAK "emoji" note
The Madden Rankings ANCHOR/LEAK chips in w26/w27 are text-only — the symbols were already removed in
w26 (`.zpb-anch b,.zpb-leak b` at 0.56rem under the 0.78rem name, no icon). If Brave still shows one,
it is a cached copy of w25: hard-reload (Ctrl+Shift+R) or re-download this file. The remaining ★ and
✕ glyphs on other pages are typographic symbols (star markers, close button), not emoji.

## Contents
```
Football-Sim-Z-post-blue-w27.html      the product
CHECKSUMS.txt                          md5 manifest (roundtrip-verified)
README-WAVE27.md                       this file
docs/w27-intake.md                     the 30-line Owner-directive intake ledger
tools/w27_patch.py + tools/payloads/   the build chain (runs w26 → w27)
tools/w27_stage1_edits.json            recovered byte-exact stage-1 edit set
verify/w27_verify.js                   57-check suite
verify/w27_season_test.js              13-check season flow suite
evidence/w27_*.png                     screenshots
workflow/START-OF-CHAT-ZAI.md          rewritten §3 (session 19 state)
workflow/ZAI.md                        lane file rewritten
workflow/END-OF-CHAT-ZAI.md            end-of-chat protocol (carried)
```
