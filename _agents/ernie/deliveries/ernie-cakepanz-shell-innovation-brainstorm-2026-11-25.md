# ERNIE — brainstorm: improving the 67 Cakepanz shell over Claude's frozen engine

**SPEAKER: ERNIE | ROLE: advisor | TASK: innovate on the cakepanz UI/UX shell for Claude's engine | DATE: 2026-11-25**

Scope: shell-only, engine-safe (no `src/engine/**` bytes, no new math in the UI — every number is a
VM the engine already produces). I read the actual seam (`port/contract.ts`, `port/seam.ts`,
`port/router.ts`, `bindings/tokensApply.ts`) and the screens/components in the hosted continuation.
Z.ai's `inbox/20261123-zai-innovation-backlog-ranked.md` already owns **trust, why-copy, share,
motion, a11y** — I do NOT repeat those; I add the layer *above* it and the angles its backlog is thin on:
**(A) seam robustness for re-pins, (B) the season as a narrative, (C) the board as a decision surface,
(D) delight/team-takeover, (E) a learning mode.** Ranked by (Owner value ÷ risk).

## A. Seam robustness — specific to consuming a frozen engine that WILL re-pin
The shell's whole safety story is the one-door seam (M1–M5) + SNAPSHOT.md. Two gaps remain that the
compiler cannot catch, and both bite exactly when Claude re-pins (`d3bd81d2` → next):

**A1. A boot-time pin canary (status rail).** *Anchor:* new `src/lib/components/StatusRail.svelte`
(Z.ai #1's component), reading `src/engine-node/.stamp.json` via the seam. At boot the shell asserts
`stamp.snapshotTreeSha256` == the pin in SNAPSHOT.md and shows `engine <pin> · shell <token> · seed <code>`
truthfully (the N36 truthful-stamp law). *Why now:* the S15 stale-seal failure was a truth-lie at changed
bytes; a re-pin is the same class one layer up. *Risk:* ~0 (read-only). *New law:* one — the rail never
prints green unless the stamp matches. **Builds on Z.ai #1; adds the re-pin assertion it lacks.**

**A2. A golden VM-shape snapshot (drift alarm).** *Anchor:* `test/engine/nfl/` + `scripts/`. The seam
re-exports the engine's own VM types, so a re-pin that *renames* a structurally-compatible field compiles
fine but silently breaks a screen. Add a generated `port/contract.golden.json` (the JSON shape of
`boardVM`, `seasonVM`, `weekVM` at the current pin) and a battery that fails if a re-pin changes it.
*Risk:* low (test-only). *New law:* one. This is the M3 "swap test" promoted from *build* to *shape*.

## B. The season as a narrative (the thinnest part of the current shell)
The engine produces a real `GameLog`/`Recap`/turnover ledger/`gradeOf` game-ball (season.ts, recap.ts),
but the season screens (Hub, WeekView, Feed, Standings, Bracket) are still mostly tables. The Owner's
recap rules (every turnover named, chronological scoring, game ball, "2-Pt Conv") are engine outputs
waiting for a surface.

**B1. A "season spine" — one horizontal timeline of your 17+ weeks.** *Anchor:* new
`src/lib/screens/Season*.svelte` or a `Hub` panel, fed by `seasonVM`/`weekVM`. Each week a node
(W/L, opponent, score); tap expands the engine's recap (turnovers, scorers, game ball). *Risk:* low
(all VM). *New laws:* 2 (the spine renders every played week; the expanded recap names every turnover).

**B2. The turnover ledger + game ball as first-class.** *Anchor:* `WeekView.svelte` fed by
`buildRecap`/`gradeOf`. A "this game" card: the star line, the game ball, the turnover count by side.
*Risk:* low. *Builds on the Owner's recap doctrine; no Z.ai-backlog overlap.*

**B3. Bracket that explains the seed.** *Anchor:* `Bracket.svelte` + `seedPlayoffs`/`Seeding`. Show the
tiebreak basis the engine used, so a bubble team sees *why* it is in/out. *Risk:* low (VM).

## C. The board as a decision surface (extends Z.ai #2/#5, does not repeat them)
Z.ai #2/#5 make the *why* first-class. The next layer is turning the flat board into a heat surface —
still 100% engine numbers (`spotsOf`, `goneOdds`, `valueOf`, `fit`).

**C1. A live "needs × gone-risk" heat strip.** *Anchor:* `NeedsRow.svelte` (already open-slot aware) +
`BoardRow.svelte`. Color each of the 11 open slots by (need severity × `goneChance`), all engine-sourced.
*Risk:* low. *New law:* the heat is a pure function of VM numbers (no UI math).

**C2. Pick-confidence = margin in WINS, not OVR.** *Anchor:* `LineupAdvice.svelte` / `suggestWhy.ts`.
The engine's value IS `slotWins20` (`valueOf`/`slotWins`); show "Δ 0.7 wins vs next-best + flex −2" so the
confidence is in the engine's own unit. *Risk:* low. *Caveat:* the display-rounded-oracle rule stays —
no raw oracle against a rounded component until the engine lands rawSort (the §5 door).

## D. Delight & team-takeover (the Owner's V23 north star, under-served in the backlog)
The tokens/team-remap machinery exists (`bindings/tokensApply.ts`, `teamRemap`); the *feel* is thin.

**D1. A 400ms accent cross-fade on team selection.** *Anchor:* `tokensApply.ts` + `tokens-w89.css`. When a
team is chosen the near-white team tint (every tab except Season) and the three-hex player framing ease in
over ~400ms; `prefers-reduced-motion` → instant. *Risk:* low. *New law:* reduced-motion parity (visual battery).

**D2. Foil shimmer, scoped exactly as the Owner said.** *Anchor:* a single `.foil` token class in
`tokens-w89.css`, applied to the just-picked player's OVR, awards, and 85+ OVRs only. Reduced-motion →
static gold. *Risk:* low. *Builds on Z.ai #6 (motion tokens); adds the Owner's "shimmer for anything
exciting" scoping the backlog names but does not place.*

## E. A learning mode — "coach's tape" (the real innovation)
The engine already computes `optimalLineup`/`adviseLineup`/`placementOf`. A **post-draft, dev-gated**
replay: step through the user's picks and, for each, show what the engine's value model advised vs what
the user did — a learning surface that makes the engine legible without new math and without scouting.
*Anchor:* `Review.svelte` (exists) + `adviseLineup`. *Risk:* low (read-only, dev-gated, never in the
production bundle — the M1/N14 dist-grep laws stay green). *Owner-value:* high (teaches the doctrine).

## What I am NOT proposing (and why)
No engine bytes, no faces, no scouting, no full-GM, no seed in the brag, no auto-download, no image card
— the Owner's standing anti-goals. No new number is computed in the UI; every item reads a VM the engine
already emits. Nothing here weakens a law; each item ships **with** new laws beside the old (the
falsifier suite grows with the surface, or the surface does not ship).

## Build order if the Owner rules any in
A1 → D1 → B1 → C1 → A2 → D2 → B2 → C2 → B3 → E. (Trust first: an honest pin canary makes every later
surface credible; the season spine is the biggest felt jump; the seam golden and coach's tape are the
two that make the engine *legible* over time.)

## Honest status
This is a proposal — nothing here is built. It is shell-only and engine-safe by construction. It does not
discharge the owed fresh independent Verifier on the S17 package, and it does not touch the cutover
decisions (M-0, ratings ruling, `GH`/`gh`), which remain the Owner's.