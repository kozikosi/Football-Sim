SPEAKER: ernie | ROLE: council | TASK: 67 Cakepanz — the P-317 blocker: what the Architect must build, what Z.ai can build now (Part 4) | DATE: 2026-11-16T21:32Z
FOR: P-317

# The blocker, stated in the engine's own terms (VERIFIED, all lines from the app tree's snapshot at `4ca9a071`)

The engine **does** support a custom draft order. The store **cannot** pass one, and a custom order **cannot survive a save**:

| fact | where |
|---|---|
| `newDraft(players, rng, cfg, order = snakeOrder())` takes an order | `src/engine/sports/nfl/engine/draft.ts:52` |
| the store's `START` accepts only `{ seed, userTeam }` | `src/engine/sports/nfl/app/store.ts:30` |
| `START` builds the draft through `restoreDraft({seed, userTeam, picks: [], pool})` — **no order** | `store.ts:101` |
| `restoreDraft(rec)` calls `newDraft(..., makeRng(rec.seed).fork('draft'))` — **no order**, so it always rebuilds the snake | `store.ts:66` |
| the save payload is `{seed, userTeam, picks, pool}` — **no slot, no order field** | `src/engine/sports/nfl/app/saves.ts:27-31` |
| a restore whose log does not match the re-derived order throws | `store.ts:69` — `save: pick N is out of order` |

So the gap is not the picker (the engine already has the parameter) — it is **three lines of plumbing plus one persisted field**. Without the persisted field, a user who picks slot 17 and reloads gets `save: pick N is out of order` on the first restore.

# What the Architect must build (the store change, exact shape)

1. **`DraftPayload` gains one optional field** (`saves.ts:27`):
   `seed: number; userTeam: number; slot?: number;` — optional so every existing save still parses (the validator must accept an absent slot and mean "the default snake").
2. **`DraftStoreAction` START gains `slot?: number`** (`store.ts:30`), validated the same way `userTeam` is (`Number.isInteger`, `0..31`).
3. **One order builder, used by both paths** — the single source of truth, so a save and its restore cannot disagree:
   `orderFor(userTeam: number, slot: number): number[]` — the user's team sits at index `slot`; the other 31 teams fill the remaining positions in snake sequence. (Simplest correct construction: take `snakeOrder()`, remove `userTeam`, splice it in at `slot`.)
4. **`restoreDraft` must take the order from the record**, not re-derive it: `newDraft(pool, rng, cfg, rec.slot == null ? snakeOrder() : orderFor(rec.userTeam, rec.slot))`.
5. **`toRecord` persists it** (`store.ts:61`) so a mid-draft save round-trips.
6. **A law**: save a draft started at slot 17, restore it, assert `st.order[17] === userTeam` and that the pick log replays without throwing.

**Order of work:** 1→3→4→5 are one commit; 2 is the action surface Z.ai codes against; 6 is the acceptance test. Nothing here changes the draft *values* — only which team is on the clock when.

# What Z.ai can build now, before the store lands

- **The picker itself**: a 1–32 control on Team Select, same look, `slot` state defaulting to the "your natural slot" (team index), exactly as P-317 describes. It is pure UI state; it needs no engine call.
- **The typed UI contract + fixture**, so the picker is testable today: an `EnginePort.startDraft(seed, userTeam, slot)` signature and a fixture that returns a store-like handle whose `order[17] === userTeam`. This is the brief's own instruction ("implement against a typed UI contract + fixtures and flag the dependency explicitly").
- **The save-field display**: the saves panel already prints the envelope's meta; showing "pick 17 of 32" is a label over `slot`.
- **What Z.ai must NOT do:** dispatch `{type:'START', slot}` against today's store — the action type is `START {seed, userTeam}` and an extra property would be silently dropped by `restoreDraft`, producing a draft that *looks* like it honoured the slot (the picker says 17) while the order is the snake. That is the failure mode to guard: **the UI must not claim a slot the store did not receive.** Until the store lands, the picker's "start" button should either be disabled with "draft position lands with the next engine pin" or pass the slot through the new contract with a STAND-IN label.

# The other blocked pieces I can see (Part 4 asks for these too)

| piece | blocked on | way around it now |
|---|---|---|
| Season hub, week stepper, week view, standings/bracket, awards, season review, guide | nothing structural — the engine has `startSeason`, `playWeek`, `weekmap`, `hydrate` in the snapshot | build against `EnginePort`; no Owner ruling needed |
| The shareables (Slice 5) | a tree decision, not an engine gap — Slice 5 exists on `council/inkling` but not in the current app tree | re-merge the Slice 5 files into the app tree, or rebuild them on the seam |
| The palette / both modes | **Owner ruling** (the light gold2 AA cell, the dark `--text` fix) | do not build a palette; ship the seam + the tokens and flag it |
| The `file://` boot | the dist's `crossorigin` tags (the singlefile postbuild step) | the w89 pattern (strip-crossorigin + singlefile postbuild) — buildable now, no ruling |
| The 390 px board overflow | nothing | one `@media` rule (my §5 P1) |

**Verdict:** P-317 is a **small, well-defined engine change (one optional field + one order builder + one restore line)** and a **pure-UI change on the shell side**. It is not blocked on a design decision, and it is not blocked on the framework ruling. The only real risk is a shell that ships a picker whose slot the store ignores — which is why the persisted `slot` field is the load-bearing half, not the picker.

**Weakest point:** I read the snapshot at `4ca9a071`. **I also checked the newer pin `d3bd81d2` (the live engine per AGENTS.md): the blocker is unchanged there** — `colors/src/sports/nfl/app/store.ts:30` still reads `| { type: 'START'; seed: number; userTeam: number }`, there is no `orderFor`/`order:` in `store.ts`, and `saves.ts`'s `DraftPick` has no slot field. So items 1-5 are still to build on the current pin. (If a later commit adds them, the check is `grep -n "slot" colors/src/sports/nfl/app/saves.ts` plus `grep -n "orderFor\|order:" colors/src/sports/nfl/app/store.ts`.)