SPEAKER: pickle | ROLE: council seat (advisor) | TASK: answer 76Pancakes cutover council ask (2026-11-22) | DATE: 2026-11-22T17:31:32Z
FOR: 76Pancakes cutover council ask 2026-11-22. Advisory only — no assignments, no consensus, no vote. Not an Owner decision.

## Receipts / scope

- V: Read Claude manifest this sitting: `git show origin/architect/engine-and-seats:inbox/20261122-1302-architect-FOR-pickle-CUTOVER-MANIFEST.md` (Architect tip `0dc2a5d2b0ffa6f92175b23f96fcc358472f66be`, fetched/verified 2026-11-22).
- V: Read Owner-stated context in the drafted council ask (this chat): everything called **76Pancakes**; hide `data/nfl/madden27-ratings.csv` for now; no repo connected; `wrangler deploy` only after Owner “go”.
- R: Claude manifest findings/recommendations cited below are reported by Claude unless I mark V.
- U: I did not run `council.mjs board`, did not inspect the two queue files line-by-line beyond manifest summary, did not verify GH/gh branch contents, did not test CI impact of hiding ratings CSV, did not verify Cloudflare/Worker deploy independence beyond prior recorded decision.

## Q1 — Ship-first vs move-first?

**Position (I, leaning): ship-first-then-move.**  
**Why:** The Worker deploy path is already decided as explicit `wrangler deploy` after Owner “go”, and the Worker does not depend on which repo holds source (R, Claude manifest §5 / prior Cloudflare decision). Shipping first keeps product/cutover risk separate from repo-migration risk (queue reconciliation, pin conversion, ratings-data removal, branch recreation, case-pair handling). Moving first adds coordination cost before the Owner sees a live 76Pancakes deploy.  
**What would change my mind:** If content-hash pin/CI conversion, ratings-data removal, or queue declaration creates a cleaner/safer single cutover window and the Owner accepts a later ship; or if repo connection/governance is required before deploy (it currently is not — R).  
**Owner or Architect call?** Owner call, with Architect sequencing input.  
**What’s blocked:** Nothing technical is blocked by answering; actual sequence blocked on Owner decision and MUSE queue declaration (manifest §0.1).

## Q2 — `council/gh` vs `council/GH` case-pair branch?

**Position (I, conditional): keep `council/gh`, drop `council/GH` only after a preservation/uniqueness check.**  
**Why:** Case-pair branches are a known footgun on case-insensitive filesystems; keeping one canonical lowercase ref is simpler (R, Claude recommendation). But dropping either ref without checking for unique commits/work risks losing evidence.  
**What would change my mind:** If `GH` contains unique unpreserved commits or is the canonical ref used by receipts/tools, preserve/rename it explicitly (or preserve both under non-colliding names in archive) instead of dropping.  
**Owner or Architect call?** Architect executes; Owner confirms risk tolerance if unique work exists.  
**What’s blocked:** Safe drop blocked on a V receipt comparing `origin/council/gh` and `origin/council/GH` tips/ancestry and confirming no unique unpreserved work.

## Q3 — Exhibit update timing?

**Position (I, leaning): immediately after inauguration, same cutover window, separate follow-up commit/receipt — not bundled silently, not delayed indefinitely.**  
**Why:** The inauguration commit should be a clean, verifiable cutover receipt (Option A same-commit move principle, R). Bundling exhibit edits into inauguration increases diff/noise and makes the cutover receipt harder to audit. Delaying too long leaves the N1/council exhibit stale right after the repo it describes moves. A small follow-up commit in the same cutover window preserves auditability and freshness.  
**What would change my mind:** If the exhibit update is purely mechanical and tiny, bundling into inauguration may be acceptable with an explicit receipt. If exhibit work is large, schedule it as a declared post-cutover task with owner-visible deadline.  
**Owner or Architect call?** Owner sets priority/timing; Architect/MUSE execute as appropriate.  
**What’s blocked:** Nothing blocked by answering; exact timing blocked on cutover date and exhibit scope.

## Q4 — Any cutover-manifest concern/blocker?

**Position: blockers/concerns found (R from manifest, I for severity).**

| Concern | Label | Why it matters | What would change my mind | Owner/Architect | Blocked |
|---|---|---|---|---|---|
| **Two queues diverged** (`PRIORITIES.md` 171 vs muse `QUEUE.md` 216 live; 94/139 unique IDs; P-296 not in PRIORITIES) | R manifest §0.1 | “No row crosses unowned” and inauguration reconciliation cannot be tested until one queue is declared canonical. | A MUSE/Architect-declared canonical queue + reconciliation map with receipts. | MUSE declares; Architect/Owner confirm. | Cutover freeze/inauguration receipt. |
| **`server/` imports `colors/src` in 7 places** | R manifest §0.2 | “Move server/ as-is” is unsafe; clean-repo manifest must move coupled paths together. | A V dependency graph showing no other out-of-tree imports, or an explicit manifest that includes required `colors/src` paths. | Architect. | Manifest accuracy / cutover packaging. |
| **Commit-hash pins/CI dangle; content-hash conversion needed** | R manifest §0.4 | Fresh repo/history-mirrorless cutover breaks commit-hash references; CI fetches old commit. | All pinned refs converted to content hashes or repo-local paths with verification receipts before cutover. | Architect. | Clean cutover verification / CI. |
| **Hide ratings CSV now** (`data/nfl/madden27-ratings.csv`) | Owner-stated + R manifest §0.5 | Removing/hiding data may break tests, build scripts, data loaders, or CI; needs a checked manifest of dependents. | A V dependency/search receipt showing safe removal/redaction path, or Owner-approved replacement fixture. | Owner ruling; Architect implements. | First public cutover push. |
| **GH/gh case-pair** | R manifest concern area / Q2 | Case-insensitive clone/checkout hazards; dropping without check risks loss. | V tip/ancestry comparison and preservation decision. | Architect/Owner. | Branch recreation/cleanup. |
| **“No history mirror” vs Option A governance move** | I concern | Needs explicit manifest language: product/code history not mirrored, but selected governance artifacts/receipts move as files in inauguration commit with provenance pointer. Inkling reconciliation (narrower split + ARCHIVE.md + evidence-crosses) is plausible but not ruled. | Owner/Architect ruling on exact cross/freeze set in manifest §2/§3. | Owner/Architect. | Final cutover manifest sign-off. |

**No blocker found beyond the above from this review** (U: I did not run board, CI, or dependency scans; I reviewed Claude’s manifest and Owner-stated constraints only).
