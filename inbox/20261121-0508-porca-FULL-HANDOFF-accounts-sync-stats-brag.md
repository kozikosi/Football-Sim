SPEAKER: porca | ROLE: Council | TASK: Full handoff — everything a council member, Z.ai or Claude should know about mandatory accounts/sync/conflict-resolution/migration/brag-share, with verbatim Owner quotes | DATE: 2026-11-21T05:08Z
FOR: Owner · Architect (Claude) · MUSE · Z.ai · all council seats
LABELS: VERIFIED = read in this checkout or quoted from a local file; REPORTED = from another seat/branch or external docs; INFERRED = reasoned; UNKNOWN = not settled. No product, engine, queue or governance file was changed by this handoff.

# 0. How to read this file

- **LOCKED / MANDATORY** means the Owner has decided it. It is not open for a vote. Questions can only be about implementation.
- **FUTURE / NOT RELEASE-BLOCKING** means the Owner explicitly parked it.
- **OPEN** means I have not found an Owner decision and want Claude/Z.ai/council input.
- Quotes introduced as “Owner, this chat” are copied verbatim from the messages in this conversation. Quotes introduced with a file path are verbatim from that file on `council/porca` unless another ref is named.

This file supersedes nothing by itself. It collects evidence and flags contradictions for the Architect and MUSE to resolve.

---

# 1. LOCKED / MANDATORY — Owner verbatim from this chat

The controlling decisions for this release.

> “optional sign in is still true but i want the ability to sign in completed before we deploy.”

> “Accounts are not a future goal; ideally they ship as soon as possible. we wanted users to create an account and be able to track their stats beyond a single season; this has been in the directive for a long time.”

> “sync saves and resolving offline changes  and migrationg local saves into reconnection across devices are also a mandatory features before deployment; also noted since the beginning. these are not future possibilites; these are all mandatory to release along with the brag share”

> “expansion into other sports, and more interactive visuals like the photos and project i had you look at are more future goals. along with potentially mutliplayer, etc”

The Owner also confirmed the three answers to hy4’s questions, verbatim:

> “locked cross run career stats; why wouldn't the nameservers be at cloudflare; and i can setup the cloudflare but i need direction”

The Owner’s reason for requesting this handoff, verbatim:

> “please give a full list of everything you think any other counci lmember, z.ai, or claude should know and quote me verbatim from everything you can think of from this chat or my quotes verbatim from any file related to this and push this”

**Meaning:** Sign-in remains optional for the player. The *ability* to sign in must be complete before deployment. Accounts, cross-device sync, offline-conflict resolution, local-save migration and brag share are all launch gates. Other sports, the richer interactive visuals and multiplayer are future goals, not release gates.

---

# 2. LOCKED / MANDATORY — Owner verbatim from files

## 2.1 `_agents/owner-notes/2026-11-01-storage-brief-verbatim.txt`

The original storage brief already contained most of the data model. Key verbatim excerpts:

> “This wave delivers: autosave of drafts, seasons, and per-week game previews; up to 3 parallel save slots; a local profile; global career stats; minimal settings; a copy-paste brag share.”

> “No accounts, no sign-in, no backend, no cloud.” — **SUPERSEDED by this chat for accounts/sign-in/backend/cloud. Still relevant as history.**

> “No file downloads, no export/import screens, no hidden full-save backup — the brag share (text + game URL, no save data) is the only clipboard feature.”

> “Global achievements remain regardless of save slot deletion.”

> “This is still a single season simulator for now. No injuries or playing growing old in a multiseason framework. The user can run it back with the same players with ideally a different schedule and matchups but this is not right now developing into a multiseason build.”

> “3 is good for slot number as long as the math dictates that we can hold that much information. If we need fewer slots because of runtime or storage limits, that is fine with me. All user stats are global. Prune all season logs except for tracked profile stats.”

> “The user shouldn't be exporting anything. That's too much. No downloads. You could create a copy and paste sharable with a link to the project and uh 'I went x-y. Can you go 20-0?'”

> “Mid game save would not be per play but per week. If a user starts a game and then they refresh the game mid 2nd quarter, then the autosave would reset to the game preview for that same week and they would have to replay the game again against the same opponent. Ideally the system should autosave at the game preview of each week and delete the previous autosave.”

> “Players do change their ratings and even their names sometimes. Every player should be assigned a separate id, especially if they have the same names. Any saved season keeps the old OVR ratings/names players but any new draft started uses the new ratings/names/players.”

> “Completed season slots stay until user overwrites that slot.”

> “The global data should record by overall and by team. The user should know their best record with each franchise.”

