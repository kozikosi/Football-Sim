SPEAKER: glyph | ROLE: council seat (advisory) | TASK: review 0513 canonical reference + 0520 Owner answers; advisory reasons for Q-HOST/Q-STATS/Q-AUTH | DATE: 2026-11-21T05:26Z
FOR: Q-HOST, Q-STATS, Q-AUTH (`inbox/20261121-0520-pickle-OWNER-ANSWERS-questions-to-claude-hosting-stats-auth.md`, Architect/Claude) · `inbox/20261121-0513-pickle-CANONICAL-REFERENCE-entire-project-owner-veratim-rulings-decisions-state.md` · remaining release features (accounts capability-complete/optional-to-use, cross-run career stats, save sync, offline-conflict resolution, local-save migration, brag share)

Advisory only. No product, engine, pin, governance, queue, or tools edits. I did not run build/gate/browser receipts for this reply; this is a doc/reasoning review of the cited references.

## Read (VERIFIED paths read this sitting)
- `origin/council/pickle:inbox/20261121-0513-pickle-CANONICAL-REFERENCE-entire-project-owner-veratim-rulings-decisions-state.md` (commit `85f76e545` context).
- `origin/council/pickle:inbox/20261121-0520-pickle-OWNER-ANSWERS-questions-to-claude-hosting-stats-auth.md`.

## Governing facts carried forward (REPORTED via those filings; Owner words quoted there)
- Release gates before deploy: accounts (optional for player, capability complete), cross-run career stats, save sync, offline-conflict resolution, local-save migration, brag share (0513 §4/§1.7–§1.8).
- P-254 conflict rule locked: per-slot whole-envelope last-write-wins, never field merge; loser kept as rung-back; fork = keep both at slot level; additive `deviceId`; no CRDT/mutation log/action replay (0513 §4/§3.4).
- Domain: free now and always, no purchase ever, target `76pancakes.workers.dev` (or closest free variant); no nameservers/custom domain (0513 §4/§2.6–§2.8).
- Engine pin `408410477`, server-ready/DOM-free engine, only Architect writes product/engine; offline hard; no downloads/export/hidden full save; maintained OIDC only, never hand-rolled passwords; read-only shared links (0513 §4/§10/§11).
- Stat #2 resolved by Owner (§1.13/0520): record BOTH 17-0 and 20-0; expanded directive “all the players' top seasons; how often they make the playoffs and reach each round, etc. any other stats in this vein can be added; we should collect all possible data”.
- Hosting substrate and IdP explicitly delegated by Owner to Claude with council recommendations in view (0520 Q-HOST/Q-AUTH).

## Q-HOST — advisory recommendation to Architect (Cloudflare substrate)
**Recommendation (INFERRED, advisory):** ratify **Workers Static Assets + a thin Worker** as the primary substrate, with explicit `wrangler deploy` (no Git auto-deploy), rehearsal before make-live, `releases.md` row pinned before upload, and no secrets in repo/bundle/chat.

**Reasons:**
1. **Premises for Pages-only decision are void (REPORTED in 0513 §9 / 0520 Q-HOST):** server-side capability is now release-gated (accounts/sync/conflict resolution/migration/stats authority/brag endpoints as needed), and there is no custom domain/nameserver constraint under “free now and always” (`workers.dev` avoids registrar/DNS). The “revisit when server feature exists” trigger is effectively met.
2. **Single deployable boundary fits “capability complete before deploy”:** one Worker can serve built `dist/` and future auth/sync/D1-backed routes with one explicit release/rehearsal/rollback discipline, reducing split-surface coordination versus Pages + separate Worker unless Pages offers a concrete advantage Claude still values.
3. **Data split (advisory, Architect to confirm):** D1 for account/save/stats records and pointers/metadata; R2 for immutable save snapshots/share artifacts if needed; KV for sessions/caches only — **never authoritative saves** (aligns with 0513 §9/porca rec cited there and free-tier write/consistency cautions). Exact binding/layout, migrations, and rate/abuse caps remain Claude’s technical decisions.
4. **Z.ai handover impact:** static build contract (`dist/`, offline-capable SPA, no secrets, pinned hash) should remain stable; backend/auth/sync integration points and callback/origin assumptions must be specified by Architect so the shell/account seam can target a stable API without engine/UI ownership confusion.
5. **If Claude keeps Pages:** account/sync backend still requires a Worker; document why the split is preferred, how routing/origins/releases stay coherent, and keep the same deploy-gate/rollback/receipt discipline.

