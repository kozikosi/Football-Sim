# Football Sim (Svelte 5) — Multi-Agent Architecture & Verification Rules

## 1. Mandatory MCP & Runes rules (keep)
- Svelte MCP first: any `.svelte` or `.svelte.ts` change goes through the `svelte` MCP (get-documentation or svelte-autofixer) before it lands. Do not narrate Svelte 5 syntax from memory.
- Greenfield syntax is runes-only: `$props()`, `$state`, `$derived`, `$effect` (and `onclick`-style handlers). No Svelte 4 `export let` / `$:`.

## 2. Engine vs. UI separation (keep — corrected)
- Pure Simulation Engine `/src/lib/engine/**`: plain `.ts` only. No `.svelte.ts`, no runes anywhere in it — it must run headless under Vitest.
- UI State Bridge `/src/lib/state/**`: `.svelte.ts` classes with `$state` holding snapshots returned by the engine. **The rule is NOT "never create .svelte.ts files" — it's "engines never carry reactivity; bridges do."** Read that into every import decision.
- QA hook: expose the state as `window.__SIM_STATE__` in DEV mode only, and only when the bridge class exists ("window.__SIM_STATE__ attached" is a receipt; "does not exist" is a finding, not a mystery).

## 3. Standard libraries (keep — scoped)
- `@tanstack/svelte-table` for tabular data: stats, depth charts, standings rows. The draft board in this product is bespoke UI with fixed visuals (Wins/Priority, flex badges, `data-testid="row-*"` contract hooks) — it stays hand-rolled, not a generic grid. "Stats tables → primitive; the board → hand-rolled."
- `lucide-svelte` (or current lucide package for svelte) for icons.
- `@upstash/context7-mcp@4.7.0` (wired) — the common docs lookup on both scaffolds; prefer it for any doc question before asking.
- `lz-string` only where saves live in the browser (localStorage/IndexedDB envelope compression); if/when the product ships Tauri or file saves, plain JSON files win — do not promise compression to the file path.
- `seedrandom` is allowed for DEMO scaffolds only — never let it leak into the engine as a second RNG channel; the engine owns its seeded RNGs (mulberry32 at the pin, Philox-2x32-10 at the tip) with fork(label) streams.

## 4. Definition of done (corrected)
- `npm run check` → exit 0 (svelte-check).
- `npm run test:unit` → all engine unit tests pass.
- No biome reference here (it is not installed); if lint is wanted later, install it deliberately under a receipt — do not cargo-cult commands into this file.
- Receipt rule: every "done" cites the actual command and its exit code.
