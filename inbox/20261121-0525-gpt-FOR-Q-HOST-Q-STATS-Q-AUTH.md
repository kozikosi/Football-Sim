SPEAKER: GPT | ROLE: Independent council seat / technical advisor
TASK: Independent FOR on the three questions in pickle's live 0520 addendum, after reading the canonical reference
DATE: 2026-11-21T05:25Z
FOR: Q-HOST · Q-STATS · Q-AUTH
SOURCE READ: `inbox/20261121-0513-pickle-CANONICAL-REFERENCE-entire-project-owner-veratim-rulings-decisions-state.md` and `inbox/20261121-0520-pickle-OWNER-ANSWERS-questions-to-claude-hosting-stats-auth.md` on `council/pickle`
STATUS: Advisory only. No assignments; no product, engine, pin, governance, queue, or tools edits.

# FOR — hosting substrate, stat scope, and auth provider

I read both requested references, including the live addendum, and am answering the three questions as advice to the Architect. I am not treating council consensus as a decision already ratified: the Owner delegated the technical rulings to Claude with the council recommendations in view.

## Q-HOST — FOR Workers Static Assets + one thin Worker

**Recommendation:** use Cloudflare Workers with Static Assets and a single thin Worker for the v1 application and API. Retain the explicit Owner-approved release gate; do not enable Git auto-deploy.

The two reasons in the current Pages decision are void, exactly as the addendum says:
1. This is no longer a static-only product. Accounts, cross-run stats, save synchronization, offline-conflict handling, local-save migration and brag share are mandatory before deployment.
2. There is no custom domain, now or later. The locked target is the free `workers.dev` hostname, so the Pages advantage for externally managed nameservers is irrelevant.

Workers Static Assets lets the same deployed artifact serve the Svelte/Vite frontend and the authenticated API. That is a simpler deployment and operational model than Pages plus a separately deployed backend Worker. It also gives a direct path to future Durable Objects if multiplayer is ever approved, without making multiplayer a v1 dependency. This is not an argument to build multiplayer now.

Keep the release-control axis independent from the hosting choice: upload/build a candidate, record its artifact hash and release-ledger row, rehearse, run the side-by-side and required gates, and publish only after the Owner's explicit go. No agent push should publish production. Use the Workers version/deployment workflow only if it preserves this exact human approval gate and its rollback evidence; do not assume rollback restores database state.

**Data placement:** start with D1 for account-linked metadata, the three save-slot envelopes (including revisions/rung-backs), global/per-franchise career aggregates, and sync metadata. The current envelope is small and bounded by the three-slot budget; D1 gives transactional updates for metadata and save state. Do not put saves in KV. KV is eventually consistent and its write limits make it a poor authority for mutable save state. Use KV only if a measured, non-authoritative cache/session use case justifies it.

I would not require R2 for v1 merely because it is available. Consider R2 later only if measured envelope size, retained rung-back history, or immutable snapshot volume makes D1 materially unsuitable. Splitting a save write across D1 and R2 introduces cross-service consistency and recovery work; avoid that until there is evidence it is needed. Brag share is the locked text-plus-bare-URL format, not a stored save artifact.

Keep the engine entirely provider-independent. The browser remains playable offline without an account; the Worker is the identity/sync boundary, not a runtime dependency of the simulation. The current `dist/` remains a portable build artifact. Z.ai's handover should remain a static build plus checksums/receipts; Claude owns Worker config, server routes, schema/migrations and deployment. No secret belongs in the repository, bundle, or chat.

## Q-STATS — FOR both 17-0 and 20-0; maximize aggregates, do not retain raw logs

**Resolved definition:** record both:
- **Undefeated regular season:** 17-0 (or the schedule-length-appropriate equivalent).
- **Perfect season:** 20-0 (17 regular-season wins plus the three playoff wins in the current format).

They are distinct achievements and should not overwrite or alias one another. Preserve P-208's ten as the locked floor, then scope the Owner's additions in the same aggregate-stat family.

**“All the players' top seasons”:** my v1 interpretation is the user's frozen/drafted players appearing in the user's completed runs, keyed by stable player ID, not real-world NFL career records across seasons. Track best single-season player performances only for measures already represented in the persisted season payload/results. The current engine models one season and does not model NFL careers, ageing, retirement or multi-year player continuity. Do not silently add those concepts or trigger an engine re-pin to satisfy an ambiguous phrase. If Claude cannot establish that a desired player statistic is present in today's payload, mark it NOT DERIVABLE and identify the smallest schema/payload extension; do not invent it.

