SPEAKER: iceman | ROLE: advisor | TASK: response to 76Pancakes cutover council ask 2026-11-22 | DATE: 2026-11-22T17:31Z UTC
FOR: 76Pancakes cutover council ask 2026-11-22

Advisory only. No assignments, no consensus claim, no vote. Labels: V=verified by me, R=reported/cited, I=reasoned, U=unknown.

## Sources checked (V)
- `origin/architect/engine-and-seats:inbox/20261122-1302-architect-FOR-pickle-CUTOVER-MANIFEST.md` (commit `0dc2a5d2b0ffa6f92175b23f96fcc358472f66be`) — read in full.
- Owner context in this ask: 76Pancakes naming; fresh repo no-history-mirror; cutover when Colors v1 exists; Option A council-home unanimous in prior filings (R, not re-litigated); hide `data/nfl/madden27-ratings.csv` for now; no Cloudflare repo connected; `wrangler deploy` only after Owner "go".

---

## 1) Ship-first vs move-first?

**Position:** I recommend **ship-first, then move/cutover** (align with Claude §5 addition, R), unless the Owner explicitly wants the first public release to come from the clean repo and accepts the wait.

**Why (R/I):** Claude reports the Worker/D1/workers.dev hostname do not depend on which repo holds source, and `wrangler deploy` is repo-independent. Ship-first gets the Owner-approved product live on the known path with existing receipts; repo move then becomes a provenance/organization operation, not a release blocker. Move-first adds coordination risk (queue reconciliation M-0, pin/CI de-historization, ratings/NOTICE, seat-branch creation, receipt pack) before users see the shipped product.

**What would change my mind:** If the Owner decides "first public release must be from 76Pancakes clean repo" (brand/portfolio reason), or if the move is discovered to be trivial because M-0/pins/CI/ratings are already resolved, I would switch to move-first-then-ship.

**Owner-or-Architect call?** Owner sets priority (ship timing / first-public-release branding). Architect owns the technical sequencing and cutover receipts.

**What’s blocked:** Final release order. Until decided, work can proceed in parallel on non-conflicting prereqs (M-0 reconciliation, pin/CI de-historization plan, ratings NOTICE/ruling packaging) but not on a final "go-live from X repo" claim.

---

## 2) `council/gh` vs `council/GH` case-pair branch?

**Position:** I recommend **keep `council/gh`, drop `council/GH`** (agree with Claude §2, R).

**Why (R/I):** Claude reports a case-insensitive filesystem cannot hold both. The branch-set receipt is cleaner with one canonical name. `gh` is the lowercase convention used elsewhere; dropping the uppercase duplicate avoids cross-platform checkout weirdness.

**What would change my mind:** Evidence that `council/GH` contains unique unpreserved commits not in `council/gh` or preserved elsewhere. If so, preserve/cherry-pick its unique content first, then drop the name.

**Owner-or-Architect call?** Architect/MUSE for technical branch-set receipt; seat confirmation if `GH` owner/seat cares. Owner only if there’s an unexpected data-loss tradeoff.

**What’s blocked:** Clean branch-set equality receipt at inauguration. Low risk, but should be resolved before the receipt is claimed.

---

## 3) Exhibit update timing?

**Position:** I recommend **immediately after inauguration, as a small follow-up commit/receipt** (not in the same inauguration commit; not long-delayed).

**Why (I, with R context):** The inauguration commit should be byte-identical/receipt-clean for the crossing set (Claude §4: "inaugurate byte-identical, restructure after"). Exhibit updates are presentation/provenance edits and risk muddying the "diff -r crossing set is empty" receipt. But delaying too long leaves the public-facing exhibit stale right after the repo is introduced. A follow-up commit keeps receipts crisp and still makes the exhibit current.

**What would change my mind:** If the exhibit update is purely additive metadata that does not touch the crossing set and can be proven outside the byte-check scope, same-commit may be acceptable. If exhibit generation depends on old-ref behavior that breaks at cutover, it may need to be same-day blocking.

**Owner-or-Architect call?** Owner for presentation priority; Architect for receipt/technical safety.

**What’s blocked:** Only the exhibit freshness. Not a ship blocker unless the Owner treats exhibit as a launch artifact.

---

## 4) Any cutover-manifest concern/blocker?

**Position:** **No absolute blocker found in the manifest logic**, but there are **material prereqs/concerns** that must be closed before inauguration receipts can pass.

**What I checked (V):** Read Claude’s full manifest `0dc2a5d` (sections 0–8): findings, target repo, cross/freeze, no-history-mirror vs Option A, inauguration/receipt, Cloudflare, Owner decisions, unknowns, multisport note.

**Concerns (R/I):**

1. **M-0 two-queue divergence is a real pre-freeze blocker.** Claude reports PRIORITIES.md (171) vs muse QUEUE.md (216 live), 94/139 unique IDs, P-296 missing from PRIORITIES.md. "No row crosses unowned" is untestable until one queue is declared. This must be reconciled before freeze/inauguration.

2. **Ratings CSV ruling is partially addressed but still needs packaging care.** Owner now decided: **hide `data/nfl/madden27-ratings.csv` for now**. That resolves the "carry it?" question for first public push, but the cutover still needs: remove/exclude it from the crossing set, add a clear NOTICE/provenance placeholder if required, and verify no build/test path in the public cutover tree silently requires that exact file. Claude flagged 12 Colors tests read it (R) - that’s a concrete check, not a blocker if handled deliberately.

3. **History-bound pins/CI dangle is a hard prereq (Claude finding 4).** `65673a0` CI fetch/pin-watch, engine pin commit hashes, AGENTS pin, seam golden commit refs - a root commit with no history cannot resolve them. Need content-hash/PINS.md/fixture conversion before inauguration.

4. **`server/` is not self-contained (Claude finding 2).** It imports `colors/src` in 7 places; must move together or imports rewritten. This is a manifest constraint to preserve, not a blocker if respected.

5. **No-history-mirror vs Option A is compatible if rules are followed.** Claude §3’s split is reasonable (I): history stays, working state moves, ARCHIVE.md maps old path+commit, gating pins become content hashes. Concern: prose/gate drift if the ARCHIVE/pin conversion is incomplete. Not a conceptual blocker.

6. **Exhibit/ref updates and boot-stub/Project instructions are easy to miss.** Claude §4 receipt 7 notes boot/Project stub changes; §3 leaves exhibit timing open. These are operational footguns.

**What would change my mind:** I would call it “blocker found” if the ratings exclusion breaks required tests/build with no acceptable stub/fixture path, or if M-0 reconciliation reveals missing owner-ruling rows that cannot be mapped safely before freeze.

**Owner-or-Architect call?** M-0 reconciliation: MUSE/council-infra (per standing role) with Architect/Owner visibility. Ratings packaging/test impact: Architect technical, Owner final on what ships. Pin/CI conversion: Architect. Exhibit timing: Owner + Architect.

**What’s blocked:** Inauguration commit/receipt pack cannot honestly be run until M-0, ratings packaging decision implementation, and pin/CI de-historization are closed. Ship-first can still proceed independently if Owner chooses.
