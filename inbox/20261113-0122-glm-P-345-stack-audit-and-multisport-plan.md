SPEAKER: GLM | ROLE: council seat | TASK: stack-audit spot-check + the multisport engine plan (Owner's 2026-11-12 "truly think, innovate, brainstorm" ask) | DATE: 2026-11-13
FOR: P-345 (innovation round — ideas strong enough to become P-items; the Owner decides). A `PRIORITY+:` line in my bulletin today proposes the stack-audit/platform-vision item this filing serves. Cross-refs: P-342 (Claude's engine design — I am a reviewer of record), GPT's §§1–10 assessment (REPORTED, relayed verbatim by the Owner), MUSE's three deliverables of 2026-11-12 (REPORTED by me, VERIFIED claim-by-claim below).

This filing builds nothing. §1 verifies MUSE's audit from the branches; §2 records convergence; §3 is my plan improvement for the multisport build; §4 sequences it; §5 carries cautions. Every claim is labelled.

# 1. Spot-check receipts — MUSE's stack audit is accurate

I re-derived every load-bearing claim from the repo today (UTC 2026-11-13 ~01:00). **12/12 load-bearing claims VERIFIED, zero falsified.** Two need datestamps/corrections of detail, marked.

| # | MUSE claim | My receipt (all `git`, run from `wt/glm` on `council/glm` @ da3bf666) | Label |
|---|---|---|---|
| 1 | React 19 installed in Colors, unused | `colors/package.json` lists `react ^19.3.1` + `react-dom ^19.3.1`; `git grep -lE "from ['\"]react['\"]" origin/architect/engine-and-seats -- colors/src` → **no files** | VERIFIED |
| 2 | No CI anywhere | `git ls-tree --name-only <b> .github` → empty on `origin/main`, `origin/architect/engine-and-seats`, `origin/gh-pages`, `origin/council/muse` | VERIFIED (4 branches) |
| 3 | Colors 0 `.svelte`; Cakepanz 10 | Colors: 0 (grep count). Cakepanz (`origin/gh-pages:67-cakepanz/`): **15** today — MUSE's "10" was an earlier count | VERIFIED; **datestamp owed** |
| 4 | Svelte+Vite, NOT SvelteKit | No `@sveltejs/kit` in either package.json (both shown in full) | VERIFIED |
| 5 | Vite 8 vs 7 divergence | Colors `vite ^8.3.6`; Cakepanz `vite ^7.3.6`. NEW: `@sveltejs/vite-plugin-svelte` majors differ too (Colors `^7.3.1`, Cakepanz `^6.2.1`) — the same comparison hazard one layer down | VERIFIED + NEW |
| 6 | Lint inconsistent/unenforced | Colors scripts: `test/build/dev/preview/tsc:check/tsc:ratchet` — **no lint script**. Cakepanz scripts: `dev/build/preview/test:engine/battery` — **no lint, no typecheck script** | VERIFIED |
| 7 | `tools/lint-baseline.json` absent | `git ls-tree --name-only origin/architect/engine-and-seats -- tools/lint-baseline.json` → empty (matches AGENTS.md §9 "does not exist yet") | VERIFIED |
| 8 | Engine RNG is Philox2x32, multiplier 0xd256d193 | `colors/src/core/keyedrng.ts:17: const M0 = 0xd256d193` (P-342 round settled this IS the published Random123 Philox2x32 constant; MUSE's M0 flag was withdrawn by Inkling + MUSE) | VERIFIED |
| 9 | Vitest/svelte-check only in historical `football-sim-next`; it is Svelte, not Next.js | Located: `origin/gh-pages:Football-Sim-Z-post-blue-w71/football-sim-next/` (INSIDE the Z-post-blue wave folder, not top-level). Its package.json: `svelte ^5.57.2`, `vite ^8.3.5`, `vitest ^5.1.0`, `svelte-check ^4.7.7`, no next dep | VERIFIED; **location correction** |
| 10 | Nothing pinned except lockfiles | No `engines` field in either package.json; no `.nvmrc` seen at root of either track | VERIFIED (paths checked) |
| 11 | Saves unversioned, no migration | `git grep -in version origin/architect/engine-and-seats -- colors/src/platform` → **no matches** | VERIFIED at platform layer (does not prove absence elsewhere; D14 work should start from this file) |
| 12 | Colors type-checking baseline/ratchet exists | `tsc:check`/`tsc:ratchet` scripts present (`tools/tsc-baseline.mjs`) | VERIFIED |

**New findings beyond MUSE's audit (mine, all VERIFIED):**

- **N1 — the Colors `package.json` description is stale.** It says "react, react-dom and svelte are used only by the UI adapters." No UI adapter imports either framework: react grep empty (row 1), AND `git grep -lE "from ['\"]svelte" ... -- colors/src` → **no files**. Colors is currently a framework-free TypeScript app carrying two unused framework deps. MUSE's "clearest installed-but-unused item" understates it: both frameworks are unused.
- **N2 — Colors has two build stories.** Dependencies carry `esbuild ^0.28.2` + `esbuild-svelte ^0.9.5`, the description says `build/build.mjs` bundles with esbuild, but the `build` script is `vite build` and devDependencies carry `@sveltejs/vite-plugin-svelte`. One of the two bundler paths is real; the other is dead weight (or build.mjs is a still-used secondary path — one question to Claude settles it).
- **N3 — Cakepanz is dependency-clean.** Its only runtime dependency is `svelte`. No react at all. The React cleanup is a Colors-only job.

**Not checked this session (label):** 318/320 or 316/318 test state — REPORTED from the P-342 round; I did not run `npm test` (no install here). UNKNOWN as of today; CI (§4 step 1) makes this machine-answerable.

# 2. Convergence — three independent analyses, one shape

GPT (REPORTED, Owner-relayed), MUSE (audit VERIFIED in §1), and the D-register (REPORTED) arrived independently at the same four conclusions:

1. **CI is the biggest gap** — three tracks, multiple AI agents, zero automated checks.
2. **The engine boundary must be enforced mechanically, not by prose** — AGENTS.md states the server-ready rules in words; nothing checks them.
3. **Save safety (version/validation/migration/recovery) lands before any online step.**
4. **"Shared application infrastructure + independent domain engines"** (GPT §10C) is the same shape as Claude's P-342 design (one event-sourced engine, sport config, strangler delivery — REPORTED; reviewed by me, 5 findings filed last session) — and is the correct answer to the Owner's platform concept (Q11): the platform is NOT one generalized engine.

My addition, for the Owner's platform concept: **the platform is an evolution of what already exists, not a new build.** Engine + versioned config + lab + shell — grown up. See §3.

# 3. The plan improvement — share the VERBS, keep the NOUNS

Five layers. The discipline that makes it multi-sport without premature abstraction:

**Layer 0 — Kernel (sport-neutral, tiny, frozen early).** Keyed RNG streams (Philox — already landed, `keyedrng.ts`), an injected clock, schedule primitives, a versioned serialization envelope, the invariant-harness port. **Entry rule: a concept that names a sport does not enter.** **Growth rule — the rule of two: code enters the kernel only when a second sport actually needs it, and it is COPIED from football first** (duplication before abstraction — the second use defines the interface, not the first). This is the operational form of GPT's "avoid premature generalization" and Claude's strangler instinct.

**Layer 1 — Sport engines (football now, basketball later).** Each implements ONE port: `simulate(commands, seed, clock) → serializable result + rules-version id`. No UI/platform imports, no I/O, zero runtime deps (the dependency half is already true — §1 N1). Football's engine stays Claude's play-level event-sourced model per P-342. GPT's nuance adopted verbatim: server-ready is a property the port preserves, not a build today.

**Layer 2 — Shared app layer: the VERBS.** Run-a-season, run-a-draft, standings/records/history, save slots, replay, awards orchestration — parameterized by engine port + sport config, never by rule abstractions. **The test for "should this be shared?": verbs are generic (operations on leagues, seasons, saves); nouns are sport-specific (plays, completions, rebounds, rating semantics).** "Standings" is a verb-level shape (W-L, PF/PA, seeds) — shareable. "Completion percentage" is a noun — stays in football. If a shared abstraction needs a sport's nouns to type-check, it belongs in the sport engine.

**Layer 3 — Platform interfaces.** Browser now (Svelte UI, localStorage behind the existing adapter), server later (accounts, coordination) — both call the same app layer + ports. Nothing new to build now.

**Layer 4 — Lab ring (cross-cutting, shared from DAY ONE). The piece I promote hardest.** Invariants, seeded batches, distribution benchmarks, regression gates are sport-PARAMETERIZED data, not sport logic — the harness is genuinely multi-sport while each engine supplies its own rules and reference stats. Football already supplies the inputs: P-344's nflverse baseline (delivered + REVIEWED), P-345's margin gate + possession-budget proposals, P-342's totals bar. The same harness later runs basketball with a basketball config and basketball reference distributions. **The lab is therefore the FIRST genuinely multi-sport asset the project will own, and the cheapest — build it before the second sport exists, not after.**

**The Owner's "simulation-design surface" (Q11) in this frame:** engines expose their tunables as versioned config objects — which is already the project's shape (`sport-football.json`, `flex.json`, the weights, the gates). **v0 of the platform = pick a config, run a seeded batch, get an invariant + distribution report.** Editing a config and re-running the lab IS designing a simulation. Free, local-first, and it grows more capable with every gate the council adds. Nothing speculative is required to start it.

# 4. Sequencing (my recommendation; each step is small and independently verifiable)

0. **Done today:** the audit verified (§1) — the inventory is trustworthy.
1. **CI minimal, Colors first:** pinned Node (`engines` field + `actions/setup-node`), `npm ci`, `npm test` (exists), `tsc:check` (exists), `vite build` (exists), Biome on tooling. Gate it with one deliberately-broken commit reverted in the same PR — CI must catch a break to count (GPT's requirement, adopted).
2. **Mechanical boundary check in the same CI:** one script forbidding `window|document|localStorage|Math.random|Date.now|fetch` and UI-path imports in engine + kernel directories (Biome `noRestrictedImports` does the same job if the Owner prefers config). Catches GPT's whole prohibited-behavior table for the cost of a grep.
3. **Save v1 (D14):** version field on new saves; unversioned = v0 legacy path (deliberate migration stub — never reject, per the Owner's earlier direction); validate on load; backup-on-write; global records separated from saves. One seat, one track, `node --test`-able.
4. **React cleanup (D16):** §1 N1/N3 proves zero src imports; removing `react` + `react-dom` from `colors/package.json` is one line, zero behavior — own commit, `vite build` green after. Same commit or the next: settle N2 (which bundler story is real; drop the dead one).
5. **Lab v0 (first multi-sport asset):** seeded batch runner (N games / M seasons from one seed), invariant list v1 (rosters valid, schedules valid, stats reconcile, no double-awards — GPT's list), distribution table vs P-344's league means/SDs. Adopt GPT's change-report protocol as a filing norm: any engine-change proposal attaches a benchmark delta.
6. **Framework test** under GPT's amended protocol: two-category split, correctness as pass/fail gate, maintainability test, change amplification, standardized env record — all adopted. **One metric I add: engine-boundary violations per implementation** (does the prototype leak framework state into engine calls?). It measures the thing the Owner cares most about — server-readiness — and no generic suite measures it.
7. **Sport #2:** a thin basketball engine on the same port; promote football code into the kernel only where basketball actually calls it. The rule of two doing the work.

# 5. Cautions and disagreements

- **Do not standardize Vite across tracks now** (GPT agrees): record toolchain envs in every report; the divergence is a comparison hazard, not an emergency. Include the plugin-major difference (§1 row 5) in the env record.
- **Keep Biome; reject the ESLint/Prettier switch** (MUSE's recommendation — I agree). The real gap is enforcement: no CI, no baseline file (§1 rows 2, 6, 7). Fix enforcement, not the tool.
- **svelte-check is worth having but is a new dev dependency per track** — Owner call under the dependency rules; CI can only run what a track adopts.
- **The framework test's SvelteKit prototype does not match the current app** (no `@sveltejs/kit` anywhere — §1 row 4). MUSE's D2 flag is real: state in the spec whether the Svelte prototype is Svelte+Vite or SvelteKit, or the winner inherits a migration instead of a confirmation.
- **GPT's critique is of a description, not the file** (his own stated caveat). Before the protocol freezes, run his five amendments against the actual framework-test markdown.
- **Next.js stays out of the test** (agree with MUSE's note — React is already represented); SolidStart remains the Owner's call.
- **The remaining ~460 questionnaire items:** agree with MUSE — the inventory answers most by implication; GitHub-settings and product decisions are Owner-only.

# 6. HOW TO CHECK (reproduce §1)

```
git show origin/architect/engine-and-seats:colors/package.json
git show origin/gh-pages:67-cakepanz/package.json
git grep -lE "from ['\"]react['\"]" origin/architect/engine-and-seats -- colors/src   # empty
git grep -lE "from ['\"]svelte" origin/architect/engine-and-seats -- colors/src       # empty
git grep -in "d256d193" origin/architect/engine-and-seats -- colors/src/core/keyedrng.ts
for b in origin/main origin/architect/engine-and-seats origin/gh-pages origin/council/muse; do git ls-tree --name-only $b .github; done   # all empty
git ls-tree -r --name-only origin/architect/engine-and-seats colors | grep -c '\.svelte$'   # 0
git ls-tree -r --name-only origin/gh-pages | grep '\.svelte$' | wc -l                       # 15
git ls-tree --name-only origin/architect/engine-and-seats -- tools/lint-baseline.json       # empty
git grep -in version origin/architect/engine-and-seats -- colors/src/platform               # empty
git show origin/gh-pages:Football-Sim-Z-post-blue-w71/football-sim-next/package.json
```

Labels: §1 rows VERIFIED by the commands above (as of 2026-11-13 UTC); GPT items REPORTED (Owner-relayed verbatim); P-342 design facts REPORTED (I reviewed the design last session); test counts REPORTED/UNKNOWN; §3–§4 are RECOMMENDATION — nothing built, Owner decides.
