SPEAKER: pickle | ROLE: council seat (advisor) | TASK: final implementation plan for the remaining mandatory features | DATE: 2026-11-21T04:55Z | SUPERSEDED 05:13Z on Q13 only: the Owner later ruled "i don't already have a domain" and "free now and always" — the `play.` subdomain recommendation is struck; target `76pancakes.workers.dev`. See `inbox/20261121-0513-pickle-CANONICAL-REFERENCE-entire-project-owner-veratim-rulings-decisions-state.md`.
FOR: Owner; Architect (Claude); Z.ai; council seats. ADVISORY — I write no product, engine, pin, governance, queue or tooling files. This is a plan for others to weigh in on and, if accepted, for the Architect to own.

> Note on method: I used the writing-plans skill's structure (file map, interfaces, right-sized tasks, receipts), adapted to your instruction. Open choices are written as QUESTIONS with a recommended default and the work each blocks. Your rulings are written as LOCKED and quoted verbatim. Per AGENTS.md only the Architect builds; this plan does not authorise a seat to implement anything.

# 76 Pancakes — Remaining Mandatory Features: Implementation Plan

> **For agentic workers:** this plan is for council review and Architect adoption. Only the Architect writes `colors/**` and any product build; Z.ai owns its own lane and hands over a static build. A seat that takes a question below answers it in `inbox/` — it does not implement.

**Goal:** ship, before public deployment, the account capability, cross-device save sync, offline-conflict resolution, local-save migration, career stats and brag share — on the existing engine pin, with zero engine bytes changed, free-only, offline-first.

**Architecture:** the already-REVIEWED storage envelope and async facade (P-207/P-214) stay the seam between UI and engine. Local save remains the source of truth for offline play; a Worker-side API holds account identity, per-slot save heads, stats and preferences; sync reconciles whole envelopes per the already-APPROVED P-254 rule (never a field merge). Front end and backend are **one Cloudflare Worker with static assets** (Owner direction, 21 Nov 04:5xZ — nameservers at Cloudflare); Pages drops out of the release topology. The exact hostname is still needed for the brag URL.

**Tech Stack:** Svelte 5 + Vite 8 (Owner, 2026-11-19, final); TypeScript; Cloudflare Workers + D1/KV (free tier); maintained OAuth 2.0/OIDC implementation (Auth.js, Better Auth or managed provider — provider is an OPEN question); Playwright for UI batteries; Node 22.23.5 locally / CI Node 24.

**Spec:** this plan argues from `_agents/owner-notes/2026-11-01-storage-brief-verbatim.txt`, `2026-11-01-storage-answers-verbatim.txt`, `2026-11-01-run-it-back-slots-stats-verbatim.txt`, `2026-11-01-amused-merge-directive-verbatim.txt`, `2026-11-12-platform-vision-and-architecture-verbatim.txt`; `inbox/20261101-2000-architect-storage-assessment.md` and `inbox/20261101-2100-architect-to-zai-storage-contract.md` (architect/engine-and-seats); `inbox/20261102-0745-muse-P-208-stat-list.md`, `inbox/20261102-0755-muse-P-209-brag-spec.md`, `inbox/20261102-0855-muse-P-207-gap-proposals.md`, and the live `_agents/QUEUE.md` rows P-207–P-218. Full retrieval: my `inbox/20261121-0430-pickle-RETRIEVAL-existing-account-and-stats-plan.md`.

---

## 0. Locked versus open — read this before any task

### 0.1 LOCKED by the Owner (verbatim, authoritative)

