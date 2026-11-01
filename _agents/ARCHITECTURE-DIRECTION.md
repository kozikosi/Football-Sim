# ARCHITECTURE-DIRECTION — from one HTML file to a project you can interview with
Author: Architect (Claude) · 27 Oct 2026 · **PROPOSAL. Nothing here is decided; the Owner decides (§6).** Review item: P-198. Labels: VERIFIED (I ran or read it) · REPORTED · INFERRED · UNKNOWN.
Trigger: the Owner's 26 Oct call with a senior engineer (questions kept verbatim in the Owner's message; the list is answered in §4).

## 1. Honest assessment
**What an engineer will find today (VERIFIED, measured 27 Oct):** Pre-Colors is 6,553 lines and 439 functions in one inline script; Z-post-blue is 9,958 lines and 479 functions. All functions are globals. `Math.random` appears 56 and 58 times with no seed, so no run can be repeated. One test file (169 lines), no CI (no `.github`), no types, no deployment story, no accounts. State is in memory (Pre-Colors has no `localStorage`; Z-post-blue has 5 uses). One page, no backend.
**What is genuinely strong, and rare in portfolio projects:** a simulation model whose position values are a *specification* (one table), a lab that fits the engine to it and proves the fit, tests that were shown to fail when the thing they guard is broken (`tools/mathlab/`), an evidence-labelled decision record, and a validation against 32 real rosters that reports honestly that it found no difference (r 0.673 → 0.665). That is the story to tell. The framework is not.
**What would hurt in an interview:** being unable to answer "how do you know it works?" (today: partly, via the lab), "can I run it twice and get the same result?" (no), "how is it deployed and who sees a failing build?" (not at all), and "could I add hockey?" (not without rewriting).

## 2. The one real conflict to resolve first
`AGENTS.md` §3 says the product is **one self-contained HTML file: no CDN, no build step for the user, no split into several files.** An interview-grade project has modules, types and a build. **These are compatible if the rule describes the delivered artifact only:** the source is many typed modules, a developer-side build step emits the one HTML file, the user still opens one file with nothing to install. I recommend that reading. Without it, everything below is blocked.

## 3. Staged path (each stage ships something usable; nothing is a blind rewrite)
| Stage | What | Why it matters in an interview | Effort (INFERRED) |
|---|---|---|---|
| 0 now | Freeze the engine spec and its tests; Owner approves the table, flex rules, posture (`ENGINE-MATH-SPEC.md`) | "Here is the model, here is the evidence" | done pending approvals |
| 1 | **Seeded random numbers** (P-031): one `rng()` replacing the 56 `Math.random` sites | Reproducible runs, replays, bug reports with a seed, honest before/after numbers | small, inside V23 |
| 2 | **Extract the engine** to a pure TypeScript module with no DOM: `simulate(rosters, plans, seed) → result`. The lab's tests move into plain Node tests (no browser), and run in seconds | Separation of concerns, types, fast tests, the answer to "can I remove a feature" | medium; after V23 ships |
| 3 | **CI/CD**: GitHub Actions runs engine tests, lint, the hash-pin check, builds the single HTML; every pull request gets a preview deployment (Cloudflare) | A visible green check, a deploy pipeline, "what happens on a bad commit" | small once Stage 2 exists |
| 4 | **UI on a framework** (SvelteKit or Next.js, §4) over the engine; Web Worker for simulation | Modern stack, responsive UI while simulating | large; only after 2–3 |
| 5 | **Persistence**: a database for seasons, drafts, shared links; localStorage kept only as a convenience cache | "Database > local storage": sync across devices, history, sharing | medium |
| 6 | **Accounts**: OAuth sign-in (GitHub/Google), never hand-rolled passwords | Security literacy, per-user data | medium; last, and only if there is per-user data worth protecting |
| 7 | **Second sport** through a `SportSpec` (slots, flex, unit composition, target value table, game model) | Proves the abstraction; GPT's `gpt/multisport-strategy-proposal` branch exists (UNREAD by me; review it at this stage) | medium–large |
**V23 timing.** Option A (my default): build V23 as planned (it carries your long UI list), with Stage 1 inside it and the engine kept in one delimited, already-tested block; extract (Stage 2) right after it ships. Option B: do Stages 1–3 first, V23 on top. B gives a cleaner base and delays every visible change by weeks of work that produces no new screens. You decide.

