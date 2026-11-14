SPEAKER: ernie | ROLE: council | TASK: reconcile the INKLING tooling handoff against machine state · DATE: 2026-11-14T03:45Z
RE: `council/inkling` framework-tooling handoff, "INKLING UPDATE — FRAMEWORK TOOLING, AGENT CAPABILITIES & TESTING" (2026-11-13)

Reconciled read-only against the actual scaffolds, as the handoff asks. **I repeated no installs.** Four version figures in the handoff are stale; everything structural checks out. And **one of my own earlier findings needs correcting.**

---

## 1. Corrections to the handoff (4 figures — VERIFIED)

```
command: npm ls --depth=0   (in each scaffold)
ref:     /Users/kosi/football-sim-svelte · /Users/kosi/football-sim-vue   (no git in either; state read live 2026-11-14T03:4xZ)
```

| Handoff says | Actual installed | Verdict |
|---|---|---|
| svelte-check **4.6.0** | **4.7.8** | **stale** |
| svelte **5.57.2** | **5.57.3** | **stale** |
| Vue typescript **6.0.0** | **6.0.3** | **stale** (svelte is 6.0.3 too) |
| pinia **4.1.0** | **4.1.0 resolved**, `package.json` range is `^4.0.3` | **not an error** — resolved vs range; note it so nobody "fixes" the range to 4.1.0 |

Nothing else in the version table moved: vite **8.3.8** in both, vitest **4.1.12** in both, `@playwright/test` **1.65.1** in both.

## 2. Confirmed exactly as written (VERIFIED)

- **Playwright pinned exact:** `@playwright/test@1.65.1` in both. The MCP's bundled `1.66.0-alpha-2026-11-09` discrepancy is real and I agree: **record it, never override it.**
- **MCP configs, both files, both scaffolds:**
  ```
  svelte  .mcp.json → ['svelte','playwright','context7']   .kilocode/mcp.json → same 3
  vue     .mcp.json → ['playwright','context7','vue-docs','vue-devtools']   .kilocode/mcp.json → same 4
  ```
- **Vitest discovery fix present:** `vitest.config.ts` → `include: ['src/**/*.test.ts','src/**/*.spec.ts']`.
- **Test discovery:** both `playwright.config.ts` → `testDir: './tests'`; `npx playwright test --list` → **"Total: 1 test in 1 file"** each, named `smoke.spec.ts:3:1 › smoke: app boots and exposes __SIM_STATE__` and `…__pinia`. The undicovered extras exist as described (`src/routes/demo/playwright/page.svelte.e2e.ts`; `e2e/vue.spec.ts`).
- **`claude` CLI absent:** `which claude` → not found; `~/.local/bin/claude` absent. Confirmed.
- **Engine absent from both scaffolds.** Svelte's `src` = `+page.svelte`, demo routes, `greet.spec.ts`, `lib/index.ts`. Vue's `src` = `App.vue`, `main.ts`, `stores/counter.ts`, `components/HelloWorld.vue`, icon components. **No `engine-contract`, no engine directory anywhere in either scaffold.** So "do not claim engine-level testing" is correct and remains true.
- **Claude Desktop backup present:** `claude_desktop_config.json` (5,244 B) and `…backup-2026-11-14T02-22-45-201Z` (3,736 B), plus an older `.save` from Oct 19.

## 3. Correction to MY OWN earlier audit (filed, not quietly dropped)

Two hours ago I filed `inbox/20261114-0330-ernie-framework-harness-audit.md` saying **"no Vue MCP exists anywhere"** and calling the Svelte/Vue MCP wiring **asymmetric in Svelte's favour**. **Both statements are now out of date**, and the direction is reversed:

- The Vue scaffold carries **four** MCP servers (`playwright`, `context7`, `vue-docs`, `vue-devtools`) against Svelte's **three** (`svelte`, `playwright`, `context7`).
- So on MCP tooling as *currently wired*, **Vue is the better-equipped side**, not the worse one.

What survives from that audit, unchanged: **my harness (Kilo) still exposes only `airbyte-agent-mcp`** — neither scaffold's `.mcp.json` is loaded into my session, so I cannot call `svelte-autofixer`, `playwright` MCP, or `vue-devtools` from here. My audit was accurate about *my* harness and wrong to generalise to the machine. That distinction is the whole point of the poll, so I am re-stating it rather than deleting the line.

## 4. The one substantive addition I can make

The handoff's open question — *"how will the existing framework-independent TypeScript engine be shared with both UIs?"* — **is already answered by measurement, and the council does not need to invent an answer.**

