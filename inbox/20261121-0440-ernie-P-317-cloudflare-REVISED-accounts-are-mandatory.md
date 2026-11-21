SPEAKER: ERNIE | ROLE: advisor (council seat) | TASK: REVISED deployment + architecture recommendation after the Owner's correction — accounts, cross-device sync, offline-conflict resolution, local→online migration and brag share are **release-blocking**, not future | DATE: 2026-11-21T04:40Z
FOR: the Owner (decision) · TO-ARCHITECT (`claude/cloudflare-decision-2026-11-21.md`, v8, runbook, releases schema)

## 0 · Correction first: I ranked these wrong

The Owner, 2026-11-21T04:35Z: *"Accounts are not a future goal; ideally they ship as soon as
possible. we wanted users to create an account and be able to track their stats beyond a single
season; this has been in the directive for a long time. sync saves and resolving offline changes and
migrating local saves into reconnection across devices are also a mandatory features before
deployment; also noted since the beginning. these are not future possibilites; these are all
mandatory to release along with the brag share. expansion into other sports, and more interactive
visuals like the photos and project i had you look at are more future goals. along with potentially
mutliplayer, etc."*

So my `…0420` and `…0430` filings put accounts/D1/DO/sync in "park" tier. **That is withdrawn.** The
brief I was reasoning from framed them as future capabilities; the correction is that they are the
release gate. Everything below replaces the tiering in those two files. Still advice only — nothing
implemented, no decision changed by me.

## 1 · The platform question is now decided, not marginal

| requirement | what it needs | Pages | Workers |
|---|---|---|---|
| accounts + profile | a server + a database | Functions + D1 ✅ | Worker + D1 ✅ |
| save sync / revisions | server storage + validation | ✅ | ✅ |
| per-account coordination, later multiplayer | Durable Objects | 🟡 **separate Worker, bound with `script_name`** | ✅ **native** |
| scheduled cleanup / retention | Cron | ❌ | ✅ |
| Cloudflare's own direction | — | "start new projects with Workers" | ✅ |

**Recommendation: Workers + static assets + Direct Upload.** Not because Pages can't do it — it can —
but because the mandatory set plus the *stated* future (multiplayer) lands squarely on DOs, and Pages
makes you keep a second Worker alive for them. Pages' one advantage (a custom domain whose DNS stays
elsewhere) is neutralised by the recommendation to buy a domain and move its nameservers.

## 2 · The mandatory stack, sized against the free plan (verified 2026-11-21)

| piece | design | free limit it must live in |
|---|---|---|
| **identity** | **email OTP / magic link via a free IdP** (Clerk/Auth0/Supabase free tier). Never roll your own password storage — account security is the one place where "I wrote it myself" is a liability, not a portfolio asset. Cloudflare Access + OTP is $0/50 seats but it *gates* a host, so it is for a `beta.` subdomain only. | IdP free tier (e.g. 10k MAU class) |
| **profile + career stats** | D1: `accounts`, `career_seasons`, `career_player_stats` | D1 free: 5 GB total, 500 MB/db, 5 M rows read/day, 100 k rows written/day |
| **saves** | D1: `saves(save_id, account_id, revision, updated_at, engine_version, payload)` | same |
| **sync** | pull/push by `revision`; the save is a **deterministic log** `{seed, picks[], pickSlot?}` so the server can recompute and validate rather than trust a blob | Workers 100 k req/day |
| **conflicts** | divergent drafts **fork** (never merge); metadata last-write-wins on `revision`+`updated_at`; never silent overwrite | no extra infra |
| **migration** | idempotent `PUT /saves/{saveId}` keyed by the `saveId` that already exists; "Link this device" → upload → sync code | no extra infra |
| **brag share** | a share URL carrying account handle + season record; PNG card generated client-side; OG tags from a Worker-rendered page | Workers static + one route |

All of it fits the free plan with room to spare at launch scale. The one number to watch is Workers'
**100,000 requests/day**, which is a hard daily cap (D1 returns errors when exceeded). Fine for launch;
not a reason to change anything.

## 3 · The hidden long pole: "stats beyond a single season" is not a UI feature

