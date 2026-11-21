SPEAKER: iceman | ROLE: advisor (OpenCode/Iceman Free) | TASK: final, thorough plan of remaining features written as questions for council/Claude/Z.ai to weigh in; locked/mandatory decisions stated clearly and quoted verbatim where provided | DATE: 2026-11-21T05:00:00Z

FOR: Owner, Architect (Claude), MUSE, Z.ai (Executor/High Councillor), council seats (advisors). No seat is authorized by this document to implement product/engine changes; this is an advisory plan to drive decisions and review.

---

## A) Locked & mandatory decisions (do not treat as optional). Verbatim quotes preserved.

### A1) Sign-in / accounts (from relayed Owner ruling, 2026-11-21; recorded in `inbox/20261121-0447-iceman-note-owner-ruling-signin-optional-but-ship-complete-pickle.md`)
> “optional sign in is still true but i want the ability to sign in completed before we deploy.”

Context relayed (treat as Owner intent unless superseded by a newer written Owner message):
- Accounts, multi-season stat tracking, save sync, offline-conflict resolution, local-save migration, and brag share are **MANDATORY TO RELEASE** (other sports, the 01/02 visuals, and multiplayer stated as future in that relay).
- Sign-in stays **OPTIONAL for the player** — core works without an account. The earlier “no accounts/sign-in/backend/cloud” framing scoped to a prior wave is **reversed in delivery scope** for release-readiness of that capability set; envelope/facade and the locked ten-stat work survive per relay.
- **Mandatory means capability completeness at deploy.** “Optional to use ≠ optional to build.” An account is **not required to play**; it **is required to exist, finished, at release** (per relay).

### A2) Product/scope preferences stated by Owner (this conversation)
- From Pro Football Dynasty note (`inbox/20261121-0322-iceman-note-pro-football-dynasty-playbooks-badges-spatial-viz.md`): Owner said **“I don't want the scouting or full GM experience…”** (stated as a note/direction). Treat as a **locked preference now** unless Owner explicitly changes it.
- Same note: long-term interest in **playbooks** and **visualizations of players and the fields**; preference for **visualizing purely through badges spatially** (no love of player faces). These are **long-term goals / direction**, not “must ship before deploy” unless Owner states otherwise.

### A3) Project constraints (from AGENTS.md / PROJECT-KNOWLEDGE.md, relevant anchors)
- Product identity: **76 Pancakes** (not “20-0” as product name). Framework direction per project docs: **Svelte 5 + Vite** for the evolving track; cutover trigger described as a **fully functioning Colors v1** first then cut over (per PROJECT-KNOWLEDGE). Offline is a hard requirement (tent-in-the-woods / local-first, sync-on-reconnect language in project docs). (These are project truths; any change requires Owner/Architect process per governance.)
- Engine: **only the Architect builds** product/engine surfaces per governance; council advises/tests/proposes. Engine pin/freeze rules and “never edit engine to match UI” are governance constraints (see AGENTS.md). Cakepanz consumes engine as frozen snapshot in that track’s model (per prior docs) — any account/sync/migration design must respect stated boundaries (relay notes Architect collision risk: v8 deferred migration to keep engine pin frozen; migration now ships → decision needed).
- Data integrity rules apply (no invented factual data, etc., per AGENTS.md).

### A4) What the relay explicitly says is NOT the ask right now
- Other sports, 01/02 visuals, multiplayer are **future** (per relay). Do not fold them into “must ship before deploy” except where they are prerequisites (none stated).

---

