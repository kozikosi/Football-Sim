SPEAKER: glyph | ROLE: Council Adviser | TASK: Football Sim architecture analysis | DATE: 2026-10-27T23:32:41Z
FOR: council

# Football Sim: Architecture and Migration Analysis

Short answer: follow your friend's instinct for simplicity, take Z.ai's "browser compute" correction as non-negotiable, and follow GPT's sequencing (tests + engine extraction before a rewrite). Don't pick a stack to chase keywords, pick one you can defend with tradeoffs.

The biggest thing the "free" constraint changes is the question itself: *any* architecture where the demo can sleep, require a card, or burn server CPU on a 35 minute Monte Carlo is disqualified.

## Reconciliation of the three opinions

| Topic | Friend | Z.ai | GPT | Recommendation |
| :-- | :-- | :-- | :-- | :-- |
| Framework | SvelteKit | Lean SvelteKit, but flexible by job market | Compare Next.js vs SvelteKit based off of goals | SvelteKit to start. Only switch to Next.js if your target job list is overwhelmingly React heavy. The engine must be framework independent regardless. |
| Compute | Run in Svelte (vague) | Must run in the browser via Web Workers. Free Workers have a ~10ms CPU limit so server side sim is a non-starter. | Browser Workers, partition seeds, checkpoint if needed | Browser Web Workers. This is the correct fix for your "35 minute Monte Carlo" constraint and is the answer to Q18. |
| Hosting | Cloudflare | Cloudflare Pages/Workers, explicitly call out sleep/pause risk | Cloudflare first, GitHub Pages only static | Cloudflare Pages. Explicitly reject anything that idles to sleep (e.g. some free tiers of Supabase/Render/Fly) for your public demo. |
| DB/Auth | D1/Drizzle, Auth.js/simple email | D1+Drizzle, Better Auth + GitHub OAuth, warn about Supabase pausing | Only add if a feature requires it, prefer feature driven auth | None to start. Add D1 + Drizzle + Better Auth *only* if you implement a concrete feature (e.g. cross device saves/shares). |
| Tooling/Tests | pnpm, no workspaces, ESLint/Prettier sufficient | Similar, Vitest+Playwright+fast-check, don't switch tooling for keywords | Keep Biome, add fast-check + deterministic seeds, golden fixtures | Keep Biome (you already use it), pnpm, no workspaces. Prioritize Vitest, Playwright, fast-check and seeded RNG over adding new linters. | 

The "free" requirement is what makes most of this unanimous. If something requires a credit card, has idle pause on its free tier, or needs persistent server CPU to run a sim, it's out.

## Concrete stack recommendation

| Area | Recommendation | Notes |
| :-- | :-- | :-- |
| Language | TypeScript (strict) | Use JSDoc sparingly, Zod only at load/import boundaries (never inside the simulation hot loops). |
| Framework | SvelteKit on Vite | Cleanest for isolating logic, easy to deploy to Cloudflare, and easy to narrate tradeoffs if asked about React. Keep the engine in its own module to swap frameworks later. |
| Engine | `src/lib/engine/` pure TS | Deterministic, framework agnostic, and unit testable. Inject an RNG (seeded) to allow golden file comparisons. This is your highest value portfolio artifact. |
| Compute | Web Workers + a worker pool | Partition Monte Carlo seeds across workers, report progress, support cancellation, and checkpoint to IndexedDB if a run can exceed a tab session. Benchmark before considering WASM (treat it as a measured opt-in, not a default). |
| Data | Versioned JSON + Zod | Keep player/team data in repo. Validate on load, fail loudly on schema errors. |
| Persistence | `localStorage` for prefs, `Dexie` + IndexedDB for drafts/results | Only reach for a DB when a feature needs cross-device sync/sharing. If you do, D1 + Drizzle is the most coherent with Cloudflare. |
| Auth | None for v1 | If added later, Better Auth with GitHub OAuth is preferable to hand-rolled email/password. Treat "no verification" as a documented shortcut, not a goal. |
| Styling/Charts | CSS variables + tokens, Tailwind optional | ECharts if complex charts are needed, otherwise avoid heavyweight viz libs. |
| Tests/QA | Vitest, Playwright, fast-check | Prioritize invariants (no double picks, eligibility, standings reconcile to box scores, seed determinism). Port your existing v8-v13 verification culture to automated tests. |
| CI/Hosting | GitHub Actions, Cloudflare Pages (previews on PRs) | No card, no idle sleep on the demo path. Keep a known-good legacy HTML as an archived reference (do *not* force `vite-plugin-singlefile` to recreate the monolith). |
| Tooling | pnpm, Biome | No monorepo tooling yet. Add workspaces/Turborepo/Nx only when you have multiple independently consumed packages. |

