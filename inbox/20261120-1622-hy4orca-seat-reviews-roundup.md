SPEAKER: hy4orca | ROLE: advisor | TASK: review the other seats' work in the 2026-11-20 round (Owner request) | DATE: 2026-11-20T16:22Z
FOR: the Owner · MUSE (council record) · the Architect (cutover lane)

REVIEW-OF (files on their authors' own branches, all read this session):
- Ernie: `inbox/20261120-1559-ernie-P-317-cakepanz-12-review.md`, `…1605…-brainstorm.md`, `…1612…-review-of-reviews.md`, `…1620-ernie-TO-ARCHITECT-cutover-lane-split.md`
- Hy4: `inbox/20261120-1551-hy4-cakepanz-12-review.md`, `…1613…-reviews-meta-review.md`
- Beam: `inbox/20261120-1100-beam-zai-cakepanz-12-review.md`, `…1610-beam-review-of-reviews.md`
- Pickle: `inbox/20261120-1554-pickle-CAKEPANZ12-review.md`, `…1555…-innovation.md`, `…1606-pickle-PEER-REVIEWS-review.md`, `…1607-pickle-ERRATA-cakepanz12-t8-unblocked.md`
- Porca: `inbox/20261120-1614-porca-zai-cakepanz-12-review.md`, `…1615-porca-IDEA-cakepanz-shell-leverage.md`
- OrcaBeam / OrcaMan / Glyph: their c12 reviews (read directly and via the three meta-reviews)
- Iceman: `inbox/20261120-1620-iceman-P-163|P-164|P-165-review.md`
- Orcatide: lane/bulletin only (latest sitting was a handover, no new technical claim to check)

VERDICT: **the round is high quality and convergent.** No review is rejected. One review (Ernie's) changes the plan; four widely-repeated claims are now superseded; two new defects (one Svelte-level, one verifier-level) deserve to ride the relay. My own c12 review is corrected where these seats found more.

## 1 · What I re-ran myself (new commands, this session)
1. `git diff --stat 408410477 ee3b6e1 -- colors/src` → **empty**. Ernie's central claim is true: the engine is current, there is no re-sync.
2. `git ls-tree -r --name-only origin/architect/engine-and-seats -- colors | grep -c '\.svelte$'` → **0**; `colors/` is engine-only.
3. `git show origin/architect/engine-and-seats:colors/src/sports/nfl/app/store.ts` → `dispatchAsync` at **:147** with the documented serialisation contract at :142–150.
4. Engine file counts: gh-pages cakepanz **57** vs colors **69** — the "11 files behind" is the *deployed* tree, not Claude's engine.
5. Both T8 repair-byte paths exist on disk: **6,418 B · md5 `0a2869538a706e7e6ea864664b7e5c9f`** — Ernie D1 / Pickle erratum confirmed. My earlier c12 review called T8 "BLOCKED on bytes not on disk" — **that line is SUPERSEDED**; the bytes were never searched for on disk. T8 is READY.
6. The README `13b CLOSED` vs report `OPEN` contradiction is real (I read both when reviewing c12 — I under-weighted it; Ernie D3, OrcaBeam §4.1, Porca D1, hy4, Beam all flagged it as the single blocking doc defect).

## 2 · Per-seat verdicts (with what each contributes)
| Seat | Verdict | Contribution / my check |
|---|---|---|
| **Ernie** | **strongest of the round — accepted** | D1 unblocks T8 (I re-ran: CONFIRMED); D2 restore-desyncs the URL seed (`App.svelte:183` sets `seed`, only write is `:120` in `startDraft`) — CONFIRMED by hy4 and Beam; D3 README contradiction — CONFIRMED; D4 `parseSeedCode` leniency (`b36:1.5`→1) — plausible, low risk; D5 md5sum present on this Mac — CONFIRMED; D6 N26 is source-string, not behaviour — valid. His cutover-lane split is the right answer to Claude, and I independently verified every load-bearing fact in it (§1 above). |
| **Hy4** | accepted, with one correction | Found the verifier's missing **converse check** (unlisted extra file verifies clean) — Porca reproduced it. Correctly calls T8 READY via Ernie D1. His meta-review's other verdicts match mine. |
| **Pickle** | accepted | His erratum is exemplary: he retracted his own "T8 blocked" line rather than rewriting history, and re-ranked his determinism idea from "unblock" to "hygiene" once the bytes were found. Two new c12 defects (D1 above, D2 missing SHELL-STATUS/ACCEPTANCE-RECEIPTS files) stand. |
| **Porca** | accepted | Adds **D4**: `<span tabindex="0">` at `BoardRow.svelte:53` triggers Svelte's `a11y_no_noninteractive_tabindex`, and the law at `node.battery.mjs:611` pins that exact source string — so a legitimate fix breaks the law. Genuine, and a good "laws test text, not behaviour" catch. His Group-I ideas (receipt provenance, law-coverage counters, seeded batteries) are the best structural answer to the brittle-proof problem. |
| **Beam** | accepted | Convergent; already applied the repair bytes to the beam host (49/49) before Ernie's note — independent discovery. Toast-queue and shared falsifier-guard ideas worth keeping. |
| **OrcaBeam / OrcaMan / Glyph** | accepted | README contradiction and stale-pin findings confirmed; honest about what they did not run. OrcaBeam's `<span>`→`<button>` a11y point matches Porca D4. OrcaMan's "named open items" posture is right. |
| **Iceman** | accepted, low priority pre-cutover | P-163/164/165 reviews are receipt-backed and correctly insist on re-targeting from frozen Pre-Colors to the live shell, and on not deleting legitimate matchup lines by substring. But these are old P0 wave-era items; per the Owner's "cutover is the gate", they should not consume engine/merge time now. His P-165 point that Colors `feed.ts` sets `mvpLine: null` is a real seam fact, worth noting for a post-cutover slice. |

## 3 · Convergent findings across the round (all now VERIFIED by at least two seats)
1. **T8 is READY, not BLOCKED** — repair bytes on disk, exact md5, landing tested 48/1 → 49/0.
2. **13b is OPEN; the README saying CLOSED is the single blocking doc defect.**
3. **The c12 engineering claims are sound** (T2 700/9000→0, T3 277/286→286/286, T4 tamper-fails/clean-passes, T1 guard mechanism), but the acceptance composite is not final.
4. **T8's root cause is run-variant receipts** — fix with a fixed/injectable draw seed (endorsed by Beam, hy4, Porca, me).
5. **The verifier needs a converse check** (hy4 → Porca reproduced).
6. **Two seed defects remain**: restore does not write the seed back to the URL (Ernie D2); and the second draft in a tab replays the same seed because `?seed=` written by `startDraft` is re-read by `parseSeed()` (Pickle's tab-repeat finding).
7. **The ring is DROPPED** (Architect `ee3b6e1` NOW.md:7), yet c12's L16/L18/L21, F20 and the Contract-B push assume it exists — a scope conflict that needs the Owner/Architect's word before 13b is treated as a cutover gate. This is my F1, independently reached by Pickle and OrcaBeam.

## 4 · Where I correct my own c12 review
- T8: "BLOCKED" → **READY** (superseded by Ernie D1; I re-ran the byte check).
- I called the README/13b contradiction only implicitly (via F4's provenance gap); it is a **blocking doc defect** in its own right — adopt Ernie D3/Porca D1.
- I missed Porca D4 (Svelte a11y warning + source-string law) and hy4's verifier converse gap — both real, both now in the round's consensus.
- My F4 (T4 receipt certifies a different tree) is distinct from, and complementary to, the converse gap; both should ride the relay.
- My F1 (ring drop supersedes C25 correction #1) is independently confirmed by Pickle and OrcaBeam.

No seat's work is rejected. The practical effect of this round: the merge answer is settled (Ernie's lane split, verified here), T8 can proceed, the README must be corrected before the c12 sitting is cited as green, and four small robustness fixes should ride the next relay.

— hy4orca (advisor)
