# PORCA — lane file (rewritten at session end 2026-11-21T03:13Z, never append)

## Identity
- **Seat:** PORCA · **Model / how reached:** PORCA / API · **State:** advisor (admitted by the Owner 2026-11-19). ID block: none filed.
- **Worktree:** `/Users/kosi/Desktop/wt/porca` · **Branch:** `council/porca` · `git merge-base HEAD origin/council/base` → `864a6aa12689a9ef579fb1a2fb6c07a1c6bd2c0e`.
- **Evidence standard:** every claim carries a fresh command receipt (`git show`, `git grep`, `git cat-file`, `shasum`, `node`, file read). No shared-tree writes, no product/engine/pin/governance/queue file, no other seat's file. A wrong claim stays in the record with a superseding correction.

## Current work and state (session 18 — publish Owner's S15 WIP folder, review it, file UI/UX implications; 2026-11-21T03:13Z)
- Owner: "please push this folder from my desktop football sim folder to your branch of the git so anyone can read it"; then "review it thoroughly and push your review"; then "think about any further implications ... how to improve cakepanz / the ui/ux shell for claude's engine."
- **Published verbatim:** `/Users/kosi/Desktop/Football Sim/67-cakepanz-15-WIP-2026-11-21` → `67-cakepanz-15-WIP-2026-11-21/` on `council/porca`. `diff -rq` clean; 545 files, 18 MB, no `node_modules`, no embedded `.git`. Commit `cb86c6932d19c6b881f59ad0d2654967faa8a507` (`ALLOW_BULK=1`: only guard triggered; every path prefixed by the folder name, no protected path staged). Push and `ls-remote` VERIFIED. This is an Owner-requested publication, not a lane build copy.
- **Filed this session:** `inbox/20261121-0311-porca-S15-review.md` (thorough review; verdict `improved`) and `inbox/20261121-0312-porca-S15-IDEA-cakepanz-ui-ux.md` (seven improvements). Bulletin: `bulletin/20261121-0313-porca.md`.
- **FACT — review strengths:** engine tree `67-.../src/engine` byte-identical to Architect pin (`8d8a8a1e81386e99f53f995492904348cb7d8345`); no live `cp-suggest`/`cp-quick` selectors (4 comment mentions only); one Draft button per row; four `dispatchAsync` sites in `App.svelte:163/199/212/250`; w89 design bytes re-measured from `origin/gh-pages:Football-Sim-Z-post-blue-w89.html` (1,922,769 B); dist classes and `CHECKSUMS.txt` match.
- **FACT — four blocking findings:** F1 `tools/verify-package.mjs` parses 32-hex MD5 while `CHECKSUMS.txt` is 64-hex SHA-256 → `0 OK / 359 FAILED / 0 missing` + `474 EXTRA`, exit 1; `scripts/gate-manifest.mjs` is the working verifier. F2 `SHELL-STATUS.md` generated 02:01:03Z names absent dist files and still says "ring". F3 live cutover docs carry S13/S14 counts while `acceptance-run.sh` is updated. F4 `deliveries/receipts/partH-s15/` has shell FA–FD and slot FS1 only — no S15 `falsify-board` run, and `ACCEPTANCE-RECEIPTS.txt` receipts are for S14 bytes. Board 23/0, shell 51/0, visual 18/0 are REPORTED pre-flight receipts, not VERIFIED. **Do not cut over on this tree.**
- **FACT — calibration:** L26/L27 wording "EXACTLY on the three" is false under C′1's tie extension (SHELL-STATUS records 4 rows at a fixed seed); the set-equality assertion is correct. Rename wording, not behaviour.
- **Not done:** no batteries, falsifiers, composite, build, browser session or deploy re-run. The one Svelte snippet in the idea file was autofixer-clean at Svelte 5.57.3 (0 issues / 0 suggestions). No product/engine/pin/governance/queue file edited.

