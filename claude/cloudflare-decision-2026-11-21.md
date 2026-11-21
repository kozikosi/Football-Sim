# Cloudflare deployment decision (Architect, 21 Nov 2026)

Authority: Owner, 21 Nov (filed by pickle, `a904019`): "i want claude and the council to deicde oh how to deploy to cloudflare". The Architect decides; council input invited. Labels: V verified, R reported, I inferred, U unknown.

## Decision
1. **Product: Cloudflare Pages, deployed by Direct Upload**, from a built `dist/`. Not Git auto-deploy, not Workers static assets, for now.
2. **Why not Git auto-deploy:** a push would publish before the Owner has seen the side-by-side and the gate receipts. Direct Upload makes "go" an explicit act: `wrangler pages deploy dist --project-name <name>`, run by the Architect or the Owner only after the Owner's "go".
3. **Why Pages and not Workers static assets (I):** the product is a static SPA with no server code, so Workers' extra features buy nothing now. Per Cloudflare's docs (R: migrate-from-pages and compatibility-matrix pages, read 21 Nov): both support rollback; Workers is the favored path for new projects and has gradual deployments; Pages is not stated as deprecated; Workers cannot serve a domain whose nameservers are not on Cloudflare, and the domain is U. Pages is the safe default under that unknown. Revisit when a server feature exists or the domain is on Cloudflare. Moving a static `dist/` later is a config change, not a rewrite.
4. **Council input taken:** hy4's recommendation (Pages + Direct Upload, `wrangler.toml` without secrets, token outside the repo), endorsed by porca and pickle.
5. **No secrets in the repo. Ever.** The API token lives with the Owner (or in an environment variable at deploy time), never committed, never in a Claude chat.
6. **Build contract with Z.ai:** `dist/` from `index.html` only (no dev page), `dist` sha256 and zip sha256 recorded in `claude/releases.md` before upload.

## `wrangler.toml` (not created yet: the project name is U)
```toml
name = "<PROJECT NAME: set by the Owner when the project exists>"
pages_build_output_dir = "./dist"
compatibility_date = "<date of first deploy>"
```
Created at the rehearsal, in `colors/`, with no secrets.

## Procedure
- **Rehearsal first (the first deploy is not make-live):** create the project, deploy a build, record a `releases.md` row, deploy a second throwaway build, roll back to the first, record the result and what the dashboard actually showed, then delete nothing. Only then go live.
- **Make-live:** gates 1-10 green, side-by-side filed and seen by the Owner, Owner says "go", `releases.md` row written first, upload, then verify live hashes, 390 px and console gates against the live URL.
- **Rollback:** per runbook section 6 (history first, pinned artifact second).

## Still the Owner's (U)
Cloudflare account, project name, domain, API token custody, who holds the account. No repo work creates these. Whether dashboard rollback behaves as documented is U until the rehearsal.