> “The challenge is not replay their exact season and matchup, just to play the general game and try to go undefeated. the challenge shouldn't carry a save. it's not a seed challenge. it' a brag share.”

> “no to the hidden full save.”

Also from §8 of the same file:

> “Per-team global stats = best W-L record, best result (Super Bowl win vs. best playoff run), and total seasons/record with that team.”

> “Global achievements survive slot overwrite as well as deletion.”

> “Only completed seasons (through the Super Bowl) record global stats. Abandoned seasons record nothing. Completed drafts that never become seasons record nothing.” — **Later replaced by the elimination trigger below; keep both as history.**

> “Run-it-back uses the same player pool (same IDs) with the latest ratings — ‘same players’ means same pool, not a frozen replay.”

## 2.2 `_agents/owner-notes/2026-11-01-storage-answers-verbatim.txt`

> “Whatever is a cleaner, more efficient structure. I'm fine with players farming 17-0. I don't think we need to create any structures to prevent that. But i think the user experience would feel more genuine if they accidentally got cut off in the 2nd quarter and they replay the game and the events from the first two quarters are the same. I think they would be happier.”

> “No, run it back with the same player means after clicking the button, they appear again at the preseason page. But the schedule would ideally be different and  a new seed would generate.”

> “Any other questions? I agree with everything else you said”

## 2.3 `_agents/owner-notes/2026-11-01-run-it-back-slots-stats-verbatim.txt`

> “1. The new run would automatically go to a new slot and the user wouldn't even notice. If all slots are full, then they should be asked which slot they would like to overwrite.”

> “2. new draft always uses latest player database. Do whatever else you need to do to make sure a player can resume an old save slot without triggering any nulls or glitches because of the database shifting.”

> “3. Yes. Stats should be saved as soon as the user's team is eliminated. that could be at different stages”

## 2.4 `claude/00-READ-FIRST.md` line 41

The part still binding:

> “stats recorded ONCE at the moment the user's team is eliminated (miss playoffs / any round / title), flagged on the slot; abandoned = nothing; farming 17-0 is fine.”

The part now reversed:

> “no accounts/downloads/export/backup”

**Resolution:** “no accounts” is reversed. “no downloads/export/backup” remains locked. Sign-in optional remains locked.

## 2.5 `_agents/COLORS-V1-UI-ARCHITECTURE.md` §7

> “## 7. Optional sign-in and cloud saves (Owner idea, 1 Nov; STORED, later)”

> “The store's save format is already a small portable record (`{version, seed, draftLog, seasonLog}`), so local save (localStorage, try/catch) comes first and cloud save is the same record sent elsewhere.”

> “Rules from the Owner's note: sign-in is **optional** (the simulator works with no account); use a maintained OAuth 2.0 / OpenID Connect implementation (Auth.js, Better Auth or a managed provider, chosen with the framework and host), never homemade password handling or unverified email/password; test the authorization boundaries (a user can never read or write another user's saves; shared links are scoped read-only).”

> “Conflict to resolve with the Owner when we get there: the product rule is one self-contained HTML with no paid API, and cloud saves need a hosted backend. Recommended default: keep the simulator file fully offline and ship the accounts/cloud saves as a separate, optional portfolio module that talks to the same save record.”

**Now:** the product must ship with the backend capability, but the player may still play offline with no account. The old “separate, optional portfolio module” language needs Architect/Owner reconciliation with the mandatory release gate.

## 2.6 `inbox/20261101-2100-architect-to-zai-storage-contract.md`

> “**Stats are recorded the moment the user's team is eliminated** (misses the playoffs, loses in any round, or wins the Super Bowl), once, flagged on the slot so refresh or finishing the season cannot double count. This REPLACES the brief's ‘only completed seasons record stats’. Abandoned before elimination: nothing. A completed draft that never becomes a season: nothing.”

> “Global store (separate keys): profile, settings, stats by overall and by franchise, achievements. Keyed by franchise, never by slot.”

> “Storage treats `payload` as opaque and validates only the envelope. Facade API takes and returns envelopes only; it must not import anything from `colors/src/engine/**`.”

> “Z.ai must not touch: `colors/src/engine/**`, `colors/src/app/store.ts`, the 39-function seam and its 10 laws, `build/build.mjs`, fork labels, `zpbPackFor` and the team packs, protected constants.”

> “You push `council/zai` only.”

## 2.7 Engine comment for stats timing

From `origin/council/beam:_agents/beam/67-cakepanz-9-2026-11-19/cakepanz-4/src/engine-node/sports/nfl/app/outcome.ts` (REPORTED — another branch):

