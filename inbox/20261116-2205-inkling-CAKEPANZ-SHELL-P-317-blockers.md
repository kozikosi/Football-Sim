SPEAKER: inkling | ROLE: council | TASK: CAKEPANZ assist, Part 4 — blocked pieces (P-317) | DATE: 2026-11-16T22:05Z
FOR: P-317

# Cakepanz — Team Select draft-position slot: what exists, what's missing, what to build now (Part 4)

**Unblocks:** the P-317 slice exactly as the Owner ruled it (team AND draft slot 1–32, same screen, same look) without anyone guessing at engine internals. Facts below are read from the two source trees at the named commits; anything beyond that is labeled.

## What the engine already does (VERIFIED at `d3bd81d2`)

```ts
// colors/src/sports/nfl/engine/draft.ts
export function newDraft(players: readonly Player[], rng: Rng, cfg: DraftConfig = DEFAULT_CONFIG, order: number[] = snakeOrder()): DraftState
export function snakeOrder(teams = TEAMS_N, rounds: ROUNDS): number[]   // round 1: 0..31, round 2: 31..0, …
st.order[st.pos] === team                                     // the team drafting at that pick
```

**`newDraft` takes a custom `order`** — the engine supports a non-default draft order TODAY, no engine change required for the consumption side. VERIFIED (`git show d3bd81d2:colors/src/sports/nfl/engine/draft.ts`, lines 44, 52).

**The save cannot round-trip a custom order today (VERIFIED, same commit):**

```ts
// colors/src/sports/nfl/app/saves.ts
export interface DraftPayload { seed: number; userTeam: number; picks: DraftPick[]; pool: FrozenPoolRow[] }
// no order field, no slot field — order is DERIVED on restore (default snakeOrder())
```

Restore path: `app/store.ts:66` → `newDraft(thawPool(rec.pool), makeRng(rec.seed).fork('draft'))` — **called with no `order` argument, always the default snake**. So even a hand-made `order: [...]` dies on reload. VERIFIED (lines 60–70 of store.ts at d3bd81d2).

The envelope layer itself is ready for the field: `schemaVersion: 1` saves with an optional trailing key parse fine (the validator checks known keys, ignores unknown ones — VERIFIED by reading `saves.ts` validation: `isInt(k.overall)…` field-shape checks, not closed-key strict). INFERRED from reading; not executed.

## The Architect's piece (precisely)

1. **`createStore(players, opts?: { order?: number[] })`** — thread `opts?.order` into `newDraft` (default `snakeOrder()`; byte-identical behaviour when absent — no other behaviour change).
2. **`DraftPayload` gains optional `order?: number[]`** (store the RESOLVED 352-pick array, not the slot). Optional, no `schemaVersion` bump, absent = legacy snake (all old saves restore identically). Storing the resolved array (not slot 1–32) is the robust choice: future changes to how the custom order is built can't silently remap old saves. (Alternative: `userDraftSlot?: number` + deterministic rebuild — smaller field, but couples restores to the slot→order derivation forever. Recommend the resolved array.)
3. **`restoreDraft`/resume path rebuilds with the stored order** (`store.ts` line 66 site).
4. Nothing else: no protected constants, no flex, no display math, no RNG fork change.

Estimated change surface: 3 files, <40 lines, every change optional-field/additive. This is the whole blocker; the Architect builds this alone, when he chooses.

## What Z.ai builds NOW (without touching 1–4)

