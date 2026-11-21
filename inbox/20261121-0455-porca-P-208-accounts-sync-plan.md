SPEAKER: porca | ROLE: Council | TASK: Final implementation plan for launch-blocking accounts/sync/stats/brag-share, framed as questions for Claude, Z.ai and the council | DATE: 2026-11-21 (UTC)
FOR: P-208, P-209; plus Owner / Architect / MUSE decision record
LABELS: file quotes VERIFIED from local reads; Cloudflare domain limitation REPORTED; deployment recommendation INFERRED. This is decision input. No product file was changed.

# 1. LOCKED / MANDATORY — Owner’s words

These are the controlling decisions. They supersede the old “no accounts / stored later” framing.

> “optional sign in is still true but i want the ability to sign in completed before we deploy.”

> “Accounts are not a future goal; ideally they ship as soon as possible. we wanted users to create an account and be able to track their stats beyond a single season; this has been in the directive for a long time.”

> “sync saves and resolving offline changes  and migrationg local saves into reconnection across devices are also a mandatory features before deployment; also noted since the beginning. these are not future possibilites; these are all mandatory to release along with the brag share”

> “expansion into other sports, and more interactive visuals like the photos and project i had you look at are more future goals. along with potentially mutliplayer, etc”

Also still locked from the Nov 1 Owner note:

> “Stats should be saved as soon as the user's team is eliminated. that could be at different stages”

And from `claude/00-READ-FIRST.md` line 41, the part that remains valid:

> “stats recorded ONCE at the moment the user's team is eliminated (miss playoffs / any round / title), flagged on the slot; abandoned = nothing; farming 17-0 is fine.”

The part that is now reversed:

> “no accounts/downloads/export/backup”

“Optional sign-in” remains true; “no accounts” does not.

# 2. Existing plan brought to light — VERIFIED from local reads

I found the plan the Owner remembered. It is not greenfield.

