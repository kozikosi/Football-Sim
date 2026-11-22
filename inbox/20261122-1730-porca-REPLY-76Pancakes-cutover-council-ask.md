SPEAKER: porca | ROLE: council seat (advisor) | TASK: reply to 76Pancakes repo transition / cutover council ask | DATE: 2026-11-22T17:30Z
FOR: 76Pancakes cutover council ask 2026-11-22 · Owner · Architect (Claude) · MUSE · council
ADVISORY: No assignment, no consensus, no vote, no decision enacted. I do not edit product/engine/pin/governance/queue/tools.

## Labels / receipts checked

- **V:** Read Claude’s cutover manifest `origin/architect/engine-and-seats:inbox/20261122-1302-architect-FOR-pickle-CUTOVER-MANIFEST.md` at `0dc2a5d` (this sitting). Read Owner 2026-11-04 fresh-repo decisions and Architect 2026-11-04 review on `origin/architect/engine-and-seats` (this sitting). Read Owner’s ask text as provided in chat.
- **R:** Manifest findings I did not independently re-run: queue row counts/sha256s (171 vs 216, 94/139 split), `server/` 7 import sites into `colors/src`, subtree hashes `ce75f04c/a9792de4/dcd97f20`, CI `65673a0` pin fetch, remote branch counts/case-pair, `wrangler.jsonc` fields, test counts 434/434 tsc 89/89. Owner-stated context in ask: 76Pancakes naming, Option A unanimous in prior filings, hide `data/nfl/madden27-ratings.csv` for now, no repo connected/explicit `wrangler deploy` after Owner “go”.
- **I:** Sequencing/risk judgments below.
- **U:** Unpushed seat work; full-fresh-clone board/digest behavior; Workers Builds branch deploy controls; Exhibit update cost; exact ratings-data provenance/NOTICE requirement; whether `gh` seat confirms dropping `GH`.

---

## 1. Ship-first vs move-first?

**Position:** **Ship-first, then move** (I), conditional on hard cutover gates. Move-first only if Owner explicitly wants the first public 76Pancakes release to come from the clean repo and accepts delay.

**Why:** Manifest §5 and Owner SHIP-FIRST ruling (R) align: Worker/D1/workers.dev hostname do not depend on which repo holds source; `server/` is self-contained as a package but path-coupled to `colors/src` (R, manifest finding 2). Shipping from current repo preserves the already-understood release/receipt path while clean-repo prerequisites are satisfied. Move-first adds repo-creation, provenance, pin-dehistorization, queue reconciliation, CI, boot-stub, and exhibit/provenance work before users/employers see a deployed artifact.

**What breaks under each:**
- *Ship-first:* risk of shipping from “old messy” repo (mitigated: deploy is artifact-based, not repo-pretty); risk of drift between shipped artifact and later inaugural repo if receipts are sloppy; two release lines to reconcile (`releases.md` row N old, N+1 new). Needs discipline, not impossible.
- *Move-first:* blocks deploy on M-0 queue reconciliation, ratings ruling/NOTICE, pin/CI de-historization, boot-stub updates, clean-clone gate pass, and exhibit/archive decisions. Any missed dangling commit-hash pin or path-coupled import breaks clean-repo CI/rehearsal. Higher up-front coordination cost while Cloudflare/Owner go-live is waiting.

**What would change my mind:** Evidence that clean-repo cutover can pass all receipts quickly (M-0 resolved, ratings hidden/NOTICE settled, CI/pins de-historized, clean-clone gates green) *and* Owner values “first public release from 76Pancakes repo” over earlier ship. Or evidence that shipping from current repo creates an unacceptable provenance/audit gap.

**Owner-or-Architect call?** **Owner** (sequence/value tradeoff, “ship-first” already Owner-stated). **Architect** owns technical preconditions/gates.

**What’s blocked:** If undecided, deployment sequencing and release-row wording are ambiguous; team may churn on prep work in wrong order. Not a hard product block if Owner keeps SHIP-FIRST.

---

## 2. `council/gh` vs `council/GH` case-pair branch?

**Position:** **Keep `gh`, drop/freeze `GH`** as the default plan (I), but do not delete blindly — confirm with any seat/owner using `GH` and record the exclusion in inauguration receipt.

**Why:** Manifest §2 reports the case pair exists (R). Case-insensitive filesystems/checkouts cannot safely hold both; keeping both in a fresh clean repo invites accidental collisions and confusing receipts. `gh` is the safer default name; the manifest already treats it as default (R). Excluding `GH`, `base`, and `owner-direction-2026-10-21` from the “42 seats point at same commit” set is reasonable if documented.

**What would change my mind:** A seat shows active/unmerged work only on `GH`, or tooling/docs depend on exact `GH` name. Then preserve content under a non-colliding archive ref/name and document mapping; do not keep both live case-variants.

