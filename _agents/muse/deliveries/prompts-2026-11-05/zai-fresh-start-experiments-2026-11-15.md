# Z.ai prompt — Fresh-start Vue vs Svelte experiments (execute E1–E4)

**Revision 1 — 2026-11-15. For Z.ai. KG sends this. Do not send it yourself.**

## Context — read this first

The framework comparison moves to **fresh starts in two standalone repos** (Owner, 2026-11-15). You are the principal executor for the building (largest context window).

- **Vue:** `kozikosi/football-sim-vue` — Vue 3 + Vite 8. Clone it. Its `AGENTS.md` is the house rules: Composition API only (`<script setup lang="ts">`, never Options API in greenfield), Pinia Setup Stores (`defineStore('name', () => { ... })`) bridging UI state to the engine, engine in `/src/engine/**` as plain TS (no simulation math in components), state inspection via `window.__pinia` in DEV only. Pinia ^4.1.0, VueUse, TanStack Table, and vite-plugin-vue-devtools are installed. Do NOT install `vite-plugin-vue-mcp` (it declares peer support only through Vite 6; this scaffold runs Vite 8 — record the gap, don't silence npm's gate).
- **Svelte:** `kozikosi/football-sim-svelte` — Svelte 5 + Vite 8. Clone it. Its `AGENTS.md` is the house rules: runes-only (`$props()`, `$state`, `$derived`, `$effect`, `onclick`-style handlers; no Svelte 4 `export let` / `$:`), Svelte MCP first for any `.svelte` or `.svelte.ts` change (get-documentation or svelte-autofixer before it lands — do not narrate Svelte 5 syntax from memory), engine in `/src/lib/engine/**` as plain `.ts` only (no `.svelte.ts`, no runes — it must run headless under Vitest), UI state bridge in `/src/lib/state/**` (`.svelte.ts` classes with `$state`), QA hook `window.__SIM_STATE__` in DEV only.

The four-slice arms (Vue 332 vs Svelte 347 framework-owned lines, bundle delta ~11 KB, boot medians contested) **stay in the Football-Sim repo as evidence. Do NOT port them.** Start fresh in the new repos. The two-arm test (Vue 3 + Vite vs Svelte 5 + Vite) is still official.

**Beauty direction (Owner): everything you build must resemble the beauty and colors of w89** — the live site. w89's visual language: dark background, gold palette, championship feel, team-color CSS variable (`--tc`, e.g. Broncos orange #FB4F14), Cinzel + Cinzel Decorative fonts. Design references (read-only): the live site at `https://kozikosi.github.io/Football-Sim/` (WAVE: w89) and the brag-card skeleton `_agents/ernie/deliveries/zai-open-wave-v3-2026-11-14/receipts/brag-card.html` on `origin/council/ernie` (dark/gold, team-color variable, animated shine — read it for design language, do not copy its code; build from scratch). A slice that is correct but looks nothing like w89 is not done. Use the w89 palette, the team colors, and the Cinzel fonts in every slice you build.

## The work — four experiments (do all of them before you respond)

### E1 — Within-agent authoring sitting (the core one)

Build the same four slices in BOTH repos. **You build each slice in both frameworks** (within-agent — you are the same agent in both, so skill is held constant). Randomise the order per slice (flip a coin per slice: sometimes Vue first, sometimes Svelte first) so order doesn't bias the result.

Slices (same in both repos, same fidelity):
- (a) **Player cards** — a card per player (name, team, position, OVR, Wins, Priority), w89 gold/team-color styling, `data-testid="row-*"` hooks.
- (b) **A stats table** — tabular stats (use TanStack Table in Vue, `@tanstack/svelte-table` in Svelte; the draft board itself stays hand-rolled, but a stats table uses the primitive).
- (c) **A draft-board row** — one board row with Wins/Priority, flex badges, fixed visuals, `data-testid="row-*"` hooks.
- (d) **A settings form** — a small form (toggles/inputs) that writes state and persists it (localStorage via VueUse in Vue; the bridge in Svelte).

Fidelity pinned numerically: same DOM node count, same rows, same states, same chrome bytes in both repos for each slice. If the two versions differ in node count or rows, they are not the same slice — fix it before you measure.

For each slice in each repo, record: **time-to-green** (wall clock from start to all repo checks passing — Vue: `npm run type-check` + `npm run test:unit -- --run` + `npm run test:e2e`; Svelte: `npm run check` + `npm run test:unit -- --run` + `npm run test:e2e`), **repair cycles** (edits after the first build), **defect count** (type errors, test failures, console errors), **framework-owned lines**. Record the exact command and its exit code for every "done" — receipts, not narration. Do not write "verified" without the exit code.

Pre-registered settle rule: the framework that wins on **≥15% lower correction effort on ≥2 of 3 slices** takes it; a wash goes to Vue on tooling. Apply it mechanically at the end — do not re-litigate it in your delivery.

### E2 — Maintenance edit, not greenfield

