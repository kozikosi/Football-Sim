SPEAKER: KG (Owner) + inkling | ROLE: Council · Consolidated assignment | TASK: verify what's public, audit what's unverified, benchmark what we can | DATE: 2026-11-14 | Audience: COUNCIL (all seats — GLM, GLYPH, OR, PICKLE, UBER, GL-etc, ERNI, BEAM, SUPER, VL)

# The council — Go do the work that hasn't been done yet.

This is a real-work packet, not a reading assignment. Claude and Z.ai are handling the implementation lanes. Your job is the part they can't do both honestly and fast enough: independent verification, deep code audit, and benchmarking design from a cold start.

Public repositories to work from (read them — don't rely on anyone's prior claims, including this file and including what you read just now):

- Vue: https://github.com/kozikosi/football-sim-vue · tip expected `6b4de5c`
- Svelte: https://github.com/kozikosi/football-sim-svelte · tip expected `86ba632`

Repos are expected to be exhaustively public-repos-as-evaluation, and every claim you need to check is checkable.

**Constraints (carried across the whole wave):**

- Free-only tooling throughout.
- No paid services, no API keys, no subscripted anything.
- No framework decision — we report evidence, we don't rank.
- No implementation commits; the council reads and reports.
- No changes to the original `Football-Sim` repository (`kozikosi/Football-Sim`), and no merges between any scaffold into the real product.
- No SvelteKit, no Next.js, no Nuxt — standalone Svelte + Vite vs Vue + Vite only.
- No decisions on the Owner's behalf. Your job is to report; his is to rule.
- Every claim you make must be either VERIFIED (ran it, receipt attached), REPORTED (someone else told you, cite them), INFERRED (reasoned, not run) or UNKNOWN. The difference matters — do not blur it. If a fact can't be verified, say so.
- Do not repeat work already done — see the "do not do" list at the end.
- Newly-field: `npm ci --no-audit --no-fund --loglevel=error` is the safe baseline; `npm install` is *not* preferred when a lockfile is present.

Commit to this file is `council/inkling` at `_agents/inkling/prompts-2026-11-13/council-assignment-2026-11-14.md`. Your filings go in `inbox/…-<your-seat>-…` with every receipt inline (absolute path, command, exit code, output neighborhood).

---

## Phase 1 — Repository receipts (do this first; every seat should do it)

Clone fresh from public URLs to a new directory each time. Do not reuse the previous clone-yours — stale `.kilocode/` and `node_modules` "pollution from a prior run" are the exact failure mode this phase is meant to find.

### 1.1 Clone and SHA check

For both repos: `git clone …`, then:

- `git log --oneline -5`
- `git rev-parse HEAD`
- `git rev-parse origin/main`
- `git status`
- `git ls-files | wc -l`
- `git branch -a`
- `git remote -v`

Report: exact SHAs; whether both match `6b4de5c`/`86ba632`; any difference from the handoff; whether the trees are clean.

### 1.2 Track pruning / leak check

- `git ls-files | grep -E "mcp|kilocode|backup|node_modules|dist|\.env"` — expected: empty-ish except the legitimate `scripts/report-tooling.mjs` and `.nvmrc`.
- `cat CLAUDE.md` vs `cat AGENTS.md` — should be byte-identical (symlink). Verify with `diff`.
- `ls -la` both repos — confirm mode `120000` for `CLAUDE.md`.

### 1.3 Fresh install + basic gates (issue receipts, don't ask)

- `npm ci --no-audit --no-fund --loglevel=error > /tmp/install-<repo>.log 2>&1` — record exit code and time.
- `npm run type-check` (vue) / `npm run check` (svelte) — record exit code, error count, duration.
- `npm run test:unit -- --run` (vue) / `npm run test:unit -- --run` (svelte) — record outputs and timing.
- `npm run test:e2e` — record total tests discovered, total time, pass/fail.
- `npm run build` — record bundle sizes (JS/CSS/HTML, gzip).
- `npm run smoke` — record `<port>` source, `window.__*` hook assert status, console error presence.
- `node scripts/report-tooling.mjs` — paste its output. Both repos should print the same receipts except the plugin name (svelte: `@sveltejs/mcp`, vue: `@vue/devtools-agent`).

**Both should report exit 0 on every item above.** If any of them fails on your machine in your fresh clone, *your machine* is the finding — do not "fix" the repo, do record the difference.

### 1.4 Cross-check both `.kilocode/mcp.json` against their `.mcp.json`

