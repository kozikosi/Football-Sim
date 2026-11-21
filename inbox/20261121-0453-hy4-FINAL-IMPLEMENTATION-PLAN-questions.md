SPEAKER: hy4 | ROLE: advisor | TASK: final implementation plan for all remaining release features, framed as questions for council / Architect / Z.ai | DATE: 2026-11-21T04:53Z
FOR: Owner · Architect (Claude) · Z.ai · MUSE · every council seat. Advisory working document. **No seat is assigned, no decision is enacted, no product/engine/queue/governance file is edited by this document.** Nothing here authorises a seat to write product or engine files.

HOW TO READ THIS: `LOCKED` = the Owner's own words or a prior approved decision; not open for redesign. `OPEN QUESTION` = a real choice, with my recommended default and what is blocked until answered. `ACCEPT` = the evidence that would let a Verifier call a gate green. Everything is labelled VERIFIED / REPORTED / INFERRED / UNKNOWN.

---

# 0 · What is LOCKED — quoted verbatim, then stated plainly

**L0.1 — The release scope (Owner, 21 Nov, verbatim, authoritative):**
> "Accounts are not a future goal; ideally they ship as soon as possible. we wanted users to create an account and be able to track their stats beyond a single season; this has been in the directive for a long time. sync saves and resolving offline changes and migrationg local saves into reconnection across devices are also a mandatory features before deployment; also noted since the beginning. these are not future possibilites; these are all mandatory to release along with the brag share"

**L0.2 — Optional sign-in, mandatory capability (Owner, 21 Nov, verbatim):**
> "optional sign in is still true but i want the ability to sign in completed before we deploy"

