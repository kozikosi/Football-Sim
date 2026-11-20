# HY4ORCA — lane file (rewrite at end of every session, never append)

## Identity
- **Seat:** HY4ORCA · **Model / how reached:** HY4ORCA / API · **State:** advisor
- **Admitted:** 2026-11-19 by the Owner. Role: propose, test, review, dissent, measure. Core status is the Owner's call after 3 verified items.
- **Worktree:** `/Users/kosi/Desktop/wt/hy4orca` · **Branch:** `council/hy4orca` · **`git merge-base HEAD origin/council/base`:** `864a6aa12689a9ef579fb1a2fb6c07a1c6bd2c0e`
- **State at session end:** worktree clean, branch pushed and verified by `ls-remote`.

## Current work (2026-11-20, 16:04Z session — cakepanz-12 delivery)
Owner task: push the Desktop folder `zai-cakepanz-12-2026-11-20` to my branch, review it thoroughly, push the review, and brainstorm improvements to cakepanz / the UI-UX shell.

### Delivered
- **Package hosted** at `_agents/hy4orca/zai-cakepanz-12-2026-11-20/` (37 files, 376 KB) in commit **`db7e3a35309542f492a4a0b7d341a9d9fe875551`**, pushed and `ls-remote`-verified. Integrity re-verified at source and destination: 36/36 md5 entries match; `node cakepanz-4-changed/tools/verify-package.mjs .` → **36 OK / 0 FAILED / 0 missing, exit 0**.
- **Review filed** `inbox/20261120-1604-hy4orca-cakepanz12-review.md` — VERDICT **improved**. Independently reproduced the seed receipt (`node --experimental-strip-types scripts/seed-roundtrip-receipt.mjs`, Node v26.13.0 → 700/9000 before, 0 after, sha256 `bd9ff36a3541bd0b…`, exit 0).
- **Brainstorm filed** `inbox/20261120-1605-hy4orca-cakepanz-shell-ideas.md` — 8 proposals, led by the ring-drop re-scope.

### Review findings (short index; full text + receipts in the review file)
- **F1 HIGH VERIFIED — C25 correction #1 is superseded:** Architect tip `ee3b6e1db` NOW.md = "RING: DROPPED by Owner (20 Nov). Do not revisit before ship." Z.ai's 10:15Z note cites the older `17e79b1a` ("RING … UNKNOWN") and asks MUSE/INKLING to paste Contract-B wording — that would make PROJECT-KNOWLEDGE wrong. Do not paste correction #1; correction #2 (P-316 built) stands. Consequence for c12's one-click laws is INFERRED pending a scope ruling.
- **F2 MED VERIFIED — confirm path unguarded:** `DraftBoard.svelte:84` calls `onpick` with no 380 ms guard (only `quickDraft` has one); L18 tests only the quick button → double-activation of Confirm can take two picks. Grows in importance if the ring drop makes Confirm the primary path.
- **F3 MED VERIFIED — ring tie-break display-parses:** `DraftBoard.svelte:60` regex-strips `BoardRowVM.wins` strings; `BoardRowVM` (engine view) holds raw `_w`/`_p` but doesn't export `rawSort`. Not the Contract B shape C25 claims.
- **F4 MED VERIFIED (provenance) — the T4 receipt certifies a different tree:** 41/40 entries, README md5 `8ab69401…`, CHECKSUMS self-line `d41d8cd…`; the shipped manifest has 36 entries, README `5719226a…`, no self-line. I proved the delivered tree clean myself; regenerate the receipt at final bytes.
- **F5 LOW — 13b honestly OPEN** (no full hardened all-DIED re-run).
- **F6 LOW — doc pin discrepancy, not a delivery defect:** `d3bd81d2` (live PK) is NOT an ancestor of architect tip; `408410477` (delivery) IS. MUSE/Architect reconcile.
- **F7 INFERRED — `aria-label` on generic `<span>`** may not expose the field name; value is still in text content.

## Repo facts re-verified this session
- Architect tip `ee3b6e1db` (09:24Z), `claude/NOW.md` lines 3–7: colors 430/430; T3 test re-point done; CUTOVER GAP re-sync 11 files + slices 3–5; Q7 narrow week:6 stands; **RING DROPPED**.
- `408410477` (20 Nov, docs-only) is an ancestor of architect tip; `d3bd81d2` (14 Nov) is not; neither on gh-pages; the two commits have no merge base.
- `BoardRowVM` field types (beam c9 `view/draftBoard.ts:19-24`): `wins/priority/ovr/gone` are strings; internal rows carry `_w`/`_p` numbers.
- Node here is v26.13.0; `--experimental-strip-types` runs the delivered seed receipt directly.

## What the next session needs
- **Read first:** the two inbox files above; then the c11 chain (`inbox/20261120-0706-hy4orca-cakepanz11-erratum.md`, `…0448…review.md`, `…0359…-A1-C12-synthesis.md`) if the ring question returns.
- **Open:** Owner/Architect scope ruling on the ring drop vs the c12 one-click laws; Z.ai's next-sitting first command (hardened falsifier re-run); T8 repair bytes still blocked on the Owner's zip root; MUSE/INKLING must not paste C25 correction #1 as written; the live PK pin discrepancy.
- **Do not redo (receipts on my branch):** c11 review + ideas + erratum, A1/C12/C29/C23/C27/C24/A2/B2-C13/C17/C21/C14/B7/B6 reviews, and this c12 package/review/ideas. A seat may not review the same item twice.
- **Orientation:** no task was in the queue for me — this was an Owner relay. `node tools/council.mjs next` (from muse) still surfaces old P0 items. Nothing here assigns work to a named seat.

## Live files (all on council/hy4orca)
- `_agents/hy4orca/zai-cakepanz-12-2026-11-20/` — the hosted Z.ai package (37 files).
- `_agents/hy4orca/zip-root-cakepanz-10/` — the earlier hosted c10 package (41 files).
- `inbox/20261120-1604-hy4orca-cakepanz12-review.md`, `inbox/20261120-1605-hy4orca-cakepanz-shell-ideas.md`.
- `bulletin/20261120-1606-hy4orca.md` — this session's bulletin line.

## Role reminder
Advisor: propose in `inbox/`, never edit the product/engine/pins/governance or another seat's file. Push only `council/hy4orca`, never force-push. End every chat with one bulletin line.
