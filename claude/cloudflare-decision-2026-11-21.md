# Cloudflare deployment decision (Architect, 21 Nov 2026) — REVISED 05:33Z: Workers Static Assets + one thin Worker

Authority: Owner, 21 Nov (filed by pickle, `a904019`): "i want claude and the council to deicde oh how to deploy to cloudflare"; and, ~05:18Z, he sent the substrate back to the Architect "as a recommendation by consensus from the council and as a question to claude". The Architect decides. Reasons and sources: `inbox/20261121-0533-architect-FOR-pickle-RULINGS-hosting-stats-auth.md`. Labels: V verified, R reported, I inferred, U unknown.

**History kept.** The first version of this doc (commit `169e554`) chose Cloudflare Pages + Direct Upload. Its two stated reasons are void: (a) "no server code" is false since accounts, sync, conflict resolution and migration are mandatory (Owner, 21 Nov); (b) "the domain is U" is closed: there is no domain and never will be (Owner: "free now and always"). Superseded, not deleted.

## Decision
1. **Product: one Cloudflare Worker with Static Assets.** It serves the built `dist/` and owns `/api/*` (auth, sync, stats). Pages is not used.
2. **Deploy is explicit.** `wrangler deploy`, run by the Architect or the Owner only after the Owner's "go". Not Git auto-deploy (a push would publish before the side-by-side and receipts are seen).
3. **Data: D1 only at v1** (Better Auth tables, saves, run ledger; sessions in D1). **No KV, no R2, no Durable Objects at v1.** D1 holds a row up to 2 MB (V, d1/platform/limits); last-write-wins per slot is a conditional `UPDATE … WHERE revision = ?` (P-254). Revisit R2 only if a measured envelope nears 2 MB.
4. **Hostname (corrected):** a Worker is served at `<worker-name>.<account-subdomain>.workers.dev` (V, workers/configuration/routing/workers-dev), so a bare `76pancakes.workers.dev` is not possible. Target: account subdomain `76pancakes`, Worker `play` → **`play.76pancakes.workers.dev`**, or the closest free variant if either is taken; exact string pinned in `releases.md` at rehearsal (U until then). No registrar, no nameservers, no custom domain. Cloudflare calls workers.dev a hobby/personal host (V); accepted under "free now and always".
5. **No secrets in the repo, bundle or chat. Ever.** Worker secrets are set by the Owner with `wrangler secret put`; login preferred over a stored token.
6. **Build contract with Z.ai (unchanged in kind):** a static `dist/` from `index.html` only (no dev page), sha256 and zip sha256 recorded in `claude/releases.md` before upload. Added: root-relative asset URLs (`base: '/'`); backend calls use relative `/api/...`; no `_redirects`/`_headers`; no hard-coded host; Z.ai writes no wrangler config and deploys nothing.

## `wrangler.jsonc` (not created yet; created at the rehearsal, no secrets)
```jsonc
{
  "name": "play",
  "main": "./worker/index.ts",
  "compatibility_date": "<date of first deploy>",
  "assets": {
    "directory": "./dist",
    "binding": "ASSETS",
    "not_found_handling": "single-page-application",
    "run_worker_first": ["/api/*"]
  },
  "d1_databases": [{ "binding": "DB", "database_name": "play", "database_id": "<set at creation>" }]
}
```
`run_worker_first` as an array needs Wrangler 4.20+ (V). Free plan: 20,000 files per version, 25 MiB per file (V).

## Procedure
- **Rehearsal first (not make-live):** create the Worker and D1, deploy a build, record a `releases.md` row, deploy a second throwaway build, `wrangler rollback` to the first, record what the dashboard and a stale open tab actually did (version skew, below), then delete nothing. Run the auth spike in the same sitting (see the FOR file, section 3). Only then go live.
- **Make-live:** gates 1-10 green, side-by-side filed and seen by the Owner, Owner says "go", `releases.md` row written first, `wrangler deploy`, then verify live hashes, 390 px and console gates against the live URL.
- **Rollback:** runbook section 6 (history first, pinned artifact second). `wrangler rollback` creates a new deployment at 100% of an earlier version (V, workers/versions-and-deployments/rollbacks). It asks for confirmation if a secret differs between versions (R, older changelog).
- **Known limit, recorded not fixed:** after a rollback, a page loaded from the newer version can request an asset the older version lacks (V, versions-and-deployments/version-skew). Saves are unaffected.
- **Write budget (D1 Free, V, enforced since 1 Sep 2026):** 100,000 rows written a day, 5 M read, 5 GB total, 50 queries per invocation (a `batch()` counts as one). Debounce and budget rules go in the account/sync contract.

## Still the Owner's (U)
Cloudflare account (free, no card); the account subdomain string; creating the GitHub OAuth App and setting the two Worker secrets himself once the hostname is pinned; who holds the account. No repo work creates these.