They should be byte-identical (both scaffolds report `MCP configuration check: PASS`). `diff .mcp.json .kilocode/mcp.json` should be empty.

### 1.5 Stray receipts to file immediately

- `npm audit --omit=dev` — clean on both?
- `npm ls` — top-level packages match `package.json` truth? Any missing peers?
- Audit warnings Dev-chain (Vue 5 moderate via `@vue/test-utils → js-beautify → editorconfig`) — record; do not fix without explicit Owner approval.
- The `fsevents@2.3.3` warning — record it, do not silently fix.

---

## Phase 2 — Code inspection (answers to file, one per report)

For each of these questions, inspect the source and answer with line numbers (and file names) in your report. "I looked at it" is not a receipt — include the exact path and lines.

### 2.1 State management entry points

- Svelte: `src/lib/state/sim-state.svelte.ts` — what does it export? What is the type of `state`? Where is the snapshot produced?
- Vue: `src/stores/counter.ts` — what stores exist? What is the `window.__pinia` placement (main.ts vs App.vue)? Is it gated behind `import.meta.env.DEV`?
- Which is preferred for application state? Which for engine-driven? Is there a bridge shim for the engine? (None — they are starter apps. Record it as fact.)

### 2.2 Tests discovery claim

- Right now, both repos report 2 tests discovered via `npx playwright test --list` (1 in `tests/`, 1 in `e2e/` for Vue). Verify: count the tests yourself; source the exact file paths; identify where each asserts.
- Are there any other test files present not currently discovered? If yes, list them and why they're currently excluded.

### 2.3 ToC ↔ repo match

- `README.md` content vs. actual scripts in `package.json`. Don't trust the README; follow what the scripts actually do.
- Check that `npm test`, `npm run check`, `npm run build` all work as documented. If not, file a CORRECTION note.

### 2.4 Cleanliness

- Whitespace issues, CRLF, mixed line endings? (`file src/*.ts src/*.svelte src/*.vue | grep -i CRLF`)
- Stray `TODO` / `FIXME` comments — list them.
- Dead code: `grep -rni "import.*from ['\"]\.\./" src/ | head` — any cross-directory leaks? Unused exports?
- Duplicated components? Vue's welcome page uses a `HelloWorld.vue`; Svelte has a `src/routes` style but this is *minimal* — confirm no stray demo files.

### 2.5 Config files

- `playwright.config.ts` of both — compare `testDir`, `testMatch`, `webServer`, `port`, `reuseExistingServer`. Report every divergence and your read of it. Which should win?
- `vitest.config.ts` — compare environments (jsdom vs node), include patterns, and root. Explain what each preserves.
- `vite.config.ts` — confirm `vite.config` is present in the Vue repo and absent in Svelte (correct for Svelte); the Vue repo references this file for its devtools plugin. Verify this plugin does not break `vite build` when devtools is disabled.
- `.gitignore` — does either leak generated artifacts (`dist/`, `test-results/`, `coverage/`)? Check `.svelte-kit/` and `dist-ssr/` in modern Svelte setups; this scaffold doesn't use SvelteKit so confirm.

---

## Phase 3 — Tooling verification (the part of the wave everyone kept skipping)

The whole point of the council's framework evaluation was: **actual tool calls in actual sessions**, not configuration presence. Verify at minimum the following and file the raw output (you may redact file paths only for privacy — never the error content):

### 3.1 Svelte MCP

- `npx @sveltejs/mcp@0.1.30 list-sections`
- `npx @sveltejs/mcp@0.1.30 get-documentation sections=\"runes\$state\$derived, svelte/overview\"`
- `npx @sveltejs/mcp@0.1.30 svelte-autofixer` on a `.svelte` file containing a deliberate syntax error

Record: whether it completes within 30 seconds, whether it returns actual documentation vs boilerplate, whether the autofixer detects/corrects the error, and whether the outputs differ between Claude's harness and yours.

### 3.2 Playwright MCP

- Start the Svelte dev server on :5174.
- `npx @playwright/mcp@0.0.85 navigate_to url=http://localhost:5174/`
- Snapshot what the page exposes; count console errors; verify `window.__SIM_STATE__.ready === true`.
- Same for Vue dev server on :5173. Count `window.__pinia` and console error count.
- Compare the experience of driving each app via MCP: response length, selector stability, pain points.

### 3.3 Context7 MCP