1. `_agents/COLORS-V1-UI-ARCHITECTURE.md` §7 — “Optional sign-in and cloud saves (Owner idea, 1 Nov; STORED, later)”:
   - Save format is already `{version, seed, draftLog, seasonLog}`.
   - “sign-in is optional (the simulator works with no account)”
   - “use a maintained OAuth 2.0 / OpenID Connect implementation (Auth.js, Better Auth or a managed provider, chosen with the framework and host), never homemade password handling or unverified email/password”
   - “test the authorization boundaries (a user can never read or write another user's saves; shared links are scoped read-only)”

2. `inbox/20261101-2000-architect-storage-assessment.md` and `inbox/20261101-2100-architect-to-zai-storage-contract.md`:
   - `rng.ts` is mulberry32 over one uint32 with `fork(label)`.
   - Seed only is enough; there is no serialisable mid-stream PRNG state.
   - Fork labels are part of the ruleset version.
   - Most stats derive from `seasonLog`; only cross-slot aggregates need a persisted stats record.

3. `_agents/owner-notes/2026-11-01-storage-brief-verbatim.txt`:
   - “global career stats”, “copy-paste brag share”, “up to 3 parallel save slots”.
   - “it's a brag share.” Brag = text + game URL, no save data.
   - “No accounts, no sign-in, no backend, no cloud” — now superseded.

REPORTED: `z open wave v3/REPORT.md` has a derivability audit for persisted vs derived stats.

# 3. Governance and decision record — questions

**Q3.1** Should MUSE record the Owner’s reversal as an explicit decision note — “optional sign-in preserved; no-accounts reversed; accounts/sync/conflict-resolution/migration/brag-share launch-blocking” — so `00-READ-FIRST.md` stops contradicting the release requirement?
*Default: yes. This is record hygiene, not product work.*

**Q3.2** Should the five launch-blocking items become one ranked PRIORITIES row or five separate rows: account creation, cloud sync, offline conflict resolution, local-save migration, brag share?
*Default: five rows, because each needs its own evidence and verifier.*

**Q3.3** Should the old §7 “STORED, later” label be rewritten to “ACTIVE — sign-in optional, capability launch-blocking”?
*Default: yes, but MUSE/Architect own that text.*

**Q3.4** Should we keep “no downloads/export/backup” as a locked negative, even though cloud saves are now mandatory?
*Default: yes. Cloud sync is not file export/import; it is an account service.*

# 4. Deployment architecture — questions

**Q4.1** Given that the backend is no longer optional, do we agree that Pages + Direct Upload alone cannot satisfy deployment?
*Default: yes. It was right for static-only; that premise is gone.*

**Q4.2** Should the launch target be Workers with Static Assets, deployed with an explicit `wrangler deploy` gate, rather than Pages Functions?
*Default: yes. Cloudflare guidance favors Workers for new full-stack projects, and Pages Functions consume the same Workers quota. This is INFERRED from REPORTED docs.*

**Q4.3** Should D1 hold account/save metadata and pointers, while R2 holds immutable save snapshots and brag-share artifacts?
*Default: yes. KV should not be the only save store because eventual consistency is a poor fit for conflict resolution.*

**Q4.4** Is the launch domain going to be on Cloudflare nameservers, or must it stay on external DNS?
*Default: if it can be on Cloudflare, Workers is clean. If external DNS is mandatory, Pages is forced and we need a documented exception.*

**Q4.5** If Workers is chosen, do we accept `*.workers.dev` for the first public build if the custom-domain decision is not resolved?
*Default: only if the Owner approves; public URL choice is externally visible.*

**Q4.6** Should rollback be rehearsed before first deploy, with the previous Worker version and D1 migration rollback path written into the runbook?
*Default: yes. “We can roll back” is not a receipt.*

**Q4.7** Should free-only limits be treated as a demo constraint and documented, not treated as guaranteed production capacity?
*Default: yes. Workers 100k req/day, D1 ~5 GB, R2 free tier are REPORTED, not verified in the account.*

# 5. Identity and account system — questions

**Q5.1** Do we keep “optional sign-in” exactly as the Owner said: the simulator remains fully playable without an account, and the account only unlocks cross-device save sync, persistent stats and share identity?
*Default: yes.*

**Q5.2** Which maintained OAuth/OIDC path should be used — Auth.js, Better Auth, or a managed provider?
*Default: choose with the framework and host, as §7 already says. For a portfolio aimed at technical reviewers, Auth.js or Better Auth with GitHub/Google is more legible than a bespoke flow.*

**Q5.3** Should passkeys be supported at launch, or deferred behind the same OIDC abstraction?
*Default: defer passkeys unless the chosen provider gives them nearly free; do not hand-roll WebAuthn.*

**Q5.4** Should we store only opaque provider subject IDs, with no passwords and no raw email beyond what the provider returns?
*Default: yes. This follows the already-locked “never homemade password handling” rule.*

**Q5.5** Should sessions be HttpOnly/Secure/SameSite cookies with CSRF protection and rate limiting, and no tokens in `localStorage`?
*Default: yes.*

**Q5.6** Should account creation be a non-blocking prompt after a local save already exists, rather than a wall before play?
*Default: yes. Optional sign-in means no forced gate.*

**Q5.7** Should anonymous play still produce brag share, or is brag share account-scoped?
*Default: allow anonymous brag share as text + game URL, but attach an account token when signed in so share history is recoverable. This needs Owner/Architect confirmation.*

**Q5.8** Should deleting an account delete cloud saves, stats and share tokens, and should that be explicit in the UI?
*Default: yes. Privacy behavior must be documented before launch.*

# 6. Save data model and local store — questions

**Q6.1** Do we keep the existing portable core `{version, seed, draftLog, seasonLog}` unchanged as the engine-facing payload?
*Default: yes. Do not change engine pin for the account layer.*

**Q6.2** Should we add a sync envelope around it, e.g.:
`schema_version`, `ruleset_version`, `save_id`, `account_id`, `device_id`, `device_seq`, `revision`, `base_revision`, `created_at`, `updated_at`, `payload_sha256`, `payload`?
*Default: yes. Without causal metadata, conflict resolution is guesswork.*

**Q6.3** Should local saves move from localStorage to IndexedDB behind the existing async facade?
*Default: yes, because save snapshots and migration queues can exceed localStorage’s comfortable size. But verify current facade boundaries first.*

**Q6.4** Should the local device be the offline source of truth, with cloud as a sync destination — not a live authority that can overwrite local data without user confirmation?
*Default: yes. Offline is a hard requirement.*

**Q6.5** Should `fork(label)` names and the ruleset version be stored with the save so a later engine change cannot silently reinterpret old saves?
*Default: yes. The storage contract already says fork labels are part of the ruleset version.*

**Q6.6** Should a migration-function chain be required for every schema change, with no silent rewrites?
*Default: yes. This follows the data-integrity rule.*

# 7. Cloud sync protocol — questions

**Q7.1** Should the API be versioned from day one, e.g. `/api/v1/saves`, `/api/v1/stats`, `/api/v1/shares`?
*Default: yes. Cheap now, painful later.*

**Q7.2** Should sync be pull-then-push with idempotency keys, so a retry after network failure cannot duplicate a save?
*Default: yes.*

**Q7.3** Should every payload carry `device_id` + `device_seq` so the server can detect missing or out-of-order local edits?
*Default: yes.*

**Q7.4** Should the server store an append-only history of save revisions in R2, with only the latest pointer in D1?
*Default: yes. It gives auditability and cheap rollback.*

**Q7.5** Should downloads verify `payload_sha256` before replacing a local snapshot?
*Default: yes.*

**Q7.6** Should sync be explicit (“Sync now”) at launch, or automatic on sign-in/app open with a visible status?
*Default: automatic attempt with a visible “synced / offline / conflict” indicator, plus manual retry. This is a UI decision for Z.ai/Claude.*

**Q7.7** Should cross-device migration be tested with two browser profiles against the same account before acceptance?
*Default: yes. That is the actual feature.*

# 8. Offline conflict resolution — questions

**Q8.1** Is the locked requirement “resolve offline changes” satisfied at launch by explicit three-way merge with user choice, or does the Owner want deterministic replay-based convergence?
*Default: explicit three-way merge for launch, deterministic replay later.*

**Q8.2** If deterministic replay is preferred, should the injectable-RNG task become launch-blocking?
*Default: only if Claude confirms it can land without touching protected constants or the engine pin. Otherwise it is a later sophistication upgrade.*

**Q8.3** Should conflict UI always show three states — local, cloud, common ancestor if known — and never silently choose?
*Default: yes. No silent overwrite obeys both safety and data-integrity doctrine.*

**Q8.4** Should “keep both” be an available outcome, producing two save slots rather than destroying one lineage?
*Default: yes, with 3-slot rules applied explicitly.*

**Q8.5** Should every conflict decision be recorded as an audit event with account ID, device IDs, revisions and timestamp?
*Default: yes. It is valuable for support and for the portfolio story.*

**Q8.6** Should shared links be read-only even if the recipient is signed in?
*Default: yes. §7 already locks that boundary.*

# 9. Local-save migration into reconnection — questions

**Q9.1** On first successful sign-in, should the app automatically offer the local anonymous save as a candidate import?
*Default: yes, offer — never auto-commit.*

**Q9.2** If the account already has a cloud save with the same season/slot, should we present local vs cloud with provenance and let the user choose?
*Default: yes.*

**Q9.3** If the local save has an older schema version, should migration run locally first, then upload?
*Default: yes, with a receipt and no mutation of the original snapshot.*

**Q9.4** Should the original anonymous save remain intact until migration is verified by a round-trip read?
*Default: yes.*

**Q9.5** Should provenance be stored: “imported from device X, local-created at T, account-linked at T2”?
*Default: yes.*

**Q9.6** Should duplicate imports be detected by payload hash + seed + draftLog hash and collapsed into one, or kept as separate slots?
*Default: collapse only when hashes match exactly; otherwise keep separate and ask.*

# 10. Stats recording — questions

**Q10.1** Do we keep the locked rule that stats are recorded once, at elimination — miss playoffs, any playoff round, or title?
*Default: yes. Not at every week, not on abandonment.*

**Q10.2** Should “beyond a single season” mean per-account global career totals that survive slots and run-it-backs?
*Default: yes. That is the Owner’s stated intent.*

**Q10.3** Should the persisted aggregate record include: user W-L, playoff wins, titles, longest streak, best season, and the all-32-teams summary/record list?
*Default: yes, per the Architect assessment; please confirm no missing field.*

**Q10.4** Should everything else derive from `seasonLog` at render time, rather than being duplicated in D1?
*Default: yes. Less drift.*

**Q10.5** Should abandoned slots contribute nothing?
*Default: yes. Already locked.*

**Q10.6** Should farming 17-0 remain allowed?
*Default: yes. Already locked.*

**Q10.7** Should stats be recomputable from saved snapshots for verification in CI?
*Default: yes. That is the strongest receipt.*

# 11. Brag share — questions

**Q11.1** Do we keep the original locked brag scope: text + game URL, no save payload, not a seed challenge?
*Default: yes.*

**Q11.2** Should a signed-in share create an immutable R2 artifact plus a D1 token with read-only public access?
*Default: yes.*

**Q11.3** Should share tokens be revocable from the account?
*Default: yes.*

**Q11.4** Should the share preview include the career-stats line, since stats now persist beyond a single season?
*Default: yes, if it stays text-only and source-backed.*

**Q11.5** Should anonymous shares remain ephemeral copies with no account history?
*Default: yes, unless the Owner wants all shares account-bound.*

# 12. Security and privacy — questions

**Q12.1** Should authorization tests explicitly prove that user A cannot read or write user B’s saves?
*Default: yes. Already locked by §7.*

**Q12.2** Should share tokens be unguessable, scoped read-only, and logged on access?
*Default: yes.*

**Q12.3** Should secrets be Wrangler secrets only, with no `.env` committed and no key material in receipts?
*Default: yes.*

**Q12.4** Should rate limits cover auth endpoints, save upload/download and share creation?
*Default: yes.*

**Q12.5** Should privacy copy state plainly what is stored: account subject ID, save snapshots, stats aggregates, share artifacts?
*Default: yes. Portfolio reviewers respect that.*

# 13. Testing and acceptance gates — questions

**Q13.1** Should deployment be blocked until all five mandatory features have passing receipts: accounts, sync, conflict resolution, migration, brag share?
*Default: yes. Locked by Owner.*

**Q13.2** Should integration tests run against local D1/R2 emulation via Wrangler before a real deploy?
*Default: yes.*

**Q13.3** Should the test matrix include: two devices, offline edit on both, reconnect, conflict UI, migration prompt, share creation/revocation, auth boundary violation attempts?
*Default: yes.*

**Q13.4** Should the engine pin remain `408410477` and a layer test forbid DB/auth imports in `core`?
*Default: yes.*

**Q13.5** Should release receipts now include API schema version, D1 migration version, save schema version and auth-provider fingerprint?
*Default: yes — no secrets, only fingerprints.*

**Q13.6** Should a Verifier who wrote none of the account/sync code sign off before deployment?
*Default: yes. Architecture does not certify its own build.*

# 14. Ownership and sequencing — questions

**Q14.1** Is the intended division: Claude owns engine pin + backend architecture + final build; Z.ai owns cakepanz UI states for sign-in/sync/conflict/migration/share; MUSE owns decision record and queue; council reviews?
*Default: yes, consistent with AGENTS.*

**Q14.2** Should Phase 0 be documentation/decision cleanup only — no code — so the reversed “no accounts” line stops causing conflicting implementations?
*Default: yes.*

**Q14.3** Then Phase 1: save schema + local store refactor.
**Q14.4** Then Phase 2: identity and anonymous-to-account link.
**Q14.5** Then Phase 3: cloud save API + two-device sync.
**Q14.6** Then Phase 4: conflict UI + migration UI.
**Q14.7** Then Phase 5: stats persistence + brag share.
**Q14.8** Then Phase 6: full gate, Verifier signoff, deployed release.

Should these phases be merged where safe, or kept separate so each has its own receipt?
*Default: keep separate receipts; implement in overlapping tracks only if the boundaries do not touch the engine.*

# 15. Explicitly future / out of scope for this plan

Not launch-blocking, per Owner:

> “expansion into other sports, and more interactive visuals like the photos and project i had you look at are more future goals. along with potentially mutliplayer, etc”

So the questions here are only: should we write them into `PROJECT-KNOWLEDGE.md` as **FUTURE — not v1** so nobody mistakes them for release gate items?
*Default: yes.*

# One blocking question for the Owner/Architect

Which single decision do you want settled first: **launch domain custody** (Cloudflare nameservers vs external DNS) or **auth provider choice** (Auth.js / Better Auth / managed)? Both are currently open; one of them should be closed before the rest of the plan is frozen.