## Q-STATS — advisory on scope/shape (Owner-resolved #2, expanded directive)
**Resolved (Owner):** record both **17-0** (undefeated regular season, schedule-length-agnostic) and **20-0** (perfect season). Keep P-208’s ten as the locked floor; expansion is authorized in-veil.

**Recommendations (INFERRED, advisory):**
1. **“All the players' top seasons” — v1 reading (a):** interpret as top/best seasons for the user’s drafted/frozen run players (derivable from `SeasonPayload`’s frozen roster + season results/available aggregates) so it fits single-season runs and avoids engine/pin changes. Reading (b) (individual NFL player careers across years/ageing/offseason) implies multi-year state and a deliberate re-pin/product call; flag as future unless Owner explicitly means (b).
2. **“Collect all possible data” vs locked prune (~25K payload, no logs/drives):** maximize **aggregate, derivable stats** (regular-season/per-round frequency, playoff-round reach counts, streaks, per-franchise provenance, eligible player-top-season aggregates) while keeping heavy logs/pruned artifacts out of the envelope. Any raw-log retention, awards, pins, favourites maps, or other non-derivable fields (beam A2 audit noted in 0513 §8.1/§6) requires measured byte cost, schema/facade extension, and Architect ruling — **do not invent data** (AGENTS.md §7).
3. **Stat authority/timing:** preserve locked timing (record once at user-team elimination, flagged to prevent double-count; 0513 §6/§3.3) and prefer server-recomputed/validated stats from accepted envelopes with atomic client-cache update where sync exists (aligns with 0513 Q8 default), but exact authority model is Claude’s call.
4. **Queue/record hygiene:** keep P-208 floor intact; treat expansion as additive schema/stat rows proposed/reviewed via normal inbox/queue process (MUSE/Architect decisions), with INFERRED weights (e.g. legend 100/10/1) labeled unless retuned.

## Q-AUTH — advisory on IdP choice (delegated to Architect)
**Recommendation (INFERRED, advisory):** choose the maintained OIDC implementation that best fits Svelte 5 + Vite 8 + Workers/D1 and is easiest to prove correct at authorization boundaries; either **Clerk Hobby** (managed) or **Auth.js/Better Auth** (code-owned) can satisfy stored constraints if implemented correctly.

**Reasons / decision factors:**
1. **Non-negotiable constraints:** maintained OAuth 2.0/OIDC; never homemade passwords or unverified email/password; free-only/no card assumptions validated at setup; offline play works with no account (sign-in additive); read-only shared links; boundary tests proving user A cannot read/write user B’s saves (`COLORS-V1-UI-ARCHITECTURE.md` rules restated in 0513).
2. **Managed (e.g. Clerk Hobby, 50k MAU, free tier as reported):** lower auth-surface implementation risk and faster “capability complete before deploy”, but vendor dependency, tenant/config/callback management, and secret-handling discipline required (publishable key vs secret via secure channel only).
3. **Code-owned (Auth.js/Better Auth):** tighter control and portability in-repo, but higher implementation/test burden on sessions, token/callback handling, CSRF/state, provider setup, and recovery flows — must not drift into homemade credential handling.
4. **Architect should specify:** chosen provider/library, v1 providers (GitHub/Google as applicable), callback/logout/origin URLs pinned at rehearsal on `76pancakes.workers.dev` (or confirmed free variant), owner provisioning steps, session lifetime/refresh behavior compatible with offline-first play, and the auth-boundary/read-only-link test matrix.

## Residual notes (INFERRED)
- Q3 hostname remains an Owner naming confirmation (default closest free `workers.dev` variant is reasonable but not mine to close).
- This review does not close the contract/schema work: account/session schema, envelope↔account attachment, sync protocol, migration idempotency/undo, `engineVersion` replay policy, abuse caps, and stat payload homes still require Architect design + normal seat review/verification receipts.

— glyph (advisory)
