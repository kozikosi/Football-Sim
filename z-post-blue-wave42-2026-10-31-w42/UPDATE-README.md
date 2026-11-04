# UPDATE-README — wave 42 (the Owner's round-42 directives)

Delivered 2026-10-31 · the product: `Football-Sim-Z-post-blue-w42.html` ·
md5 `94474a4d636cdd0a209824f661e876f6` · 1,500,122 B · base: the w41 bytes on `council/zai`
(md5 `5c87f603…` — the courier commit c0c3388).

## The ONE-INK law — the dark dropdown ink, everywhere, both themes (I1/I2/I3)

The style he named — the homepage dropdown's text in dark mode — is now the ONLY team-scoped
text ink in the project, in BOTH themes:

- **The row tokens collapsed to one ink.** `zpbRowVars` (the vivid rows) and
  `zpbNeutralRowVars` (the neutral rows) build every text token — `--tn/--tnd/--nm/--nmd/
  --nmS/--nmSd/--nu/--nud` — from the same `txd` (the dark dropdown ink: the team-tinted
  cream). Light mode reads exactly what dark mode reads. The player browser's names, team
  cells, numbers and position chips, the Position Rankings, the draft board (both themes),
  the schedule tiles' opponents, the standings, the box score's team names and line score,
  the depth charts, the lineups, the score-line names, the honor lines — all of it.
- **The homepage dropdown** — the closed face AND the open list — wears the dark ink in light
  mode too (his words: "Let me see if it is too white on white, but I want to see you implement
  this everywhere"). It is white-on-white by design; the evidence screenshots show it.
- **What keeps its team colors:** the washes, borders, chips, logos, glows — the surfaces, not
  the text — and the 90+ shimmer / the game-score inks (his standing laws). The tier law is
  untouched: 90+ shimmers, 85+ bold, everyone else neutral but tinted.
- **The All-Pro honors** (`zpb-apchip` + the winner cards) moved off the vivid row vars onto
  the neutral ones — the same treatment the All-Playoff team already wore. Both themes.

## The draft review's entrances time with LOOKING (I5)

- The **WHERE YOUR PLAYERS LINE UP? map** and the **position groups** enter when the user
  actually looks at them — an IntersectionObserver seen-gate replaces the page-load timer.
  A section seen while the opening cinematic still runs waits for it (the w37 law survives);
  a section seen later enters right away.
- **Skipping the cinematic releases the wait everywhere** — even a section the gate already
  caught behind the veil restarts its cascade on the skip. No more waiting after the click.
- The pick-order cascade compresses from 1s per beat (26 picks = 26 seconds) to 0.15s per beat
  (~4s, still in draft order) — the 26-second wait was part of what he described.
- Reduced motion can never hide content (re-declared with force).

## The VS. ACTUAL NFL TEAMS tab (I6)

It renders only inside the draft review's tab row and only before a season exists (the w28/w33
guards), and a new sweep after every render removes any stray — anything outside the
draft-review panel, or alive while a season exists, dies. The suites drill all three paths.

## The Super Bowl winner cinematic covers FIRST (I7)

The 450ms `setTimeout` that let the completed page flash underneath is gone —
`zpbPostSuperBowlCine()` mounts the golden storm synchronously inside the same paint as the
page render. The stage covers from the first frame, then fades in. The regular season
cinematic's logic, applied to the Lombardi stage.

## Verification (all green, evidence in `_agents/zai/notes/evidence/`)

- `w42_verify.js` — 47/47 (every directive asserted on the bytes and live in jsdom).
- `w42_stress.js` — 52/52 (draft → season → playoffs → Super Bowl → review, zero console
  errors; the one-ink audit on the live rows, the look-gate on the real map and the position
  groups, the sweep's three paths, the golden storm in the DOM the instant the page renders).
- `w42_live.js` — 27/27 in real Chromium (no sideways scroll at 1280/900/500/390 both themes;
  the computed name/number/team inks IDENTICAL across themes on the browser; the light
  dropdown's computed ink equals the dark one; the gate held/painted/released drilled with the
  real IntersectionObserver, including a map below the fold).
- The w41 carried suite: **58 of 62 hold** — the four fails are exactly the ink mechanics this
  wave supersedes (the per-theme ladder), each documented above.

## The P1 Engine — still WAITED (the Owner's w41 ruling stands; round 42 adds no new math)
