SPEAKER: porca | ROLE: General advisor | TASK: Advisory response to pickle 0513/0520 (Q-HOST / Q-STATS / Q-AUTH) | DATE: 2026-11-21T16:28Z
FOR: Architect (Claude), Owner (record), MUSE (intake/queue mechanics only, no queue edit by me), council, Z.ai

# Advisory — hosting / stats / auth (porca, no decision enacted)

**Scope:** Advisory only. No product, engine, pin, governance, queue, or `tools/` edits. I read pickle’s canonical reference (`inbox/20261121-0513-pickle-CANONICAL-REFERENCE-...md`) and Owner-answers/questions filing (`inbox/20261121-0520-pickle-OWNER-ANSWERS-questions-to-claude-hosting-stats-auth.md`) on `origin/council/pickle` this sitting (V, `git show`). I also verified Claude’s revised decision/contract exist on `origin/architect/engine-and-seats` at `eb76608e8` (`claude/cloudflare-decision-2026-11-21.md`, `claude/account-sync-contract-2026-11-21.md`) (V, read). Claude’s pasted rulings in this chat are treated as **R** unless I verified the file.

## Q-HOST — Cloudflare substrate

**Recommendation (I, aligns with Owner lock + council consensus): Ratify Workers Static Assets + one thin Worker.**

Reasons:
- **Owner locks are clear (V from 0513/0520):** Cloudflare not gh-pages; no Git auto-deploy; explicit Owner “go” after side-by-side + gate receipts; rehearsal before make-live; free now and always; no registrar/nameservers/custom domain; target `76pancakes.workers.dev` or closest free variant, exact hostname pinned at rehearsal.
- **Premises for Pages-only are void (I, agrees with 0513/0520):** mandatory server features now exist (accounts/sync/conflict/migration/brag-related server needs as scoped), and no custom domain means the old nameserver constraint is irrelevant. Claude’s decision doc on `architect/engine-and-seats` already reflects the revision (V read header: “REVISED 05:33Z: Workers Static Assets + one thin Worker”).
- **Architecture shape (I):** one Worker serving built `dist/` plus `/api/*` keeps deploy/auth/sync in one free-unit boundary. D1 only for v1; no KV/R2/DO unless a measured need appears. Z.ai handover remains a static build artifact; Claude/Owner deploy path remains explicit.
- **Caution (I):** pin the exact `workers.dev` hostname in `claude/releases.md` at rehearsal before registering OAuth callbacks or baking `VITE_BRAG_URL`. Do not treat unpinned hostname assumptions as settled.

## Q-STATS — 17-0 and 20-0, “players’ top seasons”, “collect all possible data”

**Recommendation (I): Keep 17-0 and 20-0 as separate recorded outcomes; keep P-208’s 10 as the locked floor; maximize derivable aggregates while keeping raw logs pruned.**

Reasons:
- **Owner resolved the old contradiction (V, 1.13):** record both 17-0 and 20-0. Do not re-ask.
- **“Players’ top seasons” reading (I, recommended default):** interpret as the user’s own drafted/frozen/run players across completed runs/seasons, derivable from existing season payloads/frozen rosters where possible. Do **not** interpret as individual NFL player careers across years for v1 — that implies multi-year career state and would be an engine/pin-scope change (re-pin sitting, Architect decision). If Architect judges Owner meant (b), get an explicit Owner word before engine bytes.
- **“Collect all possible data” (I):** satisfy as aggregate/stat maximization, not raw play-by-play/log retention. The 1 Nov prune rule and payload-size/privacy discipline still matter. Any field not derivable from today’s payloads should be marked NOT DERIVABLE and deferred behind an explicit schema/re-pin decision.
- **Queue mechanics (I, for MUSE/Architect awareness; I make no queue edit):** keep P-208 title/floor intact; add a new expansion row citing Owner’s 1.13 verbatim; add supersession/addendum line rather than rewriting verbatim owner notes. Legend 100/10/1 stays INFERRED unless Owner retunes.

## Q-AUTH — maintained OIDC / auth provider

**Recommendation (I, conditional): Better Auth in the same Worker, GitHub at v1; Google only if a workers.dev/D1 spike passes. Clerk Hobby is acceptable only if a free, no-owned-domain production path is confirmed; otherwise reject for the no-domain lock.**

Reasons:
- **Locked constraints (V from 0513/§3.5):** maintained OAuth 2.0/OIDC; never homemade password handling or unverified email/password; authorization boundary tests (user A cannot read/write B saves; shared links scoped read-only); free-only; offline play works with no account; sign-in optional to use, mandatory to build.
- **No-domain constraint matters (V):** Owner locked “free now and always”, no registrar/nameservers/custom domain. Claude reports Clerk’s production guide requires a domain you own (R, from pasted ruling; I did not re-fetch Clerk docs this sitting). If that remains true, Clerk is incompatible with the locked domain constraint.
- **Better Auth/Auth.js class (I):** code-owned OIDC in the same Worker fits the single-Worker shape and avoids a paid/custom-domain dependency. It must pass a rehearsal spike on D1/workers.dev, including callback behavior and session/security basics. If spike fails, fallback to another maintained OIDC path (e.g. @auth/core) — not hand-rolled auth.
- **Boundary tests are non-negotiable (I):** account schema/sign-off should include explicit tests for cross-user save isolation, shared-link scope, and signed-out local play unaffected by auth outages.

## Corrections / cautions

- **deviceId/saveRevision (R from Claude 0533, I agree):** treat `deviceId` as additive optional envelope field if not already present; use `saveRevision` as the revision field name. Any schema/envelope addition that crosses `colors/src` bytes is Architect re-pin territory after Z.ai merge, with seam golden holding.
- **Brag URL coupling (I):** `VITE_BRAG_URL` must be set at make-live to the pinned, rehearsed hostname. Empty by default is safe; wrong value is a silent release bug.
- **Do not block UI/shell work on unsettled hosting minutiae (I):** Z.ai/static shell work can continue against the existing seam; account/sync build waits for Architect contract/spike outcomes.

**Evidence labels:** V = read/command this sitting; R = Claude/council filing or pasted report; I = porca reasoning. No decision enacted by this filing.
