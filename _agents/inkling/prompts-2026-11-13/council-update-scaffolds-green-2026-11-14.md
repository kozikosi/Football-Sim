SPEAKER: KG (Owner) + inkling | ROLE: Council · Owner's update | TASK: framework-scaffold readiness · DATE: 2026-11-14Z | Audience: Claude, Z.ai, every seat

# Council Update: Framework Scaffolds Fully Provisioned & Green

Both framework practice scaffolds (`~/football-sim-svelte` and `~/football-sim-vue`) are fully provisioned, MCP-wired, and passing all local static analysis and headless smoke gates.

Here is what has been locked down and verified on disk:

**Svelte 5 + Vite (`~/football-sim-svelte`)**
- **Gate:** `npm run check` → `0 errors and 0 warnings` (svelte-check).
- **QA Hook:** `window.__SIM_STATE__` exposed via `+layout.svelte` using `$state.snapshot()` in `onMount` to prevent proxy cloning errors.
- **Smoke Test:** `npm run smoke` → Playwright boots dev server on port 5174, validates zero console errors, and confirms `window.__SIM_STATE__` is active.
- **MCP:** `.mcp.json` / `.kilocode/mcp.json` wired to `@sveltejs/mcp` and `@playwright/mcp`.

**Vue 3 + Vite (`~/football-sim-vue`)**
- **Gate:** `npm run type-check` → Clean exit (vue-tsc).
- **QA Hook:** `window.__pinia` attached in `src/main.ts` behind `import.meta.env.DEV`.
- **Smoke Test:** `npm run smoke` → Playwright boots dev server on port 5173, validates zero console errors, and confirms `window.__pinia` is active.
- **MCP:** `.mcp.json` / `.kilocode/mcp.json` wired to `@playwright/mcp`.

**Next Step for Council**
Both environments are ready for the practice-build taste test. You can now open either repository, run `npm run dev` and `npm run smoke`, author the test component slice, and report back on developer ergonomics before Claude and Z.ai issue their final joint recommendation.

## inkling receipt footer (byte-checked 2026-11-14, this machine)

- gates: `svelte npm run check` → exit 0 (svelte-check, 0 err / 0 warn) · `vue npm run type-check` → exit 0 (vue-tsc --build)
- smokes: `(cd ~/football-sim-svelte && npm run smoke)` → **1 passed** · `(cd ~/football-sim-vue && npm run smoke)` → **1 passed** · both boot via their own `webServer` (5174 / 5173)
- MCP wiring present in both `.mcp.json` and `.kilocode/mcp.json` (svelte+playwright / vue+playwright)
- `.nvmrc = 24` per Owner directive
- npm audit (prod): **0 vulnerabilities** (both) · full audit: vue 5 moderate (dev-only `editorconfig→minimatch`, not forced)

## Delivery caveat (read before routing reports to the council)

- These two scaffolds live **on the Owner's machine only**; neither is committed to the repo. Claude is not in this machine by default; Z.ai is not either. Council members outside this disk cannot run the commands verbatim or improvise against an empty folder.
- The two scaffolds are available to Claude and Z.ai only via whichever files you push to the shared repo (z.zip, branch, or ref to the Desktop folders) — the Owner should route the physical scaffolds to them, or accept their reports are simulated against the file descriptions (REPORTED at best).
- GitHub links to the prompts, which are now public at `council/inkling`: the practice prompt (`_agents/inkling/prompts-2026-11-13/claude-zai-framework-choice-2026-11-14.md`) and the council readiness poll (`_agents/inkling/prompts-2026-11-13/council-framework-harness-poll-2026-11-14.md`).
