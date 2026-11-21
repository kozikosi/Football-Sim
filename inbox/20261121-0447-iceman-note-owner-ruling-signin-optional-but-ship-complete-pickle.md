SPEAKER: iceman (note) | ROLE: advisor | TASK: record Owner ruling relay (pickle) re: sign-in optional-for-player but capability must ship complete before deploy | DATE: 2026-11-21T04:47:00Z

Source (as relayed by user): pickle advisory relay; stated “filed at 82e2ebae (pushed, verified)”. Content below is the copy-ready prompt text the user pasted.

## Owner ruling (verbatim, as relayed)
- "optional sign in is still true but i want the ability to sign in completed before we deploy."
- Read with 04:2xZ ruling context (relayed): accounts, multi-season stat tracking, save sync, offline-conflict resolution, local-save migration and brag share are MANDATORY TO RELEASE; other sports, the 01/02 visuals and multiplayer are future.
- Sign-in stays OPTIONAL for the player — core works without account. Stored 1 Nov rule not reversed; prior overstatement withdrawn.
- Mandatory = capability completeness at deploy (optional to use ≠ optional to build).
- Closes open question as relayed: account not required to play; required to exist finished at release.

## Findings referenced (paths cited in relay)
- Stats: `inbox/20261102-0745-muse-P-208-stat-list.md` (council/muse). Owner sources cited: `2026-11-01-storage-brief-verbatim.txt:10,16,47`, `2026-11-01-run-it-back-slots-stats-verbatim.txt:3`.
- Storage/account contract: `inbox/20261101-2000-architect-storage-assessment.md` + `inbox/20261101-2100-architect-to-zai-storage-contract.md` (architect/engine-and-seats); envelope shape and async facade described; gap proposals referenced.
- Account system: “rules only, no schema anywhere” per relay (COLORS-V1-UI-ARCHITECTURE:44-45, amused merge directive cited). No users/sessions/schema/D1/sync/migration design found in those refs per relay; full retrieval cited as `inbox/20261121-0430-pickle-RETRIEVAL-existing-account-and-stats-plan.md`.

## Key points relayed
- 1 Nov brief said “No accounts…” scoped that wave; today reverses delivery scope; envelope/facade and ten stats survive.
- P-254 conflict: per-slot last-write-wins on whole save (no field merge, no CRDT/mutation log idea withdrawn).
- Architect collision noted (v8 deferred migration to keep engine pin frozen; migration now ships — decision needed).
- Hosting note: Worker backend; frontend could be Worker with static assets if Cloudflare nameservers, else Pages+separate Worker.
- Open question flagged: “stats beyond a single season” meaning cross-run career stats (locked) vs franchise continuity across years (new call?) — Owner to close.

## Council asks (relayed, no assignments)
- MUSE: file rulings, sort into queue, reconcile stale text.
- Architect: account schema/auth lib, envelope attachment, sync/migration, pin-freeze question.
- Seats: propose schema/sync/migration in inbox.
- Owner: the one decision above.

## Notes (iceman)
- This is recorded for awareness (affects Cakepanz/UI shell planning assumptions: auth UI/state, offline/online messaging, save migration flows may be needed later even if player sign-in optional). No action taken by me except filing this note.
