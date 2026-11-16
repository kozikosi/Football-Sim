SPEAKER: muse | ROLE: council | TASK: cakepanz shell assist part 15 — framework-neutral implementation assets | DATE: 20261116-2103
FOR: R-13

LABELED DRAFT: This is MUSE's draft answer to the council prompt v4, written at the Owner's explicit request. It is NOT a formal council filing and NOT independent verification. The review chain (three different seats → REVIEWED) cannot be satisfied by MUSE alone — two other seats must still confirm.

# Part 15 — Framework-neutral implementation assets (drop-in) (FOR: R-13)

**What this file is:** plain TypeScript the builders can drop in — no framework imports, no Svelte, no Vue, no DOM. **What it is not:** edits to any tree. These are PROPOSALS in a filing; the Architect or Z.ai applies them, I do not. **How to verify each asset:** every asset states what it unblocks, the exact artifact (file path + owner), and how to verify/apply it. Every snippet is dependency-free except where it names an engine import it already sits next to — and those imports are listed, so the seam stays visible.

**Grounding (VERIFIED this session):** `newDraft(players, rng, cfg = DEFAULT_CONFIG, order = snakeOrder())` — `src/engine/sports/nfl/engine/draft.ts:52` in the s5 delivery, and the same line at pin `d3bd81d2` (`git show d3bd81d2:colors/src/sports/nfl/engine/draft.ts`). `snakeOrder()` — `draft.ts:44-50`. `DraftState { cfg, order, pos, pool, rosters, traits, log, repl, replAt }` — `draft.ts:39-42`. `DraftPayload { seed, userTeam, picks, pool }` — `src/engine/sports/nfl/app/saves.ts:27-32`. `draftPayloadProblem` — `saves.ts`. `restoreDraft` / `toRecord` / `START` — `src/engine/sports/nfl/app/store.ts:29-33, 65-66`. `BoardHeaderVM { teamName, round, roundLabel, pickInRound, overall, totalPicks, onClock }` — `src/engine/sports/nfl/view/draftBoard.ts:26,59-60`. `TEAMS` order is the round-1 order — `src/engine/sports/nfl/engine/league.ts:7-16` (AFC East first, `TEAMS[0]` = Buffalo Bills, `TEAMS[11]` = Tennessee Titans, `TEAMS[19]` = Washington Commanders).

**Claim labels:** Asset A1's logic is VERIFIED — I ran it in Node (`node /tmp/order-check.mjs`, receipt below). Everything else is INFERRED from the sources above (reasoned, not run against the store) unless marked otherwise.

---

## Asset A1 — `orderForSlot(slot, userTeam)`: the P-317 derivation

**Unblocks:** P-317 (Team Select slot pick) — the Architect's store change (Part 4, B1) and Z.ai's picker preview. Without this function the slot has no meaning; with it, the slot is a pure function of two integers.

**Exact artifact:** new function in the ENGINE, `src/engine/sports/nfl/engine/draft.ts`, directly after `snakeOrder()` (Architect-owned; ships at the next re-pin). Z.ai's preview copy, if he builds one before the re-pin, lives at `src/lib/slotOrder.ts` (shell-side, labelled provisional, deleted at re-pin) — same code, same tests.

**The rule (one sentence):** start from `snakeOrder()`; in each round's 32-block, swap the user's team with the team sitting at the user's target position for that round (target index `slot - 1` on even rounds, `32 - slot` on odd rounds, 0-based rounds). The user therefore picks `slot`-th in round 1, `(33 - slot)`-th in round 2, `slot`-th in round 3, and so on; every other team's relative order is untouched; the user trades draft positions with exactly one team. `slot = userTeam + 1` is the identity (the user already sits there under default snake).

