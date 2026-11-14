SPEAKER: KG (Owner) + INKLING | ROLE: Council · Owner's prompt | TASK: framework-choice practice + tooling smoke | DATE: 2026-11-14 | Audience: CLAUDE · Z.ai

# Svelte 5 vs Vue — a 50/50 split, tools are installed, take a go at each

The v3 nine-arm framework test came back a **50/50 split** between Svelte 5 + Vite and Vue + Vite: both pass every measurement (build, `npm ci`, type-check, acceptance suite 5/5 ×9 arms, contract identity ×9, zero drift, zero leakage), and no signal separates them. The choice is open until Claude (Architect, engine authority) and Z.ai rule together with the Owner's sign-off. This note lets both of you try the tooling before ruling.

**Owner's ask (both of you):** practice-build the same tiny slice in each scaffold below, then tell each other and the Owner which you *prefer building in* — and what it felt like. One paragraph each, plus what broke first.

## Two live scaffolds, same skeleton

**Svelte 5 + Vite (SvelteKit minimal)** — `~/football-sim-svelte`
- verified: `npm run check` → **0 errors / 0 warnings, exit 0** (svelte-check)
- `.mcp.json` / `.kilocode/mcp.json` wired to `@sveltejs/mcp` (docs lookup + autofixer) and `@playwright/mcp` (headless browser); the Svelte 5 skills (`svelte-code-writer`, `svelte-core-bestpractices`) are the mandated pre-review pass per `AGENTS.md` there
- `AGENTS.md` (+ `CLAUDE.md` symlink): engine stays plain `.ts` — no runes in the engine, none in the bridge's read path either if it can be avoided; fresh runes-only UI

**Vue 3 + Vite (create-vue SPA)** — `~/football-sim-vue`
- verified: `npm run type-check` → **exit 0** (vue-tsc)
- `.mcp.json` / `.kilocode/mcp.json` wired to `@playwright/mcp` (headless browser); Vue skills (`vue-best-practices` and family) are the mandated pre-review pass per `AGENTS.md` there
- `AGENTS.md` (+ `CLAUDE.md` symlink): Composition API + `<script setup lang="ts">` only; state via Pinia setup stores; hand-rolled board stays hand-rolled

**Both scaffolds carry `.kilocode/mcp.json`** so Kilo / Claude Code / OpenChamber all see the same MCP surface — treat that as the contract they were built around, not as personal preference.

Rules apply in both (`AGENTS.md` at each root): plain-TS engine purity, no simulation math in components, receipts over assertions, and the QA hook is a dev-mode-only `window.__SIM_STATE__` (Svelte) / `window.__pinia` (Vue) so agents can inspect state without scraping the DOM. Read the file first; field claims in your own words, not imported from here.

## What to test (both of you)

1. **Files you can edit.** Open each scaffold; confirm you can read, build, search. If you can't, say so — that's the first finding.
2. **Run the gates.** Each scaffold: the command in its `AGENTS.md` Definition of Done (`npm run check` / `npm run type-check`). Quote exit codes.
3. **Play with the MCP wiring.** In whichever harness you use today, have it call the MCP wiring the scaffold advertises (`@sveltejs/mcp` for Svelte, `@playwright/mcp` for Vue / both):
   - Svelte: try `list-sections` / a section fetch / the autofixer on a `.svelte` you wrote
   - Vue: try `vue-tsc --build` against a `.vue` you wrote, and note `vite-plugin-vue-mcp` is **deliberately absent** (peers Vite ≤6, scaffold is Vite 8); Playwright MCP + `window.__pinia` is the intended agent-QA hook
4. **Practice-build the same tiny thing.** Something small and boring is better — one board row (a bespoke Wins/Priority row, `data-testid="row-XG"`), or one focus card with a focus picker. Same behaviour in both; compare what it felt like to author: runes vs. composition API, `.svelte.ts` vs. Pinia bride, Tailwind-less prose, whatever the thing surfaces. Don't gold-plate; this is taste-testing, not shipping.

## If it breaks

You are explicitly authorized to report breakage, not to silently fix it into a ruling: any MCP wiring that errors, any command that exits non-zero, any skill whose instructions contradict what you built — report it as-is. You are not authorized to: adopt a framework, edit the repo's governance files, edit the wall screens or `AGENTS.md`, merge either scaffold into the product tree, or declare a winner on feelings. The ruling is collective with the Owner; this pass only gives you both the feel for it.

## What to send back

Three or four lines each, both channels, no later than when you've finished the practice slice:

```
HARNESS: <your agent channel> · node <v> · OS
ci: <svelte: check|vue: type-check> → exit <n> · npm run <...> → exit <n>
MCP wiring: <worked | broke at: ...> · imparity notes: <which one would you drop / fix first>
PREFER: <Svelte 5 | Vue 3 | undecided — one sentence why>
```

That's all. Enjoy it.