- Release scope: **"Accounts are not a future goal; ideally they ship as soon as possible. we wanted users to create an account and be able to track their stats beyond a single season; this has been in the directive for a long time. sync saves and resolving offline changes and migrationg local saves into reconnection across devices are also a mandatory features before deployment; also noted since the beginning. these are not future possibilites; these are all mandatory to release along with the brag share"** (21 Nov, 04:2xZ).
- Sign-in semantics: **"optional sign in is still true but i want the ability to sign in completed before we deploy."** (21 Nov). Therefore: optional for the player, mandatory to build. Core play works with no account.
- Stat scope: **"the cross-run career stats already locked"** (21 Nov, 04:5xZ). Therefore: P-208's ten global career stats accumulate across runs; there is no multi-season franchise continuity in this release.
- Future, explicitly NOT in this plan: **"expansion into other sports, and more interactive visuals like the photos and project i had you look at are more future goals. along with potentially mutliplayer, etc"** (21 Nov). Also locked earlier: **"i don't want the scouting or full gm experience"** (3 Nov).
- Stats shape: **"The global data should record by overall and by team. The user should know their best record with each franchise."** and **"All user stats are global. Prune all season logs except for tracked profile stats."** (1 Nov brief).
- Stat trigger: **"Yes. Stats should be saved as soon as the user's team is eliminated. that could be at different stages"** (1 Nov).
- Brag: **"it's not a seed challenge. it's a brag share."** / **"The user shouldn't be exporting anything. That's too much. No downloads."** / **"no to the hidden full save."** (1 Nov).
- Conflict rule (P-254, Owner APPROVED 2026-11-05): per-slot last-write-wins on the **WHOLE** save, never a field merge; losing lineage kept on disk as a rung-back; a fork resolved as "keep both" at the slot level; additive `deviceId` in the envelope now.
- Persistence facts from the same ruling set: mid-game refresh replays the SAME game (store the game seed); "run it back" = same drafted roster, new seed, next free slot silently, A/B/C choice when full; new drafts use the latest player database; saved slots carry frozen players and version stamps so resume never reads the live database.
- Architecture/process constraints from AGENTS.md: engine pin `d3bd81d2` in AGENTS.md / live engine commit `408410477` (tree `8d8a8a1e81386e99f53f995492904348cb7d8345`); zero engine bytes changed by UI; only the Architect writes product HTML or `colors/**`; free-only; offline is a hard requirement; MIT; one self-contained product was reversed 2026-11-04 (P-251) in favour of separate assets on Cloudflare.

### 0.2 LOCKED plan artifacts (reviewed — treat as inputs, not questions)
- P-207 REVIEWED: envelope `{kind: 'draft'|'week'|'season', schemaVersion, engineVersion, dataVersion, slot: 'A'|'B'|'C', savedAt, payload}`, plain JSON, async facade `list/load/save/delete(soft)/migrate` + `stats/settings/profile`, typed load result `ok | empty | corrupt | newer-version | unavailable`, storage must not import engine.
- P-207 gap fixes (proposed by MUSE, Architect owns verdict): `save(slot, envelope, statsDelta?)` atomically with `statsRecorded` true; idempotency backstop by `savedAt`/UUID; achievements API; soft-delete semantics; `SlotMeta` shape.
- P-208 REVIEWED: the ten stats — Super Bowl wins; 20-0 seasons; best non-title playoff run; playoff appearances; best regular-season record; longest single-season win streak; first Super Bowl per franchise; draft steals; best draft class; franchise legend `titles×100 + playoff apps×10 + best wins` (weights INFERRED, Owner may retune).
- P-209 REVIEWED: brag text `I went {W}-{L} with the {Team} and {result}. Can you go 20-0?` + bare deployed URL; results screen only; clipboard + toast; no save data, seed, parameters or downloads; build-time URL constant, never `window.location`.
- P-210 REVIEWED: browser/origin risks need measurements, not opinions.
- P-216 REVIEWED: human first pass on the stable-ID crosswalk. P-214 REVIEWED: E3 week-stepping seam; its `RunState ↔ WeekPayload` mapping item P-214 remains a deliverable. P-217 (engineVersion replay policy) shows OPEN/auto-retire on the board — **see Q12, it is still needed by this plan**.
- v8/cutover: build on pin `408410477`; UI into `colors/src/ui/`; single engine `colors/src`; Playwright 1.65.1 pinned; gates enumerated in `claude/cutover-runbook-2026-11-20.md` §2–3.

### 0.3 What this plan must NOT re-open
The stat list, the elimination trigger, the per-franchise keying, the P-254 conflict rule, the optional-at-play semantics, the future scope list, the engine pin, and the free-only/offline constraints. A question about any of these is out of order; raise a dissent instead.

---

## 1. Scope check and file map

The remaining work is **four independent subsystems** that each need their own review gate. Per writing-plans' scope check they should be planned, reviewed and landed separately, each producing a testable deliverable:

1. **Storage/statics core** — envelope, facade, week payload mapping, stat recording, brag. No network. Owned in Z.ai's lane against the frozen contract, then merged by the Architect.
2. **Account capability** — identity, auth library, session, optional sign-in UI, account→save binding. Architect decides the stack.
3. **Sync + conflict** — per-slot whole-envelope reconciliation, rung-back, keep-both, offline queue. Architect owns the server contract; a seat may propose.
4. **Migration + deployment** — local→account migration, hosting topology, gates and handover.

**Proposed file ownership (names are proposals; the Architect owns final names):**

| Concern | Location | Rule |
|---|---|---|
| Envelope TS type + serialise/restore | `colors/src/storage/envelope.ts` | No import from `engine/**` |
| Facade + localStorage adapter | `colors/src/storage/facade.ts`, `adapter-local.ts` | Async API from P-207 |
| Stat store + elimination recorder | `colors/src/storage/stats.ts` | Ten stats from P-208, keyed by franchise |
| Brag action | `colors/src/ui/share/brag.ts` + results-screen button | P-209 template, build-time URL |
| Account/session client | `colors/src/account/client.ts`, UI under `colors/src/ui/account/` | Optional sign-in; core play unchanged |
| Sync engine | `colors/src/sync/reconcile.ts` | Pure function: local head + remote head → plan |
| Worker API routes | Architect-owned Worker project (name undecided — Q4) | Auth callbacks, sync, stats; never Pages Functions |
| D1 schema + migrations | Architect-owned Worker project | No schema exists today (VERIFIED across four refs) |
| Test orders | `_agents/TEST-ORDERS/<build>-<n>.md` | Architect writes; seats post `RESULT:` lines |

---

## 2. Global constraints (every task inherits these)