> “The user's season outcome and the ‘record stats exactly once’ rule (Owner, 1 Nov): stats are recorded ONCE, the moment the user's team is eliminated (misses the playoffs, loses in any round, or wins the title), and the slot is flagged `statsRecorded`. Abandoned runs record nothing.”

> “Pure: derived from the run state, so a refresh at any point gives the same answer. Storage does the write; the flag and the global stats change in that one write (see SeasonPayload.statsRecorded).”

---

# 3. Decisions resolved in this chat / on hy4’s questions

## 3.1 Cross-run career stats — LOCKED

Owner: “locked cross run career stats”

Meaning: “stats beyond a single season” means the global/per-franchise career stats that accumulate at each elimination and survive slot overwrite/deletion. It does **not** mean franchise continuity across years; that stays future with other sports, richer visuals and multiplayer. This closes hy4’s Q2.3 / my Q10.2.

hy4 had asked (REPORTED, `inbox/20261121-0451-hy4-CORRECTION-to-0447-and-pickle-prompt.md`):

> “‘stats beyond a single season’ — cross-run career stats already locked, or franchise continuity across years?”

The Owner answered: cross-run.

## 3.2 Nameservers at Cloudflare — resolved in principle

Owner: “why wouldn't the nameservers be at cloudflare”

Meaning: the nameservers will be at Cloudflare. This removes Claude’s only hard reason for preferring Pages. Still open: the actual domain name and confirmation that its nameservers are now Cloudflare-managed. If no domain, a free `workers.dev` URL is acceptable; do not buy a domain under the $0 constraint.

## 3.3 Owner creates accounts, needs direction — resolved

Owner: “i can setup the cloudflare but i need direction”

hy4’s `inbox/20261121-0457-hy4-OWNER-ANSWERS-and-account-setup-direction.md` recorded the same answer with the typo “i an create but i need direction”; my `inbox/20261121-0459-porca-owner-answers-correction.md` corrected the verbatim. hy4’s §2 supplies the setup direction; porca endorsed it. The Architect configures and deploys; the Owner keeps custody of account, tenant, domain and credentials.

---

# 4. What is now SUPERSEDED or needs rewriting

1. `_agents/COLORS-V1-UI-ARCHITECTURE.md` §7 title “Optional sign-in and cloud saves (Owner idea, 1 Nov; STORED, later)” → should become **ACTIVE — sign-in optional, capability launch-blocking**. MUSE/Architect own the edit.
2. `claude/00-READ-FIRST.md` “no accounts” → reversed. “no downloads/export/backup” stays.
3. `_agents/owner-notes/2026-11-01-storage-brief-verbatim.txt` “No accounts, no sign-in, no backend, no cloud.” → superseded for accounts/sign-in/backend/cloud. Keep as history, not as current doctrine.
4. Cloudflare decision doc `claude/cloudflare-decision-2026-11-21.md` (VERIFIED read on `origin/architect/engine-and-seats`) says:

   > “Why Pages and not Workers static assets (I): the product is a static SPA with no server code, so Workers' extra features buy nothing now.”

   > “Workers cannot serve a domain whose nameservers are not on Cloudflare, and the domain is U. Pages is the safe default under that unknown. Revisit when a server feature exists or the domain is on Cloudflare.”

   Both premises are gone: server code is mandatory and the nameservers will be at Cloudflare. Architect should revise the decision to Workers Static Assets + thin Worker.

5. hy4’s old carve-out (`inbox/20261121-0453-hy4-FINAL-IMPLEMENTATION-PLAN-questions.md`) “if external → Pages + separate Worker” → resolved in principle by Cloudflare nameservers; domain name still UNKNOWN.

---

# 5. Architecture facts every seat needs — VERIFIED from files unless labelled

## 5.1 Save envelope and engine facts

From `inbox/20261101-2000-architect-storage-assessment.md`:

> “**Q1 Seeds - VERIFIED.** Exists today. `rng.ts` = mulberry32 over ONE uint32; `fork(label)` derives an independent stream from (seed, label).”

> “Shape: **seed only is enough** - there is no serialisable mid-stream state because nothing ever pauses mid-stream (every game is its own fork `w<week>:<home>` / `po:<round>:<home>`). Storage reads/writes the seed as a plain integer. Do not persist PRNG state. Fork labels are part of the ruleset version: renaming one changes every result.”

> “Common envelope, plain JSON only (no engine objects, no Maps): `{kind: 'draft'|'week'|'season', schemaVersion, engineVersion, dataVersion, slot, savedAt, payload}`.”

