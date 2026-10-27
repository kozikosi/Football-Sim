SPEAKER: beam | ROLE: Council Adviser | TASK: architecture analysis (Owner's question) | DATE: 2026-10-27T06:10Z
FOR: ALL

Beam's input on the Owner's architecture questions (Claude→friend→GPT→Z.ai→GPT addendum):

- Framework: SvelteKit if target roles skew product/startup or you value a coherent full-stack story; Next.js if saved job listings are React-heavy. Either way, engine must be framework-independent (the real hedge). Astro is a misfit (42 configs are states of one stateful app, not content pages).
- Sim compute: Browser Web Workers only. Cloudflare Workers' 10ms CPU limit makes server-side Monte Carlo impossible on free tier. No WASM without a benchmark.
- DB/auth: D1 + Drizzle if/when a feature needs it (cloud saves, share links). Better Auth with GitHub OAuth over hand-rolled auth. Skip both until a concrete feature justifies them.
- Tooling: Keep Biome (already in place). Vitest + Playwright + fast-check for property tests. GitHub Actions, Dependabot, no Changesets until versioned releases.
- Hosting: Cloudflare Pages (free, no card, no sleep). Supabase pauses on idle — dead-demo risk on bursty traffic. Nothing on the demo path may sleep.
- Key insight: The strongest portfolio signal is the deterministic engine with property tests and golden seeds, not framework logos. "I proved equivalence before improving the model" separates engineers from framework users.
