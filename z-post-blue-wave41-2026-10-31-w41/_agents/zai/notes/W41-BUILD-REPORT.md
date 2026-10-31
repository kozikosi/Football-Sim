# W41 BUILD REPORT — the Owner's round-41 directives, wave 41

Delivered 2026-10-31 · seat ZAI · base: the courier's w40 bytes (`3eed4cc5…`, 1,479,523 B —
byte-identical to the w39 build; the BASE note in the intake ledger explains) · product:
`Football-Sim-Z-post-blue-w41.html` · md5 **`5c87f60340f6dff622fbbc46221cd4d5`** · 1,494,337 B.

## How it was built

Asserted patch scripts (exact-match replacements + md5 pins + post-checks), in order:
`w41_patch1.py` (the ink law in JS: the strength ladder on both row-var fns, the rankings
renderer's neutral ink, the shimmer-cap lift, the law-name helper) → `w41_patch2.py` (the CSS:
the three broken light rules, the browser team cell, the w41 style block) → `w41_patch3.py`
(18 renderer replacements: the box score, the bracket, the buttons, the block line, the intro,
the leaders, the awards lines, the game-ball rule, the honor ink, the rankings rows, the schedule
tiles, the 20-0 question) → `w41_patch3b.py` (the box score's neutral tokens, the zst-opp CSS) →
`w41_patch4.py` (the theme-scoping fix: every dark override the wave added keeps the naked
`:root:not([data-theme="light"])` form ONLY inside the prefers-color-scheme media wrap) →
patch5/5b (the light base-name rules for the browser and the board, with the ID-scoped
`#draftTable2 td.dc-name` override) → the awards card basis 252→236.

The scripts live in the chat's `scripts/` area and are mirrored in the wave package's
`_agents/zai/tools/` along with the four suites.

## Defects found and fixed during recon (listed for the Owner's veto)

1. **The draft board's light-mode melt was still live in three rules** — `.zpb-scard-hd b`,
   `.zpb-dbk b`, `.zpb-lu-cell` read `--tnd` in light (the w39 A1 fix covered the table rows
   only). Fixed to `--tn`.
2. **The board's name cells** (`.dc-name`) read `--nmd` unconditionally through a
   `#draftTable2`-scoped rule — the pale dark ink on light panels. Fixed per theme with the
   ID-scoped override.
3. **The browser's base names** read `--tnd` in light through the same pattern. Fixed per theme.
4. Two rules I added this wave first shipped with the same naked-selector mistake (they matched
   light mode too); caught by the live probe's computed-color drills and fixed in patch4 before
   packaging.

## The verification evidence

- `w41_verify.js` — **62/62**: every directive asserted on the built bytes AND live in jsdom,
  with the w38/w39 standing laws carried (the vivid name ink, the Guide wording, PC, the per-theme
  pair, the 60s Super Bowl law).
- `w41_stress.js` — **56/56**: the 32-pick draft, the books leg, the box score drill, the
  game-ball audit (87+ defensive winners, zero offenders), the hub buttons, the replay leg with
  the true final, the W3 loss probe (both branches), the bracket toggle, the logos-only tree, the
  Super Bowl stage, the awards (the leaders, the MVP lines, one line per round), the 20-0 panel,
  the report card. Zero console errors end to end.
- `w41_live.js` — **40/40** in real Chromium: no sideways scroll at 1280/900/500/390 in both
  themes; the browser/team/number inks match the tokens in both themes (the 85+ rung measured);
  the draft board's names read the per-theme ink; the box score's Cinzel Decorative names, crest
  and washes; the bracket logos-only; the hub CTA centered; the intro at 5.6s + the breathing
  stage; the bracket toggle; the Kicker spanning centered (grid-column 1/-1, justify-self center);
  the 20-0 panel at 480px, centered, Cinzel. Zero page errors.
- `w41_mobile.js` — **all green** at 390×844: five views zero-overflow, the ink per theme, the
  box score fits 390px, zero page errors.
- Screenshots in `evidence/` (browser, draft board, box score, awards, bracket — light + dark)
  ride the chat delivery.

## E1 — the P1 Engine: waited

The Owner's words allow waiting for a more completed version. The Architect's ENGINE-MATH-SPEC
REV 5 (architect/engine-and-seats branch, 30 Oct: "Drive model re-anchored to council P-204/205/206
data") is marked PROPOSED; its protected constants await the Owner's §9 approval and its §8 lists
the draft/depth/season/report code over the new slots as not yet done. The swap seam is prepared:
the per-wave suites are the regression contract, and the CLAUDE-UPDATE handoff (this package's
CLAUDE-HANDOFF/) carries every directive through round 41. When the math is declared complete,
the V23 build plugs in without re-deriving a single Owner law.

## Interpretations awaiting the Owner's veto

See the intake ledger's §Interpretations (nine entries), headliners: the font rides only where a
team name is the display element; 85+ names wear the team ink + glow (the rankings' rose-gold
fallback retires); every 90+ shimmers (the w26 cap retires); the x[BLK][KIND]y shape covers
FG/XP blocks; the slower playoff intro applies to all non-SB rounds; the Conference Championship
round keeps its own line; "a couple TFLs" = 2; the w40 base was the courier's bytes.
