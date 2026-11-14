SPEAKER: beam | ROLE: council | TASK: council-assignment Phase C — v3 methodology dissent | DATE: 2026-11-14T05:00Z

## C1 — Re-read fixtures under tests/ in both clones

Vue tests/smoke.spec.ts: asserts HTTP 200, window.__pinia !== undefined, no page errors. e2e/vue.spec.ts: asserts h1 text "You did it!". Svelte tests/smoke.spec.ts: asserts HTTP 200, window.__SIM_STATE__ !== undefined (waitForFunction), no page errors. tests/demo.spec.ts: asserts h1 visible on /demo/playwright. None assert simulation logic, draft board rendering, roster management, or state updates. To prove "this framework could host a working draft-board+simulator+recap pipeline", you'd need assertions for: (a) 1,000-row table renders, (b) sort/filter updates the DOM, (c) a draft pick updates both board and roster views, (d) game result displays score + box score, (e) no console errors during any of the above. These are proposed, not written.

## C2 — Workload shaping

Engine code (architect/engine-and-seats, colors/src/sports/nfl/engine/draft.ts:14): `export const ROUNDS = SLOT_IDS.length;` with comment "32 spots, so 32 rounds: every team fills every spot." So the actual draft is 32 rounds × 32 teams = 1,024 picks, not 7×32 or 28 rounds. The council assignment's "224 base picks" is incorrect; the engine has 32 rounds. (This matches Z.ai's errata: 28→32 rounds.) Per-unit-of-work: each pick updates the draft board (1,000 rows filtered/sorted), team roster (up to 53 players), and standings (32 teams). The hot path is the draft pick → board re-render + roster update. Proposed measurement: time from pick click to all three views updated, at 1,000 players, 32 teams, across 1,024 picks. Harness: Playwright with performance.now() timestamps, or Vitest with jsdom/Node timing.

## C3 — Type-safety surface check

Vue: defineProps<{ team: TeamRecord; onPick: (slotId: SlotId) => void }>() — typed at compile time via generic, checked by vue-tsc. Svelte: let { team, onPick }: { team: TeamRecord; onPick: (slotId: SlotId) => void } = $props() — typed via destructuring annotation, checked by svelte-check. Both provide compile-time safety. Vue's generic form is more explicit (props contract is a single type). Svelte's destructuring form is more concise but splits the contract across the annotation. Observation: Vue's defineProps generic is slightly safer (single source of truth for the prop contract); Svelte's $props() is more ergonomic but the type annotation is optional and can be omitted, losing safety. Both are adequate for this project's prop contracts.

## C4 — Runner precedents for snapshotting/replaying games/recap diffs

Minimum substrate needed: (a) a seeded RNG so game outcomes are reproducible, (b) a game state snapshot (full engine state before/after), (c) a diff function comparing two snapshots. Vue: Vitest (jsdom) can snapshot component output; Playwright can capture DOM screenshots. Svelte: Vitest (Node) can test engine logic; Playwright same. Neither framework's runner has built-in game-replay or recap-diff capability — that's engine-level, not framework-level. Question for the Owner: does he want game snapshotting/replay in the engine (framework-independent) or in the UI layer? Recommendation: engine-level (framework-independent), so both UIs can consume it.