- Engine pin unchanged: `git rev-parse HEAD:colors/src/core HEAD:colors/src/sports HEAD:colors/src/platform` must equal the values at `408410477`. Zero engine bytes.
- Protected constants unchanged and re-pinned in the same commit: `DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `RATING_SPECS` (legacy) / `FLEX`, `RATING_SPECS`, `SLOTS` in Colors.
- Free-only: no paid plan. D1 Free (5M reads/day, 100k writes/day, 5 GB, 10 DBs), KV/R2 free allowances, Workers static assets free. Check provider free tier before choosing auth (Q1).
- Offline-first: the simulator remains playable with no network and no account; local save is authoritative for play.
- No field-level merge of saves. Ever. P-254 governs.
- No save data, seed or encoded state in a brag; no downloads; no hidden full-save backup.
- No invented factual data; player pool is the frozen 1,953-player set; ratings generation is the Owner's alone.
- One writer for `colors/**` and product HTML: the Architect. Seats submit ideas, snippets, tests, dissents to `inbox/`; three different seats per review item; work comes from `QUEUE.md`.
- Receipts for every claim: command + output, labelled VERIFIED / REPORTED / INFERRED / UNKNOWN.
- Gates at the end: full draft, season to Super Bowl, 390 px no horizontal scroll, no console errors, protected constants re-pinned (AGENTS.md §10).

---

## 3. Review focus — the five failure modes most likely to bite, with the task that pins each

1. **Two devices, one slot, both offline (the P-254 case).** Expected: whole-save LWW, no field merge, loser kept as rung-back, fork kept both at slot level. Pinned by Task D2's two-device test.
2. **Clock skew / forged `savedAt`.** Expected: "last" is a server-monotonic sequence, not a device wall clock; deterministic tie-break by `deviceId`. Pinned by Task D2's skew test.
3. **First sign-in when the account already has cloud saves and the device has local slots.** Expected: no silent loss; slot-by-slot decision; idempotent retry. Pinned by Task E1's migration matrix.
4. **Stats double-count or loss across save + stats writes.** Expected: one atomic write with `statsRecorded` true and a `savedAt`/UUID idempotency backstop. Pinned by Task B2's atomicity test.
5. **Offline token expiry / Safari eviction / host change.** Expected: play continues offline; sign-in resumes on reconnect; no implied recovery after a data clear. Pinned by Task C3's offline test and Task F1's P-210 measurements.

---

## 4. OPEN QUESTIONS — answer these in `inbox/`; each has my recommended default and what is blocked meanwhile

**Q1 — Which auth implementation and which providers?**
Owner locked "a maintained OAuth 2.0 / OpenID Connect implementation (Auth.js, Better Auth or a managed provider), never homemade password handling". ARCHITECTURE-DIRECTION.md names GitHub/Google. *Question:* Auth.js, Better Auth, or a managed provider — and is email/password in scope at all, or social OAuth only? *Recommended:* Better Auth or a managed OIDC provider on the Worker, GitHub + Google only, no hand-rolled credentials; confirm the free tier covers the expected user count. *Blocked until answered:* Task C1 (session storage), the D1 `identities` table, and the auth-boundary tests.

**Q2 — Does an account own saves, or does a local anonymous identity later bind to one?**
*Question:* on first launch with no sign-in, does the app mint a device identity that can later be claimed, or is the account created first and local saves uploaded at sign-in? *Recommended:* local-first with a device `deviceId` already in the envelope (P-254), account binds at sign-in (Task E1). *Blocked:* migration design, sync identity key.

**Q3 — Where does server-authoritative state live: D1, KV, or both?**
*Question:* save heads and stats in D1 (relational, per-user/per-slot), sessions in KV (fast expiry), preferences in D1 or KV? *Recommended:* D1 for saves/stats/preferences, KV for sessions; R2 only if rung-backs outgrow D1. *Blocked:* D1 schema, Task D1.

**Q4 — Domain nameservers — ANSWERED by the Owner (21 Nov, verbatim): "why wouldn't the nameservers be at cloudflare; and i can setup the cloudflare but i need direction".** I asked only because Cloudflare docs (REPORTED, read this sitting) state a Worker cannot serve a domain whose nameservers are not on Cloudflare — Pages can via CNAME. The Owner's direction resolves it: **nameservers go on Cloudflare → one Worker with static assets (`assets.directory`, SPA `not_found_handling`, `.assetsignore`) carries both front end and backend.** No Pages, no split Worker for hosting. Why I asked, in one line; the answer changes the topology from a fork to a single path. The Owner needs setup direction — provided in `inbox/20261121-0458-pickle-CLOUDFLARE-setup-direction.md`. Still needed from the Owner: the domain itself and which hostname (apex or `play.` subdomain) — see Q13.

**Q5 — What breaks a tie in per-slot LWW?** (P-254 says LWW, not how "last" is measured.)
*Question:* server receipt sequence, or client `savedAt`? *Recommended:* server-monotonic `(userId, slot)` sequence as "last", client `savedAt` for display only, `deviceId` as deterministic tie-break. *Blocked:* Task D2 exact rule. **This is a question about mechanism, not a re-opening of the locked LWW rule.**

**Q6 — What exactly is a "rung-back" and how many rungs survive?**
P-254 locks "losing lineage kept on disk as a rung-back". *Question:* server-side append-only `save_revisions` table, client-side too, and how many versions? *Recommended:* server keeps the last N (Owner/Architect to pick N) losing revisions per slot; client keeps one local copy for offline recovery; never shown as a playable slot. *Blocked:* D1 schema, Task D2.

**Q7 — How can a fork "keep both at the slot level" when there are only three slots A/B/C?**
*Question:* is the second branch a hidden archive entry, a fourth "fork" pseudo-slot, or a user-visible A/B/C choice that overwrites one? *Recommended:* a server-side fork record attached to the slot, surfaced as a one-time choice on reconnect; the three playable slots stay three. *Blocked:* sync UI, Task D2. **This needs the Owner if it changes what the user sees.**

**Q8 — Is stat state server-authoritative or client-authoritative?**
*Question:* do stats come from the accepted season envelopes on the server, or from the client's stat store? *Recommended:* server recomputes stats idempotently from accepted eliminated-season envelopes (using the P-207 gap idempotency key); client stat store is a cache updated at the same atomic write. *Blocked:* Task B2/D3 split, D1 `stats` table.

**Q9 — Is there a defined session lifetime and offline grace?**
*Question:* how long is a session valid; what happens when it expires with no network? *Recommended:* long-lived refresh cookie, offline play continues regardless, re-auth only on a successful reconnect; never lock the local app on expiry. *Blocked:* Task C3 test, auth client.

**Q10 — Which preferences/board config are client-authoritative?**
*Question:* are weights, theme and board layout per-account synced, or purely local? *Recommended:* client-authoritative preferences synced as a last-write-wins *separate* record, never mixed into a save envelope. *Blocked:* Task D3.

**Q11 — Is the achievement list in scope, and who writes it?**
P-207 gap 2 proposed an API but no achievement list exists. *Question:* do we ship achievements now, and with what list? *Recommended:* ship the API and an empty-or-minimal locked list only if the Owner names one; otherwise defer achievements to post-release and keep the API stub. *Blocked:* Task B3.

**Q12 — What is the engineVersion replay policy?** (P-217 shows OPEN/auto-retire but this plan needs it.)
*Question:* when a save's `engineVersion` is older than the shipped engine, do we replay, refuse with a clear message, or open read-only? *Recommended:* refuse replay of old envelopes (frozen payloads make replay unsafe), show an honest "this save was made with an older engine" message, keep the bytes for reference. *Blocked:* Task A3 version handling, P-217 closure. **Owner/Architect call; do not let P-217 auto-retire with this unanswered.**

**Q13 — What is the deployed URL for the brag share? — OPEN, narrowed by Q4.**
P-209 requires a build-time constant, never `window.location`. The hosting is now settled (one Worker on a Cloudflare-managed domain), so the only missing input is the exact hostname. *Question for the Owner:* what is the domain, and do we publish at the apex (`https://example.com`) or a subdomain (`https://play.example.com`)? *Recommended:* a `play.` subdomain — it keeps any existing apex site/email untouched and makes the DNS change smaller. Set the constant at make-live; hide the button when unset. *Blocked:* final brag acceptance and OAuth callback registration; not blocked for local build.

**Q14 — Stat scope — REAFFIRMED by the Owner (21 Nov, verbatim): "locked cross run career stats".** Already locked in §0.1; the Owner repeated it in answer to Q14. No franchise continuity, no multi-season gameplay state, no new stats beyond P-208's ten. The only remaining sub-item is mechanical, for the Architect: confirm the `(userId, scope, franchise)` stats table satisfies cross-run accumulation with no engine state added. Not a product question and not blocked on the Owner.

**Q15 — What is the account deletion / data-export policy?**
*Question:* can a user delete their account, and what happens to stats and rung-backs? *Recommended:* out of scope for release unless the Owner requires it; document honestly. *Blocked:* legal/privacy copy only.

**Q16 — Abuse controls on a free tier?**
*Question:* per-account save-size cap, sync rate limit, and cap on rung-backs? *Recommended:* cap envelope size at the measured 3-slot budget (Claude's assessment: frozen pool ~233 K chars per mid-draft slot; 3 slots fit in localStorage), rate-limit sync at the Worker. *Blocked:* Task D1 limits.

**Q17 — Who answers these and by when?** Per AGENTS.md nobody assigns seats. *Question for the Owner/Architect:* do you want a single council review round on all 17, or questions routed by subsystem? *Recommended:* one round, answers in `inbox/` with `FOR: Q<n>` so the Architect can resolve in one pass. *Blocked:* nothing technical; this is process.

---

## 5. Phased tasks

Each task ends with an independently testable deliverable and a commit by its owner. "Question" lines must be answered before that task starts.

### Phase A — Freeze the seam (no engine bytes, no network)

**Task A1 — Envelope + facade contract under test**
- Files: create `colors/src/storage/envelope.ts`, `adapter-local.ts`, `facade.ts`; test `colors/test/storage/envelope.test.ts`.
- Consumes: P-207 envelope shape, P-254 `deviceId`. Produces: `list/load/save/delete/migrate`, typed load result, `SlotMeta`.
- [ ] Write failing tests: round-trip all three `kind`s; `load` returns each of `ok | empty | corrupt | newer-version | unavailable`; no import from `engine/**` (grep assertion).
- [ ] Run tests, confirm failure. Implement the types and adapter. Run, confirm PASS. Commit by the Architect/Z.ai in their own lane.
- Receipt: test command + output.

**Task A2 — E3b `RunState ↔ WeekPayload` mapping (P-214)**
- Question: none (P-214 REVIEWED). Files: `colors/src/storage/week-map.ts`, test `colors/test/storage/week-map.test.ts`.
- [ ] Write round-trip test: `RunState → WeekPayload → RunState` with the same seeds; assert identical replay.
- [ ] Implement mapping; confirm PASS. Commit.
- Receipt: round-trip output.

**Task A3 — Version handling (P-217 answer required)**
- Files: `colors/src/storage/version.ts`, test. Consumes: Q12 decision.
- [ ] Test: older `engineVersion` → honest refusal, bytes preserved; `dataVersion` mismatch → frozen players still resume (locked 1 Nov Q2). Implement. Commit.

**Task A4 — Contract review closure**
- MUSE/Architect: close P-214 and P-217 with receipts; MUSE files the three 21 Nov Owner rulings and reconciles §3/§7 stale text. Seats review; three different seats per item.

### Phase B — Local-first storage, stats and brag (no account dependency)

**Task B1 — Write safety and UX states**
- [ ] Tests: interrupted write (temp-key swap), one-deep backup, quota failure, corrupt blob, private-mode `unavailable`, two-tab event warning. Implement; confirm no silent data loss and no implied recovery after a data clear. Commit.

**Task B2 — Career stats at elimination (P-208) with atomic write**
- Question: Q8 (server vs client authority) affects only the eventual sync layer, not this local task.
- Files: `colors/src/storage/stats.ts`, test `colors/test/storage/stats.test.ts`.
- [ ] Tests for all ten stats with the elimination trigger: miss playoffs, lose each round, win Super Bowl, 20-0; per-franchise rows for 1,2,4,5,7,8,9,10 and overall+franchise for 3,6; `statsRecorded` idempotency (re-finish does not double count); atomic `save(slot, envelope, statsDelta)` with `statsRecorded` true; `savedAt`/UUID backstop. Implement; commit.

**Task B3 — Brag share (P-209)**
- Question: Q13 for the URL value only. Files: `colors/src/ui/share/brag.ts` + results-screen button.
- [ ] Tests: exact template; `{result}` variants including 20-0; bare build-time URL; button hidden when URL unset; no save/seed/params; clipboard fallback toast. Implement; commit.

**Task B4 — Achievements**
- Question: Q11. If deferred, land only the P-207 gap-2 API stub with an idempotent `unlock` test; do not invent a list.

### Phase C — Account capability (Architect decides the stack)

**Task C1 — Identity, auth library and session**
- Questions: Q1, Q2, Q3, Q9. Files: Architect-owned Worker project (`src/index.ts`, D1 migration `001_init.sql`, KV session binding).
- [ ] Write failing tests: OAuth callback creates/loads one identity; session cookie is HttpOnly/Secure/SameSite; no cross-user save read or write; shared links read-only; session expiry never blocks local play. Implement; commit.
- Receipt: auth-boundary test output; free-tier confirmation from provider docs.

**Task C2 — Optional sign-in UI**
- Locked: sign-in optional for the player; core play works with no account; capability complete before deploy.
- [ ] Tests: first launch shows Continue/slot selector with no sign-in gate; "Sign in" entry point visible; after sign-in the same local slots are still playable; reduced motion respected; 390 px no horizontal scroll. Implement; commit.

**Task C3 — Offline behaviour**
- Questions: Q9. [ ] Tests: sign out / expire token with no network → play and local save continue; reconnect → sign-in resumes and enqueues sync; no console errors across START → 3 picks → UNDO → reload → finish. Implement; commit.

### Phase D — Sync and conflict resolution

**Task D1 — Server storage contract**
- Questions: Q3, Q6, Q16. [ ] D1 schema + tests: `(userId, slot)` save head with `revision`, `savedAt`, `deviceId`, `deletedAt`; append-only `save_revisions` for rung-backs; `stats` keyed `(userId, scope, franchise)`; preferences separate; size and rate caps. Commit by the Architect.

**Task D2 — Pure reconcile function (the P-254 case)**
- Questions: Q5, Q6, Q7. Files: `colors/src/sync/reconcile.ts`, test `colors/test/sync/reconcile.test.ts`.
- [ ] Tests: local newer → push; remote newer → pull; divergent → keep both at slot level with loser as rung-back; **assert no field merge** (assert whole-envelope identity); skewed device clock cannot win; deterministic `deviceId` tie-break; offline queue drains in order. Implement as a pure function, then wire the API. Commit.
- Receipt: two-device conflict test output; this is the highest-risk task and must have a Verifier who wrote none of it.

**Task D3 — Stats/Preferences sync**
- Questions: Q8, Q10. [ ] Tests: idempotent stats delta from accepted envelopes; preferences LWW in their own record; stats survive slot deletion/overwrite (locked 1 Nov); achievements survive both if shipped. Commit.

### Phase E — Migration from local saves to an account

**Task E1 — Migration matrix**
- Questions: Q2, Q5, Q7. Files: `colors/src/storage/migrate.ts`, test.
- [ ] Tests for: account with no cloud saves → upload all local slots; account already has saves → per-slot LWW with no silent overwrite; idempotent retry after interruption; frozen players and `dataVersion` preserved; old slot resumes without the live database; `statsRecorded` slots do not double count; soft-deleted slots hidden and count as free for run-it-back. Implement; commit.
- [ ] Add a rollback path: migration never deletes the local copy until a server receipt is confirmed.

**Task E2 — Migration test order**
- Architect writes `_agents/TEST-ORDERS/<build>-<n>.md` with the exact commands; seats post `RESULT: <test> | PASS/FAIL | <command> | <output>`. A seat that supplied a snippet for that build does not verify it (AGENTS.md §5).

### Phase F — Deployment

**Task F1 — Hosting topology and measurements**
- Q4 ANSWERED: one Worker with static assets on a Cloudflare-managed domain; no Pages, no split. Q13 still needs the exact hostname from the Owner.
- [ ] P-210 measurements tabled with browser versions and dates: `file://` survival, Safari ~7-day eviction, host-change loss.
- [ ] Owner completes the Cloudflare setup checklist in `inbox/20261121-0458-pickle-CLOUDFLARE-setup-direction.md`; Architect records the chosen hostname and the resulting build-time brag URL in the work order. Commit by each owner.

**Task F2 — CI, gates and handover**
- [ ] Gates 1–10 from `claude/cutover-runbook-2026-11-20.md` §2–3, plus the new account/sync/migration gates, all green with receipts. [ ] Protected constants re-pinned in the same commit. [ ] CI green on the pushed branch. [ ] Owner reviews the running app; only then go/no-go. Deployment is by the Architect and the Owner; Z.ai hands over a static build and does not deploy.

### Phase G — Verification and acceptance

**Task G1 — Independent verification**
- A Verifier who authored nothing in the round runs the full gate: draft completes 32 teams × all rounds; season to Super Bowl; 390 px no horizontal scroll; no console errors; weights change Team Rankings instantly; recaps chronological with turnovers and game ball; two-device conflict; migration matrix; offline continuity; auth boundaries. Post `RESULT:` lines in a bulletin entry.
- **Gate PASS ≠ product acceptance.** States remain proposed → accepted → implemented → verified → Owner-accepted (AGENTS.md §5).

---

## 6. Dependency order

A1 → A2 → A3 (seam) → B1 → B2 → B3/B4 (local feature-complete) ∥ C1 → C2 → C3 (account) → D1 → D2 → D3 (sync) → E1 → E2 (migration) → F1 → F2 (deploy) → G1 (verification). Phase B and C can run in parallel once A is frozen; D needs both; E needs C and D.

---

## 7. What I am explicitly NOT deciding

The auth provider (Q1), the account/save identity model (Q2), the storage substrate (Q3), the domain (Q4), the LWW tie-break (Q5), rung-back depth (Q6), the fork UI (Q7), stat authority (Q8), session lifetime (Q9), preference scope (Q10), achievement list (Q11), engineVersion policy (Q12), the brag URL (Q13), account deletion (Q15), abuse caps (Q16), and the review process (Q17). Your five locked items in §0.1 and the five reviewed artifacts in §0.2 are the only things I treat as closed.

---

## 8. Labels

Owner words in §0.1: verbatim, authoritative. Queue rows, pins, file paths, P-208/P-209 text and Cloudflare constraints: VERIFIED read this sitting on the named refs. Absence of an account schema: VERIFIED negative search across four refs. Payload sizes: REPORTED from Claude's measured assessment. Recommended defaults in §4: INFERRED, mine — they are starting points for the council, not rulings. No implementation, no decision, no file outside my lane and inbox touched by me.

— pickle (council seat; advisor)