> “season (completed): final table, the user's schedule results, playoff results, champion, the user's 32 frozen players. No logs, no drives (about 25 K). Global stats are updated from this, once, atomically with the slot write.”

> “3 slots are fine.”

From `inbox/20261101-2100-architect-to-zai-storage-contract.md`:

> “`{ kind: 'draft'|'week'|'season', schemaVersion: int, engineVersion: string, dataVersion: string, slot: 'A'|'B'|'C', savedAt: ISO string, payload }`”

> “Payload contents (mine): draft = seed, userTeam, picks log by stable pid, frozen pool; week = seed, year, run counter, 32 team ratings, user's 32 frozen players, schedule, scores so far, next week, the game's seed, `statsRecorded`; season = final table, user's results, champion, frozen roster, `statsRecorded`.”

> “Facade: async `list() -> SlotMeta[]`, `load(slot)`, `save(slot, envelope)`, `delete(slot)` (soft), `migrate()`, plus `stats.read/update`, `settings`, `profile`.”

## 5.2 Stats derivability

From `origin/council/beam:z open wave v3/REPORT.md` line 32 (REPORTED):

> “**A2 derivability audit (field → present in the 187,078 B record?):** draft log (pick index/round/pos/player/slot) — **present** (`picks[]` + frozen pool) → tendencies computable ✓. Season results per season — **present in SeasonPayload** (table, userResults, champion, userOutcome) but **AWARDS ARE NOT**: MVPs / Pro Bowls / all-pro are not in any payload → achievements beyond champion/record need an awards field (Claude's schema). Usage counts — derivable from draft log + rosters ✓. **User pin field — ABSENT** (a favourites map saveId→[pid] must be added). Brag share — derivable from SeasonPayload + profile identity ✓.”

Consequence: awards and pins are not derivable from today’s payloads. If the locked stat list needs them, Claude must extend the schema; do not invent them.

## 5.3 Security boundary already set

From §7:

> “never homemade password handling or unverified email/password”

> “a user can never read or write another user's saves; shared links are scoped read-only”

## 5.4 Product rule tension

From AGENTS/known doctrine: one self-contained HTML, no CDN, no paid API, no build step for the user. Accounts/cloud saves need a hosted backend. The Owner now says the ability to sign in must be complete before deploy. Architect must reconcile the two; council should not silently assume either side wins.

---

# 6. Deployment facts and direction

## 6.1 REPORTED Cloudflare constraints used in advice

- Workers cannot serve a custom domain whose nameservers are not on Cloudflare — from Claude’s decision doc and hy4’s fetched Cloudflare compatibility matrix (**REPORTED**).
- Workers static asset requests are free/unmetered; dynamic requests ~100k/day on Free; D1 ~5 GB; R2 free tier (**REPORTED**, not verified in the Owner’s account).
- Cloudflare Access Free up to 50 users (**REPORTED**) but it is a Zero Trust gate, not a consumer account system.
- Clerk Hobby is hy4’s recommended auth default: free, no card, 50k MRU, managed OIDC (**REPORTED** from hy4’s fetched docs). It satisfies §7’s “managed provider” option. Auth.js/Better Auth remain the code-owned alternative.

## 6.2 Recommended target

**Workers Static Assets + thin Worker**, D1 for account/save metadata and pointers, R2 for immutable save snapshots and share artifacts, explicit `wrangler deploy` gate after Owner “go”. Pages is no longer needed once nameservers are at Cloudflare.

No Git auto-deploy. No secrets in repo. No token in chat. Prefer `wrangler login`; if a token is needed, scope it minimally and keep it in a password manager.

## 6.3 What the Owner hands over

From hy4 `0457` §2, endorsed by porca:

> “Account ID · domain name (or ‘use workers.dev’) · Clerk publishable key · confirmation that nameservers are at Cloudflare · confirmation that the Free plans were selected. Secret key via secure channel only.”

The Architect owns the Worker, D1 schema/migrations, R2 buckets and deploy command. Z.ai owns the cakepanz UI states. MUSE owns the queue/decision record. Council reviews. No seat is assigned by this document.

---

# 7. OPEN questions for Claude / Z.ai / council

These are not decisions. They need input.

1. **Auth provider.** Clerk Hobby (hy4 default) vs Auth.js/Better Auth (§7 baseline). Which one? Recommended default: Clerk Hobby unless Claude prefers code-owned auth; either satisfies “managed/OIDC, no homemade passwords”.
2. **Domain name.** What is the actual domain? Is it already on Cloudflare? If none, confirm use of `workers.dev`.
3. **Engine pin.** A recent Claude status report (REPORTED) cites `408410477`; AGENTS §2 cites `4ca9a071`. Architect should state the current canonical pin before account/sync work starts.
4. **Conflict policy.** Ship explicit three-way merge with user choice, or make injectable RNG launch-blocking for deterministic replay? Recommended default: explicit merge at launch; replay later.
5. **EngineVersion policy.** P-217 asks what old saves do when the engine version increments; Owner decision still needed. hy4 recommends option (b) “keep results but lose re-sim”.
6. **Anonymous brag share.** Can anonymous users still copy brag text + URL, or is brag strictly account-scoped? Recommended default: anonymous share works; signed-in shares get a recoverable token.
7. **Stat list.** P-208 wants ~8–10 locked stats. hy4 refers to “ten locked stats”. Does the persisted set include awards/pins that the derivability audit says are absent? If yes, schema extension is launch-blocking.
8. **Legend weights 100/10/1.** hy4 recommends keeping for v1, labelled INFERRED. Owner/Architect confirm?
9. **Account deletion.** Confirm that deleting an account deletes cloud saves, stats and share tokens, with explicit UI warning.
10. **Optional sign-in UX.** Confirm account creation is a non-blocking prompt after local save exists, never a wall before play.
11. **Self-contained HTML rule.** Architect must rewrite the product-rule resolution so “offline playable” and “mandatory account capability before deploy” can both be true.
12. **Receipts.** Add API schema version, D1 migration version, save schema version and auth-provider fingerprint to release receipts (no secrets). Confirm format.
13. **Verifier.** A seat that wrote none of the account/sync code must sign off before deploy. Confirm test order owner.
14. **Sequencing.** Should Phase 0 be documentation/decision cleanup only before any code? Recommended default: yes.

---

# 8. Release gates — locked

No deployment until all five have passing receipts:

1. Account creation + sign-in capability complete; sign-in optional for the player.
2. Cross-device save sync.
3. Offline-conflict resolution.
4. Migration of local saves into reconnection across devices.
5. Brag share.

Additional gates:

- Engine pin untouched; layer test forbids DB/auth imports in `core`.
- Test matrix: two devices, offline edits on both, reconnect/conflict UI, migration prompt, share creation/revocation, auth-boundary violation attempts, read-only shared-link check.
- Authorization tests prove user A cannot read/write user B’s saves.
- Rehearsed rollback with previous Worker version and D1 migration path.
- Verifier who wrote none of it signs off.

---

# 9. Future / not release-blocking — Owner verbatim

> “expansion into other sports, and more interactive visuals like the photos and project i had you look at are more future goals. along with potentially mutliplayer, etc”

Do not let these become release gates. Record them in `PROJECT-KNOWLEDGE.md` as FUTURE — not v1 (MUSE-owned).

---

# 10. Source index

Own notes and handoff:
- `_agents/owner-notes/2026-11-01-storage-brief-verbatim.txt`
- `_agents/owner-notes/2026-11-01-storage-answers-verbatim.txt`
- `_agents/owner-notes/2026-11-01-run-it-back-slots-stats-verbatim.txt`
- `claude/00-READ-FIRST.md`
- `_agents/COLORS-V1-UI-ARCHITECTURE.md` §7
- `inbox/20261101-2000-architect-storage-assessment.md`
- `inbox/20261101-2100-architect-to-zai-storage-contract.md`

Cloudflare / current plan:
- `origin/architect/engine-and-seats:claude/cloudflare-decision-2026-11-21.md`
- `origin/council/hy4:inbox/20261121-0451-hy4-CORRECTION-to-0447-and-pickle-prompt.md`
- `origin/council/hy4:inbox/20261121-0453-hy4-FINAL-IMPLEMENTATION-PLAN-questions.md`
- `origin/council/hy4:inbox/20261121-0457-hy4-OWNER-ANSWERS-and-account-setup-direction.md`
- `inbox/20261121-0455-porca-P-208-accounts-sync-plan.md`
- `inbox/20261121-0459-porca-owner-answers-correction.md`

Engine/stat implementation evidence:
- `origin/council/beam:z open wave v3/REPORT.md` line 32
- `origin/council/beam:_agents/beam/67-cakepanz-9-2026-11-19/cakepanz-4/src/engine-node/sports/nfl/app/outcome.ts`

---

# 11. Bottom line for Claude and Z.ai

The old plan is still the right *starting point*, but it was written under a “no accounts” constraint. Keep its save envelope, seed model, stat trigger, storage boundaries and security rules. Discard its “no accounts / stored later / no backend / no cloud” release posture. The player still chooses whether to sign in; the product cannot ship without the ability.

End of handoff.
