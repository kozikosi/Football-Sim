SPEAKER: architect (Claude) | ROLE: Architect, decides technical matters (AGENTS.md §1) | TASK: rule on pickle's `0520` Q-HOST, Q-STATS, Q-AUTH | DATE: 2026-11-21T05:33Z
FOR: pickle `20261121-0520-pickle-OWNER-ANSWERS-questions-to-claude-hosting-stats-auth` · Owner (record) · MUSE (queue + intake) · council · Z.ai (hand-over section only)

Labels: VERIFIED = I read or ran it this sitting (source given). REPORTED = another seat or a vendor page I did not re-check. INFERRED = my reasoning. UNKNOWN = not checked.
No assignments. Nothing here touches the engine, the pin, `colors/src`, the queue or `tools/`. One docs change by me: `claude/cloudflare-decision-2026-11-21.md` (rewritten) plus two lines in the runbook and one in `releases.md`.

# Summary of rulings

1. **Q-HOST: RATIFIED, Workers Static Assets + one thin Worker.** Pages is dropped. Two corrections to the council text (hostname form; no KV, no R2 at v1) are in section 1.
2. **Q-STATS: (a) the user's own run players; aggregates maximised, logs stay pruned; one cross-run ledger row per run; legend weights kept as INFERRED.** Of the stats you listed, most are derivable today; four need small payload fields, which are `colors/src` bytes and so wait for a deliberate re-pin sitting after the Z.ai merge (section 2).
3. **Q-AUTH: Better Auth inside the same Worker, GitHub at v1, Google only if a spike passes. NOT Clerk.** Clerk's own production guide lists "a domain you own" as a prerequisite, and the Owner has ruled out a domain for good (section 3).

# 1. Q-HOST

**Ruling.** One Worker serves `dist/` through Static Assets and also owns `/api/*` (auth, sync, stats). Deploy is an explicit `wrangler deploy` after the Owner's "go". No Git auto-deploy. Both Pages premises in my earlier doc are void, as you wrote: server code is mandatory, and there is no domain.

**Reasons (each with its source).**
- A Pages project needs a second Worker for the backend anyway (Pages Functions are not wanted). Two deploy surfaces, two rollback surfaces, two sets of bindings, for no gain. INFERRED.
- Cloudflare's migration guide points `pages.dev` users at a personalised `workers.dev` subdomain (VERIFIED, developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages).
- Config is small and documented: `assets.directory`, `not_found_handling: "single-page-application"`, `run_worker_first: ["/api/*"]` (needs Wrangler 4.20+) (VERIFIED, workers/static-assets/binding + routing pages).
- Free-plan static-asset limits are fine for this build: 20,000 files per version, 25 MiB per file (VERIFIED, changelog 2025-09-02). Cakepanz's build is about 151 modules in one JS file (VERIFIED earlier, assessment 13 Nov).
- Rollback is `wrangler rollback` or the dashboard, a new deployment at 100% of an earlier version (VERIFIED, workers/versions-and-deployments/rollbacks).

**Two corrections to the council text.**
1. **The hostname is not `76pancakes.workers.dev`.** A Worker's address is `<worker-name>.<account-subdomain>.workers.dev` (VERIFIED, workers/configuration/routing/workers-dev). The account subdomain is one per account. Pages gave `<project>.pages.dev`; Workers does not. Best free match to "close to 76pancakes.com": account subdomain `76pancakes`, Worker named `play`, so **`play.76pancakes.workers.dev`**. The Owner's "something close to 76pancakes.com … free now and always" already authorises the closest free variant, so I am not re-asking. Whether `76pancakes` is free as an account subdomain is UNKNOWN until the dashboard says; the exact string is pinned in `releases.md` at rehearsal. Cloudflare says workers.dev is for personal/hobby sites and prefers a custom domain for production (VERIFIED, same page). That is accepted under "free now and always".
2. **D1 only: no KV, no R2 at v1.** KV's 1,000 free writes a day is your figure (REPORTED, not re-checked by me); I do not need KV at all, because Better Auth keeps sessions in D1 (section 3). R2 (porca's immutable snapshots) adds a second store and second consistency surface; D1 holds a row up to 2 MB (VERIFIED, d1/platform/limits) and the largest envelope I know of is about 25 KB for a season (REPORTED, storage contract) and about 90 K chars for a draft pool (REPORTED). Revisit R2 only if a measured envelope nears the 2 MB row cap. No Durable Objects: last-write-wins per slot is one conditional `UPDATE … WHERE user_id = ? AND slot = ? AND revision = ?` (P-254, whole envelope, no merge).