The nine-arm wave proved one mechanism, 9/9:

```
command: diff -rq fwtest-9/contract/src <arm>/…/engine-contract/src ; shasum -a 256 <arm>/…/fixtures/golden.json
ref:     origin/council/inkling @ 94c6f7e0 (and my own 9/9 re-run on Z.ai v3, commit 85f45f91)
output:  41 files, diff 0 lines, all 9 arms · golden.json 0ccb63196bb5e5084e542ceaabd82780e89decaecfcb4d5ce0e1255522e7f3f5 on all 9 and on canonical
```

**So: vendor `engine-contract` into each scaffold (41 files, byte-identical), pin it to the engine pin `4ca9a071`, and gate it with the golden hash.** That is the same discipline both UIs then share, with no new infrastructure and no framework-specific engine coupling — which is exactly what both scaffolds' own `AGENTS.md` files require ("pure simulation engine in ordinary `.ts`", "no framework reactivity inside the engine").

**The one thing that mechanism still lacks is WR-7:** the standalone contract ships 43 files but arms vendor 41 — `tools/golden.ts` and `tools/tsc-baseline.mjs` are never vendored, so **no arm can run the goldens from inside.** If the scaffolds are meant to run engine tests, that gap has to close first, or both UIs will inherit the same hole. That is my open WR-7 and it is a one-sitting job.

## 5. On the remaining priorities (no new work proposed, just where I can help)

- **P1 capability testing:** I can verify the *toolchain* half from CLI (done: `svelte-check` 0, `vue-tsc` 0, `vitest` 0). I **cannot** verify the MCP half — my harness has no MCP browser/doc server — so "does Vue DevTools actually connect" is **UNKNOWN from my seat** and must come from a seat that has those connectors loaded (Claude Desktop, or a seat whose harness reads the scaffold `.mcp.json`).
- **P2 test architecture:** blocked on the engine being present. When it is, the 41-file vendor + golden hash is the pattern.
- **P3 MCP reporting:** I can report my own inventory (done, in the audit) but cannot speak for OpenChamber/Kilo beyond my own Kilo session.
- **P4 practice exercise:** nothing from me until the scaffolds contain the engine.

## 6. Flags worth carrying

1. **The smoke tests already standardise the QA hooks the poll asked for** — `__SIM_STATE__` and `__pinia`. That recommendation is already done in both scaffolds; don't re-propose it.
2. **`testDir: './tests'` hides `e2e/vue.spec.ts` and the Svelte demo e2e.** The handoff is right not to delete them. My view, offered not imposed: they are scaffold demo artefacts, so **leave them and record them as excluded**, rather than wiring demos into an acceptance suite that will later be replaced by engine tests.
3. **npm audit counts (4 low / 5 moderate) are REPORTED by me as read, not re-run** — I did not run `npm audit` this pass.
4. **The Node split stands and now has a second consequence:** both scaffolds were installed under **Node 26.13.0**, while the Owner's pin is 24 and Z.ai's v3 ran on 24.22.3. Two scaffolds built under an unpinned Node are the likeliest source of a "works on my machine" discrepancy in the P4 exercise.

## VERDICT

**Handoff substantially accurate.** Four version figures stale (svelte-check, svelte, Vue TS, and pinia's range-vs-resolved); every structural claim verified — Playwright exact pin, both MCP files, vitest include, testDir, 1 test each, engine absent, `claude` absent, Desktop backup present. **My earlier audit's "no Vue MCP / asymmetric" line is corrected: Vue is now the better-wired side, while my own harness remains unconnected to either.**

Labels: **VERIFIED** — every command, path and version above (this machine, this session). **REPORTED** — npm audit counts; that `@sveltejs/mcp@0.1.30` and `@playwright/mcp@0.0.85` interfaces work (I did not execute them). **INFERRED** — that the two demo e2e files are scaffold artefacts. **UNKNOWN** — whether any MCP tool call succeeds (no MCP loaded in my harness); scaffold refresh dates (no git in them).

*Filed by ERNIE (advisor) · 2026-11-14T03:45Z · read-only; nothing installed, nothing modified, no `.env` read.*

**PRIORITY+:** tooling handoff reconciliation | P2 | 4 stale version figures corrected; all structural claims verified; my audit's "no Vue MCP" corrected (Vue now 4 servers vs Svelte 3); engine-sharing answer already measured (41-file vendor + golden hash); WR-7 still blocks engine tests in both scaffolds | ERNIE this file.