## B) Current state snapshot (VERIFIED from repo files read in this worktree; REPORTED where from relays/docs)
- **Cakepanz 15-WIP (S15)** pushed to `origin/council/iceman` as `67-cakepanz-15-WIP-2026-11-21/` (commit `65e83aa43`) plus review `inbox/20261121-0256-iceman-review-67-cakepanz-15-WIP.md` (`a38a8333a`). Handover states: S15 UI corrections landed in that WIP tree (one-button rows, glow/sheen/badge/top-tag, glass, dispatchAsync+busy+L-ERR, selector re-points incl. `shell-status.mjs:114`), batteries/falsifier spot-runs reported green in that handover, but **final composite §5.6 not run at final S15 bytes**, **gate-table/docs regen not done**, **packaging/fence/dist/zip/side-by-side/selector note/rawSort reporting steps not done** (per `deliveries/zai-s15-WIP-handover-2026-11-21.md`). (REPORTED by Z.ai artifacts in that folder; I did not re-run full composite.)
- **Cakepanz 14** also present/reviewed earlier (`67-cakepanz-14-2026-11-20/`, reviews in inbox). (VERIFIED present.)
- **Pro Football Dynasty inspiration note** filed with stored reference images (`inbox/20261121-0322-iceman-note-pro-football-dynasty-playbooks-badges-spatial-viz.md` + `inbox/assets/pro-football-dynasty-20261121/*`). (VERIFIED.)
- **Sign-in ruling relay** filed (`inbox/20261121-0447-iceman-note-owner-ruling-signin-optional-but-ship-complete-pickle.md`). Relay references (paths cited there): stats locked review `inbox/20261102-0745-muse-P-208-stat-list.md` (council/muse context in relay), storage assessment/contract in architect inbox files (relay), and states **no account schema/sync/migration design exists** in the cited refs (verified negative search claimed in relay). (REPORTED by relay; paths should be confirmed by readers.)
- **Governance:** only Architect builds product/engine; council advises/tests/proposes; work from ranked queue; no assignments (AGENTS.md). (VERIFIED project rules.)

---

## C) Remaining workstreams (framed as questions). Present locked items first inside each workstream.

### C1) Finish Cakepanz S15 (UI shell track) to a reviewable, releasable-internal state (prerequisite hygiene before layering auth/UI/account features?)
**Locked/constraints (not questions):** engine fence unchanged in that WIP per handover; governance rules unchanged.

**Questions for Z.ai / council reviewers / Architect (as appropriate):**
1. What is the **single source of truth** for “S15 done”? Is it: (a) uninterrupted `scripts/acceptance-run.sh` at final S15 bytes ending clean, (b) falsify-board at final bytes incl. F27–F30 all died as specified, (c) gate-table/docs regen complete, (d) packaging + verify + dist hashes + fence receipt recorded, (e) all of the above? Who signs off (Architect? Owner?) for each gate?
2. For the **seven+ selector/class sites** lesson (incl. `shell-status.mjs:114`): do you want a **repo-wide grep contract** (allowlist/banlist) and/or a CI check added now, or is documentation-only sufficient for S15 closure?
3. **RawSort proposal** is filed-not-applied (per handover): when should it land relative to S15 closure — before deploy of shell changes, after, or only if Owner/Architect require correctness now? What are the **paired-diff + re-falsify** acceptance criteria you expect written down?
4. If S15 is the “shell for Claude’s engine” UI direction, what **minimal contract tests** (beyond batteries) should exist at the port/store boundary (dispatchAsync, busy, L-ERR, save/restore) before adding auth/account UI flows on top?
5. Should the **handover be consolidated** into one canonical “S15 handover current” pointer to reduce drift (handover + README + START-OF-CHAT-ZAI narratives)?

### C2) Accounts & authentication (capability MUST ship complete before deploy; sign-in OPTIONAL for player) — **A1 is locked**
**Locked (A1):** optional sign-in for player; core works without account; accounts + related release-mandatory capabilities listed in A1 must be **capability-complete at deploy** (optional to use ≠ optional to build). No hand-rolled passwords; auth approach must follow project rules stated in relay refs (Auth.js / Better Auth / managed provider style per COLORS-V1-UI-ARCHITECTURE relay excerpt) — treat as constraint to be confirmed by Architect.

**Questions for Architect (primary), then council review:**
6. **Auth library/provider choice:** which managed/auth framework fits the stack (SvelteKit/Svelte+Vite deployment model implied by project)? What are the tradeoffs (Cloudflare Workers/Pages constraints noted in relay: Worker backend; front end could be Worker with static assets if CF nameservers, else Pages+separate Worker)? Who decides the final hosting shape with Owner?
7. **Account data model (schema):** what tables/entities are required at minimum for (a) identity, (b) linking to local profiles/saves, (c) multi-season/career stats linkage, (d) device/session considerations for “optional sign-in”? Please propose concrete schema sketches in inbox (no implementation) for review.
8. **Auth boundary & security tests:** what does “auth-boundary tests” mean operationally in this repo (test types, what is forbidden, what must be asserted)? How do we test optional-auth flows without breaking offline/local-first use?
9. **UX states (questions for design/seat review):** when should the app prompt sign-in (never aggressively? only for sync/brag/share/export of account-backed features)? How is “signed out but played locally” presented? What copy/affordances match 76 Pancakes tone and badge-first direction?
10. **Abuse/rate limits/spam (if any server endpoints):** what is the minimal posture for release (even if small) given brag/share and sync?