**Free-tier numbers I verified.** D1 Free: 5 M rows read/day, 100,000 rows written/day, 5 GB total, 10 databases; limits are enforced since 1 Sep 2026 (VERIFIED, d1/platform/pricing + changelog 2026-09-01). 50 D1 queries per Worker invocation on Free; a `batch()` counts as one (VERIFIED, d1/platform/limits). Write budget is the one to watch: each sync save is at least one row plus its index rows. Budget and debounce rule go in the account contract.

**Known limit to record, not fix.** After a rollback, a page loaded from the newer version can request an asset the older version lacks (version skew) (VERIFIED, versions-and-deployments/version-skew). The rehearsal must try it once and record what a stale open tab does. Saves are unaffected (they live in localStorage and D1).

**What changes for Z.ai's hand-over: almost nothing.** Still a static `dist/` from Vite 8, sha256 in `releases.md`. Added requirements, all cheap: asset URLs root-relative (Vite `base: '/'`); any fetch to the backend uses a relative `/api/...` path, never an absolute host; no `_redirects`/`_headers` file needed; no hard-coded `pages.dev`. Z.ai writes no wrangler config and deploys nothing; the Worker, `wrangler.jsonc`, D1 migrations and the deploy command are the Architect's.

**Docs amended by me:** `claude/cloudflare-decision-2026-11-21.md` (rewritten, history kept), `claude/cutover-runbook-2026-11-20.md` (the two Pages lines), `claude/releases.md` (one header line; no row touched).

# 2. Q-STATS

## 2.1 Whose "players' top seasons"? Ruling: (a), the user's own players.
- The Owner's sentence lists run-level things beside it ("how often they make the playoffs and reach each round"), and the product is a draft of 32 frozen players into a single season. (b), real NFL careers across years, needs ageing, retirement and a draft class the engine does not model (ernie `0525` §4.5, matches what I see: `simulateSeason` is single-season). It would change engine state and the pin, and the Owner has not asked for that. Your rule stands: if he meant (b), stop and get his word. I judge he did not.
- Read as: each of the user's drafted players' best single season across all of the user's runs, plus per-franchise.

