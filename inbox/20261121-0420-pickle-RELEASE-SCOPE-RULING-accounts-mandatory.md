SPEAKER: pickle | ROLE: council seat (advisor) | TASK: record Owner's release-scope ruling and give corrected final Cloudflare/architecture counsel | DATE: 2026-11-21T04:20Z
FOR: Owner; Architect/Claude; MUSE (owner-note intake + queue). ADVISORY — no implementation, no product/engine/pin/governance file edited.

## Owner ruling (verbatim, this chat, 2026-11-21 ~04:2xZ)

"Accounts are not a future goal; ideally they ship as soon as possible. we wanted users to create an account and be able to track their stats beyond a single season; this has been in the directive for a long time. sync saves and resolving offline changes  and migrationg local saves into reconnection across devices are also a mandatory features before deployment; also noted since the beginning. these are not future possibilites; these are all mandatory to release along with the brag share

expansion into other sports, and more interactive visuals like the photos and project i had you look at are more future goals. along with potentially mutliplayer, etc"

MUSE: this is a new Owner ruling for verbatim intake and queue sorting. I did not edit `_agents/owner-notes/` or `QUEUE.md` (not my files).

## What this reverses — stated plainly

1. **My own advice is superseded.** I said "do not build D1/DO/accounts before ship" (`inbox/20261121-0410...`, `0415...`). The Owner has now made them release-scope. That advice is withdrawn; it was correct only under the old assumption of a static v1.
2. **Stored "optional sign-in" is superseded for release scope.** `_agents/COLORS-V1-UI-ARCHITECTURE.md:44-45` (Owner idea, 1 Nov): sign-in OPTIONAL, core works with no account, "ship the accounts/cloud saves as a separate, optional portfolio module." Now mandatory to release. MUSE should update the stored record; Architect should not follow the old default.
3. **GPT's "don't delay first release for accounts" is overruled by the Owner.** No further weight to that framing.
4. **The 03:58Z "01/02 are the real goals" ruling is reconciled, not reversed.** It named them the real *visual* goals, 03:24Z called them long-term, and now they are "more future goals" relative to release. Consistent reading: 01/02 + badges = the visual north star, NOT a v1 release gate. Claude's w89-targeted visual spec can stand for v1. Owner to confirm if that reading is wrong.
5. **Other sports and multiplayer stay future** — matches the standing multisport-parked ruling.

## Collision with Claude's v8 plan — must be resolved by him

Claude's `169e554` report: "Deferred: save export/import, migration, quota and multi-tab, because they change engine bytes and the pin must stay frozen through the merge." The Owner has now made **migration mandatory to release**. Either (a) the save envelope and account/stats contracts live in the app/contract layer so engine bytes and pin `408410477` stay frozen, or (b) the pin must be deliberately re-frozen. That is the Architect's decision; I only flag it. Do not silently let "frozen through merge" stand while migration ships.

## Correction to my own prior counsel — conflict rule is already decided

I wrote (0415) that offline conflict resolution "needs a versioned per-device mutation log and a documented merge policy", and that LWW-by-clock is broken. **That was wrong, and I retract it.** `QUEUE.md` P-254 records the Owner's APPROVED ruling 2026-11-05 (Q4): **per-slot last-write-wins on the WHOLE save, never a field merge; losing lineage kept on disk as a rung-back; a fork resolved as "keep both" at the slot level; additive `deviceId` in the envelope now.** I was one of the seats that flagged the conflict in the first place (P-254 evidence cites Pickle 2026-11-05). The rule exists. Implementation of the approved rule is what's needed, not a new design. My "CRDT / mutation log" idea is withdrawn and must not be re-litigated by any seat.

## Final deployment counsel (now that backend is release-scope)

**The backend is Workers either way — never Pages Functions.** Cloudflare's compatibility matrix (read this sitting) gives Workers ✅ / Pages ❌ for rate limiting, Workers Logs/Logpush, Tail Workers, Source Maps, and native Durable Objects (Pages needs a separate Worker + binding anyway). Accounts + security + multi-season stats make rate limiting and audit logs release requirements, not luxuries.

The remaining question is only where the **static front end** is served:
- **If the release domain's nameservers will be on Cloudflare:** use ONE Worker with static assets (`assets.directory`, SPA `not_found_handling`) plus the backend routes. Simplest, Cloudflare's favored path, gradual deploys and observability, one project. Watch the documented version-skew caveat during rollout; the visual-acceptance side-by-side must pin both HTML and assets to the same version.
- **If the domain must stay off Cloudflare nameservers:** Workers cannot serve it (`migrate-from-pages`, read this sitting). Serve the static front end from Pages and keep the backend in a separate Worker. This is the ONLY reason to keep Pages.
- Domain custody is the Owner's and still unspecified. Do not invent a project name or `wrangler.toml` (per Claude's 169e554).

Free-only still holds: static assets free/unlimited; D1 Free 5M rows read/day, 100k writes, 5 GB, 10 DBs; SQLite-backed DO now on Free; KV and R2 free allowances. No paid plan needed for the release feature set.

## Release-scope facts already in the repo (no invention)

- Save record is a small portable `{version, seed, draftLog, seasonLog}`; cloud save is the same record elsewhere (`COLORS-V1-UI-ARCHITECTURE.md:45`).
- Brag share spec **P-209** (Owner 1 Nov): exact text template, deployed game URL, never `file://`, no params, no encoded state, clipboard + toast with fallback, **no save data in the share, ever**. 1 Nov note also requires maintained OAuth/OIDC (Auth.js / Better Auth / managed provider), never hand-rolled passwords, and authorization-boundary tests (no cross-user save access; shared links read-only).
- 2026-11-12 platform-vision note: "design the simulation engine as if it will eventually run on a centralized server", keep it free of browser APIs, UI state, localStorage, framework code; and "whether the database can preserve historical franchises and seasons." Multi-season stat tracking is a D1 data model keyed to account, not an engine-math change.
- Offline remains a hard requirement (AGENTS.md §2). Mandatory accounts and offline-first are compatible: local save + offline play, account for multi-season history and sync, reconciliation on reconnection. The single-file rule was already reversed 2026-11-04 (P-251, `2026-11-04-single-file-reversal-verbatim.txt`); AGENTS.md §3 "one self-contained HTML file" is stale — MUSE to fix.

## Open question I cannot decide

Does "accounts mandatory to release" mean an account is required to *play at all*, or that the account system must ship while offline play without sign-in remains? The 1 Nov note says core usable without registration; today's ruling says mandatory. I have taken the narrower reading (feature must ship; local-first play survives) because "resolving offline changes" and "migrating local saves" presuppose offline use — but this is mine, not the Owner's. Owner to confirm.

## Labels

Owner words: verbatim, Owner-supplied. Repo/queue facts: VERIFIED reads this sitting. Cloudflare behaviour: REPORTED from primary docs (no account/deploy). Recommendation: my counsel (INFERRED judgment), not a ruling. Decision authority: Owner (product/scope/domain) and Architect (technical implementation). No implementation by me.

— pickle (council seat; advisor)
