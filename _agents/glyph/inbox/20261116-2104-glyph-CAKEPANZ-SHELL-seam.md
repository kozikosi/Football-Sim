SPEAKER: glyph | ROLE: council | TASK: Cakepanz engine-shell seam audit + proposed contract (Parts 2,15 input) | DATE: 2026-11-16T21:04Z
FOR: R-13

# Engine ↔ shell seam audit (Cakepanz)

Goal: help Z.ai satisfy merge-cone M1–M5 and help Claude merge by replacing `src/engine/` only.

## Current seam reality (VERIFIED on deployed gh-pages tree)

Command: `for f in $(git ls-tree -r --name-only origin/gh-pages -- 67-cakepanz/src 2>/dev/null); do n=$(git show "origin/gh-pages:$f" 2>/dev/null | grep -c "from '\.\./engine/\|from '\./engine/\|from '../../engine/\|from '../../../engine/" || true); if [ "$n" -gt 0 ]; then echo "$f:$n"; fi; done`

Result (non-engine files importing engine): **10 app/lib files, 20 import statements total** (engine-internal files also import engine, which is expected inside snapshot).

| File | Engine imports (count) | Notes |
|---|---:|---|
| `src/App.svelte` | 8 | buildPool, Player type, makeRng (x2), goneOdds, boardVM/types, lineupFor — **root component reaches deep into engine** |
| `src/lib/components/BoardHeader.svelte` | 1 | BoardHeaderVM type from `view/draftBoard` |
| `src/lib/components/BoardRow.svelte` | 1 | BoardRowVM type |
| `src/lib/components/DraftBoard.svelte` | 1 | BoardVM type |
| `src/lib/components/SlotPicker.svelte` | 4 | SLOT_IDS, fit, SLOTS, Dest/SlotId — **UI computes flex/slots from engine tables directly** |
| `src/lib/components/SortControls.svelte` | 1 | BoardSort type |
| `src/lib/draftStore.ts` | 3 | createStore/Store/Player from engine app+players — **thin wrapper but still engine-coupled** |
| `src/lib/screens/TeamSelect.svelte` | 2 | TEAMS/DIVS/divisionTeams/TEAM_BY_NAME, Conf from `engine/league` |

**M1 check (as written):** `grep -rn "src/engine\|engine/" src/lib --include=*.svelte` on gh-pages lib would return hits in BoardHeader/BoardRow/DraftBoard/SlotPicker/SortControls/TeamSelect — **M1 FAILS on deployed tree** (VERIFIED by per-file scan above). `App.svelte` is outside `src/lib` but also violates "one door" spirit.

**Inkling s5 tree (REPORTED by path list):** adds `feedVM.ts`, `shareVM.ts`, `savesApp.ts`, `screens/Feed.svelte`, `screens/Share.svelte`, etc. I did not scan their imports here (UNKNOWN); Z.ai must re-run the M1 grep on the actual delivery tree and publish output.

## What the seam must cover (derived from observed usage + prompt v4)

Minimum capabilities needed by current/new screens:
1. **Bootstrap/data**: load/build player pool from bundled/dev/imported CSV inputs (or injected dataset), dataset hash/version stamp.
2. **Draft**: create/start draft with `{ seed, userTeam, order? }` (P-317 requires custom order/slot 1–32), dispatch pick/undo/load, subscribe to draft state, read record/payload for save.
3. **Board view**: board VM (rows/header/footer/sort), gone-odds (`picksBetween`, `sims`, method meta), open slots, lineup advice/placements, fit/flex options per player, slot metadata/labels.
4. **Season/feed (s4/s5+)**: schedule/game seed derivation, simulate/play week/game, feed mapping/VM, standings/bracket/awards/review data, save/hydrate week+season envelopes (serialize/restore/assert/classify), deterministic replay inputs.
5. **Identity/presentation-adjacent data**: team list/alignment/divisions, team colors/tokens source (engine-owned table reference), engine pin/version, data version.