```ts
// draft.ts — after snakeOrder(). Pure; no RNG, no state.
export function orderForSlot(slot: number, userTeam: number, teams = TEAMS_N, rounds = ROUNDS): number[] {
  if (!Number.isInteger(slot) || slot < 1 || slot > teams) throw new Error('slot must be 1..' + teams);
  if (!Number.isInteger(userTeam) || userTeam < 0 || userTeam >= teams) throw new Error('bad userTeam');
  const order = snakeOrder(teams, rounds);
  for (let r = 0; r < rounds; r++) {
    const target = r % 2 === 0 ? slot - 1 : teams - slot; // 0-based index inside the round
    const base = r * teams;
    const userAt = base + order.indexOf(userTeam, base); // indexOf from base; block is a permutation
    const tAt = base + target;
    const tmp = order[userAt]; order[userAt] = order[tAt]; order[tAt] = tmp;
  }
  return order;
}
```

**Verify/apply:** (1) drop in; (2) run the checks below (plain Node, no deps — I ran exactly this logic as `/tmp/order-check.mjs`):

```js
// checks: for slots 1, 12, 32 × several teams, and slot == userTeam+1 for all 32 teams:
//  - order.length === 1024
//  - every round-block is a permutation of 0..31
//  - the user sits at the target index in every round
//  - slot == userTeam+1 returns snakeOrder() unchanged
//  - spot check: orderForSlot(12, 19) round 1 = 0,1,2,3,4,5,6,7,8,9,10,19,12,...,18,11,20,...
//    (Washington trades with Tennessee, the default holder of slot 12)
```

**Receipt (VERIFIED):** `node /tmp/order-check.mjs` → `ALL ORDER CHECKS PASS; round1 for slot=12, team=19: 0,1,2,3,4,5,6,7,8,9,10,19,12,13,14,15,16,17,18,11,20,21,22,23,24,25,26,27,28,29,30,31`. (One correction during the run, recorded honestly: my first assertion script checked `o[0] === 11` where the swap puts 11 at `o[19]`; the derivation was right, the assertion was wrong, and I fixed the assertion, not the code.)

**Also:** the inverse the UI needs — `slotOfOrder(order, userTeam)`: `order.indexOf(userTeam) + 1` (round 1). And the preview line for the detail panel: `pickPositions(slot)` → `[slot, 33 - slot, slot, 33 - slot, …]` for the first N rounds, plus the trade partner's name `TEAMS[slot - 1].name`.

---

## Asset A2 — `orderProblem(order, userTeam, slot)`: the save validator

**Unblocks:** the Architect's payload change (Part 4, B1) — a tampered or half-written order must be refused, never silently applied. Also the battery law "out-of-order log is refused."

**Exact artifact:** new function in the ENGINE, `src/engine/sports/nfl/app/saves.ts`, called from `draftPayloadProblem()` (Architect-owned). No new file.

```ts
// saves.ts — pure validation; returns the first problem, or null.
// Call it from draftPayloadProblem() when p.slot / p.order are present;
// a payload with NEITHER field is legacy (slot = userTeam + 1, snake order) —
// a payload with exactly ONE of them is corrupt.
export function orderProblem(order: unknown, userTeam: number, slot: number): string | null {
  if (!Array.isArray(order) || order.length !== 1024) return 'draft: bad order length';
  if (!order.every((t) => Number.isInteger(t) && t >= 0 && t < 32)) return 'draft: bad order team';
  for (let r = 0; r < 32; r++) {
    const block = order.slice(r * 32, r * 32 + 32);
    if (new Set(block).size !== 32) return 'draft: round ' + (r + 1) + ' is not a permutation';
    const target = r % 2 === 0 ? slot - 1 : 32 - slot;
    if (block[target] !== userTeam) return 'draft: round ' + (r + 1) + ' does not put the user at slot ' + slot;
  }
  return null;
}
```

**Verify/apply:** (1) wire into `draftPayloadProblem()` — `if (!isInt(p.slot) || p.slot < 1 || p.slot > 32) return 'draft: bad slot'` plus the one-field-present check plus `orderProblem(...)`; (2) node checks: `orderForSlot(12, 19)` → `null`; a shuffled order → non-null; an order with the user moved one round → non-null naming the round; a 1023-length order → `'draft: bad order length'`. (3) The store needs no further change: `restoreDraft`'s existing check (`k.team !== st.order[st.pos]` → `save: pick N is out of order`) already enforces log-vs-order consistency once `restoreDraft` passes `rec.order` to `newDraft`.

---

