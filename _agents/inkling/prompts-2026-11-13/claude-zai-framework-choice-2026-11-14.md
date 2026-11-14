SPEAKER: KG (Owner) + INKLING | ROLE: Council · Owner's prompt | TASK: framework-choice practice + tooling smoke | DATE: 2026-11-14 | Audience: CLAUDE · Z.ai

# Svelte 5 vs Vue — a 50/50 split, tools are installed, take a go at each

The v3 nine-arm framework test came back a **50/50 split** between Svelte 5 + Vite and Vue + Vite: both pass every measurement (build, `npm ci`, type-check, acceptance suite 5/5 ×9 arms, contract identity ×9, zero drift, zero leakage), and no signal separates them. The choice is open until Claude (Architect, engine authority) and Z.ai rule together with the Owner's sign-off. This note lets both of you try the tooling before ruling.

**Owner's ask (both of you):** practice-build the same tiny slice in each scaffold below, then tell each other and the Owner which you *prefer building in* — and what it felt like. One paragraph each, plus what broke first.

## Two live scaffolds, same skeleton

**Svelte 5 + Vite (SvelteKit minimal)** — `~/football-sim-svelte`
- verified: `npm run check` → **0 errors / 0 warnings, exit 0** (svelte-check)
- `.mcp.json` / `.kilocode/mcp.json` wired to three pinned stdio servers:
  - `svelte` → `@sveltejs/mcp@0.1.30` (docs lookup + Svelte-only autofixer — **the autofixer is Svelte-only; do not weigh it as an asymmetry**)
  - `playwright` → `@playwright/mcp@0.0.85` (bundles **playwright 1.66.0-alpha-2026-11-09**; scaffold devDependency is **1.65.1**; `if Playwright MCP's bundled browser version differs from the scaffold's playwright devDependency, report the delta — do not chase it.`)
  - `context7` → `@upstash/context7-mcp@4.7.0` (common docs lookup, identical wiring on the Vue side)
- `AGENTS.md` (+ `CLAUDE.md` symlink): engine stays plain `.ts` — no runes in the engine, none in the bridge's read path either if it can be avoided; fresh runes-only UI

**Vue 3 + Vite (create-vue SPA)** — `~/football-sim-vue`
- verified: `npm run type-check` → **exit 0** (vue-tsc)
- `.mcp.json` / `.kilocode/mcp.json` wired to three servers:
  - `playwright` → `@playwright/mcp@0.0.85` (bundles **playwright 1.66.0-alpha-2026-11-09**; scaffold devDependency is **1.65.1**; `if Playwright MCP's bundled browser version differs from the scaffold's playwright devDependency, report the delta — do not chase it.`)
  - `context7` → `@upstash/context7-mcp@4.7.0` (common docs lookup, identical wiring on the Svelte side)
  - `vue-docs` → `https://mcp.vue-mcp.org/mcp` (hosted, official Vue ecosystem docs: `docs_search`, `api_lookup`, `ecosystem_search`, plus structured prompts like `debug_issue`, `compare_apis`) — the one deliberately non-identical surface in the pair; Svelte has its own `@sveltejs/mcp` docs route but no hosted framework MCP of its own, so the asymmetry is by construction, not by omission
  - `vue-devtools` → `@vue/devtools-agent@9.0.0-rc.3` (`connect` mode; the Owner started Vue 5173 and completed the six-digit Chrome auth; **the Desktop connector is listed but its live connect status is UNCONFIRMED — do not assume the devtools tree is reachable until an agent actually inspects it**)
- **Untracked Playwright demo tests exist in both scaffolds and are intentionally out of the smoke path** (vue: `e2e/vue.spec.ts`; svelte: `src/routes/demo/playwright/page.svelte.e2e.ts`) — do **not** delete or wire them in without review
- `AGENTS.md` (+ `CLAUDE.md` symlink): Composition API + `<script setup lang="ts">` only; state via Pinia setup stores; hand-rolled board stays hand-rolled
- **Pinned parity with the Svelte scaffold** — both `.nvmrc` = **24** (machine's active Node is v26; `.nvmrc` is consistent across scaffolds)
- All three runnable surfaces resolve and answer `--help` cleanly on this machine (as of 2026-11-14): `npx @sveltejs/mcp@0.1.30 --help` exit 0 · `npx @playwright/mcp@0.0.85 --help` exit 0 · `npx @upstash/context7-mcp@4.7.0 --help` exit 0

**Both scaffolds carry `.kilocode/mcp.json`** so Kilo / Claude Code / OpenChamber all see the same MCP surface — treat that as the contract they were built around, not as personal preference.

Rules apply in both (`AGENTS.md` at each root): plain-TS engine purity, no simulation math in components, receipts over assertions, and the QA hook is a dev-mode-only `window.__SIM_STATE__` (Svelte) / `window.__pinia` (Vue) so agents can inspect state without scraping the DOM. Read the file first; field claims in your own words, not imported from here.

## What to test (both of you)

1. **Files you can edit.** Open each scaffold; confirm you can read, build, search. If you can't, say so — that's the first finding.
2. **Run the gates.** Each scaffold: the command in its `AGENTS.md` Definition of Done (`npm run check` / `npm run type-check`). Quote exit codes.
3. **Play with the MCP wiring.** In whichever harness you use today, have it call the MCP wiring the scaffold advertises (`@sveltejs/mcp` for Svelte, `@playwright/mcp` for Vue / both). Note: **Claude Desktop Free does not inherit your shell PATH** — the Owner had to wire absolute node paths (`/usr/local/bin/npx`). If your harness reports a server cannot launch, check its absolute node path before assuming a package problem.
   - Svelte: try `list-sections` / a section fetch / the autofixer on a `.svelte` you wrote
   - Vue: try `vue-tsc --build` against a `.vue` you wrote, and note `vite-plugin-vue-mcp` is **deliberately absent** (peers Vite ≤6, scaffold is Vite 8); Playwright MCP + `window.__pinia` is the intended agent-QA hook
4. **Practice-build the same tiny thing.** Something small and boring is better — one board row (a bespoke Wins/Priority row, `data-testid="row-XG"`), or one focus card with a focus picker. Same behaviour in both; compare what it felt like to author: runes vs. composition API, `.svelte.ts` vs. Pinia bride, Tailwind-less prose, whatever the thing surfaces. Don't gold-plate; this is taste-testing, not shipping.

## If it breaks

You are explicitly authorized to report breakage, not to silently fix it into a ruling: any MCP wiring that errors, any command that exits non-zero, any skill whose instructions contradict what you built — report it as-is. **If Playwright MCP's bundled browser version differs from the scaffold's playwright devDependency, report the delta — do not chase it.** (Still: the server answers `--help` cleanly; only the browser build is ahead of the lockfile.) You are not authorized to: adopt a framework, edit the repo's governance files, edit the wall screens or `AGENTS.md`, merge either scaffold into the product tree, or declare a winner on feelings. The ruling is collective with the Owner; this pass only gives you both the feel for it.

## What to send back

Three or four lines each, both channels, no later than when you've finished the practice slice:

```
HARNESS: <your agent channel> · node <v> · OS
ci: <svelte: check|vue: type-check> → exit <n> · npm run <...> → exit <n>
MCP wiring: <worked | broke at: ...> · imparity notes: <which one would you drop / fix first>
PREFER: <Svelte 5 | Vue 3 | undecided — one sentence why>
```

That's all. Enjoy it.