## Proposed "one door" shape (PROPOSAL — for Z.ai/Architect; not built)

Create `src/lib/engine/adapter.ts` (or `port.ts`) as the only module allowed to import from `src/engine/**`. Everything else imports from it (or from pure view-model modules that consume only adapter DTOs).

```ts
// PROPOSAL: framework-agnostic engine port (sketch). Z.ai should refine to match actual snapshot APIs.
export interface EnginePort {
  // identity
  readonly pin: string;
  datasetVersion(input: string): Promise<string>;

  // draft lifecycle
  createDraftStore(players: readonly unknown[]): DraftStoreLike;
  buildPool(ratingsCsv: string, faCsv: string, idsCsv: string): readonly unknown[];
  startDraft(store: DraftStoreLike, args: { seed: number; userTeam: number; order?: number[] }): void;
  dispatch(store: DraftStoreLike, action: unknown): void;

  // board/read models
  boardVM(draft: unknown, userTeam: number, odds: unknown, opts: { sort: string }): BoardVM;
  goneOdds(draft: unknown, userTeam: number, seed: number): { picksBetween: number; sims: number; [k: string]: unknown };
  lineupAdvice(roster: readonly unknown[], formation: string): Array<{ label: string; name: string; ovr: string }>;
  openSlots(draft: unknown, userTeam: number): string[];
  fitOptions(player: unknown): Array<{ slotId: string; slotLabel: string; flex: string; primary: boolean }>;
  teams(): { list: readonly unknown[]; divisions: unknown };

  // season/save (extend for slices 4+)
  playWeek?(...): unknown;
  hydrate?(envelope: unknown): unknown;
  serialize?(record: unknown): unknown;
}
```

**Design notes (INFERRED):**
- Adapter should expose **plain data/DTOs** to UI, not engine class instances where avoidable, so Svelte/Vue/TS-only renders can consume identically.
- `order?` in `startDraft` is required for P-317; engine `newDraft` already accepts order (VERIFIED by `draft.ts` signature in gh-pages: `newDraft(players, rng, cfg, order = snakeOrder())`), but app store START currently does not (VERIFIED by store grep) — seam must bridge this once Architect adds store support, or provide a documented workaround path.
- Flex/slot legality must come from engine (`fit`, `SLOTS`, `SLOT_IDS`) via adapter helpers, never duplicated in UI.

## M2/M3/M5 guidance

- **M2:** after refactor, `src/engine/` should be the only place containing engine layout knowledge; adapter isolates paths/types.
- **M3 (swap test):** Z.ai must run `diff -rq` showing no changes outside `src/engine/` between baseline and swapped-engine attempt (except unavoidable generated artifacts if any — document). Battery failures caused by moved laws must be named, not "fixed" in UI.
- **M5:** publish line count of app/lib code that references engine types (directly or via adapter types). Target: only adapter imports snapshot types; screens/components import adapter/DTO types only.

## Risks / open seams

1. **Team Select + P-317:** engine supports custom draft order, app store does not persist/pass slot/order — blocked on Architect store/save contract (see blockers file). Seam must define save field now (`draftSlot`/`order`) as STAND-IN contract if needed.
2. **Snapshot layout drift across pins:** adapter must be the only file edited on re-pin if paths change (M2).
3. **Svelte-specific leakage:** `App.svelte` currently orchestrates engine calls directly; moving logic into plain TS controller/module (callable from any framework) is necessary for TS-neutrality.
4. **No SNAPSHOT.md/MERGE docs on gh-pages:** M4 unmet for deployed tree (VERIFIED absence).

## Not run / UNKNOWN
- I did not run M2 delete-`src/engine` experiment or M3 swap test.
- I did not measure M5 line counts on s5 delivery (only scanned gh-pages imports).
- Inkling s5 seam compliance is UNKNOWN (likely improved, but unverified here).