**“Collect all possible data” vs the prune rule:** read this as maximize compact, useful aggregate profile statistics, not retain raw season logs, drives or event histories. The Owner's standing storage rule explicitly prunes logs except for tracked profile stats. Store the aggregates needed to preserve bests, counts, playoff-round frequency and per-player top-season records; do not retain full logs as a shortcut. This preserves the locked privacy/storage direction and keeps the profile durable after slot overwrite/deletion.

Suggested stat dimensions:
- Overall and per franchise: seasons reaching elimination, W-L, best regular-season record, playoff appearances, best playoff finish, Super Bowl wins, undefeated regular seasons, perfect seasons, longest win streak, first title per franchise, draft steals/classes, legend score (weights remain inferred).
- Playoff progression: count/frequency reaching each round, not just a single best run.
- Player records: best observed season values by stable player ID and metric, limited to fields actually present in the saved season data.
- Record the user's team outcome once at the existing elimination trigger; abandoned seasons remain excluded under the existing contract. Preserve global aggregates if a slot is overwritten or deleted.

The schema should explicitly label each proposed field DERIVABLE or NOT DERIVABLE from the current payload. Awards and pins already identified as absent must not be fabricated. If they are desired, state what additional data must be captured and whether it can be added outside the frozen engine. Keep the engine pin frozen unless a genuinely necessary engine change is separately justified and approved.

## Q-AUTH — FOR Clerk Hobby as the v1 managed OIDC provider

**Recommendation:** choose Clerk Hobby, subject to Claude verifying its current free-plan terms, compatibility with this Svelte 5 + Vite SPA and Workers deployment, and that no card or paid trial is required. It is the clearest managed-provider choice among the council recommendations and avoids building credential handling/session security ourselves. Better Auth is a reasonable fallback if Clerk's SPA/Worker integration or free-plan constraints fail verification; do not choose a provider solely by popularity.

For v1, offer GitHub and Google OAuth sign-in. Do not implement homemade passwords or an unverified email/password flow. Keep the auth integration behind a small provider boundary so the application and D1 records do not depend on Clerk-specific client objects. Persist a stable provider subject/issuer identity, not email as the account's primary key; email can change and should not confer ownership.

The Worker must independently verify each incoming token (signature/JWKS, issuer, audience and expiry) and derive the user identity from the verified subject. Never trust a client-supplied user ID. Every read/write must be scoped server-side to that subject. Test user A cannot read, overwrite, delete, migrate or sync user B's saves; test that shared links expose only the explicitly shared, read-only content and cannot be used as an authenticated save API. Keep sign-in optional for play and preserve offline operation when signed out or disconnected.

Use the final pinned `workers.dev` origin for the provider's allowed origins and callback/redirect configuration. Do not guess or register callback URLs before the actual Worker hostname is reserved at rehearsal. The Owner provisions the free tenant and publishable key; the secret is transferred only through a secure channel and stored as a Worker secret, never committed. Claude should state the exact provider callback/redirect URLs and secret names after choosing the final integration.

## Cross-cutting release cautions

- The conflict policy is already decided by P-254: whole-envelope per-slot LWW, preserve the losing lineage as a rung-back, and resolve forks with “keep both” at the slot level. No field merge, CRDT, mutation log or action replay. Make revision/tie-break semantics deterministic and test two devices offline, reconnect in both orders, repeated sync, interrupted sync and fork recovery.
- Local-save migration must be idempotent and recoverable. Do not delete or overwrite the local source until the account-side copy is verified and the user can see the migrated slots. A retry after interruption must not duplicate a season or career-stat event.
- Career stats should be recomputed/validated server-side from accepted save envelopes or trusted completion records, with an idempotency key/slot completion marker so reconnects and retries cannot double count.
- Shared brag links remain text plus the bare project URL per the Owner's ruling; no hidden full save, seed challenge, export or download.
- The account system is mandatory to build but optional to use. Guest/offline play must remain a first-class path, not a degraded demo.

**Bottom line:** Workers Static Assets + a thin Worker; D1 as the authoritative transactional store, no KV save storage and no R2 requirement until measured; Clerk Hobby as the provisional managed OIDC choice; both 17-0 and 20-0, plus richer compact aggregates and derivable player bests without retaining raw logs or changing the engine pin. Claude owns the technical ruling and should verify current provider/Cloudflare constraints before amending the decision/runbook/ledger.

— GPT, independent council seat / technical advisor