## Asset A3 — `nextPickCountdown(draft, userTeam)`: the "you pick again in N" selector

**Unblocks:** Z.ai's countdown chip (Part 5, B2) — the board header's most-wanted line, computed from data the shell already holds. No new engine call, no new state.

**Exact artifact:** new pure function in the SHELL's view-model layer, `src/lib/draftSelectors.ts` (Z.ai-owned; it reads the store's `DraftState`, which `App.svelte` already holds). It deliberately reuses the header math the engine's `boardVM` already does (`pickInRound: (st.pos % 32) + 1`, `draftBoard.ts:59-60`) so the chip and the header can never disagree about which pick is next.

```ts
// draftSelectors.ts — plain TypeScript, no framework imports.
// Input is the engine's DraftState (store.getState().draft); output is plain JSON.
import type { DraftState } from '../engine/sports/nfl/engine/draft.ts';

export interface PickCountdown {
  isUserTurn: boolean;
  picksUntilUser: number; // 0 when it is the user's turn
  round: number;          // 1-based round of the user's NEXT pick
  pickInRound: number;    // 1-based position within that round
  overall: number;        // 1-based overall pick number of the user's next pick
}

export function nextPickCountdown(st: DraftState, userTeam: number): PickCountdown {
  const next = st.order.indexOf(userTeam, st.pos); // first user pick at or after pos
  if (next === -1) return { isUserTurn: false, picksUntilUser: -1, round: 32, pickInRound: 32, overall: st.order.length };
  return {
    isUserTurn: next === st.pos,
    picksUntilUser: next - st.pos,
    round: Math.floor(next / 32) + 1,
    pickInRound: (next % 32) + 1,
    overall: next + 1,
  };
}
```

**Verify/apply:** node checks against a synthetic `DraftState` built with `newDraft` + `orderForSlot`: at `pos = 0`, slot 12, userTeam 19 → `{ isUserTurn: false, picksUntilUser: 11, round: 1, pickInRound: 12, overall: 12 }`; after advancing `pos` to 11 → `isUserTurn: true, picksUntilUser: 0`. Cross-check: `pickInRound` here must equal `boardVM`'s `pickInRound` whenever the board renders — the battery can assert both from the same state. Edge: `picksUntilUser: -1` means the draft is over (no user pick remains) — the UI must render "Draft complete," never "-1 picks."

---

## Asset A4 — `saveLabel(record, userTeam)`: the "your picks vs league picks" formatter

**Unblocks:** the "20 picks" vs "0 of 32 starters" confusion (Part 5, B1). One function, used by the Saves panel and the board footer, so the two counts can never drift apart again.

**Exact artifact:** new pure function in `src/lib/savesApp.ts` (Z.ai-owned; it already imports the `SaveRecord` type) — or in `src/lib/draftSelectors.ts` next to A3. Either home is fine; pick one and say so in the delivery README.

```ts
// Pure formatting over the store's record. The record's picks are the whole
// league log (CPU + user, in order) — the panel must never show that raw count
// next to the user's own fills without saying which is which.
import type { SaveRecord } from '../engine/sports/nfl/app/store.ts';

export function saveLabel(record: SaveRecord, userTeam: number): { mine: number; league: number; text: string } {
  const league = record.picks.length;
  const mine = record.picks.filter((k) => k.team === userTeam).length;
  return { mine, league, text: `your ${mine} pick${mine === 1 ? '' : 's'} · ${league} picks made` };
}
```

**Verify/apply:** node checks: empty record → `your 0 picks · 0 picks made`; after the user's first pick (log length 20 in the s5 README's example) → `your 1 pick · 20 picks made`. The Saves panel replaces `{sum.picks} picks` with this text; the board footer keeps its own "X of 32 starters" (a different number — fills, not picks — and the two must never share a label).

---

## Asset A5 — `SportDef`: the shape that makes basketball a second instance, not a second app

**Unblocks:** the platform future (Part 5, C1) — basketball as the second sport, and design-your-own-sim later. This asset defines a *shape only*; it builds no basketball surface and changes no existing import.

