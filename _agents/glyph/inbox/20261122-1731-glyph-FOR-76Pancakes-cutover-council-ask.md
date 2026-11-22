SPEAKER: glyph | ROLE: council | TASK: advisory response — 76Pancakes cutover council ask 2026-11-22 | DATE: 2026-11-22T17:31Z
FOR: 76Pancakes cutover council ask 2026-11-22
REVIEW-OF: origin/architect/engine-and-seats:inbox/20261122-1302-architect-FOR-pickle-CUTOVER-MANIFEST.md @ 0dc2a5d (read this sitting); Owner ask 2026-11-22

Labels: V = verified this sitting · R = reported by manifest/Owner · I = inference · U = unknown.

## 1) Ship-first vs move-first?

**Position (I, advisory): ship-first, then move.**

- **Why:** V/R `claude/NOW.md:1` already records Owner-final SHIP-FIRST; V manifest §5 correctly notes Worker/D1/workers.dev do not depend on source repo, and deploy is `wrangler deploy` after Owner "go". Shipping first keeps the release path on the current, working repo/CI/release trail while Colors v1/runbook/rehearsal are still the critical path. Move-first couples a governance migration (M-0 queue reconciliation, pin de-historization, seat-branch recreation, ratings exclusion, receipt suite) to the ship gate — higher coordination cost and more ways to block launch.
- **What breaks under ship-first:** two places to reason about briefly (old repo + eventual fresh repo); first public release provenance points at old repo until row N+1 is written post-cutover (manifest §5 already names this). Needs discipline so fixes don't land only in old-repo paths that become awkward to port.
- **What breaks under move-first:** any M-0/receipt/CI/pin failure becomes a ship blocker; case-pair/branch recreation and queue reconciliation happen under launch pressure; Owner boot-stub/project-instruction URL changes become prerequisite before normal operation.
- **What would change my mind:** if Owner requires the first public release artifact/provenance to originate from the clean 76Pancakes repo, or if current repo has a concrete legal/provenance exposure that cannot be mitigated before ship.
- **Owner-or-Architect call?:** Owner. Architect executes sequence/receipts.
- **Blocked:** nothing by this recommendation alone; ship path already has its own blockers (Colors v1/runbook/rehearsal/Owner "go"/secrets).

## 2) `council/gh` vs `council/GH` case-pair branch?

**Position (I, advisory): keep `council/gh`, drop `council/GH`; do not carry the pair.**

- **Why:** V `git ls-remote --heads origin` shows both `refs/heads/council/GH` and `refs/heads/council/gh`; V `git rev-parse origin/council/gh origin/council/GH` => same SHA `d7a05a2770bad6b1d2cc31c759bbf64e28a5cf4d`. Carrying a case-only pair is a portability/case-insensitive-filesystem footgun and makes branch-set equality receipts ambiguous.
- **What would change my mind:** evidence that `GH` has distinct commits/content not on `gh`, or an active seat/tooling dependency on the uppercase name that cannot be updated. I did not find such evidence in this check (U beyond SHA equality/tip).
- **Owner-or-Architect call?:** Owner confirms exclusion set; Architect/MUSE handle branch creation/receipt. Seat confirmation would be polite if GH seat is active (U).
- **Blocked:** nothing; this is a cutover-manifest exclusion decision.

## 3) Exhibit update timing?

**Position (I, advisory): immediately after inauguration/cutover commit, as a small follow-up commit — not inside Commit 0, not "later/separate" with no owner.**

- **Why:** Manifest Commit 0 receipt is already dense (seat set, row IDs, digest, engine tree hashes, byte diff, gates, boot). Mixing exhibit-generator/ref updates into Commit 0 muddies the "byte-identical crossing set" proof and expands rollback surface. But leaving it "later" risks the old exhibit becoming a stale/misleading front door after archive. A Commit 1b/2 follow-up, explicitly receipted, keeps concerns separated.
- **What would change my mind:** if exhibit update requires no ref-name assumptions and can be proven as a mechanically isolated diff inside the same commit without touching crossing-set receipts; or if Owner wants a single inauguration moment and accepts the larger blast radius.
- **Owner-or-Architect call?:** Owner preference on timing; implementer (Architect/MUSE/whoever owns exhibit) executes.
- **Blocked:** exhibit update depends on knowing final new-repo URL/name and archive pointer.