### C3) Storage envelope, async facade, save model (relay-referenced contracts) — must survive; integration questions
**Locked context (relay):** envelope `{kind, schemaVersion, engineVersion, dataVersion, slot, savedAt, payload}`, async facade, atomic stats-write fix noted in gap proposals (paths cited in relay). P-254: per-slot last-write-wins on WHOLE save, never field merge; no CRDT/mutation log (idea withdrawn).

**Questions for Architect + Z.ai (Cakepanz track awareness) + council:**
11. Does the current Cakepanz track’s persistence (if any beyond what’s in WIP) already conform to the envelope/facade intent, or is there divergence to reconcile before adding accounts?
12. **Local-save migration:** “local-save migration” is mandatory at deploy (A1). What is migrated (which slots/kinds), when (first sign-in? explicit prompt?), and what is the **rollback/safety** story if migration fails mid-way? Who owns the migration code location (engine-adjacent vs app layer) given engine pin/freeze rules?
13. **Versioning:** how are `schemaVersion`/`dataVersion`/`engineVersion` bumped in practice across Cakepanz and any future Colors cutover? Who maintains the migration matrix?

### C4) Multi-season stat tracking (MANDATORY TO RELEASE) — locked in set A1; design details to confirm
**Locked:** multi-season stat tracking is mandatory to release (A1). Relay cites stats list/review: `inbox/20261102-0745-muse-P-208-stat-list.md` (ten stats, definitions, elimination trigger, display home, provenance notes) and Owner sources cited there.

**Questions for Owner (decision), Architect, council:**
14. **Owner decision (flagged in relay):** does “stats beyond a single season” mean the **locked cross-run/career stats** already specified, or does it mean **franchise continuity across multiple in-game seasons/years** as a persisted career mode across saves? This changes scope significantly. (Relay says “I read it as the existing cross-run career stats; franchise continuity across years would be a new call conflicting with the locked single-season lifecycle.” Please confirm in writing.)
15. If it means cross-run career stats only: confirm the ten stats list is final for release, confirm legend formula weights stance (relay noted weights INFERRED, Owner may retune) — what is the release bar (locked weights vs tunable config)?
16. **Display/home:** where do these appear in Cakepanz UI shell now vs after S15? Any conflicts with badge-first/spatial viz long-term goals?
17. **Provenance and integrity:** how are stats attributed per-franchise/device/account without inventing data (AGENTS.md data rules)? How is “brag share” (mandatory A1) derived from the same sourced numbers?

### C5) Save sync + offline-conflict resolution (MANDATORY TO RELEASE) — A1
**Locked:** mandatory. P-254 decided: per-slot last-write-wins on WHOLE save, never field merge, rung-back behavior as noted, keep both at slot level, additive deviceId (no CRDT/mutation log).

**Questions for Architect + infra/hosting decision-maker + council:**
18. **Sync topology:** client ↔ server model (push on connect? periodic? manual “sync now”?). How does this interact with “optional sign-in” (sync only when signed in; local-only otherwise)?
19. **Conflict UX:** when a conflict occurs (two devices), what does the user see? “Keep this device / keep cloud / keep both (new slot)”? Exact copy and risks (data loss) must be clear.
20. **Offline queue:** what is queued, how long retained, what happens on schema mismatch during replay?
21. **Device identity:** `deviceId` additive per P-254 — how generated, stored, reset implications?
22. **Hosting/backend:** relay notes Worker backend; frontend may need Worker+static or Pages+Worker depending on DNS on Cloudflare. Who makes the final call (Owner + technical)? What are cost/ops assumptions for “free tier covers it all” claim (verify)?

### C6) Brag share (MANDATORY TO RELEASE) — A1
**Locked:** mandatory to release (part of A1 set).

**Questions:**
23. What is shared (image? link? text summary?) and from which screens (draft results, season/career stats, specific achievements)? Must respect “no scouting/full GM experience” preference? (A2 says no scouting/full GM experience desired — bragging about a draft run is different from scouting tools; clarify boundary.)
24. **Privacy:** what is public by default? Can signed-out users generate local share artifacts without uploading? How are account-backed shares revoked?
25. **Technical form:** static image export, Open Graph/link preview, or both? Any dependency on new services?

### C7) Long-term goals from Pro Football Dynasty note (A2) — playbooks, player/field visualizations, badges-not-faces (NOT mandatory before deploy unless Owner says)
**Locked preferences/direction (A2):** no scouting/full GM experience wanted; note playbooks + visualizations of players/fields; prefer badges spatially, no player faces; long-term goals.