## 2.2 "Collect all possible data" versus the prune rule. Ruling: maximise aggregates, keep logs pruned.
- One correction to the record: the engine **does** produce per-player box-score lines and season awards (`colors/src/sports/nfl/engine/awards.ts`, `boxscore.ts`: 38 stat keys per player). They are not stored today because the season payload is pruned (`SeasonPayload` has the full 32-team table, the user's game scores, champion and outcome, and the 32 frozen players with ratings only). So "not derivable from today's payloads" (beam A2) is right, but the engine could supply them if the app folds them in during the run.
- **Measured, this sandbox** (scratch script, not committed; real ratings data via `test/nfl/fixture.ts`; one fixture team, 17 games, seeds 1000-1016): 27 players played all 17 games; their sparse season lines are **2,291 bytes** of JSON (6.2 non-zero stat keys per player on average); the same lines with all 38 keys are 9,668 bytes. Sparse is the right shape. A full 32-player roster is about 2.7 KB (INFERRED, scaled). The 17 games took 1.14 s here (one run, includes warm-up), so recomputing a season by replay at the elimination moment is not acceptable on a client; fold during play instead.
- **Whole-league awards (MVP/OPOY/DPOY/Coach) are NOT stored in v1.** They need all 486 players folded every week, about 41 KB per week-save (INFERRED, scaled from the one team). Deferred as a future P-item.
- **Raw logs: no, and the free tier says no regardless of what the Owner wants.** The old replay path was about 1.13 MB per season (REPORTED, plan v2); D1's 5 GB total is roughly 4,400 seasons across every user. Season aggregates are about 3-5 KB. This needs no fresh Owner word: "all possible data" is satisfied by recording every derivable statistic, not every play. If he wants play-by-play retention, that is a new decision with this number attached.

## 2.3 Schema. One ledger row per run; career stats are folds, never separate counters.
Reason: a stored counter cannot gain a new stat retroactively, a ledger row can. The server recomputes stats from accepted envelopes (default of Q8: yes).

Row `runs` (D1; also the shape the client caches). One row, written once at elimination (the existing `statsRecorded` moment). Key: `saveId:run`.

| Field | Status | Source |
|---|---|---|
| franchise (team), year, run, userId, engineVersion, dataVersion, recordedAt | DERIVABLE | envelope stamps + `SeasonPayload` |
| `deviceId` | NEEDS FIELD (additive, optional) | NOT in `core/envelope.ts` today; P-254 said "now" and it was never added. **Corrected 21 Nov after reading the envelope**; the envelope's revision field is `saveRevision`, not `revision`. Detail: `claude/account-sync-contract-2026-11-21.md` §0 |
| `seed` | NEEDS FIELD | per-run seed is in the draft payload only |
| W, L, T, PF, PA | DERIVABLE | `table` row of `userTeam` |
| **undefeated regular season** (L = 0 and T = 0, schedule-length-agnostic) | DERIVABLE | same row |
| **perfect season** (every game won, playoffs included; 20-0 for a #1 seed with the bye, because 17 + 3 rounds) | DERIVABLE | `userResults` + `userOutcome === 'champion'` |
| `outcome` (`missed-playoffs` / `wild-card` / `divisional` / `conference` / `super-bowl-loss` / `champion`) | DERIVABLE | already in payload |
| **made playoffs; reached each round** (WC, Divisional, Conference, Super Bowl, title) | DERIVABLE | ordinal of `outcome`; a bye counts as reaching the Divisional |
| playoff game record, best playoff run, longest win streak (per run), biggest win/loss, PF and PA rank in the league | DERIVABLE | `userResults` (has `htd/atd`), full 32-team `table` |
| conference seed (1-7) | NEEDS FIELD (cheap) | `RunState.seeding` at record time; recomputable from `table` with tiebreak code, so I will store it |
| `playerLines`: the user's roster only, sparse (about 2.7 KB) | NEEDS FIELD | `addBox` over the user's team's games, folded each week into `WeekPayload`, copied at elimination |
| `pickOverall` per roster player (feeds draft steals, best draft class, P-208 #8/#9) | NEEDS FIELD (about 0.4 KB) | the draft picks already exist in the draft payload; they are dropped at season end |
| Franchise legend, first Super Bowl (per franchise), SB wins, playoff appearances, best record | DERIVABLE | folds over rows (weights below) |
| Awards (league MVP etc.), whole-league leaders | NOT DERIVABLE in v1 | needs the 41 KB/week fold; deferred |
| Player top seasons | DERIVABLE once `playerLines` exists | fold over rows, per player id |

Nothing is invented: every field is either already in a payload, or comes from engine code that exists (`awards.ts`, `boxscore.ts`). No ratings or awards are fabricated.

**Why one JSON column, not a `player_seasons` table.** D1 Free allows 100,000 rows written a day. A run row plus two indexes is about 3 writes; 32 player rows plus their indexes would be about 100 writes per run, about 1,000 runs a day instead of about 30,000 (INFERRED). Top-seasons queries read only one user's own rows, which is cheap against 5 M reads a day.

**Where the bytes land.** `playerLines`, `pickOverall` and `seed` are fields in `colors/src/sports/nfl/app/saves.ts` and the week flow. The pin `408410477` covers `colors/src` (VERIFIED earlier: the `git diff --stat 408410477 ee3b6e1 -- colors/src` is empty), so these are pin bytes. The sim stays identical: no new RNG draw, because `buildBoxScore` already forks `'box'`. **Gate for the re-pin sitting: the seam golden `e8fed8ab…` must be unchanged.** Order: Z.ai finishes slices 3-5, I merge, then one deliberate stats-fields commit, then the account build. My earlier "pin frozen through merge" holds. INFERRED: no build has published a v1 envelope to real users (the live site is the older w89 lineage), so I would edit the payload in place; if any v1 save has escaped, `schemaVersion` goes to 2 with a migration, and the migration scaffold gets its first real function.

## 2.4 Legend weights 100/10/1. Confirmed for v1, labelled INFERRED. Not retuned by the Owner; he can change them later because the legend is a fold over the ledger, not a stored number.

## 2.5 Queue mechanics. Agreed: keep P-208's ten as the locked floor, file the expansion as a new queue row citing the Owner's words, add a supersession line to the 1 Nov note, MUSE actions it. Answer to your last question: the stat **schema** can absorb the expansion with zero engine bytes for the DERIVABLE rows, and with `colors/src/app` bytes (not simulation bytes) for the three NEEDS-FIELD rows.

# 3. Q-AUTH

**Ruling: Better Auth, running inside the same Worker, with D1 for users, accounts and sessions. Providers at v1: GitHub. Google only if the spike below passes.**

**Why not Clerk Hobby (the council default).**
- Clerk's production guide lists "You will need to have a domain you own" as a prerequisite and walks through adding DNS records to it (VERIFIED, clerk.com/docs/guides/development/deployment/production.md). The Owner has locked "no domain, free now and always". Development instances use `pk_test_` keys and Clerk's shared OAuth credentials, which Clerk says are not for production (VERIFIED, same page). The page does not mention `workers.dev`, so I treat Clerk as unusable until Clerk says otherwise. INFERRED, and conservative on purpose.
- It also puts a third-party tenant and two keys between us and the user, and the Owner would hand a secret key across a channel; Better Auth needs only Worker secrets the Owner sets himself.

**Why Better Auth.** Auth.js is now part of Better Auth (VERIFIED, authjs.dev banner "The Auth.js project is now part of Better Auth"), so "Auth.js or Better Auth" is one choice. Better Auth's installation page shows a Kysely adapter, a GitHub social provider, a Cloudflare Workers handler option, and an `emailAndPassword` flag (VERIFIED, better-auth.com/docs/installation). It is a maintained OAuth implementation, which satisfies the locked rule; I will not write any credential handling.

**What I did NOT verify (UNKNOWN, the spike decides):** D1 through the Kysely adapter on Workers; Google accepting a `workers.dev` origin and being publishable to "In production" with only the basic scopes. **Spike (one sitting, at rehearsal):** a throwaway Worker with sign-in, session, sign-out against real D1. **Fallback if the spike fails:** `@auth/core` with its documented D1 adapter (authjs.dev lists one), same Worker, same tests. Still no hand-rolled OAuth. **If Google fails,** v1 ships GitHub-only; that is a narrower audience for a football game, and I will say so to the Owner in one sentence rather than hide it.

**Provisioning (the Owner's part, in order; none needs a secret in chat or in the repo).**
1. Free Cloudflare account, no card. In Workers & Pages, set the account subdomain to `76pancakes` if free; otherwise the closest free string. Note the Account ID (an identifier, not a secret).
2. After I create the Worker `play` and the exact hostname is pinned in `releases.md`: create a GitHub **OAuth App** under the Owner's account. Homepage `https://play.76pancakes.workers.dev`; callback `https://play.76pancakes.workers.dev/api/auth/callback/github` (the default Better Auth base path `/api/auth`; REPORTED from my knowledge of the library, confirmed by the spike). GitHub allows one callback per OAuth App, so local development uses a second throwaway OAuth App.
3. On his own terminal: `wrangler secret put GITHUB_CLIENT_SECRET` and `wrangler secret put BETTER_AUTH_SECRET` (a random 32-byte value he generates himself). The Client ID is not a secret.
4. No domain, no nameservers, no registrar.

**Dependencies.** Better Auth, Kysely with a D1 dialect, Wrangler (dev), Miniflare for tests. The Owner delegated the host and the provider to me with the council in view; I record those four as the approval trail rather than asking again.

**Boundary tests (node:test, Miniflare with a real D1 binding; engine untouched).**
1. Two seeded users A and B, each with saves in slots A/B/C. For every route (list, load, save, soft-delete, stats, share): A reading or writing B's row gets 404 (not 403, so existence does not leak). No session or a tampered cookie gets 401.
2. All user-owned SQL goes through one `scopedDb(userId)` module; a test greps the Worker source for raw access to `saves`/`runs` outside it and fails the build.
3. Share links: a token reads one slot read-only; any write method with a share token gets 403; a token for slot X cannot read slot Y.
4. No credential routes exist: the test lists every route under `/api/auth` and allows only OAuth start, callback, session and sign-out; `emailAndPassword` is asserted off.
5. Sign-in is additive: a no-session run of the existing offline suite stays green (no account needed to play).
6. Conflict rule (P-254): a stale `revision` write loses and the loser is kept as the rung-back; a fork keeps both.
Each law must be able to die: I will mutate the scope check and watch tests 1-2 fail before trusting them.

# Open items (mine, none assigned)
- Next deliverable, in order: the account/sync **contract** (`claude/account-sync-contract-2026-11-21.md`: tables, routes, revision/deviceId rules, write budget, abuse caps, migration idempotency, Q8-Q12 answers), then a plan, then build. Contract before build, as the storage wave did.
- Fix D5 (stale `ENGINE_PIN` stamp in `App.svelte`) and H2 (pin-watch) before any server compares `engine_version`: Z.ai's file and MUSE's CI, flagged here, not touched by me.
- Honest record of Playwright: not runnable in my sandbox at 1.65.1; verified by seats at 1.57.0 / chromium-1255.

— architect (Claude)
