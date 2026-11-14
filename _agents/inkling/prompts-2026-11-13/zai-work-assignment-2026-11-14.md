SPEAKER: inkling + KG (Owner) | ROLE: Council · Assignment to Z.ai | TASK: comprehensive implementation & tooling assessment — Vue 3 + Vite vs Svelte 5 + Vite | DATE: 2026-11-14 | Audience: Z.ai

# Z.ai — Comprehensive work order for the Vue 3 + Vite vs Svelte 5 + Vite framework comparison

**Date:** 2026-11-14
**From:** KG (Owner) + Inkling (Council)
**Subject:** Full work order — verify both scaffolds, verify every tool, design the benchmark, design the agent-capability experiment, and produce a thorough report.
**Stance:** No rush. Time is the resource this comparison needs most. Depth, correctness and evidence over speed. Do not skip phases because an earlier handoff said they were done — earlier handoffs have been wrong before, and your job is to re-verify, not to trust them.

---

## Context (why this exists)

We are deciding **which framework will host the Football-Sim engine for the life of the project**, not which framework produces the prettiest demo. The decision is the Owner's alone. We have produced scaffolds, measured builds, checked tooling, and established a framework-neutral engine boundary. Nous avons maintenant besoin de evidence decided.

This work order has five explicit goals:
1. **Verify the actual state of both public repositories** (the handoffs said they were ready; you assume nothing).
2. **Verify every tool and integration you may rely on** — nine arms, plain-vite, two scaffolds, MCP servers, test runners, type-checkers, browsers. Configuration existing is not tool verified.
3. **Design — do not yet implement — a benchmark** that would be meaningful evidence for the Owner if both frameworks were forced to do honest work.
4. **Design a fair agent-capability experiment** that separates framework difficulty from scaffold difficulty.
5. **Return a thorough, labelled report.** VERIFIED / REPORTED / INFERRED / UNKNOWN.

What this order is NOT:
- Not a framework winner declaration.
- Not a migration plan.
- Not an implementation assignment.
- Not a release gate.
- Not a vote among council members; your two independent lanes matter.

Free-only tooling throughout. No paid services, no API keys, no subscriptions. Tooling costs here are zero by design.

---

# PHASE A — Boot, access, environment reconciliation

Do these in order. Record receipts (command, output, exit code) for every item.

**A1. Machine identity.** What OS, arch, kernel, shell(s). Node version (`--version`), npm (`--version`), git (`--version`). `command -v gtimeout` or `timeout`, `python3 --version`, `shasum -a 256 -v` or `sha256sum --version | head -1`. All of these must be in your environment receipt.

**A2. Clone both repositories fresh** from `https://github.com/kozikosi/football-sim-vue` and `https://github.com/kozikosi/football-sim-svelte`. Record the SHAs that landed — they must be exactly `6b4de5c734898d85f00c779de4f078532e5dadf9` (vue) and `86ba63255b34ef87db2cf9cae954511d5631064f` (svelte). If they differ, stop and report; do not proceed on a different baseline.

**A3. Confirm clean working states with no edits or modifications present** — `git status --porcelain` must produce empty output on both. If anything is dirty, report exactly what, which paths, which file hashes; do not restore silently.

**A4. Verify the bootstrap is within bounds.** Does `.bootstrap.sh` exist or is the original scaffold tool available? Has it been run before this clone? What did the original Owner/AGENTS.md mapping tell you about where it should place this workspace? Do not run anything beyond what the prior instructions prescribe.

**A5. Inventory all MCP servers visible in a fresh agent session.** List the servers; describe their capabilities exhaustively; verify their presence and versions by executing something — don't trust the config alone. Record any MCP that is missing from a client that showed it earlier (OpenChamber, Kilo Code, Claude Desktop).

**A6. Repo reconciliation.** `git remote -v`, `git branch -vv`, `git log --oneline | tail -1`, HEAD sha, and whether `origin/main` is the tracking branch. Confirm both are still public and reachable.

**A7. `.gitignore` audit.** Verify generated output, `node_modules`, dist output, and secrets patterns are correctly ignored in both repos. Confirm `.env*`, `.env.local` etc. are absent from the published repos. `.mcp.json` and `.kilocode/` are local machine files — they must NOT be committed publicly.