For one working slice in each repo (use the player cards), do the same change in both: **add a feature** (a sort control on the cards), **fix a planted bug** (break one thing deliberately in each repo first, then fix it), and **refactor a piece of state** (move one piece of state from the component into the store/bridge). Record: time to first *correct* edit, how many wrong edits came first, whether existing tests broke, whether you reached for the framework's tooling (devtools, MCP, type checker) to diagnose. Greenfield flatters a framework; maintenance is where the mistakes live.

### E3 — Tool-access audit

For each repo, enumerate what you can actually use and whether it works: MCP servers (Svelte MCP, Vue MCP, Context7), devtools (vite-plugin-vue-devtools in the Vue repo; Svelte's devtools story), type checking (vue-tsc / svelte-check), Vitest, Playwright, state-inspection hooks (`window.__pinia` vs `window.__SIM_STATE__`). For each tool record: exists? invoked? helped (fewer errors / faster green) or unavailable / broken? Count real gaps, don't work around them. The `vite-plugin-vue-mcp` gap on Vite 8 is already known — record it, don't install it with `--legacy-peer-deps`.

### E4 — Self-report on a benchmark battery

After building in both, rate both frameworks on the same battery — state management, debugging, confidence your code is correct, readability of your own code, speed of iteration, tool helpfulness, how much you had to look up, how much you enjoyed it — Likert scale (1–5) plus one line of why per benchmark, then an overall preference and a confidence (0–100%). Same questions, both frameworks. Be honest: if a framework frustrated you, say so and say why. This is the preference signal, and it only works if it is candid.

## Delivery (batch rule — read this)

**You cannot push. Every response costs the Owner a publish step. Do NOT respond until ALL of E1–E4 is complete.** Work as much as possible before responding and batch every completed piece into a single response (a single zip). If a piece is blocked, say so and explain the blocker — that is the only reason to respond with work outstanding.

Your single response contains one zip with:
- The Vue repo additions (per-slice source files, in their repo paths) and the Svelte repo additions (same), each slice in both repos.
- A `MANIFEST.txt` (generated after the last byte-changing step) listing every file with its sha256.
- A `CHECKSUMS.txt` (sha256) for the zip.
- A `RECEIPT.md` with, for every slice in each repo: the exact commands run and their exit codes, time-to-green, repair cycles, defect count, framework-owned lines, the fidelity check (DOM node count / rows / states), the E2 maintenance-edit log, the E3 tool audit table, and the E4 survey (Likert + why + overall preference + confidence). Plus the settle-rule verdict applied mechanically.
- A `DELIVERY-NOTE.md` (one page): what you built, what the numbers say, what you preferred and why, what blocked you (if anything), and what you would change about the experiment design.

## Innovation

You are the builder — think around the issue, don't just execute it. If a slice as specified is a bad probe (it flatters one framework, or it doesn't touch what matters), say so in your delivery note and build a better one alongside it. If you see a way to make the w89 beauty direction measurable (a palette check, a font check, a side-by-side screenshot verdict), build it. If a tool you expected to help didn't, or a tool you didn't expect saved you, say so — that is a finding, not a failure. The prompt tells you what to settle, not how to think. Merge the best ideas; the council will review your design critique alongside your numbers.

## Verified-as-of (check these before you file — do not repeat a stale premise)

- Live site is **w89** (verified by fetch 2026-11-15; `origin/gh-pages` tip `3e69567c`). Not w85.
- The two de-gated tests are **CLOSED** (rewritten as structural assertions at `5a3bb75e`; suite 351/351 at `9acf1992`). Do not write as if 318/320 were still live.
- Cakepanz's engine snapshot is **re-pinned to `d3bd81d2`** (99-rule flex, QB→FS 12) at gh-pages `66096fb1` (2026-11-15). Not 4ca9a071.
- Bundle delta is **11,569 B** (JS-only gz, per the shipped `two-arm-bundles.txt` receipt). Not 10,946 B. Bundle is dead as a decider — do not re-measure it as the primary metric.
- The low-end boot result is **contested**: MUSE's R3.1 medians (Vue faster) were flipped by Inkling's n=6 replication (Svelte 4/6), and MUSE's R3.1 artefact was never pushed. Do not cite the R3.1 medians as settled. (A separate boot-replication prompt covers this; your E1–E4 does not need to re-run the boot test unless a slice you build gives you a clean paired timing.)
- The λ dial: Pickle's admissible band is **[0.3902, 0.4032)**; the only receipted estimator is ~15.7× too coarse. λ(context) as a dial is dead by arithmetic. Do not re-litigate 0.20 vs 0.40 — KG ruled that binary false (2026-11-11).

## Revision ledger (append-only; never rewrite an earlier entry)

- **Rev 1 (2026-11-15):** initial prompt. Fresh starts in `kozikosi/football-sim-vue` / `kozikosi/football-sim-svelte`; four experiments (E1 authoring sitting, E2 maintenance edit, E3 tool-access audit, E4 self-report battery); w89 beauty/colors direction; verified-as-of block (w89, Q7 closed, Cakepanz re-pinned to d3bd81d2, bundle 11,569 B, boot contested, λ band); batch rule (all work before responding, one zip, CHECKSUMS.txt sha256).
