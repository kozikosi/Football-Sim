# ORCAMAN — lane file (rewrite whole file at end of every session; never append)

## Identity
- **Seat:** ORCAMAN · **Model / how reached:** ORCAMAN / API · **State:** advisor
- **ID block:** n/a · **First seen:** 2026-11-19
- **Strengths shown so far (evidence, not claims):** 2026-11-20 earlier session (commits 5c03f9260..a519b048a): C23 proposal, C31 errata, reviews C12/C14/C27/C13(B2)/A3/C24(B1)/C29(B5). 2026-11-20 earlier this date (6526a527c, 313a06634, c9dd3182b, 408720ea8): published+reviewed `zip-root-cakepanz-10` (cakepanz-11, P-317/T1-T8). 2026-11-20 this session (Owner-directed): published and thoroughly reviewed Z.ai `zai-cakepanz-12-2026-11-20` fix-round delivery (P-317 follow-on, T1-T8 fixes/receipts/open gates) with implications and UI/UX brainstorm.

## Current work
- **Claimed / in progress:** none.
- **Done this session (2026-11-20, Owner-directed: publish + review `zai-cakepanz-12-2026-11-20`):**
  - Start-of-chat followed: `pwd` `/Users/kosi/Desktop/wt/orcaman`, branch `council/orcaman`, `git fetch origin`, read `origin/architect/engine-and-seats:_agents/START-OF-CHAT.md`, `sync-base.sh` (up to date @ 864a6aa12), `preserve.mjs check` (orcaman clean at start), read AGENTS.md/PROJECT-KNOWLEDGE.md/COUNCIL-BULLETIN.md/V23-OWNER-REQUESTS/lane, read `origin/council/muse:_agents/START-HERE.md`, fetched `origin/council/muse:tools/council.mjs` v9 (`node /tmp/council.mjs next` produced no output). Not retired.
  - Located source: `/Users/kosi/Desktop/Football Sim/zai-cakepanz-12-2026-11-20` (37 files, ~376 KB) — Z.ai 2026-11-20 fix-round sitting (cakepanz-12 on cakepanz-11 base, pin 408410477): T2 seed round-trip (`b36:` contract, 0-failure receipts REPORTED), T1 falsifier D-2 guard + battery hardening (F20 root-cause corrected; full hardened 9-case rerun OPEN), T4 portable `verify-package.mjs`/no-self-entry manifest, T3 gh-pages re-point payload+receipt 277→286 (relay), T6/T7 a11y+one-click guard/disarm+restore reassurance+seed range/URL write-back+768px laws, T5 doc/C25 corrections filed, T8 hosts 48/1/51/49 with repair copy BLOCKED on pinned run-variant bytes.
  - Published artifact to branch: copied to `_agents/orcaman/deliveries/zai-cakepanz-12-2026-11-20/` and committed+pushed on `origin/council/orcaman` (verified via `git ls-remote`).
  - Thorough review pushed: `inbox/20261120-1200-orcaman-zai-cakepanz-12-review.md` (full inspection of changed source/batteries/scripts/tools, inbox T3/T5/T8, receipts partH-c12, gh-pages repoint, docs/checksums). Verdict **ok with named open items**. Covered correctness/risks of each fix, implications for engine-shell boundary/replay/trust, and 21 IDEA proposals for cakepanz UI/UX shell improvements for Claude's engine. Labels: VERIFIED (inspection)/REPORTED (Z.ai runtime)/INFERRED-IDEA; no local reruns.
  - Bulletin: `bulletin/20261120-1602-orcaman.md`.
- **Blocked / waiting on:** nothing owned by me. Open (REPORTED, not mine): full hardened `falsify-board` rerun + final acceptance composite; T3 gh-pages relay; T8 c10 repair copy (needs verified 0a2869… bytes); MUSE/INKLING C25 integration.

## What the next session needs
- **Read first:** `git fetch -q origin && git show origin/council/muse:_agents/START-HERE.md` (Step 0 refresh from `origin/council/muse`); `git show origin/council/muse:tools/council.mjs > /tmp/council.mjs && node /tmp/council.mjs next` for ranked work.
- **Open questions (≤5):**
  1. Cakepanz-12 delivery published at `_agents/orcaman/deliveries/zai-cakepanz-12-2026-11-20/` with review `inbox/20261120-1200-orcaman-zai-cakepanz-12-review.md` — open to independent seat reviews per chain.
  2. 13b full hardened falsifier (expect F20 DIED by FAIL L13) + final acceptance composite at final bytes remain the named closure gate (REPORTED open by Z.ai).
  3. T8 c10 repair stays blocked on run-variant receipt bytes (must copy verified `0a2869…` / 6418 B only; 49/49 or STOP).
  4. T3 gh-pages test re-point payload in `deliverables/gh-pages-repoint/` awaits Owner/relay apply per Architect ruling.
  5. C23/C31 and earlier v4 review queue status not rechecked this session; confirm against current `origin/council/muse` queue next time.

## Files in this lane (live)
- `_agents/orcaman/ORCAMAN.md` — this lane file (rewritten 2026-11-20 end of session)
- `_agents/orcaman/deliveries/zip-root-cakepanz-10/` — prior published delivery (6526a527c)
- `_agents/orcaman/deliveries/zai-cakepanz-12-2026-11-20/` — published cakepanz-12 fix-round delivery (this session)

## Session inbox files (this session)
- `inbox/20261120-1200-orcaman-zai-cakepanz-12-review.md` — thorough review + implications + UI/UX brainstorm (pushed this session)

## Worktree / branch / base
- **Worktree:** `/Users/kosi/Desktop/wt/orcaman`
- **Branch:** `council/orcaman` (HEAD to be pushed this session; prior verified head 313a06634)
- **Merge-base:** `git merge-base HEAD origin/council/base` = `864a6aa12689a9ef579fb1a2fb6c07a1c6bd2c0e`

## Role
General advisor. Propose, test, dissent, measure. No product/engine/pin/governance edits; push only `council/orcaman`.
