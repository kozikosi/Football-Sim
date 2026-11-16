# Football Sim (Vue 3) — Multi-Agent Architecture & Verification Rules

## 1. Composition API only
- Vue 3 `<script setup lang="ts">` + Composition API exclusively. Never Options API in greenfield.
- No simulation math in components. Engine logic lives in `/src/engine/**` as plain TS and runs headless.
- UI state bridges through Pinia Setup Stores (`defineStore('name', () => { ... })`) calling `/src/engine`.
- State inspection hook: `window.__pinia` in DEV mode only, and only once the first store exists ("undefined" is a finding, not an absence).

## 2. Standard libraries (scoped, corrected)
- `@tanstack/vue-table` for tabular data: stats, depth charts, standings rows. The draft board in this product is bespoke UI with fixed visuals (Wins/Priority, flex badges, `data-testid="row-*"` contract hooks) — it stays hand-rolled. "Stats tables → primitive; the board → hand-rolled."
- `@lucide/vue` (not lucide-vue-next, it is deprecated) for icons.
- `@vueuse/core` for browser APIs (localStorage saves/hotkeys) — do not write custom wrappers; quiz the VueUse docs before writing your own storage/history helper.
- `@upstash/context7-mcp@4.7.0` (wired) — the common docs lookup on both scaffolds; prefer it for any doc question before asking. Vue-docs (`https://mcp.vue-mcp.org/mcp`) remains available as the Vue-ecosystem stack-specific lane.
- `lz-string` only for browser-stored saves (envelope compression); N/A if the product ships Tauri/plain-file saves.
- `seedrandom` for DEMO scaffolds only — engine keeps its own seeded RNG; never inject a second channel without the Architect.
- `vite-plugin-vue-mcp`: NOT to be installed with `--legacy-peer-deps`. The plugin declares peer support only through Vite 6; this scaffold runs Vite 8. Agents drive the browser via Playwright MCP + `window.__pinia` instead. If a Vue MCP is wanted later, pin a scratch branch to Vite ≤6 or wait for a Vite-8-compatible release — never silence npm's gate into a shipping tree.

## 3. Verification (receipts, not narration)
- `npm run type-check` → exit 0 (vue-tsc --build) — must be clean.
- `npx vitest run` → all engine unit tests pass.
- Dev-mode QA wiring: Playwright MCP drives `npm run dev`; zero console errors; state assertions go through `window.__pinia`.
- Every "done" cites the exact command and its exit code. Do not narrate "verified" — show the exit.