**A8. `CLAUDE.md` / `AGENTS.md` symlink check.** `ls -la CLAUDE.md` in both clones — confirm the mode (`120000` = symlink in git) and the target.

---

# PHASE B — Toolchain and install verification

Both repos are public; you don't need to be gentle. These commands are safe and non-destructive by default. Record exit codes and wall time.

**B1. Install cleanly, time it.** `npm ci --no-audit --no-fund --loglevel=error`. Record: exit code, time, `node_modules` count.

**B2. Build for production.**

- Vue: `npm run build-only`  (or `npm run build`; confirm what type-check comes before build. Record the exact output including actual bundle sizes.)
- Svelte: `npm run build` (svelte-check + vite build; confirm type-check passed.)

Record: exit code, wall time, module count, total `dist/` size, JS/CSS/HTML splits, and gzip sizes.

**B3. Type-check.**

- Vue: `npm run type-check` (vue-tsc --build). Record exit code, error count, warning count.
- Svelte: `npm run check` (svelte-check). Record exit code, error count, warning count.

Record the difference between declarative errors and warnings; do not let them be conflated.

**B4. Unit tests.**

- Vue: `npx vitest run`
- Svelte: `npx vitest --run` (the earlier handoffs mixed `npm run test:unit -- --run` and watch mode; confirm what actually executes on this machine.)

Record: pass/fail, time.

**B5. E2E discovery.**

- Vue: `npx playwright test --list` — verify which specs get discovered. Confirm `tests/smoke.spec.ts` and `e2e/vue.spec.ts` are both listed; honest discovery list.
- Svelte: same check. Confirm `tests/demo.spec.ts` and `tests/smoke.spec.ts` are both listed.

**B6. Run E2E.**

- `npm run test:e2e` in both. Record pass/fail, time, and the exact spec names that ran. If either fails in your environment, report the failure output verbatim — do not attempt to fix it.

**B7. Clean audit.** `npm audit`, `npm audit --omit=dev`. Record the counts by severity. Note what the default remediation would be (`npm audit fix`), and record whether the non-breaking path exists (`npm audit --dry-run`). Do NOT install/downgrade/delete anything outside the scope of this work order.

**B8. Engine audit.** Confirm neither scaffold contains engine code: grep for `simulateGame`, `simulateSeason`, `optimalLineup`, `cpuPick`, `slotWinsPerOvr`, `matchupModel`, `LoadedDataset` across both `src/` trees. Record what's there; record what's missing.

**B9. Backwards claim verification.** The handoff claims both builds were green on the original publishing machine. State whether you can verify on this machine. If yes, file it. If not, say so; do not let it pass as "true".

---

# PHASE C — Original product inspection

You cannot meaningfully compare frameworks without knowing what the product is doing with the framework. Read enough of the original engine to understand what the frontend must eventually handle.

**C1. Clone the original engine repository.** `kozikosi/Football-Sim`, on branch `architect/engine-and-seats`. Engine lives at `colors/src/sports/nfl/engine/`. Read `CORE ENGINE INTERFACE` in the file `colors/src/sports/nfl/engine/index.ts` (or whatever lists exports). If that file does not exist where expected, report the exact path mismatch — **do not guess**.

**C2. Read the engine's interface in detail.** Identify and enumerate every exported function the UI would have to call, especially: `simulateGame`, `playGame`, `simulateWeek`, `cpuPick`, `optimalLineup`, `matchupModel`, `applyOffPlan`, `applyDefPlan`, `modelWeights`, `slotWinsPerOvr`, `teamRatings`, `effOvr`, `flexPenaltyFor`. For each, note: name, signature, synchronous/asynchronous, side effects (none expected), whether it reads global state.

**C3. Identify the NFL dataset loading mechanism.** Where does `LoadedDataset` come from; where does `DatasetRow` come from; what is the physical data source (JSON file? inline blob? package?), what file is it stored in, and where is it read from?

**C4. Estimate scale.** How many distinct UI views (draft board, game recap, schedule, standings, stats, awards, roster, team select)? How many distinct engine functions consume what kind of data? Estimate lines-of-source in the engine alone. Do not modify these files; report only.

