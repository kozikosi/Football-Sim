# UPDATE-README — wave 41 (the Owner's round-41 directives)

Delivered 2026-10-31 · the product: `Football-Sim-Z-post-blue-w41.html` ·
md5 `5c87f60340f6dff622fbbc46221cd4d5` · 1,494,337 B · base: the w40 bytes on `council/zai`
(md5 `3eed4cc5…` — see the BASE note in the intake ledger).

## The ink law — the homepage dropdown's treatment, everywhere (N1/N2/N3/P1/P2)

The neutral-but-team-colored tint the team names wear in the homepage dropdown now sweeps the
project, in BOTH themes:

- **Player names obey the tier law everywhere a name renders with a team**: 90+ shimmer in the
  team's color, 85+ bold in the team's colors (the stronger rung of the ink ladder in light mode),
  everyone else neutral but in their team's colors — exactly like the homepage dropdown's names.
  The per-team one-shimmer cap is retired: EVERY 90+ shimmers.
- **The player browser** carries it fully — names, the Cinzel team cells, the stat numbers.
- **The draft board's light mode** is added: the card headers, the breakdown, the lineup cells and
  the board's name cells now read the light dropdown ink (they were still fed the dark theme's
  pale ink — the melt he flagged).
- **Position Rankings** keeps its dark-mode look untouched; its light mode now works the same way,
  and its team cells wear the treatment.
- **The schedule tiles' opponents** and the standings' existing laws are untouched; the vivid rows
  keep their own A10 deep-ink law.

## The box score (P3/P4)

The team names above the box score wear **Cinzel Decorative** with their crests, tinted like the
homepage dropdown's team names. The line score wears post-blue: a rose-hair frame, Cinzel quarter
headers, per-team neutral washes, the F column in the accent.

## The awards (P5/W7/W9)

The award winners wear the dropdown ink (the user's own shimmer keeps its accent). The playoff
awards render **one line per round**: the Super Bowl MVP and the Postseason MVP centered on their
own lines, then Conference Championships, Divisional, Wild Card — each round's game balls on one
shared line. Three new postseason statistical leaders: **Forced Fumbles**, **Tackles For Loss**,
and **TDs · non-QB** (rush + receive + defensive).

## During the game (G1/G2/W2)

- A blocked kick now reads **x [BLK] [KIND] y** — the blocker in his team's colors (tier law
  applied), then the BLK and the kind chips, then the punter (or kicker) in HIS team's colors.
  The old "KCJulian Blackmon BLK PUNT" shape is gone.
- The pregame cinematic's top pair of names steps down (22% → 27%) so they stay under the box's
  top line.
- The playoff pregame (wild card included) runs slower and heavier: a 36s envelope (was 30s), the
  star fades at 5.6s, the logos fly slower, the stage wash deepens and breathes, the flash lands
  later and decays slower. No new material — the same stage with more gravity. The Super Bowl
  keeps its 60s standing law.

## The playoffs (W1/W3/W4/W5)

- The playoff hub's buttons are **centered**, and the primary ("Play the X") is the big glowing
  Cinzel Decorative CTA — the regular-season preview's treatment.
- On a playoff loss the duplicate "Sim Playoffs" is gone — the shimmer button leads alone.
- The bracket cards carry **logos only** (seed + crest + score; the names live in the hover
  title), and each panel is larger.
- Clicking a played bracket panel opens the review; **clicking the same panel again closes it**
  (the schedule already toggled — regression-guarded).

## The season review (W6/W8/W10)

- The unit report card's **Kicker badge centers** when it sits alone at full desktop width.
- The game ball can no longer go to a defender whose line is only tackles unless he posts
  **15+ tackles AND 2+ TFLs**.
- The **"Try again to go 20-0?" panel** is wider (480px band), the question centered in
  Cinzel Decorative, the 20-0 keeps its shimmer, and Call An Audible breathes.

## The P1 Engine (E1) — WAITED

The Architect's ENGINE-MATH-SPEC REV 5 (architect/engine-and-seats, 30 Oct) is PROPOSED — its own
header holds the protected constants for the Owner's approval, and its §8 lists the V23 build as
not yet done. Wiring half-finished math under this round's UI laws would risk every regression the
suites pin. The seam is ready (the per-wave suites ARE the contract), so the swap lands clean when
the math is declared complete. The Owner's words allow the wait.

## Verification (all green, evidence in `_agents/zai/` and the chat)

- `w41_verify.js` — 62/62 (every directive asserted on the bytes and live in jsdom).
- `w41_stress.js` — 56/56 (draft → season → playoffs → Super Bowl → review, zero console errors;
  the game balls audited across 87+ defensive winners; the bracket toggle, the W3 branches, the
  awards lines, the leaders, the 20-0 panel, the report card all drilled).
- `w41_live.js` — 40/40 in real Chromium (no sideways scroll at 1280/900/500/390 in both themes;
  the computed inks match the tokens in both themes on the browser, the board and the box score;
  the bracket, the buttons, the intro timings, the Kicker centering, the 20-0 panel measured).
- `w41_mobile.js` — all green at 390×844 (five views, the ink, the box score fits, zero errors).