- `resolve-library-id library='svelte'`
- `resolve-library-id library='vue'`
- `query-docs` with `topic="Svelte 5 runes: $state, $derived, $effect"`
- `query-docs` with `topic="Vue 3 Composition API: defineProps, defineEmits, computed"`

Record: returned doc excerpt relevance, whether it reflects the current Svelte 5 / Vue 3 syntax, any MCP errors (404, timeouts, malformed payloads).

### 3.4 Vue DevTools Agent

- Start Vue dev server :5173.
- `npx @vue/devtools-agent@9.0.0-rc.3 connect`.
- Verify it doesn't crash. Record exact error/success messages.
- If possible, attempt to read component tree / Pinia state / routes. If not possible in your harness, record that verification is **UNKNOWN**; do not infer from config.

### 3.5 Playwright bundled browser vs Playwright Test runtime

- `npm view @playwright/mcp dependencies` — note the bundled Playwright version.
- `npm ls playwright --depth=3` in each scaffold — note the test runtime's exact version.
- Are they the same? If not, report the exact delta. Do not force an aligning toolchain; just report.

### 3.6 Scripted tooling receipts

- `node scripts/report-tooling.mjs` in both — capture full output. Does `.mcp.json` match `.kilocode/mcp.json`?
- `npx svelte-mcp list-sections` vs `npx svelte-mcp --help` vs `npx svelte-mcp --list` — which syntax actually works on your machine?

---

## Phase 4 — Benchmark design (proposal only — still owner's call)

Propose (or critique) a benchmark slice that tests **the same workload on both frameworks**. Do NOT implement.

### 4.1 Shared primitives

What could a shared, framework-independent TypeScript module look like? Functions to consider: `getPlayerSeed(), makeDraftBoard(), getTeamRoster(), makePick(), simulateGame(), getStandings()`.

### 4.2 Proposed benchmark (your view)

1. Pick a concrete workload: 1,000 player records, 32 team rosters, a snake-draft of at least 5 rounds, then simulate a week of games.
2. Spec the UI requirement precisely: a draft board component with sortable columns, filter box, and a "pick" button; a roster view that updates when a pick is made; a standings table that refreshes.
3. Set acceptance criteria: cold-start time, first paint, interaction latency, build output size, gzip, test counts, typecheck reliability.
4. Declare fairness rules: same data, same engine, same assets, same Node, same npm, same hardware, same agent environment; only the framework breaks symmetry.

### 4.3 Deliverable for this phase

- A written paragraph for the Owner: "**The proposed benchmark for Framework X vs Y: <short name>; the criteria would measure <metric>; the Owner would rule on <question>; evidence base: <receipt list>; weakest link: <reason>; alternative failure mode to consider: <reason>.**"

If you think the workload should not be a snake draft or not 1,000-row board — say why.

---

## Phase 5 — Settle open items from this session

Use the references below to answer what's already landed. Don't litigate them — call them out accurately.

### 5.1 Flex-table same-side inconsistencies (flagged earlier this session)

- Live `tools/mathlab/flex.json` on `origin/architect/engine-and-seats` contains (byte-controlled by the Architect this session): `SS>OLB=2`, `SS>ILB=6`, `ILB>SS=2`, `OLB>SS=6`.
- Same-side (defense→defense), so cross-side floor doesn't apply; both were engineered as one pair but are inconsistent by mirror symmetry.
- The Owner's open call: **harmonize the four (keep SS>OLB=2/ILB>SS=2) or replace both pairs with a new rule.** File your answer with that choice and any strict-ordering consequences; do not edit the table.

### 5.2 Standing items worth flagging if you encounter them

These are open-question / informational items from prior waves. Do not act on them now; just note whether your clone reveals new information:

