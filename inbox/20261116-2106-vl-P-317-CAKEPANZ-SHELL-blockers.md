SPEAKER: vl | ROLE: council | TASK: CAKEPANZ-SHELL Part 4 — blocked pieces: Team Select slot picker (P-317) and other blockers | DATE: 2026-11-16T21:06:00Z
FOR: P-317

BLOCKER 1 — Team Select must let the user pick team AND draft position (slot 1-32), same screen, same look. CONFIRMED BLOCKED AS BUILT (VERIFIED by reading src/lib/screens/TeamSelect.svelte):
- The screen picks a team only (32 team buttons, AFC/NFC, divisions, rivals). startDraft(teamIndex) — App.svelte:75-84 — takes no slot; no slot UI exists.
- The store's START action has no slot parameter; SaveRecord has no slot field. A restore that replays a chosen order would throw 'pick is out of order' (save must store the slot).
- Engine side is READY: engine newDraft already accepts an `order` parameter (colors/src/sports/nfl/engine/draft.ts). So the engine is NOT the blocker; the store's slot support is.

SPLIT OF WORK:
- Z.ai builds now (shell): the slot picker on Team Select (same screen, same look), slot 1-32 plus team; pass the chosen slot through startDraft/START; define the save format for the chosen slot (the save must store it — add `slot` to the draft payload/envelope meta); build against the engine's order parameter with a typed UI contract + fixtures; flag the store dependency explicitly; do NOT guess engine internals.
- The Architect builds (engine/app): store slot support — accept slot in START, build the custom order (user's team at the chosen slot, the other 31 filling the rest in snake order), pass it to newDraft, and include the slot in SaveRecord so a restore replays the same order. Deliverable: the interface, the save field, and the order of work. File as a §5 patch proposal (file + old→new + how to check) — this seat does not apply it.
Slice 2 is not accepted until the selector works end-to-end (Owner ruling 2026-11-09, P-317).

BLOCKER 2 — Re-pin 4ca9a071 → d3bd81d2. The shell snapshot is at 4ca9a071; the current engine pin is d3bd81d2 (6 modified + 5 added engine files between them — see Part 10 filing). Re-pinning is Z.ai's build work (re-vendor colors/src byte-identical, no edits; update README + ENGINE_PIN stamp). It is a prerequisite for mergeability, not blocked on anyone.

BLOCKER 3 — Season surfaces: season hub, multi-week week views, standings, playoff bracket (Wild Card → Divisional → Conference → Super Bowl), Super Bowl screen, awards (regular season + playoff), season review, guide, settings form, player cards screen. NOT BLOCKED ON THE ENGINE: the seasonfixture.mjs fixture shows how the app's season slice will store and play a season (startSeason → playWeek → finished SeasonEnvelope). Blocked only on build capacity.

OTHER NEEDS (not blockers, flagged): light mode (pale-rose --bg:#fdf2f6; dark exists only); newer-build/refusal screen; offline/file:// single-file build (strip-crossorigin + singlefile postbuild); reduced-motion audit per surface; settings UI for persistence verification.

Labels: blocker confirmation VERIFIED (source file read). Work split — proposal (advice to Z.ai and the Architect; neither author's bytes touched by this seat).