1. **The slot picker UI on Team Select** — same screen, same look as the team picker (32 slots, 1–32, snake-mirrors shown as pick positions per round). State only; draft not started.
2. **A plain-TS order builder in the seam** (`src/lib/draftOrder.ts`, no engine import): `makeDraftOrder(userTeamIndex: number, slot: number): number[]` — round 1..N snake with the user's team AT the chosen slot (odd rounds forward at slot, even rounds mirrored at 33−slot), other 31 teams filling remaining positions in league order, recursing per round. Pure function; node-testable; total coverage over slot ∈ 1..32 asserted. This is UI-side logic, allowed by v4-1 ("build the picker against the engine's order parameter") as long as it does NOT live in the engine snapshot — it's the shell's order proposal.
3. **The save side, honestly:** the current `DraftPayload` has nowhere for the choice — so until the Architect lands #1–#3, the shell must hold the user's chosen slot in a **shell-side record** (e.g. a tiny JSON blob `localStorage['cakepanz:draftSlot'] = { slot, userTeam, seed, order }`) keyed alongside the draft envelope; on restore, if the record exists and matches (seed+userTeam+picks log consistency), the shell re-applies the slot context for DISPLAY (so the UI shows "your slot: 12" after reload) while the ENGINE still restores as default-snake. **Label this UI-ONLY, RELAY it as such in the delivery note, and flag the bridge.** Do NOT smuggle `order` into the frozen pool tuples or meta keys to sneak past the payload validator — that's a silent schema change and exactly what v4-1 forbids.
4. **The typed contract the Architect sees** — the seam entry `startDraft({ seed, userTeam, order? })` already proposed in my Part 2 filing §3; his store work satisfies it unchanged.

## Acceptance for the slice (proposed, not ruling)

- [ ] Team Select shows team grid AND 1–32 slot picker on one screen; START disabled until both chosen (team is required today; slot defaults to the team's natural league slot — INFERRED sensible default).
- [ ] The chosen slot survives reload (shell-side record) and is VISIBLE in the saves panel line.
- [ ] Node probe asserts `makeDraftOrder(t, s)[k*32 + s']` for all s 1–32 (slot/mirror bookkeeping).
- [ ] After the Architect's store lands: one integration pass — the flow must work end-to-end with NO shell change beyond deleting the shell-side bridge (or replacing it with the payload field). **If the integration requires touching the screens beyond that, the seam failed and the Architect hears about it in §5.**
- [ ] The slice ships with the fork labelled honestly: "draft position custom" is UI-preview until the store lands; the battery asserts NOTHING about real engine behaviour for custom orders (it can't, yet) and says so.

## Other blocked/dependent pieces (named, with the way around)

5. **The saves panel "draft position" line** — depends on the Architect's payload field; UI shows it the day it lands; until then show the shell-side record's value labelled "UI-side".
6. **THE RE-PIN** — the s5 delivery is pinned `4ca9a071`; live is `d3bd81d2` (Part 10 filing). Anything Z.ai builds on the stale pin lands on dead APIs the moment the Architect re-vendors. Build against a re-pinned tree or a vendored d3bd81d2 copy, and say which in every slice note.
7. **Slice 3-5 chrome gaps** — the gone-odds tooltip/my-needs/saves panel are BUILT (slice 3) — not blocked; the season hub/week views/standings/awards/review/guide (v4-1 Step 2) have **no engine blockers** (startSeason/playWeek/table exist and are exercised by the node fixtures today — INFERRED from `seasonfixture.mjs` passing at both pins); they are blocked on slice order + palette ruling + the w89 visual law emulation, i.e. Owner/builder decisions, not the Architect. The ONE possible engine-blocked surface is the **season book's replay-of-playoff-games CTA** (needs a deterministic replay entry point — `gameSeed` exists and is used by the feed/seed-card proof; a "replay this game" shell button calling the engine with `(seed, week, home)` is expressible in the snapshot TODAY — INFERRED from the seed-card replay working at 86f22d10). Name it, don't guess it.
8. **The shareables for later stages** (season/bracket/awards bragg) — unblocked; extend slice 5.
9. **390 px + file://** — not engine-blocked; the builder's to land (see Part 8/Part 12 filings) — no Architect needed.
10. **The palette ruling** (light gold2 AA cell, dark `--text`, Cinzel, `.ub`, pale-rose) — BLOCKED on the Owner; nothing in P-317 can be accepted against the current shell look until this lands or the Owner amends the ruling. The v4 ground truth is unambiguous; the shipped slices predate it.

## How to verify the engine facts

```
git show d3bd81d2:colors/src/sports/nfl/engine/draft.ts | sed -n '44,52p'
git show d3bd81d2:colors/src/sports/nfl/app/saves.ts    | sed -n '24,32p'
git show d3bd81d2:colors/src/sports/nfl/app/store.ts    | sed -n '60,70p'
```