- P-142 flex table reconciliation (CR: open for Owner ruling — Beam's reconciled table is the leading candidate)
- P-345 λ objective —Owner ruling stands to be debated; corpus status unknown from this seat
- P-141 — FB and Punter math review (architect has reserved; council views unverified)
- 2-way star design — filed by Beam; c/b the engine
- FORM ENVELOPE ±5-+5 clamp surfaces — unverified in this repo
- The 12 static-to-fluctuating items — Owner approved them in wave 2026-11-13; implementation flag aside
- nflverse dataset (pending; all 30 files were re-downloaded this wave; can be used for reading only)
- `LoadedDataset` leak in `core/app.ts` — closed by Claude 2026-11-14 as D0 work

If any of these has newly resolved relevant to the public scaffolds (which they likely haven't; the scaffolds are starter apps), note it. None of these is actionable by the council this wave.

### 5.3 CVE instances from `npm audit`

If you read any CVE, report it; do not remediate. The Vue scaffold shows `editorconfig 3.x → minimatch → glob` moderate chain; same scenario as the 5-moderate findings this wave.

### 5.4 Framework-neutral boundary check

- Neither scaffold contains engine code today — record that.
- For each scaffold, grep for imports of `vue`, `svelte`, `@vue`, `@vueuse/core`, `@sveltejs/kit`, `@sveltejs/vite-plugin-svelte` anywhere in the app logic (`src/` plus `main.ts`). Confirm: nothing framework-neutral is leaking beyond the framework-specific integration surface (vite plug-ins, `App.svelte`/`App.vue`, main entry).
- Record which files are framework-coupled vs which aren't. If any `svelte` or `vue` symbol appears outside its natural place, list it with the path and line number.
- Run the engine's seed-determinism test shape (the engine is in `architect/engine-and-seats:colors/src/sports/nfl/engine/`) against both scaffolds' hygiene layer: `grep -rni "Math\.random\|Date\.now\|new Date()\|localStorage\|window\." src/`. Both scaffolds pass; the demo/test files may show expected touches (`window.__pinia`, `window.__SIM_STATE__`).
- Rebuild both scaffolds in fresh clones with the pin recorded. Report time-to-first-compiled-byte for each.

---

## Phase 6 — Your report

Write a file to your branch of the form `inbox/<UTC yyyymmdd-hhmm>-<seat>-framework-eval.md` containing:

```text
SPEAKER: <seat> | ROLE: council | TASK: framework eval 2026-11-14 | DATE: <UTC>
FOR: the Owner · the digest · for any seat running the benchmark

§0. Executive summary (3 lines max) — what's verified vs what's not
§1. Receipts (every phase, every command, with exit code)
§2. Code inspection answers (Phase 2)
§3. Tooling verification answers (Phase 3; label each VERIFIED / REPORTED / UNKNOWN)
§4. Benchmark proposal (Phase 4; Owner's call)
§5. Settled-items answers (Phase 5)
§6. Risks (anything that would invalidate, for either scaffold, if we proceeded on it)
§7. Recommendations for the next phase of the comparison — if evidence pointed one way versus another
```

One file per seat. Push to your branch, attach to your bulletin.

---

## What is NOT yours this wave

- Adopting the framework. Owner decides.
- Making changes to `Football-Sim` (PreColors master).
- Touching `architect/engine-and-seats` (Architect lane).
- Calling external tools not paid for / not previously wired.
- Fudging receipts. All receipts are raw messages, not paraphrases.

---

## What this deliberately leaves open for later

- The actual engine port into the scaffolds. Authorization forthcoming from the Owner; not today.
- The benchmark execution. Reports are useful; measurements come after the design is approved.
- The framework choice itself. Not in this prompt.
- The GA/patch release. Out of scope.
- The w89 save format work. Owner-only.

---

## Where the council has already been (don't repeat it)

- `_agents/inkling/notes/2026-11-12-independent-architecture-review-prompt-verbatim.md` — the review brief context (read once if architecture is in your report).
- `_agents/inkling/notes/2026-11-12-multisport-engine-overarching-plan.md` — the v1 overarching plan (superseded by `2026-11-14-multisport-engine-overarching-plan.md` — same author, new evidence, keep both).
- `council/inkling` branches `_agents/inkling/prompts-2026-11-13/` — see `claude-status-2026-11-14.md` and `zai-work-assignment-2026-11-14.md` (the planners' wave — don't duplicate Claude or Z.ai's investigation).
- `inbox/20261113-023*` and `inbox/20261114-…` — the framework eval filings so far ( Beam, Ernie, Glyph, Inkling); a competitive benchmark suite is in the repo for whatever seats come next — don't redo it either.

---

## Go

Run this all the way through. The only "done" here is evidence; commitment is not yours to give. If you hit something unexpected — a broken build on your machine, a versionMismatch, an empty directory clone — say "I can't verify that on my machine" with full evidence. That's an answer, not a failure.

One closing reminder: this product is local-first, offline-feasible, runs on the Owner's budget, and is maintained with assistance from AI agents. The framework choice matters because of *that*, not because of abstract framework merit. Your job is to find the evidence that will let the Owner weigh that fit.
