# PORCA — lane file (rewritten at session end 2026-11-28T05:42Z, never append)

## Identity
- **Seat:** PORCA · **Model / how reached:** PORCA / API · **State:** advisor (admitted by the Owner 2026-11-19). ID block: none filed.
- **Worktree:** `/Users/kosi/Desktop/wt/porca` · **Branch:** `council/porca` · `git merge-base HEAD origin/council/base` → `864a6aa12689a9ef579fb1a2fb6c07a1c6bd2c0e`.
- **Evidence standard:** every claim carries a fresh command receipt (`git show`, `git grep`, `git cat-file`, `shasum`, `md5sum`, `node`, file read). No shared-tree writes, no product/engine/pin/governance/queue/tools bytes, no other seat's file. A wrong claim stays in the record with a superseding correction.

## Current work and state (session 23 — cross-seat review + Z.ai continuation prompt; ended 2026-11-28T05:42Z)
- **Owner request:** review other seats' work, especially Claude's and Z.ai's, then draft a long prompt for Z.ai to continue.
- **Filed:** `inbox/20261127-2004-porca-FOR-zai-continuation-prompt.md` — a draft handoff, **not a seat assignment**. Grounds: Architect tip `1681d3a36` (T3 sync; colors 523/523, tsc 89, D1 43/43, mutants 22/22 + 9/9, "No independent review yet"), `claude/NOW.md` (25 Nov; v8 outcomes; waiting on Z.ai slices 3–5 → Architect T7; T1 fetch-then-import; T6 flags), rehearsal `b482289be` (8 files with sampled player names need an Owner decision); Z.ai delivered folder `4850bb2d` with 8 REDs and a stale seam card; pushed `council/zai` tip `25e3b2f99` (1 Nov); local zai worktree read-only at 03:27Z clean at that tip, **0 unpushed** (VERIFIED).
- **Prompt structure:** authority/lanes → receipts → 8 REDs → Step A push/preserve → Step B gate restoration at final bytes + independent Verifier → Step C slices 3–5 handover unblocking T7 → Step D v8/T1/T6 → Step E B1–B6 ideas → anti-goals → definition of done → carried question. No build, no accepted design, no seat assigned.
- **Earlier this session:** filed `inbox/20261127-0327-porca-P-160-review.md` (queue's top line, verdict **improved**: Z-post-blue strings already LIVE at `WORKLOG-SHARED.md:338`, not Pre-Colors; stale anchors 4219/4281/5885).
- **Commits pushed:** `7c5e152f0` (P-160 review), `c83bec3c6` (Z.ai prompt). `git ls-remote origin refs/heads/council/porca` returned `c83bec3c6fe4d8447602419f87e8d2e56e6ac53b`, equal to `git rev-parse HEAD` (VERIFIED).
- **Session-end preservation gate:** `node tools/preserve.mjs check` → exit **1** (0 stashes, 0 local-only commits). Own worktree line: `/Users/kosi/Desktop/wt/porca council/porca 0 0 OK`. Pending are other seats / shared tree only (see below); none touched.
- **Not changed:** product, engine, pin, governance, queue, tools, other seats' files. No build, no assignment.

## Prior work (session 22 — queue review P-160; 2026-11-27T03:27Z)
- Took the top live queue line via `node ./.council_tool.mjs next --no-fetch` (v11 tool from `origin/council/muse`; temp tool deleted before push). REVIEW P-160 had 7 prior reviews.
- Filed `inbox/20261127-0327-porca-P-160-review.md`: Pre-Colors hash `40233d6b…`; `teamAdvancedHTML` 4281 not 4219, `advancedStatsHTML` 4317 not 4281, `renderSeasonCompleteView` 5885 not ~5889; nine of ten target strings occur **zero** times in Pre-Colors; `fragOffense` is prose with no unit labels; `teamAdvancedHTML` has no PF/PA totals. Recommended: mark the shipped subset superseded; retarget to the Svelte shell with fresh anchors; do not patch the frozen reference.

## Prior work (session 21 — Owner's 2026-11-25 folder: published, reviewed, brainstormed; 2026-11-26T01:46Z)
- **Published:** Owner-relayed `/Users/kosi/Desktop/Football Sim/zai-s17-continuation-2026-11-25` copied verbatim except `node_modules/` (840 files, 26 MB) onto `council/porca` at commit **`4850bb2d9a8a2c91cb29e29bc1e82d63249e31fc`** (includes `PUBLICATION-NOTE-porca.md`, publisher metadata only); `git ls-remote` verified. Published `shasum -a 256 -c SHA256SUMS-2026-11-25.txt` → 839/839 OK, exit 0.
- **Reviewed (verdict `REGRESSED at the delivered bytes`):** `inbox/20261126-0146-porca-zai-s17-continuation-2026-11-25-review.md`. Clean-room copy (publisher note removed) still gives `check-claims --phase full`: **25 OK / 8 RED / 0 skipped, exit 1**; packaging 18 OK / 3 RED. Engine fence intact (69 files vs `408410477`, `diff -rq` exit 0); acceptance seal hash `d536d63f…` matches attestation; one COMPLETE marker. Eight REDs: seal 401 vs 385; verify-package EXTRA `SHA256SUMS-2026-11-25.txt` (exit 1); shipped dist names changed from the pinned pair; visual/slot receipts pinned to `8144ae6c…` vs shipped `3f053afd…`; 8 stale freshness inputs; generated state blocks stale; Wave B battery crashed on TS `as const` in `.mjs` line 57; `offline-tent.json` missing entirely.
- **Key finding:** `seam-card.json` (read by both the gate and the dev chip) is stale — seal 385 / claims 31 / distHash `8144ae6c…`, while the tree is 401 / 33 rows with 8 RED / `3f053afd…`. Pin and canary are still correct, so the chip looks healthy while three numbers lie.
- **Portability finding:** `scripts/check-claims.mjs` cannot run from a path with spaces (`new URL(...).pathname` keeps `%20`) — fails at the Desktop source, works at the published path.
- **Brainstorm filed:** `inbox/20261126-0146-porca-cakepanz-waveb-next-wave.md` — J1–J4 implications and B1 byte-latched Seam Card, B2 epistemic ladder (MEASURED/INTERIM/UNKNOWN), B3 agency rail, B4 coach's-tape story, B5 receipt-backed offline chip, B6 one keyboard/AT decision rail. Ranking + Svelte 5 guards; no build.
- Review is an integrity/claims seat review, **NOT** a fresh independent Verifier pass (I authored the publisher note; no battery was re-run by me).

## Prior sessions (compressed — full detail in the filed inbox items)
- **20 (2026-11-25T00:21Z):** published the 2026-11-24 folder (`097f38bee`, 782 files); review `improved`, full gate 23 OK / 2 RED; engine fence byte-proven; C1–C6 corrections; N1–N7 brainstorm (do not redo).
- **19 (2026-11-21):** Owner launch scope (accounts/sync/stats mandatory), Cloudflare/Hosting recommendation to Claude, canonical reference, long Z.ai handoff. `0455`/`0459`/`0508`/`0525`/`0539`/`0730`.
- **18 (03:13Z):** published Owner's S15 WIP folder verbatim (`cb86c6932`, 545 files, 18 MB); review verdict `improved`; F1–F4 blocked verified/cutover; filed UI/UX implications (I1–I7).
- **17 (02:55Z):** reviewed supplementary work order and other seats' filings (`0253`, `0254`); stale-ref false negatives, falsifier defect, v8 premise error, pin drift.
- **16/15/14/13/12:** Architect timeout review; Cloudflare how delegated to Claude+council; `dfdb887` review (improved); cross-seat S14 round; S14 verbatim relay + six-item brainstorm; composite PARTIAL; falsifiers died by name.

## What the next session needs
- **Read first:** this file → `inbox/20261127-2004-porca-FOR-zai-continuation-prompt.md` → `inbox/20261127-0327-porca-P-160-review.md` → `inbox/20261126-0146-porca-zai-s17-continuation-2026-11-25-review.md` → `inbox/20261126-0146-porca-cakepanz-waveb-next-wave.md`. Do not redo the publication, the reviews or the B1–B6 filing. The Z.ai prompt is a drafted handoff for the Owner, not a seat assignment.
- **Gate restoration order (proposal):** fix the `.mjs` `as const` line and run `battery:waveb`; run `battery:offline` to produce its receipt; reseal/regenerate in dependency order (seal count, freshness, state blocks, seam card, status), then re-run both claim phases at the final bytes. No gate result counts before the last byte is fixed.
- **Do not adopt** MUSE's ring-law range `L13, L16–L25` without byte verification; canonical says ring removal voids L13/L16–L22, with L23–L28 corrected/new laws.
- **Session-end gate:** `node tools/preserve.mjs check` exits 1 for other worktrees and the Owner's shared tree only; do not touch them. This branch must read `0 dirty, 0 unpushed, OK`, 0 stashes, 0 local-only commits.
- **Pending (not mine, untouched):** shared tree `/Users/kosi/Desktop/Football Sim` on `gh-pages` (28680 dirty); `d5642254792963f2005de2cbe496a0609502/council-super` (4); `wt/architect-colors` (1, detached); `wt/boc` (1); `wt/dsd` (2); `wt/flint` (452); `wt/GH` (2); `wt/glm` (5); `wt/mimo` (2); `wt/q` (1831); `wt/vloc` (1). 0 stashes, 0 local-only commits.
- **Await a fresh independent Verifier** (not Z.ai, not a pre-fix reviewer) after the acceptance composite completes and the full claims gate exits 0.

## Open questions (not mine to decide)
- Owner/Architect: are the eight REDs a blocker for any Wave B demo, or is an honestly-labelled PARTIAL folder acceptable until the gate is restored?
- MUSE: correct the live `PROJECT-KNOWLEDGE.md` pin line to `408410477` with the receipts in the 20-session review; fix the `%20` path bug in `check-claims.mjs` only if that file is in your remit (it is Z.ai's artifact here, not council tooling).
- Architect: rule on B1–B6; nothing is accepted until he chooses. Owner: which moment in Cakepanz most needs improvement (see the carried question in the prompt).

## Live files in this lane
- `_agents/porca/PORCA.md` — this file. `67-cakepanz-15-WIP-2026-11-21/`, `zai-s17-closeout-2026-11-23/`, `zai-s17-closeout-continuation-2026-11-24/`, `zai-s17-continuation-2026-11-25/` — Owner-requested verbatim relays on `council/porca` (not lane build copies).
- `inbox/20261127-2004-porca-FOR-zai-continuation-prompt.md`, `inbox/20261127-0327-porca-P-160-review.md`, `inbox/20261126-0146-porca-zai-s17-continuation-2026-11-25-review.md`, `inbox/20261126-0146-porca-cakepanz-waveb-next-wave.md`; prior `20261125-0021-*` review/brainstorm retained.
- `bulletin/20261128-0542-porca.md` (this session), `bulletin/20261126-0146-porca.md`; `_agents/porca/deliverables/zip-root-cakepanz-{10,12,13,14}/` historical relays.

## Role
General advisor. Propose, test, dissent, measure; never build or rule. Work comes from the ranked queue, never from an assignment.
