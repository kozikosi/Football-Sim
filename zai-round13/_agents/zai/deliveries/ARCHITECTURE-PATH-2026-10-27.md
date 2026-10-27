# ARCHITECTURE PATH — how we move forward structurally · 2026-10-27 · Z.ai (High Councillor)

**FOR: the Owner — the "let's talk about the architecture" round · STATUS: council work (advice + exact steps), nothing here changes the product.**
**One sentence up front:** your friend is right about every structural point, and none of his points require throwing the product away — they require **extracting the engine you already have into typed, tested modules and wrapping it in a thin modern shell with a database and a pipeline**. The math engine is the rare part; the shell is a weekend each. Below: his questions answered in his order, then the phased plan.

---

## 1 · His questions, answered straight

**"What framework is this site built in?"**
None. It is a single hand-rolled HTML file (~657 KB) — vanilla JS, one `<script>`, no dependencies, no build step. That is why it feels opaque to a framework person, and it is also why it has zero supply-chain risk and runs anywhere. Say it proudly in an interview, then show the migration plan below.

**"React vs Vue / SvelteKit / Next.js?"**
The honest ranking *for this project*: the framework matters far less than the **separation**. Recommendation:
- **SvelteKit** if you want the smallest, fastest shell and the cleanest story ("the sim is plain TS; the UI is a thin Svelte skin").
- **Next.js** if the resume target is React jobs (larger ecosystem, App Router, easy API routes for the backend).
- React/Vue without a meta-framework buys nothing here.
Either way the rule is: **the engine never learns about the framework.** It becomes an imported package of pure functions; the framework is a remote control.

**"TypeScript > JavaScript?"**
Yes — but adopt it in the order that protects the math: (1) extract the engine, (2) add JSDoc types + `// @ts-check` so it's typed *today* without a build step, (3) convert to real `.ts` in the same PR as the extraction. The types that matter are the data contracts: `Player = [name, pos, team, ovr, …]`, `SlotMap`, `TeamRatings`, `GameResult` — once those are typed, `effOvr`, `matchupModel`, `slotWins` become self-documenting. Keep the style law (integers only, no floats in display) as **compile-time-branded types** (`type Wins = number & {__wins:1}`) — that turns a style guide into a compiler check, which is a great interview line.

**"What happened when I clicked 'Simulate Season'? Is there a shortcut? Are stats generated elsewhere? Upper limit?"**
Fully answered with measurements in `ENGINE-MATH-2026-10-27.md` §1–2 (short version: every game is simulated individually by a plan-aware matchup model; stats are accumulated game-by-game, not faked; ~0.2–0.3 s per season, 100-season runs are the right cap today, 1,000+ need a Web Worker). For interviews, the missing piece is **reproducibility** — the seeded RNG in that same doc (§5) turns "I clicked a button" into "here is seed 12345, identical league every time" — that is the difference between a demo and an experiment.

**"Have some basic backend / persistence. Database > localStorage."**
Agreed, in this order:
1. **Now (V23, no backend):** localStorage autosave of draft state — already queued as P-011, keep it with try/catch + versioned keys (`zpb.draft.v1`), because it makes the single file feel like an app.
2. **Phase B (first real backend):** one table, one sync endpoint — `leagues(id, seed, rosters_json, standings_json, updated_at)`. The draft is the state worth syncing; games can be recomputed from the seed (that is what the seeded RNG buys: store 8 bytes, replay the world).
3. Choose **SQLite-shaped storage** — Cloudflare D1 if you follow the Cloudflare path below; Postgres (Supabase/Neon free tiers) if you'd rather show SQL skills. Do **not** build the backend before the engine extraction — a backend wrapped around a 6,000-line JS blob just ships the blob with extra steps.

**"AWS deployment vs Cloudflare / CI/CD (he recommends Cloudflare, free, 'might not work well with Next.js')."**
Your friend's instinct is right with one correction: Cloudflare Pages **does** do Next.js now (via OpenNext adapter), but it is genuinely best with SvelteKit/Astro/static. For this project:
- **CI (do this first, it changes everything):** GitHub Actions on every push — `node --check` → the verify suites already in the council's `tools/` (they are headless today!) → a Playwright smoke run (draft + sim one week + 390 px and 1280 px screenshots) → size budget check (fail if the single file grows >2 % without reason). This costs one YAML file (~80 lines) and gives you the interview slide "every push is verified by a robot council".
- **Hosting:** the single file deploys to **Cloudflare Pages today, free, as-is** (drag-and-drop or `wrangler pages deploy`). Later: SvelteKit on Pages + one **Worker** for the sync API + **D1** for storage — all inside the free tier at this project's scale. AWS is the answer only if you want "I know AWS" on the resume (then: S3+CloudFront static, Lambda+API GW for sync, RDS Postgres); it is more moving parts and more bill surfaces for zero product gain at this size.

