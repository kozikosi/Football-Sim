SPEAKER: hy4 | ROLE: advisor | TASK: corrected final recommendation — accounts, cross-device sync, offline conflict resolution and local-save migration are v1 release gates | DATE: 2026-11-21T04:36Z
FOR: Owner · Architect (Claude) · MUSE · Z.ai relay. Final advisory recommendation for ratification; no implementation, no edits to Claude's files, the queue or governance.

## 0 · Correction — I got the scope wrong, and I own it

In `0408`, `0414` and `0417` I accepted the framing that accounts, sync, conflict resolution and migration were post-v1.1 possibilities. The Owner has now said plainly:

> Accounts are not a future goal; ideally they ship as soon as possible. we wanted users to create an account and be able to track their stats beyond a single season; this has been in the directive for a long time. sync saves and resolving offline changes and migrationg local saves into reconnection across devices are also a mandatory features before deployment; also noted since the beginning. these are not future possibilites; these are all mandatory to release along with the brag share
>
> expansion into other sports, and more interactive visuals like the photos and project i had you look at are more future goals. along with potentially mutliplayer, etc

**My earlier advice to defer these was wrong.** I treated GPT's list as authoritative about our scope instead of checking it against the Owner's standing directives. **Correction filed, not silently rewritten:** the four are **release gates**, alongside the brag share. Other sports, the pfd-01/02 badge-spatial visuals and multiplayer remain future goals.

## 1 · Corrected final recommendation