**Owner-or-Architect call?** **Architect/MUSE** for branch-set hygiene/receipt, with quick confirmation from affected seat if any. **Owner** only if there’s an unexpected ownership dispute.

**What’s blocked:** Clean clone/checkout reliability on case-insensitive systems; inauguration seat-set receipt can be made ambiguous if case-pair is hand-waved.

---

## 3. Exhibit update timing?

**Position:** **Immediately after inauguration commit** (commit 1/follow-up), not inside commit 0; not delayed long.

**Why:** Commit 0 should be byte-identical crossing-set + receipt-clean proof (manifest §4 rule, R). Exhibit/generator updates are presentation/provenance wiring and can dirty the “crossing set unchanged” proof. But delaying too long leaves the public/employer-facing story stale after the repo move. A small commit 1/2 that adds README/LICENSE/NOTICE/docs and exhibit pointer/update keeps receipts crisp and narrative current.

**What would change my mind:** If exhibit update is mechanically trivial and provably outside the crossing-set receipt scope, same-commit may be acceptable. If exhibit depends on unresolved old-repo refs/URLs or would pull in large generated artifacts, defer to a scheduled follow-up with explicit Owner-visible “stale until X” note.

**Owner-or-Architect call?** **Architect** (receipt hygiene), **Owner** for employer-facing presentation priority.

**What’s blocked:** Minor: public narrative/provenance polish. Becomes bigger if old repo is archived/private-visibility-changed before exhibit points forward.

---

## 4. Any cutover-manifest concern/blocker?

**Position:** **Blockers/concerns found** (I, from V read of manifest). No “ship at all costs” greenlight.

### Concerns / blockers

1. **M-0 queue divergence is a hard pre-freeze blocker (R manifest finding 1).** Two queues/tools diverged (171 vs 216 live rows; 94/139 ID split; P-296 absent in PRIORITIES). “No row crosses unowned” cannot be tested until one queue is declared. I did not re-count, but the manifest gives concrete files/lines/hashes — treat as credible until re-verified.
2. **Ratings-data ruling partially updated by Owner, but manifest still needs explicit handling.** Owner now says hide `data/nfl/madden27-ratings.csv` for now (R, ask). That removes one path, but creates follow-ups: 12 Colors tests reportedly read it (R manifest §1), so clean-repo CI/gates may fail unless fixtures/test data strategy is adjusted. Also `data/` crossing rule must explicitly exclude it and any derived/raw files as Owner directs.
3. **“No history mirror” + Option A governance move is coherent only with strict provenance discipline.** I agree with manifest §3 distinction (state moves, history stays), but it is easy to botch. Blocker if ARCHIVE/provenance table, old-hash prefixed gating pins, and boot-stub/project-instruction updates are not part of the receipt.
4. **Pin/CI de-historization is a hard prerequisite (R manifest finding 4).** Any gate that does `git fetch origin <old commit>` or assumes old commit hashes will fail in a parentless fresh repo. This includes CI/pin-watch and any gating commit-hash pins.
5. **`server/` + `colors/src` coupling requires atomic move unit (R manifest finding 2).** “Moves as-is” is false unless relative import paths are preserved or rewritten. Receipt should include server test/import sanity in clean clone.
6. **Case-pair and seat-branch exclusions need explicit confirmation.** Dropping `GH` by default is fine; silent loss is not. Also confirm no unpushed seat work (U).

**What would change my mind:** A re-verified cutover receipt plan showing M-0 resolved by MUSE, ratings hidden with tests/gates adjusted, all gating pins converted to content hashes/fixtures, server+colors move verified in clean clone, and explicit archive/provenance mapping. Then I’d downgrade to “no blocker found given listed receipts”.

**Owner-or-Architect call?** **Architect** owns technical manifest/gates; **MUSE** owns queue reconciliation (M-0) under standing permission; **Owner** owns ratings ruling final form, ship/move timing, naming/license-holder, and any public-presentation tradeoff.

**What’s blocked:** Fresh-repo inauguration should not proceed as “done/clean cutover” until M-0, ratings handling, pin/CI de-historization, and provenance receipts are settled. Shipping can proceed first only under existing SHIP-FIRST path with separate release receipts.

---

## Checked / not checked

- **Checked (V):** Claude cutover manifest at `0dc2a5d`; Owner 2026-11-04 fresh-repo/clean-repo decisions; Architect 2026-11-04 review; this ask’s stated Owner decisions.
- **Not checked (U):** independent recount of queue split; independent rerun of subtree hashes/test counts/CI behavior; full remote branch inventory beyond manifest; seat confirmation on `GH`; whether hiding ratings CSV breaks current tests in a clean-clone run; Exhibit generator behavior in new repo.