SPEAKER: pickle | ROLE: council seat (advisor) | TASK: locate the existing account-system and stats plan the Owner asked for | DATE: 2026-11-21T04:30Z
FOR: Owner; Architect/Claude; MUSE (queue/owner-note correlation). ADVISORY — no product/engine/governance file edited.

## Answer in one line

The **stats plan is fully locked and REVIEWED**; the **account plan exists only as governing rules plus a deferred decision — no schema was ever built**. Both were scoped as NO-ACCOUNT in the 1 Nov storage wave; today's ruling supersedes that scope, not the underlying design.

## Where the plan lives (all paths VERIFIED read this sitting)

### A. Governing Owner rules for accounts (1 Nov, verbatim)
- `_agents/owner-notes/2026-11-01-amused-merge-directive-verbatim.txt:18-22`: optional sign-in, account-based cloud saves, access-controlled sharing, core usable without registration; evaluate Auth.js / Better Auth / managed provider per framework and host; maintained auth protocol implementations; OAuth vs OIDC distinction; test authorization boundaries; no hand-rolled passwords. "Eventual Cloudflare."
- `_agents/COLORS-V1-UI-ARCHITECTURE.md:44-45` (§7, "Optional sign-in and cloud saves — Owner idea, 1 Nov; STORED, later"): local save first; cloud save is the same portable record sent elsewhere; sign-in OPTIONAL; maintained OAuth 2.0 / OpenID Connect implementation (Auth.js, Better Auth or managed provider), never homemade password handling or unverified email/password; authorization-boundary tests — a user can never read/write another user's saves; shared links read-only. It also names the conflict (one self-contained HTML / no paid API vs hosted backend) and a recommended default: keep the simulator file fully offline and ship accounts/cloud saves as a separate optional portfolio module talking to the same save record. **That default is superseded by today's Owner ruling.**
- `_agents/owner-notes/2026-11-12-platform-vision-and-architecture-verbatim.txt:30,42-44,78-90`: "whether the database can preserve historical franchises and seasons"; engineer the engine as if it will eventually run on a centralized server, free of browser APIs, UI state, localStorage, framework code; accounts/multiplayer/centralized services framed as eventual.

### B. What is NOT in the repo (searched all four refs: HEAD, origin/council/muse, origin/architect/engine-and-seats, origin/council/zai)
No D1 table design, no `users`/`sessions` schema, no account data model, no sync protocol, no migration-from-local-to-account design, no auth implementation. The only D1/schema hits are an unrelated October archive. So "how to build the account system" was settled at the level of *which library rules and boundaries apply*, never at the level of tables and endpoints. Today's mandatory-accounts ruling means that layer must now be designed — by the Architect (technical) with the Owner's scope call.

### C. The storage/save contract that accounts must attach to (P-207, REVIEWED)
- `inbox/20261101-2000-architect-storage-assessment.md` (on `architect/engine-and-seats`): seeds mulberry32 with `fork(label)`; materialized frozen snapshots, never recipes; no compression (measured payloads: frozen pool 233 K, season scores 14 K, full game logs 1.1 MB — pruned by Owner rule); 3 slots fit; origin risk; async facade `list/load/save/delete/migrate` + `stats/settings/profile`, typed load result `ok | empty | corrupt | newer-version | unavailable`; storage must not import engine.
- `inbox/20261101-2100-architect-to-zai-storage-contract.md` (on `architect/engine-and-seats`): envelope `{kind, schemaVersion, engineVersion, dataVersion, slot, savedAt, payload}`; payload contents per kind; do-not-touch list; five open questions.
- `inbox/20261102-0735-muse-P-207-review.md` and `inbox/20261102-0855-muse-P-207-gap-proposals.md` (on `council/muse`): atomic stats update via optional `statsDelta` in one synchronous task + savedAt/UUID idempotency backstop; achievements API; soft-delete semantics; SlotMeta shape.
- P-207 board status: **REVIEWED** (`node tools/council.mjs board`).

### D. The locked career stats plan (P-208, REVIEWED) — this answers "which stats"
`inbox/20261102-0745-muse-P-208-stat-list.md` (on `council/muse`), titled "V1 career stat list (locked: 10 stats)". Ground rules: record once at **elimination**, flagged `statsRecorded`; global overall AND by franchise; every stat earned + has a display home; source = season envelope, no game logs. The ten:
1. Super Bowl wins (count + teams) 2. Undefeated 20-0 seasons 3. Best playoff run (non-title) 4. Playoff appearances 5. Best regular-season record 6. Longest win streak (single season) 7. First Super Bowl per franchise 8. Draft steals (round 4+, 10+ starts) 9. Best draft class 10. Franchise legend formula `titles×100 + playoff_appearances×10 + best_Wins`.
Cut list: blowouts, career total wins, points for/against, comebacks, anything needing logs. Per-franchise rows for 1,2,4,5,7,8,9,10; 3 and 6 keep overall + the franchise. Legend weights are INFERRED (Owner may retune); everything else VERIFIED against locked decisions. P-208 board status: **REVIEWED**.

### E. Owner source lines behind the stats (verbatim)
- `_agents/owner-notes/2026-11-01-storage-brief-verbatim.txt:16`: "The global data should record by overall and by team. The user should know their best record with each franchise." :10 "All user stats are global. Prune all season logs except for tracked profile stats." :47 per-team = best W-L, best result, total seasons/record.
- `_agents/owner-notes/2026-11-01-run-it-back-slots-stats-verbatim.txt:3`: "Yes. Stats should be saved as soon as the user's team is eliminated. that could be at different stages."
- Brag share scope (`:12,17,30`): copy-paste text + deployed URL, never `file://`, no params/encoded state, "not a seed challenge"; P-209 spec item open on the queue.

## What today's ruling changes, precisely

1. **Scope reversal:** the 1 Nov brief explicitly said "No accounts, no sign-in, no backend, no cloud" (`:3`, `:21`, `:56`). Today accounts + sync + conflict + migration + brag are mandatory to release. The *storage envelope, facade, frozen-snapshot design, the 10 stats and the elimination trigger all survive* — they are the record the account layer must now wrap. Only the "local-only / optional module" delivery choice dies.
2. **"Track stats beyond a single season" already partly exists:** the 1 Nov plan's "global career stats" accumulate across runs/seasons via the elimination trigger; there is no multi-season *franchise simulation* (Owner locked "single season for now", brief `:9`). So today's phrase is consistent with the existing career-stat plan; if it means multi-season franchise continuity, that is a new product call and conflicts with the locked single-season lifecycle. Owner to disambiguate.
3. **New work with no prior design:** account schema, session/auth implementation, cross-device sync, local-save migration into an account, and the P-254 conflict rule's server side. The Architect decides; I only surface the gap.

## Labels

All file paths and quoted Owner lines: VERIFIED (read this sitting on the named branch/ref). Board statuses: VERIFIED from `node tools/council.mjs board`. Absence of schema: VERIFIED search across four refs (negative claim, scoped to those refs). Interpretation of today's ruling vs the 1 Nov plan: INFERRED, mine. No implementation by me.

— pickle (council seat; advisor)
