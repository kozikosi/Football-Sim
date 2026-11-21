SPEAKER: pickle | ROLE: council seat (advisor) | TASK: final Cloudflare counsel after Owner added four account/sync/migration factors | DATE: 2026-11-21T04:15Z
FOR: Owner; Architect/Claude; MUSE (record). ADVISORY ONLY — I do not own the decision. No implementation, no product/engine/pin/governance file edited.

## Revised recommendation (my final counsel)

Conversion of my earlier advice: accounts/sync are no longer merely "preserve the possibility." They are named capabilities, so the architecture must have a real seam for them. But that seam does **not** change the v1 hosting substrate:

1. **v1 stays static on Cloudflare Pages + Direct Upload.** Offline is a hard requirement (AGENTS.md §2), so the app must be fully functional with no account and no network. Online is additive, not a mode.
2. **The stateful backend, when built, is a separate Worker — never Pages Functions.** Reason: Cloudflare's compatibility matrix (read 21 Nov) gives Workers ✅ / Pages ❌ for rate limiting, Workers Logs, Logpush, Tail Workers, Source Maps, and native Durable Objects. On Pages, DO requires a separate Worker + binding anyway. Building a separate Worker from the start is cheaper than migrating Pages Functions later.
3. **Resolve the domain before collapsing the two into one project.** If the domain's nameservers will be on Cloudflare, a single Worker with static assets is simpler. If off-Cloudflare, Workers cannot serve it (REPORTED from `migrate-from-pages`) and Pages must stay the front-end. The four new factors do not change this — D1/KV/R2 are ✅ and free on both.
4. **Do not build the four before ship** unless the Owner now makes them v1 requirements. Define the save-envelope version and the account-identity abstraction in docs only (no engine bytes — the pin must stay frozen through the merge, per Claude's 169e554 report). If they become v1 requirements, the cutover date moves and the substrate question must be reopened with Claude.

## The four factors, each considered

**Account creation and security.** Do not build password auth. Use an external IdP (Google/GitHub/Apple) via a maintained library; store only an opaque subject ID and, if needed, encrypted tokens in D1/KV. Secrets in Wrangler secrets / `.dev.vars`, never in the repo. Rate-limit auth endpoints (Workers only), set CSP, and keep audit logs (Workers Logs/Logpush). Security is the one place where the observability gap on Pages actually matters — another reason the backend is a Worker.

**Synchronizing saves across devices.** Per-user save document in R2 (free 10 GB) with D1 (free 5 GB / 5M rows read per day) holding the account→save map and revision metadata. Optimistic concurrency with a monotonic revision or ETag. Substrate-neutral; free on both.

**Resolving conflicting offline changes.** This is the genuine engineering risk and the real home of "actual technical sophistication." Last-write-wins by device clock is broken (clocks drift; two devices can simulate different weeks). Need a versioned mutation log per device and a documented merge policy — field-level rules or a CRDT — plus a product decision on what is authoritative. Favourite candidate (INFERRED): cloud-authoritative season state, client-authoritative preferences and board configuration, with an explicit replay path for divergence. The existing seeded-RNG work and the D13 fence (no clock/no `Math.random` in core/sim/app/view) are what make reproducible replay and correct merges feasible — this is a synergy worth protecting, not a reason to add a framework to core.

**Migrating existing local saves into reconnection.** Existing offline saves have no account. Migration is a claim flow: create account → upload local save as revision 0 under a generated device ID → reconcile. Must handle both "local older than cloud" and "two devices each hold a local save" without data loss. Requires a versioned local save envelope from the start — define it now in docs so later work is not a rewrite of autosave (W14 must not be weakened, per v8).

## Implications for the existing plan

- Static front-end stays portable: no Pages Functions, no file-based routing, no server code in `colors/src`. A `SavePort` boundary in `app/` (local vs remote) keeps engine bytes untouched and the pin frozen.
- Offline-first is non-negotiable: every one of the four must degrade to "works offline, reconciles later," never to "sign in to play."
- Two prior conflicts remain unresolved and are Owner/Architect calls: GPT's "scouting" priority-1 vs the Owner's 03:24Z "no scouting or full gm"; GPT's "offline as future" vs AGENTS.md §2 hard requirement. The four new factors reinforce the hard-requirement reading — local-first is the only design that satisfies them all.

## Labels

Git/docs facts VERIFIED this sitting; Cloudflare product behaviour REPORTED from primary sources (no account, no deploy). The four-factor analysis, merge policy candidate, and recommendation are my counsel (INFERRED judgment). Decision authority: Owner and Architect. Relay and runbook unchanged.

— pickle (council seat; advisor)
