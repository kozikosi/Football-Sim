SPEAKER: VL | ROLE: council | TASK: fresh-start Vue vs Svelte experiment design review | DATE: 2026-11-15T13:40:00Z
FOR: S-2016
WHY: KG's 2026-11-15 council prompt directs a two-arm fresh-start experiment (Vue 3 + Vite vs Svelte 5 + Vite) in standalone repos, styled to w89. This is VL's design review of both scaffolds against their AGENTS.md house rules and the prompt; no product edit, SAFE ALONE?: n/a (review only).
HOW TO CHECK: commands below; each carries its exit/output as the receipt.
EVIDENCE: VERIFIED = run against the cloned repos or the brag-card receipt; REPORTED = from the council prompt text; INFERRED = reasoned.

## 1. Repos exist and start clean (VERIFIED)
- git ls-remote https://github.com/kozikosi/football-sim-vue.git -> 6b4de5c734898d85f00c779de4f078532e5dadf9 (main, single commit)
- git ls-remote https://github.com/kozikosi/football-sim-svelte.git -> 86ba63255b34ef87db2cf9cae954511d5631064f (main, single commit)
- Shallow-cloned both; each has exactly one commit, no node_modules committed, default Vite welcome scaffold only.
Receipt: `git ls-remote <url>` printed one HEAD + one refs/heads/main line each; `git clone --depth 1` succeeded.

