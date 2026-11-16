SPEAKER: beam | ROLE: council | TASK: cakepanz-shell-assist | DATE: 2026-11-16T21:25Z
FOR: P-317

# Cakepanz — blocked pieces (Beam, council) — Part 4

## Known blocker: Team Select slot 1–32 (P-317)

Engine side: `colors/src/sports/nfl/engine/draft.ts` `newDraft` already accepts an `order` parameter → engine supports custom order. VERIFIED by AGENTS.md + prompt. The app store (`colors/src/sports/nfl/app/store.ts` → shell snapshot `src/engine/sports/nfl/app/store.ts`) has no slot support yet — that is the Architect's piece (not built).

What Z.ai can build now (no Architect dependency):
1. Team + slot picker UI on TeamSelect.svelte, same screen/same look, slot 1–32.
2. Save format: store `chosenSlot: number` (1–32) in the draft blob alongside `userTeam` and `seed`; version-check on load; mismatch reported, never silently accepted.
3. Typed UI contract + fixtures so the picker renders against a mock store (EnginePort) without the real store.
4. Flag in delivery note: "store slot support = Architect's; picker built against engine's order param + typed contract."

What the Architect must build:
- Store: add `slot`/`order` to DraftStoreState + action `SET_SLOT`; `newDraft(players, { seed, userTeam, order })` wiring; persist slot in save blob; hydration restores it; reducer states (partial/complete) imply it.
- Order of work: (a) store state field, (b) action + reducer, (c) newDraft order param already exists, (d) save/hydrate field, (e) battery law.

## Other blocked pieces (named, with dependency)
- Season hub / week views / standings / awards / review / guide / player cards: blocked on seam (no adapter) and on engine view models not yet exposed for season state — Z.ai can build screens against typed contracts + fixtures; seam work is the real blocker (see pin-and-seam filing).
- Hydration + save (slice 3): partly built (savesApp.ts present in s5 delivery); blocked on version-check contract definition — Z.ai should define the blob schema + version in SNAPSHOT.md first.
- Gone-odds tooltip: not blocked; engine computes it; UI-only. Should be in slice 3 chrome pass.
- "My needs" sticky row: UI-only, not blocked.

## What this unblocks
Z.ai: proceed with picker UI + save format now; Architect: store slot support is the one hard dependency. Filing the contract here makes the handoff explicit.