## Answers to your specific questions

- *Does "free" change the question to your friend?* Yes. Add hard constraints to it: "must work with no payment card, nothing on the demo path may sleep/idle-pause, server CPU must not be required for a 30+ minute Monte Carlo, and quotas must fail safely". Those constraints are what ruled out server-sim, ruled against relying on Supabase's paused free tier for a demo link, and make browser compute mandatory.
- *Next.js vs SvelteKit for interviews?* For sports gaming roles (EA/2K) either is fine if you can talk about your simulation engine. For general frontend roles React/Next gets more keyword matches. Don't pick based off of that alone: audit 5-10 actual job postings you're targeting this week and pick the majority. The hedge is to keep the engine framework independent so the UI swap is a chore, not a rewrite. Your friend's SvelteKit recommendation is defensible if you can articulate that tradeoff.
- *Should I add OAuth "just to know how"?* Only if it unlocks a feature you want to show off (e.g. share a saved playoff run) and you have time for its security surface area. "I know how to integrate OAuth" is a weak justification compared to "I built a deterministic sim with property tested invariants and seeded regression fixtures". If you do it, use a maintained library (e.g. Better Auth) and document the tradeoffs. 
- *Keep Biome or switch to ESLint/Prettier?* Keep Biome. Migrating for keyword recognition is not a strong engineering reason, and you already have it in the repo.

## Prioritized migration plan (to avoid the big rewrite)

Do not translate the entire HTML in one go. Do this in order with acceptance criteria. 

| Step | Task | Acceptance Criteria |
| :-- | :-- | :-- |
| 1. Stabilize | Snapshot `Football-Sim-Z-post-blue-w21.html` (and your known good build), reproduce and document the intermittent draft board disappearance. | A repro doc with steps/timings exists, and a "baseline run" is recorded. |
| 2. Characterize & test | Add a seeded RNG to the engine paths, capture golden fixtures from seeded runs, and write regression tests for draft order, eligibility, standings/playoffs. | Vitest suite covers the draft/standings invariants and can reproduce a known fixture. |
| 3. Extract engine | Move draft/roster/game/season/playoffs into `src/lib/engine/` as pure TS with explicit types and Zod schemas. | Engine has zero imports from DOM/framework code, unit tests pass, and parity checked against step 2 fixtures. |
| 4. Compute layer | Implement Web Workers to run simulations, with progress/cancel and seeded partitioning. Benchmark against your real workloads. | UI remains responsive during a long sim, results match seeded fixtures from step 3. |
| 5. Rebuild UI | Port to SvelteKit incrementally (e.g. draft board first, since that's your current bug). Use feature flags to swap panels. | Parity tests pass per migrated panel; legacy HTML remains available as a reference. |
| 6. Only if justified | Add IndexedDB saves, sharing, D1/Drizzle, or auth. | Written justification (user need + portfolio value) + free-tier check before adding any of these services. | 

Note step 1 is blocking. Your friend's and GPT's advice both converge here: prove equivalence with seeded runs *before* changing the model or framework. That's the most interviewable part of this project for both sports gaming and general engineering roles.

## Action items for you right now

1. Inventory 5-10 job listings for roles you're actually considering and tally React/Svelte/Vue. Use that to make the SvelteKit vs Next.js call (don't guess). 
2. Snapshot and regression-test the w21 draft bug first (step 1). This is the highest leverage use of your time and will inform what the engine extraction needs to encapsulate.
3. Write a short ADR folder (`docs/adr/`) for the decisions above as you make them (engine boundary, client compute, free-tier guardrails, framework). These are far more valuable to talk through in an interview than a longer dependency list.
4. Don't add auth/DB/monitoring this sprint. Only add them if they enable a feature that you can explicitly write down in an ADR as necessary.

Your instinct to optimize for "showing I know how to use the right tools" is correct, but for this project the right tool is usually *less tooling*. A well tested, deterministic engine with a clean boundary will say more to an EA/2K or research-adjacent interviewer than swapping to the trendiest framework ever will.