**"Authentication — username/password or OAuth?"**
**OAuth first, never roll your own passwords.** Google (and optionally Discord, which fits the gaming audience) via a hosted flow. On Cloudflare: Workers + `workers-oauth-provider`, or put the whole auth question one layer away with Supabase/Firebase Auth (free tier, battle-tested, session handling done). Username/password is a liability (hashing, reset flows, rate limiting) with zero product value at this stage — the leaderboard/sync feature wants "prove it's you", and OAuth does that in an afternoon.

**"Affordance" (his word for the draft buttons + dark hover contrast)**
Two design laws to adopt in the next PreColors build (they belong to the P-183 style-law round, so I have only *proposed* them, not built them):
1. **One primary action per panel.** The draft button is the only filled/gold element on a player row; everything else is quiet. A button that must be found is a bug — hover states **brighten** on this palette (the friend's contrast complaint is real: dark-on-dark hovers fail WCAG contrast; target ≥4.5:1 for interactive elements).
2. **The next action is always lit.** During the draft, the primary button gets the shimmer treatment the Owner already loves ("20-0?" sweep) — affordance by the app's own design language, not by adding chrome.

**"Adding another sport / can you remove a feature without losing the whole?"**
This is the modularization argument, and the answer is the **four-layer seam**:
```
DATA (players/teams/slot names)  ← sport pack: football.json / basketball.json
MATH (slots→units→games→seasons) ← knows "26 slots, 9 units, Poisson/Pts model", never "football"
PRESENTATION (render/panels)     ← reads only the MATH's outputs
NARRATIVE (recaps/why-boxes)     ← pure functions of GameResult
```
Today all four live interleaved in one file (KI-012: 195 DOM refs + 87 listeners inside the math zone — measured by DS's arch-probe; KI-015: no SIM-CORE boundary). Once the seam exists, "add basketball" = write a sport pack + reskin, "remove the draft recap" = delete one module with tests staying green (CI proves it). The single-file build stays as the **output artifact**: a build script inlines the modules into `Football-Sim.html` — the Owner keeps his one-file law, the codebase gains the seams.

## 2 · The phased plan (what I'd put on the interview slide)

- **Phase 0 — now / V23 (unchanged pipeline):** the next PreColors version ships the three friend-fixes (badge law, brightened hovers, lit draft buttons) + the engine-math items from today's doc (legality test, KI-005 close-out). Single file, Architect builds, verify suites gate it. *Nothing about the architecture changes in this phase — it stays the product the Owner knows.*
- **Phase A — the extraction (the big one):** `sim-core` as typed pure functions + seeded RNG + headless entry points (`buildLeagueFromDraft`, `simulateSeason(seed, weeks)`) with zero DOM refs; the single-file HTML becomes a **build output** that inlines it. Kills KI-001/002/012/015 in one move and makes the council's three-review chain apply to the actual seam. *Interview story: "I refactored a 6,500-line simulation in place, behind tests, without breaking the product."*
- **Phase B — persistence + identity:** localStorage → D1/Postgres sync (one table), OAuth (Google), "share your seed" permalinks. *Interview story: "state lives in 8 bytes of seed and a roster JSON; the rest is recomputable."*
- **Phase C — the shell + CI/CD finish line:** SvelteKit (or Next.js) UI consuming `sim-core`, GitHub Actions → Cloudflare Pages + Worker API, preview deploys per council branch. *Interview story: a real pipeline, real auth, a real database — and a simulation engine that never depended on any of it.*
- **Phase D — the flex:** a second sport pack (basketball is the natural one: possessions instead of drives, the same log-linear shape) to prove the seam. *Interview story: the architecture claim, demonstrated.*

## 3 · What I explicitly do NOT recommend
- Rewriting the UI in a framework *before* Phase A (you'd re-embed the blob in React — the classic trap).
- AWS as the first cloud (right answer only for the resume keywords; Cloudflare's free tier covers this project end-to-end).
- A backend before the seeded RNG (you'd be persisting non-reproducible randomness).
- Rolling your own auth. Ever.

## 4 · What this changes for the council
Nothing in law. The V23 product line (Architect builds from PreColors) is untouched through Phase 0; Phase A+B+C are exactly the kind of work the existing PRIORITIES tiers absorb (I have filed the first council items: the badge law test under P-133, RNG under P-030/P-031, FB/P under P-141). The friend's UI notes are filed as PRIORITY+ proposals for the style-law round, not silently adopted.

— Z.ai · round 13 · "the engine is the moat; the shell is a weekend"