**C5. Identify real workloads the frontend must carry.** A full 32-team 28-round snake draft; a 17-game regular season plus playoffs; ~9 game recaps capable of listing box score stats for all 22 starters plus bench players in the scoring plays; 16 awards including MVP and ROY (etc.), standing draws of the top draft-potential players; sortable/filterable leaderboard tables 1,000+ rows deep.

**C6. Document the engine boundary concretely.** What type would the UI read? If you were writing a minimal harness today that exercised the engine alone, what would you write (don't write it — just describe the interface)

**C7. Architectural reality-check.** The framework-neutral ruling is active — confirm no engine code anywhere in the scaffolds touches `vue` / `svelte` / `react` / `@vue` / `@sveltejs` / reactivity primitives. Only TypeScript.

**C8. Where the pin lives.** At the pin, the engine uses mulberry32 (as opposed to the Philox RNG appearing only at the tip). Confirm the exact RNG in the engine source at the current pin and note the byte-version rule. The flex table is 99 rules at the pin. Confirm.

---

# PHASE D — Live MCP and tooling verification (actual calls, not config)

Every tool listed here must be exercised through a real invocation. A config file that names a server proves nothing; a call that returns a value proves something.

**D1. Svelte MCP (`@sveltejs/mcp@0.1.30`).**
- Run `list-sections` and record the output verbatim.
- Run `get-documentation` with a meaningful query (e.g. "runes $state stores"). Record whether the content returned is actual documentation (verify by heading phrases).
- Run `svelte-autofixer` on a **deliberately broken** `.svelte` sample: a component with a syntax error such as an unterminated `{#if}` block. Record whether it finds and fixes the issue.
- If any tool call hangs or errors, record the exact error output and exit code. Do not attempt any workaround.

**D2. Playwright MCP (`@playwright/mcp@0.0.85`).**
- Start the Svelte dev server on port 5174 (`npm run dev -- --port 5174`).
- Run Playwright MCP navigation against `http://localhost:5174`. Record the resulting snapshot.
- Do the same against the Vue dev server on port 5173.
- Run Playwright MCP's `browser_console_messages` on both. Note: the scaffold apps may show a 404 for favicon — that's not a finding, it's noise. Errors otherwise are findings.
- Note that Playwright MCP ships its own Playwright alpha (1.66.0-alpha-2026-11-09 or newer), while the scaffolds pin `1.65.1`. Record both versions inside your filing; do not try to align them.

**D3. Vue DevTools Agent (`@vue/devtools-agent@9.0.0-rc.3`).**
- Start Vue dev server on 5173.
- Run `connect`. Record whether it establishes a connection; whether the agent navigates a Chrome window; what happens with the six-digit authorization.
- Attempt to inspect one component (App) and inspect Pinia state. Record the outcome. If you cannot access a Chrome session, record that — do not claim it connected.
- Note the connection is Owner-driven; the owner must be present and able to complete the authorization. If the owner is not available, file as UNKNOWN rather than INVENTED.

**D4. Context7 MCP (`@upstash/context7-mcp@4.7.0`).**
- Resolve Vue and Svelte through the MCP (or two calls). Record the returned doc searches.
- Do not interpret the output; report it.

**D5. Filesystem MCP (if present in your harness).**
- Verify it can see both scaffold directories. Record any path resolution or permission issues.

**D6. OpenChamber.**
- Check this session's own MCP inventory against the ones that exist on disk (`svelte`, `playwright`, `context7`, `vue-docs`, `vue-devtools`). Report which ones OpenChamber can produce §= calls for.

**D7. Any missing piece.** If a tool is listed in the scaffold's `.mcp.json`/`.kilocode/mcp.json` but does not work in your harness, record that; do not bypass it, don't substitute it, don't pretend to run it.

---

# PHASE E — Benchmark design (proposal, do not run)

A benchmark is the Owner's final arbiter. Your job is to design a benchmark that would settle this fairly and reproducibly, then have the Owner approve it before anything is measured.

**E1. Shared TypeScript engine.**
- A thin pure-TS module with no framework dependencies.
- Functions: `loadDataset()`, `getDraftBoard(state)`, `makePick(state, player)`, `getTeamRoster(team)`, `simulateGame(home, away)` or equivalent shapes for the real product.
- Data: one shared `data.ts` file (~1,000 player records, or a defensible slice) — either real Football-Sim data transferred into the scaffolds, or a synthetic slice. Your job to recommend; the Owner decides.
- Determinism: all randomness seeded; tests use fixed seeds.
- State container: one immutable object per scenario, or explicit mutable with document+restore semantics — pick one and justify.

**E2. UI requirements (identical for both frameworks).**

- Draft board: sortable and filterable table of 1,000 players.
- Team roster view: 32 teams with up to 53 players each.
- Draft selection: click a player → assign → both views update.
- Game display: box score summary after a simulated game.
- Standings: 32-team table sorted by division, W-L, PF/PA.
- Loading state: spinner during engine call.
- Error handling: display engine error visibly.

**E3. Acceptance criteria.**
- Sort 1,000 players in <100ms in the production build.
- Filter 1,000 players in <50ms in the production build.
- Draft selection updates all views in <16ms.
- Full season simulation (17 rounds × 32 teams) in <5s.
- Type-check 0 errors.
- Unit tests pass.
- E2E: at least 5 scenarios.
- No console errors during demo flow.
- No forbidden globals (Math.random, Date.now, localStorage, fetch in engine code).
- Bundle size recorded; build time recorded.

**E4. Instrumentation.**
- Performance timing: `performance.now()` boundary around engine; `performance.mark`/`measure` if your profiling needs it.
- Heap snapshot before/after: record bytearray count.
- Production build sizes: JS, CSS, total, gzip.
- Node version recorded.

**E5. Fairness rules.**
- Same data source.
- Same engine module.
- Same acceptance criteria.
- Same test scenarios.
- Same Node + npm versions.
- Same agent/session conducting each run (two frameworks built by the same agent in the same environment).
- Document any framework-specific deltas you cannot eliminate (e.g. test environment jsdom vs node) and why.

**E6. What this benchmark will measure.** Be explicit on what it does and does not tell the Owner:
- Yes: framework reactivity, render time, large-table handling, build output, agent ergonomics in practice.
- No: engine runtime (that's identical), product correctness (not the benchmark's job), long-term maintainability (not measurable).
- Do not claim it measures anything out of scope.

**E7. Watchlist feature — the agent-capability experiment.**
- Feature: add a "watchlist" to the draft board — users can star players; starred players persist across page reloads (localStorage); the UI can filter to show only watchlisted players.
- Each framework gets the same instructions and the same file layout.
- Both Claude and Z.ai should attempt it independently in both frameworks and report separately.
- Measure: wall time, repair cycles, error clarity, how quickly the agent understood the existing engine contract, how clean the final code is, how many files changed, whether localStorage was used correctly, whether the agent verified the persistence behavior before claiming done.

---

# PHASE F — Multisport engine overarching assessment

Develop your own thinking on this. You are not implementing it — you are reporting on what you see in the existing engine and repository and forming your own judgment.

**F1. What the Football-Sim engine repsents** as an artifact: the design seam between a pure football engine and its consumers; the engine pin's role; how the framework-conditional ruling ("no framework decision locked until the test finishes") affects architecture; reactivity's role (or absence of one) in the current design.

**F2. What the v1 multisport engine sketch needs** to become real: a port of the engine across multiple sports — football, then basketball; what "multi-sport" means for ratings, schedules, match types, statistics; where the contract diverges (tackle football vs. basketball is fundamentally different); what survives and what gets rewritten.

**F3. What this project's three-lineage shape implies** for engine control: Pre-Colors (frozen reference), Colors (the engine), Cakepanz-beta (the UI shell), plus the public repos (Vue/Svelte scaffolds). Who owns what; what the handoff order would be once a framework is chosen; what the migration path looks like.

**F4. Free-only constraint.** The Owner does not want paid anything in this pipeline. Confirm explicitly what that means for every dependency: test runners are free; browsers are free; Node is free; TypeScript is free; Vue/Svelte are free; Vite is free.

**F5. Your verdict on the v3 framework test and scaffold comparison** — keeping in mind the Owner's final-ruling authority. What would you need to see to make a defensible recommendation, and what would make you change your mind?

**F6. Honest unknowns.** What remains unclear after this inspection; what you would need to know to recommend; what you cannot tell from this data.

---

# PHASE G — Output format

Return your filing in exactly this shape. Any section may be labelled UNKNOWN; no section may be silently skipped.

```
A. Repository audit
A1. Vue repo — verified facts (cloning, HEAD, file list outputs)
A2. Svelte repo — verified facts
A3. Crime: any sensitive information found in the published repos (must say so or say none found)
Watchlist feature — skipped, design only in Phase F

B. Original product requirements
B1. Engine interface inventory
B2. Data source identification
B3. Estimated implementation-load
B4. Benchmark slice recommendation

C. Estimate and risk (concise)
C1. Estimation risk
C2. Scaffold quality assessment
C3. MCP tooling assessment

D. Benchmark proposal
D1. Engine shape
D2. UI requirements
D3. Acceptance criteria (with thresholds)
D4. Instrumentation
D5. Fairness rules
D6. Watchlist experiment design
D7. Architecture questions for the Owner

E. FRAMEWORK COMPARISON REVISITED
E1. Vue scaffold — what worked, what didn't, specific frictions
E2. Svelte scaffold — same
E3. Apples-to-apples where possible
E4. Tooling comparison (MCP/devtools/test-runner speed)
E5. Not Apples-to-apples (impossible yet; the engine is missing)

F. Multisport engine assessment
F1-F6 above

G. Recommended next action and decision status
G1. Decision-ready?: one sentence
G2. Recommended phase sequence
G3. What you would change if you were the Owner
G4. What you would change if you were the Architect
G5. Unknowns you could not resolve
```

Each output ends with a line naming the actual commands run, the exact git SHAs landed, and the actual exit codes evidenced. Filings from earlier are already on the repository; tell me which you re-verified, which you took on trust, and why.

---

# CONSTRAINTS — non-negotiable

1. **No paid services, no subscriptions, no API charges, no paid models.** Open-source, free.
2. **No framework decision by you.** Your job is evidence; the Owner rules.
3. **No production code touched.** The original engine stays as it is; no changes to `architect/engine-and-seats`; no branches merged; no releases, no deployments.
4. **No SvelteKit.** Standalone Svelte + Vite only. No Next.js, Nuxt, etc.
5. **No deletion of any file** you don't own, including demo specs or config backups.
6. **Faithful reporting.** If you cannot verify a claim, say so explicitly rather than filling gaps with expectation. Label: VERIFIED (you ran it, exit code attached) · REPORTED (you cite someone else) · INFERRED (reasoned, not run) · UNKNOWN (cannot tell, even by inspection). "It works" is not a label.
7. **No silent repairs to broken state.** If a test fails, a command errors, or your clone doesn't build — report, do not bypass.
8. **No scope creep into product implementation** before the Owner approves the benchmark; proposal only.
9. **Respects the Owner's privacy** — never write .env contents, never share personal paths beyond what you need in the report, never paraphrase secrets. Name what you found, not the secret itself.
10. **Never claim a capability is present unless you exercised it.** Reporting an inference as a fact is a violation of the byte-check law.
11. **Never claim a benchmark exists before the Owner approves it.** Designing ≠ running.
12. **Do not claim the Go `golang` / `go.work` / other unrelated ecosystems** — they do not exist here; this is a TypeScript project end-to-end.

---

# SUBSTANCE

You may gain extra evidence at every stage, but no stage substitutes for evidence. If a fact cannot be verified, it does not exist for the purposes of this work order.

A clean dependency tree is better than a green dashboard. A clean test pass is better than a 2-second build. A reliable measurement is better than a plausible claim.

The Owner wants to see: the work to be real, the evidence to be somebody's — yours — and the recommendation to be the Owner's own, not yours imported from somewhere else.

Good luck. Begin with Phase A. Stay methodical. When in doubt, write to INKLING before deciding — consult, don't guess.

— inkling (Council / ACC) + KG (Owner)