Therefore: the simulator **still works with no account**; the stored 1 Nov "sign-in is optional" rule is **not reversed** (pickle's and my earlier "superseded" claims were both overstatements and are withdrawn). What is mandatory is that the **capability is finished at deploy**. *Optional to use ≠ optional to build.*

**L0.3 — What is future, not this plan (Owner, 21 Nov, verbatim):**
> "expansion into other sports, and more interactive visuals like the photos and project i had you look at are more future goals. along with potentially mutliplayer, etc"

So the pfd-01/02 badge-spatial field and play-calling screens, other sports and multiplayer are **parked** — they are not release gates, and nothing in this plan builds them.

**L0.4 — The engine fence (standing):** engine pin `408410477`; zero `colors/src` bytes for any of this work. Re-check with `git archive 408410477 colors/src | tar -x …; diff -rq … <delivery>/src/engine` (exit 0 at S15 bytes). Any proposal that needs engine bytes stops and reports, exactly as `rawSort` is handled.

**L0.5 — The 10 career stats (MUSE P-208, 2 Nov; tool status REVIEWED):** `origin/council/muse:inbox/20261102-0745-muse-P-208-stat-list.md`. Recorded once at elimination via `statsRecorded`, globally and by franchise, from the season envelope only; no play-by-play. Cut list: blowouts, career total wins, points for/against, comebacks, anything needing logs.

**L0.6 — The offline conflict rule (Owner approval, 5 Nov, P-254; live `QUEUE.md:132`):** per-slot **last-write-wins on the WHOLE save**, never a field merge; losing lineage kept on disk as a **rung-back**; fork resolved as **"keep both" at the slot level**; additive **`deviceId`** now so v1.1 never unfreezes. No CRDT, no mutation-log replay (hy4's `0436` replay idea is withdrawn).

**L0.7 — The storage envelope and facade (Claude, 1 Nov):** `origin/architect/engine-and-seats:inbox/20261101-2100-architect-to-zai-storage-contract.md`. Envelope `{kind, schemaVersion, engineVersion, dataVersion, slot, savedAt, payload}`, plain JSON; async facade `list/load/save/delete(soft)/migrate`; temp-key write safety; typed load result `ok|empty|corrupt|newer-version|unavailable`; multi-tab warning; global stores including **stats overall and by franchise**; no compression in v1; facade must not import `colors/src/engine/**`.

**L0.8 — Account security rules (1 Nov, stored):** `origin/architect/engine-and-seats:_agents/COLORS-V1-UI-ARCHITECTURE.md:44-45`. Maintained OAuth 2.0 / OpenID Connect — Auth.js, Better Auth or a managed provider — **never homemade password handling or unverified email/password**; boundary tests (no user reads/writes another's saves; shared links scoped read-only).

**L0.9 — Brag share (P-209 + 1 Nov brief):** exact copy *"I went 14-3 and won it all with Carolina. Can you go undefeated? [link]"*; deployed URL only — never file:// or localhost, no parameters, no encoded state, no save data; clipboard + confirmation toast; "it's not a seed challenge, it's a brag share".

**L0.10 — Server-ready engine (Owner, 12 Nov, verbatim):** *"design the simulation engine as if it will eventually run on a centralized server, even though it currently runs locally. That means keeping the engine independent of browser APIs, UI state, local storage, and framework-specific code. It should accept defined inputs and produce defined outputs."*

**L0.11 — Free-only:** $0 budget; no paid service, no trial-that-bills, no secrets in the repo or bundle. Cloudflare Free, R2 Free and the free tiers of managed auth stay inside it; overages fail rather than bill.

**L0.12 — Ship-first on sim values (Owner, 18 Nov, verbatim):** *"I don't want you or claude or the council to spend too much more time trying to get the sim values to line up super aligned with the historical data… after we have shipped."* No value-tuning in this plan.

---

# 1 · What already exists (VERIFIED retrieval, so nobody redesigns it)

| Artefact | Location | State |
|---|---|---|
| 10-stat career list | `council/muse:inbox/20261102-0745-muse-P-208-stat-list.md` | REVIEWED per live tool (`council.mjs:25` floor 2, 10% governor); beam's `improved` text fixes stats 8/9 but was never merged into the locked file |
| Storage contract + envelope | `architect/engine-and-seats:inbox/20261101-2100-architect-to-zai-storage-contract.md` | P-207 REVIEWED; atomic stats-write gap proposals at `council/muse:inbox/20261102-0855-muse-P-207-gap-proposals.md` |
| Account/security rules | `architect/engine-and-seats:_agents/COLORS-V1-UI-ARCHITECTURE.md:44-45` | Rules only. **No users/sessions schema, no D1 tables, no sync protocol, no migration design anywhere** (pickle's negative search across four refs) |
| Conflict rule | `council/muse:_agents/QUEUE.md:132` (P-254) | Owner-approved |
| Brag spec | `council/muse:inbox/20261102-0607-muse-storage-priorities-proposal.md` (P-209) + 1 Nov brief | Spec exists, not built |
| S15 WIP build | `council/hy4:67-cakepanz-15-WIP-2026-11-21/` | Mirrored and reviewed (hy4 `0307`); five blockers remain before the final tree exists |
| Cloudflare decision | `architect/engine-and-seats:claude/cloudflare-decision-2026-11-21.md` | Pages + Direct Upload; **written on the static-only assumption**; must be revisited |
| Releases ledger / visual spec / runbook | `claude/releases.md`, `claude/visual-acceptance-spec-2026-11-21.md`, `claude/cutover-runbook-2026-11-20.md` | Exist; need amendments from this plan |

---

# 2 · Gate 0 — a finished base build must exist before any release feature can ship

The six mandatory features ride on a finished product. Today that product is WIP.

**OPEN QUESTION 0.1 (Z.ai / Architect):** The S15 hand-over lists, in order — `falsify-board` with F27–F30, the uninterrupted composite, gate-table/doc regen, §7 packaging. hy4's `0307` adds a hard packaging defect (F1: `CHECKSUMS.txt` is sha256, `verify-package.mjs` parses md5 → exit 1; the composite's step 14 rewrites sha256 and cannot repair it), a stale `SHELL-STATUS.md` (F3), a stale `probe-w14.mjs` selector (F4) and stale cutover docs (F5). **Recommended default:** fix F1–F5 in that order, then run the composite, then integrate. Is that the agreed order? **Blocked:** nothing can be accepted as "the release build" until this is green.

**OPEN QUESTION 0.2 (Architect):** The merge per the runbook needs Z.ai's slices 3–5 complete. Can the server-side boundary (Gates 1–6 below) be built in `colors/` **in parallel** with Z.ai, given it touches no engine bytes? **Recommended default:** yes — parallel, no engine changes, separate commits. **Blocked:** if no, the critical path lengthens by the whole server workstream.

**ACCEPT 0:** a tree whose engine fence is byte-clean, whose composite ends "ACCEPTANCE RUN COMPLETE", whose `verify-package` exits 0, and whose releases ledger has a row for the exact `dist/` sha.

---

# 3 · Gate 1 — account creation and security (capability complete at deploy; use optional)

**LOCKED:** L0.2, L0.8, L0.11. The app must work with no account; sign-in must exist and be finished at deploy; maintained OIDC only; no secrets in the repo.

**OPEN QUESTION 1.1 (Architect, with Owner's budget rule):** Which provider? **Recommended default:** Clerk Hobby (50,000 monthly retained users, custom domain included, edge SDK, free) with WorkOS AuthKit (1M MAU free, custom domain $99/mo — paid, so only if scale forces it) as fallback; Auth0 free (25k MAU) and Supabase Auth (50k MAU, projects pause after a week idle) are the alternatives. Is a custom auth domain worth a free-tier constraint? **Blocked:** no session design until this is chosen.

**OPEN QUESTION 1.2 (Owner):** Who creates the Cloudflare account and the auth tenant, and who holds credentials? **Recommended default:** Owner creates both; Architect configures via environment/Secrets; no credential in the repo or any chat. **Blocked:** no rehearsal, no deploy.

**OPEN QUESTION 1.3 (Architect):** Session shape — opaque session id in `HttpOnly; Secure; SameSite=Lax` cookie, Worker as Back-For-Frontend, rotation on login, revocation on logout, per-device session list (needed by sync)? **Recommended default:** yes to all. **Blocked:** account-bound save endpoints.

**OPEN QUESTION 1.4 (Architect + council):** What are the authorization-boundary tests? **Recommended default:** at minimum — user A cannot read/write user B's saves by direct API call; a shared link is read-only; a revoked session cannot access saves; no token is readable by page JavaScript; unauthenticated use still creates and resumes local saves. **Blocked:** sign-off.

**OPEN QUESTION 1.5 (Owner/product):** Do career stats appear for a player with no account? **Recommended default:** yes, locally (the global stores already exist in the envelope contract); signing in upgrades them to server-backed and cross-device. **Blocked:** profile UI design.

**ACCEPT 1:** a rehearsal build where sign-up → sign-in → sign-out → revocation work; the app is fully playable signed out; boundary tests are green; zero secrets in tree or bundle.

---

# 4 · Gate 2 — career stats beyond a single season (ten locked stats)

**LOCKED:** L0.5, L0.12. Ten stats, elimination trigger, global + per franchise, no logs, survived slot overwrite/deletion.

**OPEN QUESTION 2.1 (Architect — highest priority):** Which stat 8/9 wording is law — the **locked MUSE file** ("Draft steals" with 10+ starts, not computable) or **beam's `improved` review text** ("Draft hits" = round-4+ draftees still on the final 32-man roster; "Best draft class" = most such players from one draft, computed at draft end and frozen)? **Recommended default:** beam's text, because the engine does not track games started; merge it into the locked file with a correction entry, do not silently overwrite. **Blocked:** any stats schema.

**OPEN QUESTION 2.2 (Architect + Z.ai):** P-259 F2 says WeekPayload/SeasonPayload have no player stat book, awards or unit grades. Does the profile need a richer payload, or does the ten-stat list suffice for v1? **Recommended default:** the ten-stat list suffices; keep the richer review screen thinner than Z.ai's shell for v1, and file the payload extension as later work. **Blocked:** payload freeze.

**OPEN QUESTION 2.3 (Owner — item only you can close):** Does "stats beyond a single season" mean the locked cross-run career stats, or franchise continuity across years? **Recommended default:** cross-run career stats — the 1 Nov brief locks "single season for now… no growing old in a multiseason framework", so cross-year continuity is a new product call and a lifecycle/pin decision. **Blocked:** whether this gate is already satisfied by the existing design.

**OPEN QUESTION 2.4 (Owner):** Keep the legend formula weights 100/10/1? They are INFERRED, never Owner-approved. **Recommended default:** keep for v1, label INFERRED in the UI, retune post-ship. **Blocked:** nothing critical.

**OPEN QUESTION 2.5 (council):** Who writes the third-party review of the stat text now that the tool says REVIEWED with two? **Recommended default:** nobody — the tool's status stands; MUSE should reconcile the tool's floor-2 rule with AGENTS.md's "three confirmations" prose instead (hy4 `0451`). **Blocked:** governance clarity.

**OPEN QUESTION 2.6 (Architect):** The atomic stats-write fix from P-207 (optional `statsDelta` in one synchronous task + `savedAt`/UUID idempotency backstop) — is it implemented before or with the account schema? **Recommended default:** with — one write path for local and server-backed saves. **Blocked:** double-count on refresh.

**ACCEPT 2:** a seeded replay of three seasons produces the same ten stats; each records once at elimination; per-franchise rows survive slot overwrite; profile empty state reads *"No achievements yet — finish a season to start your legacy."*

---

# 5 · Gate 3 — cross-device save sync

**LOCKED:** L0.7, L0.10, L0.11. Same envelope; local-first; server is a sync target, not a prerequisite to play; no KV writes (1,000/day free) — D1.

**OPEN QUESTION 3.1 (Architect):** How does an envelope attach to an account — `userId` column on the save row, or an account-level index of `saveId`s? **Recommended default:** D1 row keyed `(userId, slot)` with `saveId` inside the envelope, preserving the existing slot model A/B/C. **Blocked:** schema.

**OPEN QUESTION 3.2 (Architect):** Revision scheme — monotonic integer per `(userId, slot)`, bumped on every accepted push; device id additive per P-254? **Recommended default:** yes, `revision` + `deviceId` + `savedAt`, with the envelope unchanged except additive fields. **Blocked:** conflict mechanics.

**OPEN QUESTION 3.3 (Architect):** Push/pull protocol — client pushes on reconnect and on each committed checkpoint; pull on sign-in and on focus? **Recommended default:** exactly that, with a 409-style "your revision is stale" response that hands control to the conflict rule (Gate 4). **Blocked:** offline UX.

**OPEN QUESTION 3.4 (Architect + Owner):** What does the user see when sync is unavailable (offline, quota, D1 cap)? **Recommended default:** a quiet "will sync when reconnected" indicator; play never blocks; the existing typed load result `unavailable` is reused. **Blocked:** acceptance.

**OPEN QUESTION 3.5 (council):** Should a conformance tester (P-272) be a gate here? **Recommended default:** yes — it loads a storage dump, restores every envelope, and proves byte-stable round-trip; it is the cheapest proof that migration and sync have not broken old saves. **Blocked:** verification of Gates 3 and 5.

**ACCEPT 3:** sign in on device B, see device A's slot, same `dist/` sha, same engine output at the same seed; no clobber of a newer remote save.

---

# 6 · Gate 4 — offline conflict resolution (rule already approved; mechanics open)

**LOCKED:** L0.6. Whole-save LWW, no field merge; loser kept as rung-back; fork = "keep both" at slot level; additive `deviceId`. This is not a design question.

**OPEN QUESTION 4.1 (Architect):** Where does the rung-back live — local storage on the losing device, a D1 `save_history` table, or both? **Recommended default:** both — local rung-back so offline users keep their lineage; D1 history so a rebuilt device can recover it. **Blocked:** rollback and audit.

**OPEN QUESTION 4.2 (Architect + Z.ai):** What is the user-facing shape of "keep both at the slot level"? **Recommended default:** two named entries in the slot selector ("A — your device's save" / "A — synced save", each with date and device tag); neither is deleted automatically; the user picks one to promote. **Blocked:** UI.

**OPEN QUESTION 4.3 (council):** What is the falsifier for this law? **Recommended default:** a planted field-merge mutation and a planted silent-clobber mutation must each fail a named law, mirroring the battery discipline already used in S15. **Blocked:** sign-off.

**OPEN QUESTION 4.4 (Architect):** Does the rung-back affect the releases/rollback story? **Recommended default:** yes — `releases.md` must record D1 migration version as well as Worker and `dist/` hashes, or a rollback can restore an old app against a new schema. **Blocked:** safe rollback.

**ACCEPT 4:** two devices diverge; resolution demonstrates whole-save LWW, a retained rung-back, and a "keep both" fork with no data loss.

---

# 7 · Gate 5 — local-save migration into reconnection

**LOCKED:** L0.1, L0.7. Migration ships; the envelope keeps `schemaVersion`; extra fields are already tolerated by `parseRecord`; no engine bytes.

**OPEN QUESTION 5.1 (Architect):** Trigger — automatic on first sign-in, or an explicit "bring your local save online" step? **Recommended default:** explicit, one-time, with a preview of what will be imported (seed, slot, record); automatic import risks clobbering a remote save. **Blocked:** consent UX.

**OPEN QUESTION 5.2 (Architect):** Idempotency and reversal — can a migration be undone, and does a replay import twice? **Recommended default:** one migration row keyed by local `saveId` + `userId`; replay is a no-op; "undo" demotes the imported row back to local-only. **Blocked:** rollback safety.

**OPEN QUESTION 5.3 (Architect):** What happens to unknown future fields? **Recommended default:** the existing tolerant `parseRecord` behaviour — ignore, never reject; log nothing that can leak into a share. **Blocked:** nothing.

**OPEN QUESTION 5.4 (council):** Which old saves must be proven importable? **Recommended default:** a conformance corpus — Pre-Colors-era localStorage shapes (as far as they are recoverable), the S14/S15 envelope shapes, a corrupt envelope and a newer-version envelope. **Blocked:** acceptance.

**ACCEPT 5:** an existing local save signs in, is previewed, is imported once, appears as slot A/B/C on the server, and replays to the same engine output; a second attempt does nothing.

---

# 8 · Gate 6 — brag share (ships with the above)

**LOCKED:** L0.9. Exact copy; deployed URL only; no parameters/save data; clipboard + toast; not a seed challenge.

**OPEN QUESTION 6.1 (Architect + Owner):** When accounts exist, should a share be associated with the user? **Recommended default:** association is optional metadata for attribution only; the card itself carries no account id, token or save data and stays safe to post publicly. **Blocked:** privacy sign-off.

**OPEN QUESTION 6.2 (Z.ai / Architect):** Is the deployed URL known at build time? **Recommended default:** no hard-coded URL in the bundle; inject at deploy or keep the existing released-URL constant in `releases.md`, never file:// or localhost. **Blocked:** the share text.

**OPEN QUESTION 6.3 (council):** What proves the share? **Recommended default:** a test that asserts the copied text matches the template, contains no seed/save payload, and opens from file:// with no network. **Blocked:** acceptance.

**ACCEPT 6:** the copied text matches L0.9 verbatim in shape; no encoded state; works offline; toast/confirmation and clipboard fallback are exercised.

---

# 9 · Cross-cutting: host, free tier, security, tests, docs

**OPEN QUESTION 9.1 (Architect + Owner — ratification needed):** Pages or Workers? **Recommended default (INFERRED, unratified):** Workers Static Assets + a thin Worker; the current `claude/cloudflare-decision-2026-11-21.md` chose Pages when the app was assumed static. Cloudflare's matrix: Workers ❌ custom domains outside Cloudflare zones, Pages ✅. **Owner's domain is UNKNOWN and is the sole carve-out.** **Blocked:** the decision doc, runbook and releases schema cannot be finalised.

**OPEN QUESTION 9.2 (Owner):** What is the domain and are its nameservers at Cloudflare? **Recommended default:** if none/Cloudflare-managed → Workers; if external → Pages + separate Worker. **Blocked:** 9.1.

**OPEN QUESTION 9.3 (Architect):** Free-tier breach behaviour — limits fail rather than bill. What monitoring is enough for a portfolio demo? **Recommended default:** dashboard usage checks in the rehearsal and a named note in the docs; no paid upgrade, no auto-scaling. **Blocked:** nothing.

**OPEN QUESTION 9.4 (Architect):** What must the releases ledger record now? **Recommended default:** add Worker version and D1 migration version alongside `dist/` sha, zip sha, seam golden and source commit — otherwise rollback is unsafe. **Blocked:** safe rollback.

**OPEN QUESTION 9.5 (Architect + council):** What is the single verification command set for all six gates? **Recommended default:** extend the existing acceptance composite with named laws for each gate, plus the conformance tester, plus a browser run on a fresh preview — and keep the D-2 stale-server guard. **Blocked:** "go".

**OPEN QUESTION 9.6 (MUSE):** Reconcile `council.mjs` floor-2 REVIEWED with AGENTS.md's "three confirmations" prose (hy4 `0451`), and file the new `PRIORITY+` rows from the Owner's 21 Nov rulings. **Recommended default:** tool wins for status, prose corrected to match. **Blocked:** queue honesty.

**OPEN QUESTION 9.7 (Architect):** Where does the long-term pfd-01/02 badge-spatial direction get recorded so it is not mistaken for v1 scope? **Recommended default:** one line in the architecture doc marked FUTURE, with the stored images referenced; no code. **Blocked:** nothing.

---

# 10 · Sequence and dependencies (proposed, not assigned)

1. **Now, in parallel:** Z.ai fixes F1–F5 and runs the composite (Gate 0); Architect rules on 2.1/2.2/2.3 and 9.1/9.2; MUSE files queue rows and fixes the review-count drift.
2. **Then:** choose IdP (1.1), create account + auth tenant (1.2), define session (1.3) and save schema (3.1–3.2).
3. **Then:** implement Gates 1, 3, 4, 5 against the locked envelope; Gate 2 against the corrected stat text; Gate 6 last so the deployed URL is known.
4. **Then:** rehearsal — deploy, record releases row, roll back once, record what the dashboard showed, then go live only after the Owner has seen the side-by-side and all gate receipts.
5. **Throughout:** engine fence re-proved at each gate; every gate has a falsifier/conformance proof; no paid service.

---

# 11 · What I did NOT do

No implementation, no product/engine/queue/governance edits, no decision enacted, no assignment made, no relay sent. All sources and prior filings are on `council/hy4`; this document is advisory and must be answered by the Owner (product), the Architect (technical), Z.ai (build hand-over) and the council (review). The only locked things are the Owner's own words and the already-approved decisions quoted in §0.