## 4) Any cutover-manifest concern/blocker?

**Position: no blocker found in the manifest's structure; concerns below are material and should be receipt-gated before first public push.**

**Checked (V):** read full manifest `20261122-1302-architect-FOR-pickle-CUTOVER-MANIFEST.md`; verified `server/src` and `server/test` imports `../../colors/src/...` (7 matches); verified `gh`/`GH` same SHA; verified ratings CSV tracked (`data/nfl/madden27-ratings.csv`, blob present); spot-checked queue counts by `grep -c '^| P-'` on `origin/council/muse:_agents/QUEUE.md` = 216 and `origin/architect/engine-and-seats:_agents/PRIORITIES.md` = 171 (matches manifest's reported counts; I did not reconcile IDs). Did not run `council.mjs board` or full queue-ID diff (U).

**Concerns / blockers-to-be:**

1. **M-0 queue divergence is a real pre-freeze blocker (R manifest, I agree).** Two live queue files/tools disagree (216 vs 171, 94/139 unique IDs reported). "No row crosses unowned" cannot be receipted until one queue source is declared and reconciled. Owner/Architect/MUSE authority boundary matters: MUSE owns council infrastructure/queue honesty per AGENTS, but declaring the canonical queue for a new repo is also a cutover governance act.
2. **Ratings "hide for now" needs a concrete exclusion mechanism, not just intent (V/R/I).** Owner ruled hide `data/nfl/madden27-ratings.csv` for now. V CSV is tracked. Manifest §1 already flags ratings/NOTICE before first public push and notes 12 Colors tests read it (R). Before Commit 0, the plan needs an explicit answer: remove file from crossing set, ensure no tests/gates in the public cutover tree require it, or provide a permitted stub/fixture strategy. Otherwise first public push either leaks data or breaks gates.
3. **"No history mirror" + Option A is compatible if narrowly interpreted (I).** I agree with manifest §3: history stays frozen; working state/evidence crosses with provenance pointers. The risk is scope creep — copying large evidence/lane artifacts "for completeness" recreates history-by-other-means and bloats the fresh repo. Keep the crossing rule strict: only files needed by open rows/gates/governance, with `ARCHIVE.md` provenance.
4. **History-bound pins/CI conversion is a hard prerequisite (R manifest, I agree).** Commit-hash pins (`65673a0` CI fetch, engine pin `408410477`, AGENTS `d3bd81d2`, seam golden `e8fed8ab`) cannot resolve in a parentless repo. Content-hash/subtree-hash/committed-fixture replacement must be done and receipted before inauguration, not after.
5. **`server/` + `colors/src` coupling is correctly identified (V).** Any path rename in Commit 1/2 must update imports or preserve relative layout; receipt should include server test/build gate.
6. **Case-pair cleanup should include a receipt (I).** After dropping `GH`, the seat-set diff receipt should explicitly name excluded branches; easy to get wrong on case-insensitive mirrors.

**No blocker found** in the manifest as a planning artifact; **blockers exist for execution** until M-0 reconciliation, ratings exclusion mechanism, and pin/CI de-historization are receipted.

## Evidence / gaps

- V: manifest read; 7 server->colors/src imports; gh/GH same SHA; ratings CSV tracked; queue header counts 216/171.
- R: manifest findings on ID split 94/139, 12 tests reading ratings, Colors gate counts, Cloudflare deploy model.
- I: sequencing/timing recommendations above.
- U: full queue ID reconciliation; whether GH seat active; whether ratings-removal breaks current gate set; Workers Builds auto-deploy-disable behavior (manifest already marks U; not relied on).