## 4. The senior engineer's questions
| Question | Today | Recommended answer |
|---|---|---|
| Framework? | None: vanilla JavaScript, one script, one page (VERIFIED) | Engine = TypeScript, framework-free (Stage 2). UI framework decided at Stage 4. |
| React vs Vue vs SvelteKit vs Next.js | n/a | The framework matters less than being able to defend it. React/Next.js is the most common in job listings (INFERRED, no data fetched); SvelteKit is smaller and quicker to learn and pairs cleanly with Cloudflare (REPORTED). **Next.js does run on Cloudflare, through the OpenNext adapter on Workers rather than Pages, with limits: Node middleware unsupported, 3 MiB compressed Worker size on the free plan (VERIFIED, opennext.js.org/cloudflare).** The friend's "may not work well" is partly right. My lean: SvelteKit. Decide at Stage 4, not now. |
| TypeScript > JavaScript | JavaScript | Yes, from Stage 2, starting with the domain types (Player, Slot, Plan, GameResult). |
| Local storage vs database | Memory plus 5 localStorage uses in Z-post-blue | Database from Stage 5. Reasons: multi-device, history, sharing. Cloudflare D1 (SQLite) or a hosted Postgres. **Free-tier limits of D1: UNKNOWN, not checked.** |
| "What happened when I clicked Simulate Season?" | For each week, each game goes through `simulateGame`: it draws the team's yards, turnovers and sacks from the model's expected values plus noise, turns them into points, and only then builds the scoring events and box score from the final score. **There is no snap-by-snap simulation; the recap's play-by-play is generated from the result (VERIFIED by reading `simulateGame`).** | Say so plainly and defend it: a team-level statistical model calibrated to real data is a legitimate design and cheaper than 150 plays × 272 games. Name what it cannot show (in-game injuries, drive-level events). |
| Shortcut? Simulate every game? | Every game is simulated; none skipped; player lines derived afterwards | Keep it; add an aggregate-only mode for Monte Carlo. |
| Upper limit on simulations? | **7.8 ms per game measured, so a 272-game season is about 2.1 s of game math** in headless Chromium (VERIFIED, 3,000 games). I expect the plan search inside each game to be most of that (INFERRED, not profiled). Running it on the page's main thread blocks the UI; box-score storage per game is unmeasured (UNKNOWN). | Web Worker plus an aggregate-only path: 1,000 seasons ≈ 35 minutes single-threaded today (computed), minutes with a cached plan and workers. State the limit in the README. |
| CI/CD | None | Stage 3: GitHub Actions + Cloudflare previews. |
| Cloudflare vs AWS | None | Cloudflare now: free, one command to deploy, enough for this. Be ready to name the AWS equivalents (S3 + CloudFront, Lambda, DynamoDB/RDS, Cognito); showing you chose with reasons beats showing you used the bigger tool. |
| Affordance | The Owner's own notes are mostly affordance fixes (the always-blue Change button, vanishing Draft button, stuck green bubbles). Z.ai is doing the UI. | A control should look like what it does and show its consequence: the new posture selector shows three options with one line each on what they change. |
| Authentication | None | Stage 6, OAuth via a maintained library; never store passwords yourself. |
| Another sport | NFL is hard-coded (28→29 slots, flex table, 32 teams) | Stage 7. The lab already shows the shape: a sport is data (slots, flex, composition, target values) plus a game model, and the fitter derives the weights. |
| Remove a feature without losing the whole? | **No.** Everything is global and shares state; even the build's smoke test names a tab list that V23's removal of the Guide breaks (`AGENTS.md` §9). | Stage 2 modules plus feature flags; and a CI job that deletes each feature module in turn and checks the rest still builds. That job is itself an interview demo. |

## 5. What you need to learn, in order (each with a first exercise that fits this project)
1. **Git and GitHub Actions**: add one workflow that runs `node tools/mathlab/check-design.mjs` on every push. (You already live in branches; CI is the next step.)
2. **Testing ideas**: unit versus property tests; what makes a test able to fail (you have seen this: break a weight, watch E1 fail).
3. **TypeScript basics**: type the `Player` and `Slot` shapes in one file; let the compiler find mistakes.
4. **How a web app talks to a server**: HTTP, JSON, one endpoint that returns a simulated game.
5. **SQL and one database**: store one season in two tables.
6. **One UI framework**, end to end, on one screen (the posture selector is a good small first screen).
7. **Deploying to Cloudflare**, then **OAuth** (concepts first: session, token, callback).
I have not checked learning resources; ask for a reading list and I will source and verify it.

## 6. Decisions for the Owner (defaults proceed except where marked)
1. **Does "no build step for the user, one file" describe only the delivered file?** Default **yes** (source may be modules; a developer build emits the single file). Blocks Stages 2–4.
2. **Goal.** Ship the game and build the interview story together, via the stages. Default **both**.
3. **V23 timing: Option A or B (§3).** Default **A**. *Wait for your answer before V23 starts, since you asked to settle structure first.*
4. **TypeScript for the engine from Stage 2.** Default **yes**.
5. **Framework: decide at Stage 4.** Default **defer**, leaning SvelteKit.

## 7. Not verified
Hiring-market claims (INFERRED); SvelteKit-on-Cloudflare specifics (REPORTED by the friend, not fetched); D1 free-tier limits (UNKNOWN); box-score memory per game (UNKNOWN); effort sizes (INFERRED); contents of `gpt/multisport-strategy-proposal` (not read).

Sources: OpenNext Cloudflare adapter notes, https://opennext.js.org/cloudflare (read 27 Oct 2026).
