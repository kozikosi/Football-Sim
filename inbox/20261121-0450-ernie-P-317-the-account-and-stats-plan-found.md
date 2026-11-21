SPEAKER: ERNIE | ROLE: advisor (council seat) | TASK: find and bring to light the existing account + stats plan (Owner: "i thought we already had a plan on how to build the account system and which stats will be recorded") | DATE: 2026-11-21T04:50Z
FOR: the Owner · TO-ARCHITECT · TO-MUSE (queue custodian)

## 0 · Short answer

**Partly yes — and the two halves are in different states.**

- The **account architecture** exists as a *decision*, in three places, and one of them (the conflict
  rule) is Owner-approved and unusually specific. But there is **no account data model, no auth flow
  spec and no sync API contract anywhere in the repo** — that was never written.
- The **stats to record** exist as a **candidate list of 10**, plus a set of settled definitions, but
  the list was **never locked**: `P-208` ("Lock the v1 career stat list (~8-10 stats)") is still P1
  and open, 20 days after it was filed.

So: the *direction* was planned; the *specification* was not. Below is exactly what exists, with
citations, and exactly what is missing.

## 1 · What exists for the account system (verbatim, with sources)

| # | source | what it says |
|---|---|---|
| 1 | `PROJECT-KNOWLEDGE.md:11` | *"Offline is a hard requirement (tent-in-the-woods test; **local-first, sync-on-reconnect**)."* — the sync requirement is in the project's own knowledge line |
| 2 | `_agents/ARCHITECTURE-DIRECTION.md:21` (row 5) | *"**Persistence**: a database for seasons, drafts, shared links; localStorage kept only as a convenience cache \| 'Database > local storage': **sync across devices**, history, sharing \| medium"* |
| 3 | `_agents/ARCHITECTURE-DIRECTION.md:22` (row 6) | *"**Accounts**: **OAuth sign-in (GitHub/Google), never hand-rolled passwords** \| Security literacy, per-user data \| medium; **last, and only if there is per-user data worth protecting**"* |
| 4 | `_agents/QUEUE.md:132` (**P-254**) | **Owner APPROVED 2026-11-05 (Q4):** *"per-slot **last-write-wins on the WHOLE save, never a field merge**; the **losing lineage is kept on disk as a rung-back**; a **fork is resolved as 'keep both' at the slot level**; additive **`deviceId` field now** so v1.1 never unfreezes."* |
| 5 | `_agents/QUEUE.md:149` (P-271 DoD) | the decision-ledger must contain the locked decisions *"Svelte 5 + Vite, real names, 90/35/25 + P(20-0) 1–2%, **OAuth**, 76 Pancakes brand"* — so **OAuth is treated as locked** |
| 6 | `inbox/20261101-2100-architect-to-zai-storage-contract.md:12` | the storage contract's global stores: *"profile, settings, **stats overall AND by franchise**, achievements; **keyed by franchise, never by slot**"* |
| 7 | `inbox/20261101-2000-architect-storage-assessment.md:37` | *"Global store (separate keys): **profile, settings, stats by overall and by franchise, achievements**. Keyed by franchise, never by slot."* |
| 8 | `_agents/owner-notes/2026-11-01-storage-brief-verbatim.txt` §8 | the settled stat definitions: per-team global stats = **best W-L record, best result (Super Bowl win vs best playoff run), total seasons/record with that team**; **undefeated = undefeated regular season** (17-0, schedule-length-agnostic); **only completed seasons** (through the Super Bowl) record stats — abandoned seasons and finished drafts that never became seasons record **nothing**; **achievements survive slot overwrite as well as deletion** |

**That is the plan.** It says: OAuth (GitHub/Google), never hand-rolled passwords; a database for
seasons/drafts/shared links with localStorage as a cache; sync across devices; per-franchise stat
provenance; and a precise conflict rule.

## 2 · What exists for the stats (candidate list, never locked)

**`P-208` — `_agents/QUEUE.md:93`:** *"Lock the v1 career stat list (~8-10 stats) … Per stat:
definition, update trigger (elimination), display home, data required, per-team provenance; must pass
the 'earned' filter. Candidate set in the storage priorities proposal."* Still open, filed 1 Nov.

**The candidate set** — `inbox/20261102-0607-muse-storage-priorities-proposal.md` (on `council/muse`):

1. Super Bowl wins (count + teams)
2. Undefeated seasons
3. Best playoff run
4. Runner-up finishes
5. First Super Bowl (team/year)
6. Longest win streak
7. Draft steals
8. Best draft class
9. Most-drafted players
10. Franchise legend (with formula)

Plus the Architect's question #3 in the same contract: *"V1 stat list (~8–10): definitions, update
triggers, display homes, global-store schema with per-team provenance, ledger design, 'franchise
legend' formula."* The cut list is settled (no blowouts, no vanity counters).

**Companion items, both still open:** `P-209` brag share text/behaviour spec (P2,
`_agents/QUEUE.md:94`) and `P-210` storage-origin/browser-risk measurements (P2, `:95`).

## 3 · The collision nobody has recorded

`_agents/owner-notes/2026-11-01-storage-brief-verbatim.txt` §1 says, verbatim:

> *"No accounts, no sign-in, no backend, no cloud."* — and §9 repeats it: *"No accounts, no
> downloads, no cloud, no redesign."*

That was the **scope of the storage wave** (local-first, v1), and it is **now superseded** by the
Owner's 2026-11-21 directive. Nothing in the repo says so. Until it is recorded, a seat reading the
brief will build to the old rule. **Recommendation: MUSE adds one supersession line to the brief's
header (not a rewrite) and to `PROJECT-KNOWLEDGE.md:11`, which already carries "sync-on-reconnect"
but still reads as if the wave had no accounts.**

## 4 · What is genuinely missing (no spec exists anywhere)

1. **Account data model** — no `users`/`accounts` shape, no profile fields, no per-account stat keys.
   The storage contract keys stats *"by franchise"*; with accounts the key becomes **(account,
   franchise)** and that change is unwritten.
2. **Auth flow** — OAuth is chosen but there is no provider decision, no session/token handling, no
   "signed out but playable" state machine.
3. **Sync API contract** — no endpoints, no revision semantics, no batch/push-pull shape. P-254 gives
   the *rule* (LWW, rung-back, fork=keep both) but not the wire format.
4. **The rung-back location** — P-254 says *"kept on disk as a rung-back"*. With a server there must
   also be a server-side rung-back, or the loser's lineage is lost when the device goes away.
5. **Migration path** — nothing written for "local save → account", which is the Owner's mandatory
   feature.
6. **P-210 was never done** — and it is now load-bearing: it is precisely the origin-scoped-storage
   risk (moving hosts loses saves) that decides the domain question.

## 5 · Recommendation (what to do with this, not a decision)

1. **MUSE:** record the supersession of the 1 Nov brief's "no accounts" line, and mark `P-208`,
   `P-209`, `P-210` as **release-blocking** (they are currently P1/P2/P2 and 20 days stale).
2. **Architect:** write the one missing artefact — the **account + sync contract** (data model,
   revision semantics, rung-back on both sides, migration), in the same style as the storage contract.
   P-254 already gives him the conflict rule to encode.
3. **Owner:** lock the stat list (P-208). Ten candidates, five settled definitions in the 1 Nov brief
   §8 — the decision is which of the ten ship in v1 and what "franchise legend" computes.
4. **Nobody** should build the account system until (1)–(3) exist; the storage contract is the
   precedent for how this repo specifies storage before building it.

— ERNIE (advisor; signs as ERNIE, never as another seat)