Verified in the engine (`src/engine/sports/nfl/engine/`): there is **one season**, `simulateSeason(
teams, rng, {year, prevRank, homeField})` → `SeasonResult`, plus `seasonrun.ts` for week-stepping.
There is **no offseason loop, no aging, no retirement, no draft class** — and `legacyprovider.ts` is
about the *event schema* for game logs, not career legacy.

Two ways to satisfy the directive, and the choice is the Architect's:

- **(a) shell-side accumulation — recommended for v1.** The shell loops seasons (`simulateSeason` per
  year, same league), and the account accumulates career totals keyed by player id. **No engine bytes
  change, the pin stays `408410477`, and the merge is unaffected.** Stats "beyond a single season"
  are real and persistent, just without player ageing.
- **(b) engine offseason model** (ageing, progression, retirement, draft classes). That is a genuine
  engine change → **the pin moves** → the frozen-pin doctrine, the golden seam and every receipt
  keyed to `408410477` need a re-pin sitting. Worth doing eventually; the wrong thing to open during
  the release push.

**Flag for the Architect:** if he judges (b) is required for "career stats" to be honest, that is a
pin change and it must be scheduled, not slipped in.

## 4 · A free architectural gift the account system exposes

The layer test already forbids DOM/clock/`Math.random` in `core`, `sim`, `app`, `view`. That means
**the identical engine can run on Workers**: the server can replay a client's `{seed, picks[]}` log
and recompute the same season, bit-for-bit. So:

- v1: the server stores aggregates and **records the client's `engineVersion`** (drift is visible,
  never silent).
- later, for any leaderboard or shared league: validation is *replay on the pinned engine*, not
  trust-the-client. Same code, two runtimes.

That is a genuinely strong portfolio line — "the same deterministic engine runs in the browser and on
the server, so results are verifiable" — and it costs nothing extra because the code is already pure.

## 5 · Non-negotiable constraint: accounts must be **additive**, never a gate

The product rule is that offline is a hard requirement. So the account layer must be:

- **optional to play**: the whole game, draft, season, and local saves work with no account, forever;
- **additive when present**: sign-in *adds* cloud save, career stats and brag share;
- **the bridge for factor 4**: "Link this device" is exactly the offline→online path.

This also keeps the demo (the thing a hiring manager sees first) instant and account-free, which is
better for the portfolio than a login wall.

## 6 · Revised critical path to release

The long pole is no longer UI polish — it is the account spine. Recommended order:

1. **Domain + Workers skeleton + D1** (final origin, `wrangler deploy dist`, no secrets in repo).
2. **Auth** (email OTP via IdP) + `accounts` row + session.
3. **"Link this device" migration** (idempotent PUT by `saveId`) — ship this early; it is also the
   best demo of the whole system.
4. **Save sync** (push/pull by `revision`) + **conflict rules** (fork / LWW, never silent).
5. **Brag share** (URL + PNG card + OG tags).
6. **Career stats loop** (§3a: shell-side seasons accumulating into the account).
7. **Side-by-side parity + visual polish**, then the Owner's make-live.

Steps 1–4 are the spine; everything else hangs off them.

## 7 · Risks to name now

- **Auth is the one place not to be clever.** Use an IdP; store only `account_id` + game data.
- **Privacy, even for a portfolio piece:** an account system implies "delete my data". One endpoint
  + one sentence in the privacy line is cheap and reads as senior.
- **Free-tier daily caps are hard caps**, not throttles — a traffic spike can exhaust 100 k
  requests/day. Acceptable at launch; worth a dashboard alert, not a design change.
- **The stale engine stamp (my D5)** must be fixed *before* step 2: a server that compares
  `engineVersion` will otherwise flag every save this build writes as foreign.
- **Do not** let the account system leak into the engine: accounts, sync and stats are shell+server
  concerns. The engine stays a pure deterministic function of (teams, ratings, seed).

## 8 · One-line recommendation

**Workers + Direct Upload + a domain on the final origin; D1 for accounts/saves/career stats; a free
IdP for email-OTP identity; save sync by revision over a deterministic log; divergent drafts fork;
migration is an idempotent PUT by the existing `saveId`; brag share as a URL + generated card; career
stats via shell-side season accumulation so the engine pin does not move. The game stays fully
playable offline with no account — signing in only adds cloud save, career and share.**

— ERNIE (advisor; signs as ERNIE, never as another seat)