**Exact artifact:** a new plain-TypeScript module, `src/lib/sportDef.ts` (Z.ai-owned), holding the interface plus the NFL instance built from the modules the shell already imports. Screens take a `SportDef` as an argument instead of importing NFL modules directly, one screen at a time, as slices land — no big-bang refactor.

```ts
// sportDef.ts — plain TypeScript, no framework imports.
// The engine already namespaces by sport (core/keys.ts sportKey, sports/nfl/...);
// the shell mirrors that namespace instead of hard-coding 'nfl' at every call site.
export interface SportDef {
  sportKey: string;            // 'nfl' — the envelope's sport field, the storage key prefix
  teams: readonly { name: string; conf: string; div: string }[];
  slots: readonly { id: string; label: string; unit: string }[];
  datasetColumns: readonly string[]; // the 8 import columns, in order
  screens: readonly string[];        // screen ids this sport ships, in nav order
}

// The NFL instance is built from the engine modules the shell already imports
// (league.ts TEAMS, slots.ts SLOTS + slotLabel) — nothing new is invented here.
// Basketball later is a second literal of this interface, not a second app.
```

**Verify/apply:** (1) write the interface + the NFL instance; (2) `npx tsc --noEmit` (or the repo's typecheck) must pass with zero new errors; (3) grep proves the point: `grep -rn "sports/nfl" src/lib/sportDef.ts` shows the NFL imports living in exactly one module, and each screen converted afterwards drops its own direct `sports/nfl` import. Conversion is one screen per slice, starting with TeamSelect (it needs only `teams`). Do NOT convert everything in one change — the point of the shape is that conversion is incremental.

---

## Asset A6 — Fixtures + probe for the slot (testable, no UI needed)

**Unblocks:** the slot battery laws (Part 4, B1) — the Architect's store patch and Z.ai's picker can both be tested before either ships, against the same fixtures.

**Exact artifact:** a node probe, `batteries/probe-slot.mjs` (new file, in the battery style of `batteries/probe-save.mjs` / `probe-slice3.mjs`), plus the fixture table below. It imports only the engine snapshot + the A1 function — no browser, no Playwright — so it runs in seconds on any machine.

```js
// probe-slot.mjs — the assertions (pseudocode with exact expected values):
//   for [slot, userTeam] of [[1,0],[12,19],[32,31],[17,5]]:
//     order = orderForSlot(slot, userTeam)
//     assert order.length === 1024
//     assert every round-block is a permutation of 0..31
//     assert order[slot-1] === userTeam            // round 1
//     assert order[32 + (32-slot)] === userTeam     // round 2
//     assert order[64 + (slot-1)] === userTeam      // round 3
//   assert JSON.stringify(orderForSlot(ut+1, ut)) === JSON.stringify(snakeOrder()) for all ut in 0..31
//   // the store-level law (runs once the Architect's patch lands):
//   //   store.dispatch({type:'START', seed, userTeam: 19, slot: 12})
//   //   assert store.getState().record.slot === 12
//   //   assert store.getState().draft.order[11] === 19
//   //   save the record, LOAD it into a fresh store, assert the same slot + order
//   //   START with slot 0 / 33 → store error, verbatim
```

**Verify/apply:** run `node batteries/probe-slot.mjs` — exit 0 with the assertions printed, non-zero naming the first failure. The A1 receipt in this file (`node /tmp/order-check.mjs` → ALL ORDER CHECKS PASS) is the same assertions run standalone; the probe is that script promoted into the battery directory with the store-level laws appended once the patch exists. Until the patch lands, the probe's store-level section is expected to fail — file it as failing-now, not as green.

---

## What I deliberately did NOT include

- **No framework-specific code.** No Svelte runes, no Vue composition API, no DOM, no `localStorage` touches. The two shell-side assets (A3, A4, A5) take plain data in and return plain JSON out — that is what makes them droppable into either framework arm at cutover, or into plain TypeScript as-is.
- **No engine math.** A1/A2 are ordering and validation, not valuation: no Wins, no Priority, no flex cost, no ratings. Nothing here touches `value.ts`, `flex.ts`, or the dataset.
- **No seam module.** Part 2 owns the consumption-layer definition; A5's `SportDef` is a shell-side shape, not a seam, and I did not pretend otherwise.
