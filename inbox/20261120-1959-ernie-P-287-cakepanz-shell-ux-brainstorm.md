SPEAKER: ERNIE | ROLE: Kilo seat (advisor) | TASK: UX/shell brainstorm — how to make 67 Cakepanz a better shell for Claude's frozen engine (the Owner's "innovate, think around it") | DATE: 2026-11-20T19:59Z
FOR: P-287 / P-316 / P-317 / P-319 · the Architect (shell/UI owner) · the Owner (product direction)

**Framing.** The engine is frozen (pin `408410477`, 69 files) and excellent; the shell's job is to
make its output *legible and delightful* without inventing data, hiding the math the Owner wants, or
touching Claude's files. Everything below is UI-side, reads only existing engine output (the port
VMs / `adviseLineup` / `effOvr` / `fit` / `slotWins20` / `cpuChoose` / the run state), and respects
the uniform-board law (L12), the "advice only, never auto-lineup" rule, and the offline/single-file
constraint. Ordered by value-per-effort.

## A. Quick wins (a sitting each, low risk, high felt value)

**A1 — "Why this player" one-liner on the ring.** The top-3 ring already marks the board's active
order. Add one plain-language reason under each ringed row's name, computed from the SAME VM the
board reads: "best value at QB" (slotWins20 rank #1 at that slot), "fills your thinnest need" (the
needs row's thinnest slot), or "highest Wins still on the board". Turns the ring from "trust the
machine" into "see the machine's one-line case". Directly serves the Owner's "enjoy the first ten
rounds" (P-337) by making each pick legible, not by hiding the math.
- Data: slotWins20 (engine), the board VM rows, the needs row. No new engine call.
- Law to add: the reason string is a pure function of the VM (a golden-pinnable text law).

**A2 — late-round "one number" mode (P-337).** After round ~10, collapse the value columns to ONE
number ("best available by Wins") + the ring, with a "show the math" expander. Same board anatomy
(L12 intact — one column hidden by default late, revealed on demand). No engine change; a display
flag. This is the Owner's "simple decisions in the second half" made real.

**A3 — keyboard-first pick flow (j/k + Enter).** L17 already proves Tab→quick→method. Add `j`/`k`
to move the ring focus, `Enter` to one-click draft, `u` to undo — advertised in the Guide. Makes the
board a power-user surface (the "watch me draft in 20 seconds" demo the Owner will want for sharing).
Cheap; rides the existing focus machinery.

**A4 — share-card "receipt" line.** Slice 5 stamps `seed N (code b36:…) · engine …`. Add one human
line: "Drew [team] at [slot], went [record], [playoff result]" — from the run state, no new data.
Makes the brag cards actually brag.

## B. Bigger bets (real value, more work)

**B1 — the draft "film room": a 3-second replay of the CPU's on-clock run.** After each user pick,
briefly cascade the board reordering as the CPU makes its next picks (reuse the wall-slip cascade
from Complete; the engine's `cpuChoose` + the board VM give it for free). Makes the draft feel alive
between picks without inventing data.

**B2 — lineup "what if" advice panel (advice only, never auto).** The engine has `adviseLineup` /
`effOvr` / `fit`. A side-by-side "your roster vs. the best available at your thinnest slot" panel —
NOT a re-pick, NOT an auto-lineup (the Owner's rule: the engine advises, never re-lineups the user's
team). The natural bridge from draft to season.

**B3 — season "one number" playoff view.** The season shell shows a lot; a bracket view reducing
each game to "win% · one key matchup · the game ball" makes the run to the Super Bowl legible at a
glance. All from existing engine output.

## C. Structural (for the Architect's radar)

**C1 — extend the seam golden to DISPLAY, not just shape (P-319 → gated).** Today the golden (N34)
pins VM *shape*; `display.ts` owns the format (`ONE_DECIMAL_KINDS`). A tiny `fmt(engineValue)` in the
seam would let the golden pin "Wins 12.3 / OVR 92" strings, so a re-pin that changes a rounding rule
fails the golden, not the Owner's first draft. Extends P-319 from "architectural" to "gated".

**C2 — offline-first save portability (the tent-in-the-woods test).** The seed already round-trips;
an "export my save to a file / import it" (v1.1) makes play-on-device-A-continue-on-device-B real.
Low effort, high Owner-value, fully offline.

## D. One thing NOT to do
Don't add columns to the board. The uniform-board law (L12) and "same board for all picks" are
load-bearing; the value is in *legibility per row* (A1/A2), not density.

— ERNIE (Kilo seat). These are proposals, not builds; the Architect decides what enters the shell.