**Questions for Owner, Architect, UI seats (Cakepanz/Z.ai/council):**
26. **Playbooks (long-term):** what does “playbook visualization” mean in 76 Pancakes terms? (a) explanatory diagrams of concepts tied to sim outcomes, (b) coach plan visualization, (c) something else?) What is explicitly out of scope to avoid drifting into GM/playbook editing?
27. **Spatial field/player viz:** what fidelity is desired? Schematic/badge field (top-down dots/badges + routes/lanes as simple graphics) vs more animated? How does this relate to any existing “watch every snap” ambitions mentioned in market comps (note says user saw PFD marketing text mentioning watching snaps) — is that desired for 76 Pancakes or not?
28. **Badges-not-faces:** define the badge system (team colors + position + number? + OVR ring? + role icon?). Must be consistent across draft board, season views, and any future field viz. Any asset pipeline implications (all offline)?
29. **Sequencing:** should any of this start as **design spikes** after S15 + accounts/sync core land, or in parallel? What is the smallest useful slice (e.g. a read-only “play concept” card) that teaches us without engine changes?

### C8) Cross-track alignment (Cakepanz UI track vs Claude/Colors engine track) — governance constraints apply
**Questions for Architect + MUSE:**
30. With accounts/sync/migration now mandatory before deploy (A1), does this force a **reconciliation of tracks** (Cakepanz frozen snapshot model vs Colors v1 tree) sooner? What is the integration plan so we don’t build two auth systems?
31. Who is the single source of truth for “deploy-ready” checklist that includes A1 capabilities plus S15 shell closure?

### C9) Hosting, domains, ops (relay notes) — Owner + technical
**Questions for Owner + Architect/ops-minded seat:**
32. **Domain and DNS:** whose domain, where hosted? Cloudflare nameservers yes/no determines Worker+static vs Pages+Worker (relay). Decide before finalizing auth callback URLs.
33. **Environments:** local dev, preview/staging, production — how are auth providers configured per env? Secrets management approach (no secrets in repo, per general practice).
34. **Cost/limits:** confirm “free tier covers it all” assumptions for expected early scale (accounts, sync payload sizes, KV/D1/storage choices if any) — or list unknowns to measure.

### C10) Analytics, telemetry, privacy (not stated but usually implied) — questions
35. Are any analytics/telemetry desired at release? If yes, must be privacy-respecting and compatible with optional sign-in and offline-first; if no, state explicitly. (Owner/Architect decision.)

---

## D) Open decisions only the Owner should close (list)
- D1 (from relay): “stats beyond a single season” = locked cross-run career stats only, OR franchise continuity across multiple in-game seasons/years? (This is the big scope fork for C4.)
- D2: confirm A2 “no scouting or full GM experience” remains a hard boundary for now (yes/no).
- D3: hosting/domain/DNS final choice (C9) and whether to use a specific auth provider preference beyond “managed/OAuth/OIDC, not hand-rolled passwords”.
- D4: any appetite to start C7 (playbooks/badge spatial viz) design work before S15+auth core is done, or strictly after?

---

## E) Suggested framing for “who weighs in” (no assignments — for the Owner/Architect to route)
- **Owner:** D1–D4, final acceptance of A1 completeness definition (“finished before deploy” means what concrete checklist items?).
- **Architect (Claude):** C2 (auth schema/lib/hosting integration shape), C3 (migration ownership/pin question), C5 (sync protocol details), C8 (track reconciliation), C9/C10 technical calls.
- **Z.ai:** C1 execution details and any Cakepanz-specific persistence realities; flag constraints from WIP state.
- **Council seats (advisors):** propose concrete designs in inbox for C2 schema sketches, C5 conflict UX flows, C6 share formats, C7 small-slice mockups (text/HTML mocks in lanes per rules) — always labeled VERIFIED/REPORTED/INFERRED/UNKNOWN.

---

## F) Notes on evidence quality (for readers)
- A1 quotes and relay claims are recorded as **REPORTED** from the user/relay text captured in `inbox/20261121-0447-...md` unless the user states them again directly here; the user asked to “quote me verbatim” for locked/mandatory decisions — I have quoted the sign-in sentence verbatim as provided in that relay and labeled the rest of that block as relayed context. If the Owner wants other sentences quoted verbatim, point to the exact message and I will copy them faithfully.
- “No account schema exists” is **REPORTED** by relay (claimed verified negative search across cited refs); independent verification is possible by reading those paths.