**Host: Cloudflare Workers Static Assets, with a thin Worker as the app/server boundary — not Pages.** This was already my `0417` call; the correction removes the last reason to hesitate. A static-only host cannot deliver accounts, server-side career stats, cross-device sync or migration. The sole carve-out remains: a launch domain with external DNS forces Pages (Cloudflare's matrix: ❌ Workers / ✅ Pages) — but a mandatory-server product should not be hostage to a vanity domain; use the `workers.dev`/custom domain that Cloudflare can actually serve and revisit DNS later.

**Release gate definition (all five, together):** (1) account creation + security; (2) career stats beyond one season; (3) cross-device save sync; (4) offline conflict resolution; (5) local→online save migration — **plus the brag share**. None is optional; no public "go" until all are green.

**Sequence recommendation:** build and verify the server boundary *in parallel with Z.ai's slices 3–5*, not after. None of the four requires a `colors/src` byte. While it is unfinished, keep the preview build behind Cloudflare Access (free ≤50 users, VERIFIED 2026-11-21) so the rehearsal is safe; Access is preview protection only, never the consumer account system.

## 2 · Architecture I recommend (defaults, my calls — reversible)

**Identity (account creation + security).** Use a **managed OIDC provider**, never hand-rolled password hashing or tokens in `localStorage`. Verified free tiers (fetched 2026-11-21): Clerk Hobby 50,000 monthly retained users with custom domain included; WorkOS AuthKit 1,000,000 MAU with passkeys + MFA but custom domain $99/mo; Supabase Auth 50,000 MAU (free projects pause after a week idle); Auth0 25,000 MAU. **My call: Clerk Hobby** — edge SDK, custom domain on free, adequate headroom for a portfolio launch; WorkOS is the scale fallback. The Worker is a Back-For-Frontend: opaque session id in an `HttpOnly; Secure; SameSite=Lax` cookie, server-side session lookup, rotation on login, revocation on logout. No secret in the repo or bundle, ever. This also gives per-device session management, which the sync design needs.

**Career stats beyond a season.** D1 tables keyed by `userId`: `career_seasons`, `career_games`, `awards`, fed only from the engine's exported VM (`seasonStats`, `awardsVM`, `feedVM`) through the existing seam. No engine change, no invented data. The account is the join key; the seed remains the provenance stamp on every row.

**Cross-device sync.** Keep localStorage as the offline source of truth; the server is a sync target, not a prerequisite to play. Store in D1: `userId`, `deviceId`, `revision`, `schemaVersion`, the `(seed, userTeam, pickSlot, picks[])` action log and the normalized envelope. Client pushes on reconnect; server returns the current revision. Use optimistic concurrency with a revision integer — no Durable Object needed for v1, which keeps free-tier complexity down. Do **not** use KV for saves: 1,000 writes/day on Free would be exhausted immediately.

**Offline conflict resolution — now a v1 feature, not a nice-to-have.** This is where our architecture earns its keep. Because the engine is pinned and keyed-RNG deterministic, a save is an **action log**, not an opaque blob. On divergent branches: replay both from the common ancestor, compare the resulting engine states; if equal, merge; if not, present the two branches to the user with the engine's own numbers and let him choose. Run the replay **client-side** (the browser has the engine) so the Worker stays inside the 10 ms CPU free limit. No CRDT machinery. If determinism cannot be guaranteed across a future engine change, stop — that is exactly why the pin stays frozen.

**Local→online migration.** On first sign-in, offer a one-time import: read the local envelope, validate `schemaVersion`, reuse the tolerant `parseRecord` (explicit fields; extras like `suggestIds` already ignored), write a normalized D1 row with `revision = 1`, mark the device migrated, then start normal sync. Unknown fields are ignored, not rejected. No engine bytes. This preserving behaviour is already tested in the S14/S15 receipts — reuse it rather than inventing a new schema.

**Brag share, shipping alongside.** Keep cards self-contained and offline-openable with seed provenance only — no account id, no token, no save data in the share. When accounts exist, a share can be *associated* with the user for stats/attribution, but the card itself must remain safe to post publicly. R2 free (10 GB-month) is available if short links are wanted later; not required for v1.

## 3 · Free-only and security check

Workers Free: static requests free/unlimited; 100k requests/day; 10 ms CPU per request. D1 Free: 100k rows written/day, 5 GB, 10 DBs. R2 Free: 10 GB-month. Managed auth free tiers as above. All five gates fit free for a portfolio launch. Watch two things: Free limits **fail the request** rather than bill, and the auth provider's definition of "active user" differs (MRU vs MAU). No credit card should be needed for Clerk Hobby or Workers Free; the Owner still provisions the Cloudflare account and the auth tenant.

## 4 · Implications for the existing plan (not enacted by me)

- `claude/cloudflare-decision-2026-11-21.md`: Workers Static Assets + thin Worker; the "why Pages for the external domain" paragraph needs revising — domain is now a secondary constraint, not the deciding one.
- `claude/cutover-runbook-2026-11-20.md`: the make-live gate list grows by the five account/sync items and the brag share; rehearsal stays first and can be Access-protected. Rollback now has two layers: app version rollback **and** data migration reversibility (a migration row must be undoable or the rollback is not clean).
- `claude/releases.md`: needs a schema row for the **server/Worker version and D1 migration version**, not just `dist/` sha — otherwise a rollback can restore the old app against a new save schema. This is a required change, not cosmetic.
- `claude/visual-acceptance-spec-2026-11-21.md`: add the sign-up → first sync → migrate-local-save → brag-share flow to the capture states; keep w89 parity as the board reference (your 01/02 ruling stays future, not a v1 gate).
- The work order to Z.ai: slices 3–5 are no longer the whole critical path. The relay should name the account/sync/migration workstream and who owns it (Architect's tree, server-side), and must not ask Z.ai to build products he does not own.
- Engine pin `408410477` stays frozen. Any proposal that needs `colors/src` changes for accounts or migration should be stopped and reported, exactly as `rawSort` is handled.
- Future goals explicitly parked: other sports, the pfd-01/02 interactive visuals, multiplayer.

## 5 · Verification

Auth free-tier numbers, D1/KV/R2/DO/Workers limits and Cloudflare Access free tier were fetched 2026-11-21 from Cloudflare docs and dated third-party comparisons; platform facts are **REPORTED**, not run by me. Product facts (envelope, tolerant `parseRecord`, pin, brag share) are from my own filings `0322`, `0307`, `0417`. No account, tenant or deploy was created.

**Status:** final corrected recommendation. No decision enacted by me; no implementation; no product, engine, pin, governance or queue edits.
