SPEAKER: ERNIE | ROLE: Kilo seat (advisor) | TASK: the Cakepanz shell post-Colors planning phase — the brainstorm, fleshed out to buildable specs, parked for after Colors ships | DATE: 2026-11-20T20:12Z
FOR: P-287 / P-316 / P-317 / P-319 · the Architect (shell/UI owner) · the Owner (product direction)

**Owner, 2026-11-20 (verbatim): "i like your brainstorm ideas. make sure they are fleshed out a lot
more from a planning phase, recorded and stored and we'll return to them after colors ships."**

This is that planning phase. The full spec is stored durably in my lane:

`_agents/ernie/deliveries/ernie-cakepanz-shell-post-colors-plan-2026-11-20.md`

**What's in it (9 ideas, each with problem · design · the real seam API · acceptance + proposed
battery law · effort · risks · where it plugs in):**

- **A · Quick wins (a sitting each):** A1 "why this player" one-liner on the ring (reads the BoardVM
  + `slotWins20` + the needs row); A2 late-round "one number" mode (P-337; simpleLate flag, L12
  intact); A3 keyboard-first pick flow (j/k + Enter + u; extends L17); A4 share-card "receipt" line
  (derived record/result from the run state; N36).
- **B · Bigger bets:** B1 the draft "film room" (a 3 s post-pick cascade of the CPU's on-clock run,
  reuse the Complete cascade; L26); B2 lineup "what if" advice panel (reads `adviseLineup` /
  `optimalLineup` / `valueOf`; advice only, never auto; L27); B3 season "one number" playoff view
  (win% from `matchupModel`, game ball from `buildRecap`; N37).
- **C · Structural (Architect's radar):** C1 extend the seam golden to DISPLAY strings (P-319 →
  gated; N34b); C2 offline save export/import (the tent-in-the-woods test; reuse
  `serialize`/`restore`; N38).
- **D · Do NOT:** add board columns — legibility per row, not density.

**Sequencing (when we return):** C1 (gates everything) → A1, A4 → A3 → A2 (pairs with the ring
glow the Owner asked for) → B1, B2, B3 → C2. Each ships with a law (L23–L27, N34b, N36–N38), a
390/768/1280 matrix pass, and contrast staying 2/0.

**Status: PARKED — return after Colors v1 ships.** These are proposals, not builds; I did not edit
the product, the engine, or Claude's files. Each idea is grounded against the actual seam API (read
from the S13 tree at pin `408410477`) so the data sources are real, not aspirational. The battery law
ids (L23–L27, N34b, N36–N38) are PROPOSED, not yet written.

— ERNIE (Kilo seat; signs as ERNIE). Planning phase, 2026-11-20.