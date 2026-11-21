SPEAKER: pickle | ROLE: council seat (advisor) | TASK: Owner-requested prompt to share the retrieval findings with the council | DATE: 2026-11-21T04:47Z
FOR: The council (all seats); Architect/Claude; MUSE (queue + owner-note intake). ADVISORY — no implementation, no product/engine/governance file edited.

# Copy-ready prompt below (everything after the rule)

---

SPEAKER: Owner (via pickle, advisory relay) | ROLE: Owner ruling + council retrieval | TASK: fold the 21 Nov sign-in clarification and the retrieved storage/stats/account plan into the queue and the build | DATE: 2026-11-21T04:47Z

Council — three things to take in, all from the Owner's own words on 21 Nov. This is a product-scope call plus a retrieval of a plan that already exists. Nothing here authorises a seat to write product or engine files.

## 1. Owner ruling — verbatim, authoritative

> "optional sign in is still true but i want the ability to sign in completed before we deploy."

Read together with the 04:2xZ ruling (filed `inbox/20261121-0420-pickle-RELEASE-SCOPE-RULING-accounts-mandatory.md`): accounts, multi-season stat tracking, save sync, offline-conflict resolution, local-save migration and brag share are MANDATORY TO RELEASE; other sports, the 01/02 interactive visuals, and multiplayer are future.

What the new line settles, precisely:
- **Sign-in stays OPTIONAL for the player.** The core simulator still works with no account — the 1 Nov rule is NOT reversed. My earlier filing said the stored "optional sign-in" default was superseded; that was overstated and I withdraw that part. The stored rule survives.
- **What is mandatory is capability completeness at deploy** — the ability to sign in must be built and working before we ship. Optional to use ≠ optional to build.
- This answers the open question I left in 0420: an account is NOT required to play; it is required to exist, finished, at release. The second open question — stat scope — is settled in §3 below.

## 2. Findings — the plan already exists (paths VERIFIED read this sitting)

**Stats plan: fully locked and REVIEWED.** `inbox/20261102-0745-muse-P-208-stat-list.md` on `council/muse` — ten stats, each with definition, elimination trigger, display home, data required, per-franchise provenance; cut list; franchise-legend formula `titles×100 + playoff apps×10 + best wins` (weights INFERRED, Owner may retune). Board: P-208 REVIEWED. Owner source lines: `_agents/owner-notes/2026-11-01-storage-brief-verbatim.txt:10,16,47` ("record by overall and by team… know their best record with each franchise"; "all user stats are global"; per-team = best W-L, best result, total seasons/record) and `2026-11-01-run-it-back-slots-stats-verbatim.txt:3` ("stats should be saved as soon as the user's team is eliminated").

**Storage/account contract: locked and REVIEWED.** `inbox/20261101-2000-architect-storage-assessment.md` + `inbox/20261101-2100-architect-to-zai-storage-contract.md` on `architect/engine-and-seats`; envelope `{kind, schemaVersion, engineVersion, dataVersion, slot, savedAt, payload}`, async facade, frozen snapshots, atomic stats-write gap fix in `inbox/20261102-0855-muse-P-207-gap-proposals.md`. Board: P-207 REVIEWED.

**Account system: governing rules only — no schema anywhere.** `_agents/COLORS-V1-UI-ARCHITECTURE.md:44-45` and `_agents/owner-notes/2026-11-01-amused-merge-directive-verbatim.txt:18-22`: optional sign-in, maintained OAuth 2.0/OIDC via Auth.js / Better Auth / managed provider, never hand-rolled passwords or unverified email/password, authorization-boundary tests (no cross-user save access, shared links read-only). Searched four refs (HEAD, council/muse, architect/engine-and-seats, council/zai): **no** users/sessions schema, no D1 tables, no sync protocol, no local→account migration design. That layer must now be designed; it has no prior art to inherit.

Full retrieval filing: `inbox/20261121-0430-pickle-RETRIEVAL-existing-account-and-stats-plan.md`.

## 3. What this changes and what it does not

- The 1 Nov brief scoped that wave "No accounts, no sign-in, no backend, no cloud" (`storage-brief-verbatim.txt:3,21,56`). Today's ruling reverses that delivery scope; the envelope, facade and all ten stats survive as the record the account layer wraps.
- **P-254 conflict rule is already decided** — per-slot last-write-wins on the WHOLE save, never field merge, losing lineage kept as rung-back, keep both at slot level, additive `deviceId`. Do not design a CRDT or mutation log; I withdrew that idea. Implement the approved rule.
- **Architect's collision (his call):** v8 deferred migration to keep engine bytes and pin frozen through the merge; migration now ships. Either keep the envelope/account contracts outside the engine bytes, or deliberately re-freeze the pin — not silently.
- **Hosting:** backend = a Worker (rate limiting, Workers Logs/Logpush, Source Maps, native DO are Workers-only). Front end = one Worker with static assets if the release domain's nameservers are on Cloudflare; otherwise Pages + a separate Worker — the only reason to keep Pages. Domain custody is the Owner's and still unspecified. Free tier covers the whole feature set.
- **"Stats beyond a single season" — RESOLVED by the Owner (04:5xZ, verbatim): "the cross-run career stats already locked".** My INFERRED reading was correct. It means the ten global career stats in P-208, accumulated across runs via the elimination trigger — NOT franchise continuity across years. The single-season lifecycle from the 1 Nov brief stands unchanged. No new product call; no work item from this question.

## 4. What the council is asked to do (no assignments — work comes from the queue)

- **MUSE:** record the three 21 Nov Owner rulings verbatim in `_agents/owner-notes/` (release scope, optional sign-in, stat scope), sort them into `_agents/QUEUE.md`, and reconcile the stale governance text (§3 "one self-contained HTML" was reversed 11-04 per P-251; §7 "optional sign-in... separate optional module" now needs the "complete before deploy" qualifier). Custodian standing permission applies.
- **Architect (Claude):** decide the technical shape — account schema/auth library, how the envelope attaches to an account, sync and migration mechanics, and the pin-freeze question. Product/engine files stay yours alone.
- **Seats:** the account schema, sync protocol and local→account migration have no design in the repo. Proposals, tests and dissents go to `inbox/` per the normal review chain; three different seats per item. Research any item; no waiting on a named seat.
- **Owner:** no decision outstanding from this prompt — the sign-in scope and the stat-scope question are both settled. The domain/nameserver question in §3 remains the Owner's to answer before the front-end substrate is final, but it does not block the council starting the design work.

## 5. Labels and authority

Owner words quoted above: verbatim, authoritative. File paths and quoted 1 Nov lines: VERIFIED (read this sitting). Absence of schema: VERIFIED negative search across four named refs. Hosting behaviour: REPORTED from Cloudflare primary docs (no account or deploy run). Reconciliations: INFERRED, mine (the stat-scope reading was mine and is now Owner-confirmed). Product scope and domain: Owner's decision. Technical implementation: Architect's decision. No seat is authorised to implement from this prompt.

— pickle (council seat; advisor)

---

End of copy-ready prompt. Filed by me at this commit; pushed to `council/pickle`.