## Prior sessions (compressed — full detail in the filed inbox items)
- **17 (02:55Z):** reviewed the supplementary work order and other seats' filings; `inbox/20261121-0253-porca-REVIEW-other-seats-supplementary.md` and `inbox/20261121-0254-porca-OWNER-work-order-relay.md`. Confirmed iceman's stale-ref false negatives, pickle's falsifier defect, v8 premise error, pin drift.
- **16 (00:33Z):** reviewed Architect timeout (no new commit after `dfdb887`; empty diff; both architect worktrees clean/stale) and filed the long Z.ai continuation order `inbox/20261121-0033-porca-TO-ZAI-continuation-order.md`.
- **15 (00:31Z):** Owner delegated Cloudflare *how* to Claude + council (pickle `a90401933`, hy4 `6b93ce9b`; council input = Pages + explicit Direct Upload). Filed reply draft `inbox/20261121-0031-porca-TO-ARCHITECT-reply-dfdb887.md`. Corrected self: `cp-quick` is the only one-click path.
- **14 (00:26Z):** reviewed `dfdb887` (`inbox/20261121-0026-porca-REVIEW-architect-dfdb887.md`, improved); found S13 gate floors in a v8/S14 gate. Confirmed hy4's w89 glow inversion. `rawSort` REOPENED, not withdrawn; top-three highlight + why copy stay.
- **13 (23:59Z):** cross-seat S14 review `inbox/20261120-2359-porca-review-of-seats-s14.md` (improved); only pickle/hy4 caught the 22:30Z ring ruling.
- **12:** relayed desktop S14 verbatim (468/468, `diff -r` clean), filed S14 review and six-item brainstorm; composite PARTIAL; falsifiers died by name.

## What the next session needs
- **Read first:** `inbox/20261121-0311-porca-S15-review.md` → `inbox/20261121-0312-porca-S15-IDEA-cakepanz-ui-ux.md` → `inbox/20261121-0253-porca-REVIEW-other-seats-supplementary.md` → `inbox/20261121-0033-porca-TO-ZAI-continuation-order.md`.
- **Do not redo:** the verbatim S15 publication and its review/brainstorm; C1–C12, A1/A2/A3, c10/c12/c13/c14 relays and reviews, ancestry re-check, S13/S14 review rounds, the 11-draft Z.ai prompt review, P-287 contract review, `dfdb887` verification, the §1-§6 byte re-checks filed in `0253`.
- **Session-end gate:** `node tools/preserve.mjs check` exits 1 for OTHER worktrees and the Owner's shared `Football Sim` tree only; do not touch them. This branch must read `0 dirty, 0 unpushed, OK`, 0 stashes, 0 local-only commits after this session's commit.
- **If the S15 tree is revised:** re-run the hand-over checks from `inbox/20261121-0246-pickle-S15-handover-checklist.md`, close F1–F4, then require a Verifier different from the builder.

## Open questions (not mine to decide)
- Z.ai / Architect: close F1 (one manifest implementation), F2 (regenerate SHELL-STATUS at final bytes), F3 (regen live docs), F4 (S15 falsifiers + uninterrupted final composite); then hand over build + receipts.
- Architect: rule on the seven improvements, especially I1 generated selector contract, I3 pulse retirement, I5 manifest collapse, I6 engine-node parity; rule the REOPENED `rawSort`; publish corrected v8; record the Cloudflare decision.
- Owner: make-live only after Verifier; correctness-vs-phone re-ranking; provision Cloudflare account/project/token.
- Iceman: re-run §1 on a pruned fetch and re-issue the verdict. MUSE/custodian: relay the ring ruling, fix the 5 pin lines, intake the verbatim directives, withdraw beam's wrong-tree S14 review.

## Live files in this lane
- `_agents/porca/PORCA.md` — this file. `67-cakepanz-15-WIP-2026-11-21/` — Owner-requested verbatim S15 publication on `council/porca` (not a lane build copy).
- `inbox/20261121-0311-porca-S15-review.md` — S15 review (F1–F4). `inbox/20261121-0312-porca-S15-IDEA-cakepanz-ui-ux.md` — S15 implications/improvements (I1–I7). `bulletin/20261121-0313-porca.md` — this session.
- `inbox/20261121-0253-porca-REVIEW-other-seats-supplementary.md`, `inbox/20261121-0254-porca-OWNER-work-order-relay.md`, `inbox/20261121-0033-porca-TO-ZAI-continuation-order.md`, `inbox/20261121-0033-porca-REVIEW-architect-timeout-state.md`, `inbox/20261121-0031-porca-TO-ARCHITECT-reply-dfdb887.md`, `inbox/20261121-0026-porca-REVIEW-architect-dfdb887.md`.
- `_agents/porca/deliverables/zip-root-cakepanz-{10,12,13,14}/` — verbatim relays from earlier S14 work. `inbox/20261120-2348-porca-IDEA-cakepanz-s14-implications.md`, `inbox/20261120-2349-porca-cakepanz-14-review.md`, `inbox/20261120-2359-porca-review-of-seats-s14.md`, `inbox/20261120-2210-porca-P-287-review-dispatchasync-contract-c12-callsites.md`. Historical idea files (`0452`, `1615`, `2003`, `2031`) superseded but kept.

## Role
General advisor. Propose, test, dissent, measure; never build or rule. Work comes from the ranked queue, never from an assignment.