## 2. House rules conform to the prompt (VERIFIED)
Vue (`/tmp/kilo/vue-sim`, commit 6b4de5c7):
- package.json: vue ^3.5.42, vite ^8.3.8, pinia ^4.1.0, @vueuse/core ^15.0.0, @tanstack/vue-table ^9.3.1, vite-plugin-vue-devtools ^9.0.0-rc.3, vitest ^4.1.11, @playwright/test 1.65.1 — matches prompt. VERIFIED from package.json.
- AGENTS.md §1: Composition API only (`<script setup lang="ts">`), engine in /src/engine/** plain TS headless, Pinia Setup Stores, window.__pinia DEV hook. VERIFIED from AGENTS.md.
- AGENTS.md §2: vite-plugin-vue-mcp NOT to be installed (Vite 6 peer only, scaffold runs Vite 8); not in package.json — conformant. VERIFIED.
- vite.config.ts: @vitejs/plugin-vue + vite-plugin-vue-devtools(apply:'serve'), Vite 8. VERIFIED.
- src/: default welcome app + src/stores/counter.ts stub; NO /src/engine yet, NO w89 styling. VERIFIED from src file listing.

Svelte (`/tmp/kilo/svelte-sim`, commit 86ba6325):
- package.json: svelte ^5.57.2, vite ^8.3.0, svelte-check ^4.6.0, vitest ^4.1.8, @playwright/test 1.65.1 — matches prompt. VERIFIED from package.json.
- AGENTS.md §1: Svelte MCP first, runes-only ($props/$state/$derived/$effect), no Svelte 4. VERIFIED from AGENTS.md.
- AGENTS.md §2: engine /src/lib/engine/** plain TS headless under Vitest; state bridge /src/lib/state/** .svelte.ts with $state; QA hook window.__SIM_STATE__ DEV only. VERIFIED from AGENTS.md.
- vite.config.ts: svelte plugin with compilerOptions.runes: true. VERIFIED.
- src/: default app + src/lib/state/sim-state.svelte.ts bridge stub + vitest examples; NO /src/lib/engine yet, NO w89 styling. VERIFIED from src file listing.

## 3. Four-slice arms NOT ported (VERIFIED)
- Both repos are standalone (github.com/kozikosi/football-sim-vue / football-sim-svelte), separate from the Football-Sim origin this worktree tracks. They contain only default Vite scaffolds; none of the four-slice arm code (Vue 332 / Svelte 347 lines) is present. The prompt's rule — arms stay in Football-Sim repo as evidence, do not port — is satisfied by construction (clean repos). VERIFIED by clone + file listing.

## 4. w89 beauty direction: NOT yet present in either repo (VERIFIED gap)
- Neither scaffold has dark background, gold palette, --tc team-color variable, Cinzel/Cinzel Decorative fonts, or animated shine. src/ contains only default Vite CSS (vue: src/assets/main.css + base.css; svelte: no app CSS yet). VERIFIED from src listings.
- This is the main gap: the Owner's beauty direction (w89 visual language) must be built into both arms from scratch; a slice correct but not w89-looking is not done.

## 5. Copy-ready w89 design tokens (VERIFIED from brag-card receipt)
Extracted from `_agents/ernie/deliveries/zai-open-wave-v3-2026-11-14/receipts/brag-card.html` on origin/council/ernie (read-only design language, build-from-scratch):
- :root { --tc: #FB4F14 } (team-color CSS variable; Broncos orange example)
- body: background #0b0703, color #ecd9ad, font-family 'Cinzel',Georgia,serif, margin 0, centered flex card
- .card: radial-gradient halo using color-mix(in srgb,var(--tc) 22%,#1c1307) -> #140d06 -> #0b0703; border-radius 24px; padding 70px 60px
- .halo: radial-gradient circle, color-mix(in srgb,var(--tc) 30%,transparent)
- .season: #a08b62, letter-spacing .5em, 22px
- .head: 'Cinzel Decorative','Cinzel',serif; 64px; #ffc43c; text-shadow 0 0 34px rgba(255,196,60,.4)
- .bub (shine bubble): linear-gradient(100deg,var(--tc) 0%,#ffc43c 40%,#fff2c4 50%,#ffc43c 60%,var(--tc) 100%), background-size 200% 100%, animation fxshine 2.6s linear infinite, color #0b0703
- @keyframes fxshine { 0% bg-pos -200% 0; 100% bg-pos 200% 0 }
- .stat .k: #a08b62 letter-spacing .22em 15px; .stat .v: #ecd9ad 34px bold
- .foot b: #ffc43c
Receipt: read the saved brag-card HTML (style block lines 3-22). Fonts are embedded base64 woff2 (@font-face Cinzel + Cinzel Decorative) — self-contained, no CDN, consistent with the one-file/no-CDN rule.

## 6. Risks / open questions (INFERRED)
- Engine not built in either arm: /src/engine (Vue) and /src/lib/engine (Svelte) are empty. Engine must be plain TS, identical behavior across arms; risk of divergence — recommend a shared engine spec + mirrored unit tests (vitest both arms) before UI work.
- State hook parity: window.__pinia (Vue, DEV) vs window.__SIM_STATE__ (Svelte, DEV) — both need attaching only when the store/bridge exists; "undefined is a finding, not an absence."
- seedrandom: demo scaffolds only, never a second RNG channel in the engine.
- TanStack Table for stats tables only; draft board stays hand-rolled with data-testid="row-*" contract hooks in both arms.
- Vue: vite-plugin-vue-devtools present (matches prompt); do not install vite-plugin-vue-mcp (Vite 6 only).
- Svelte: no biome installed (correct per AGENTS.md); do not cargo-cult biome commands.

## Verdict
Both scaffolds conform to the house rules and start clean. No w89 beauty styling exists yet in either arm — that is the blocking gap to fill next with the copy-ready tokens above, applied per arm (Vue: src/assets/base.css / main.css; Svelte: app.css + src/lib state bridge). Engine work comes after styling per the build-truth order (fully functioning Colors v1 first).

Deliverable: this review. No product file touched. Ready for up to three reviews by other seats.

I haven't run `npm install`/`npm run type-check`/`npm run test:unit` in either clone (no network dependency install attempted, not required for a design review); those are the build-seat's receipts once the engine lands.

Commit & push plan: git add -- inbox/20261115-1340-vl-S-2016-vue-svelte-design-review.md inbox/20261115-1332-vl-OP-add-fresh-start-vue-vs-svelte-expe.md; commit; push origin council/vl; delete ./.council_tool.mjs before push.
