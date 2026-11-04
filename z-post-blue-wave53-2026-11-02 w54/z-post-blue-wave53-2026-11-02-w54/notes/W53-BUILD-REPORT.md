# W53 BUILD REPORT — wave 53 of Z-post-blue (the mobile pass)

2026-11-02 · the Owner's session mandate (review · tests · mobile · the Claude seam) · three
surgical moves, zero design changes, every standing law intact.

## Deltas against w52 (the Owner's words → the code)

| # | Move | Where | Proof |
|---|------|-------|-------|
| W1 | the full review + baseline re-verification | lane docs, §4 anchors by hash | all six batteries green on untouched w52 |
| W2 | the standing batteries + a NEW wide probe | tools/w53_mobile_probe.js | 32/32 on w53 (31/32 on w52 — the gap IS the fix) |
| WM1 | the touch polish (desktop-invisible) | the main stylesheet, after the body safe-area rule | no pageerror; every battery green |
| WM2 | the thumb floor table completes | the ≤760px floor block | .posbtn 31→38 · .zpb-selbtn 36→38 · summaries 40px |
| WM4 | the rankings panel joins compress-first | #viewRankings .layout>.panel | the 320px 6px document pan is DEAD (scrollWidth 315 < 320) |
| W4 | the Claude seam renewed for w52/w53 | CLAUDE-HANDOFF/HANDOFF-TO-CLAUDE-w53.md + engine-seam.json | all 39 engine contracts re-verified in the bytes |

## The WM1 move — the touch polish (three lines, no pixel moves)

`html{-webkit-text-size-adjust:100%;text-size-adjust:100%}` (no iOS landscape text inflation),
`body{-webkit-tap-highlight-color:transparent}` (the site paints its own pressed states; the
grey Android flash is off-brand), `button,select,summary,.tabbtn,.footlink{touch-action:
manipulation}` (no double-tap-zoom delay on the controls; body pinch-zoom untouched).

## The WM2 move — the drift, found by measurement

The project's own phone floor table (≤760px block, the w43 era) says: footlink 44 · tabbtn 40 ·
seg/srbtn 38 · csbtn 36 · basetoggle 34. Measured on the live page: the player browser's
`.posbtn` rendered **31px** — an OLDER ≤760px block (the 600px-era sweep) still floors it at
30px and the newer table forgot it; the home/compare floating `.zpb-selbtn` rendered **36px**;
the guide's bare accordion summaries rendered **19–38px**. All three now sit at the table's own
floor (38/38/40). Phones only — the block is max-width:760px; desktop pixels untouched.

## The WM4 move — the root cause, recorded so it never returns

At 320px the rankings page panned the document **6px**. The chain, measured layer by layer:

1. The team rows are `white-space:nowrap` flex lines — intrinsic min-content ~280px.
2. The rankings `.panel` is `overflow-x:auto` — but a scroll container's min-content STILL
   measures its content in Chrome's intrinsic pass (306 = 280 + the panel's padding/border).
3. `.layout` (flex column) sums its items' min-content → 306. `#viewRankings` → 306. `.wrap`
   (the body flex item with `margin:0 auto` — auto cross margins DISABLE stretch) sizes by
   fit-content → floored at min-content = 306 + 20px padding = **326.047px**.
4. 326 > 320 → the document pans 6px. The w43 N6 law TOLERATES the pan (small windows may
   scroll sideways) — but this pan is accidental slop, not the footer-reachability affordance.

What did NOT work (verified, do not retry): `min-width:0` on every element in the document
(the used size frees; the intrinsic feed does not) — sweep measured, zero effect. A root
`overflow-x:clip` — fights the Owner's own N6 law (withdrawn).

What worked (the footnav's OWN w43 cure): `contain:inline-size` on
`#viewRankings .layout>.panel` — the inline-axis intrinsic size stops depending on the
contents, exactly like the footnav strip ("must not feed its min-content back into the phone
layout viewport"). Safety probe first: ZERO absolutely/fixed/sticky positioned descendants in
either rankings panel, so the implied layout containment re-anchors nothing. Result: wrap
sizes to its container (310), document scrollWidth 315 < 320 — nothing to pan at ANY width;
the team rows scroll inside the panel exactly like the draft tables already do.

## The W4 move — the Claude seam (the Owner's "isolate more code or instructions")

- `CLAUDE-HANDOFF/HANDOFF-TO-CLAUDE-w53.md` — the full renewal of the w36 handoff: the laws
  updated through w52/w53, the wave history w33→w53, THE SEAM re-verified byte-by-byte (all
  39 engine functions present, each exactly once — no payload re-binding on the engine core),
  the dunder-flag contract table, the look-gate's data-zseen/zpb-seen law, the soft spots and
  the battery map with expected counts.
- `CLAUDE-HANDOFF/engine-seam.json` — the machine-readable contract (function names, the
  flags, the DOM ids, the battery table) for tooling-assisted integration.

## Verify summary (final w53 bytes)

syncbattery 10/10 · w53_live 30/30 · w51 regression 25/25 · evidence sweep 64/64 ·
mobile 5/5 · nodecheck 12/12 · **wide probe 32/32** (every view × 320/360/390/430: no document
overflow anywhere, zero pageerrors) · pageerrors 0 across every battery.

## Evidence

`notes/evidence/`: w53-rankings-320 (the fixed view, whole cards in frame) ·
w53-players-320 (the 38px All-Positions row) · w53-guide-320 · w53-home-390 (the floating
selectors side by side, P-001 law) · w53-mobile-review (the 390px sync surface) ·
w53-m7-bars-light (the w52 bar law riding through).

## Sizes

base w52 = 1,585,036 B (md5 40613b81de26b5ed9c67bdcc0637ac6f) → w53 = 1,586,055 B
(md5 512d1885ac0a69120bedcaf8e9041f2b) · **+1,019 bytes** — the smallest wave ever shipped.

## Flagged for the Owner's ruling (P2 proposals, NOT built)

1. A phone-only +0.5–1px lift on the 9–11.8px micro-labels (ANCHOR/LEAK 9px · poschips 9.9px ·
   compare position letters 10.2px · team cell 11px) — his design; only he rules on it.
2. The boot reads ~3.2s in the headless harness at every width (file://, cold cache, includes
   the harness waits) — within tolerance for a 1.59MB single file; no work shipped. If he ever
   wants it faster, the safe lever is trimming duplicate payload CSS, never deferring the
   engine (the look-gate observers depend on the parse order).
