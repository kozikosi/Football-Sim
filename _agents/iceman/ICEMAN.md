# ICEMAN — lane file (rewritten each session; do not append)

## Identity
- **Seat:** iceman · **Model / how reached:** Iceman Free (OpenCode) · **State:** advisor
- **ID block:** (none) · **First seen:** 2026-11-09 (admitted by Owner)
- **Strengths shown so far (evidence, not claims):** `d327bc310` (C23/B4 smoke-tool review+proposal), `eaaad8578` (A3 C8b Q7 gap confirm), `a53473fa7` (P-309 grid reconcile), `2528e936`/`049e42e2`/`f07e8d32` (earlier inbox work)

## Current work
- **Claimed / in progress:** none (session ending).
- **Done this session:**
  - Step 0 doc sync: `git checkout origin/council/muse -- AGENTS.md PROJECT-KNOWLEDGE.md _agents/START-HERE.md _agents/START-OF-CHAT.md` (clean status before; included in `d327bc310`, VERIFIED by `git diff --cached --stat`).
  - **C23/B4 (v3+v4):** verified `tools/post-merge-smoke.mjs:421` hard-codes stale `tabGuideBtn` (VERIFIED `grep`/`sed` receipts) and proposed DOM-presence filter + remove stale id (`inbox/20261120-0354-iceman-C23-smoke-tabguidebtn.md`, `inbox/20261120-0358-iceman-B4-C23-smoke-dom-filter.md`).
  - **A3 (v4, C8b third-seat confirm):** confirmed Q7 law test at `408410477` shares `season/week/packHash/engineVersion` between neutral/loaded (`week:5`) so a `snapshot.week`-reading provider can pass while violating Q7; proposed loaded `week:6` (`inbox/20261120-0404-iceman-A3-C8b-Q7-week-gap-confirm.md`).
  - Searched remote council branches for cited v4 filings (C1–C34/C23/C24/C29, 20261119–20 inbox) — none found on fetched refs (REPORTED).
- **Blocked / waiting on:** none from iceman. Owner/Architect/MUSE integrate tool/test proposals as appropriate.

## What the next session needs
- **Read first:**
  1. `_agents/iceman/ICEMAN.md` (this file) — session state and receipts.
  2. `git show origin/council/muse:_agents/START-HERE.md` — live procedure (then step 0 doc refresh).
  3. Council sitting v4 context if continuing: `inbox/20261120-0358-iceman-B4-C23-smoke-dom-filter.md` and `inbox/20261120-0404-iceman-A3-C8b-Q7-week-gap-confirm.md` for my latest work; pick next open item (e.g. B5/C29 if refs reachable, D-specs) via `git fetch -q origin && git show origin/council/muse:tools/council.mjs > ./.council_tool.mjs && node ./.council_tool.mjs next`.
- **Open questions:** none urgent. Whether orcaman’s cited C23 filing exists on a ref not fetched/searchable by name (I found none on `refs/remotes/origin/council/*`).
- **Do not redo:** C23/B4 tabGuideBtn analysis (receipts in `inbox/20261120-0354-iceman-C23-smoke-tabguidebtn.md`, `inbox/20261120-0358-iceman-B4-C23-smoke-dom-filter.md` @ `986738e75`); A3 Q7 week-gap confirmation at `408410477` (`inbox/20261120-0404-iceman-A3-C8b-Q7-week-gap-confirm.md` @ `eaaad8578`); P-309 grid reconcile (`inbox/20261110-0054-iceman-P-309-grid-reconcile.md` @ `a53473fa7`).

## Files in this lane
- `_agents/iceman/ICEMAN.md` — lane file (live).
- `inbox/20261110-0054-iceman-P-309-grid-reconcile.md` — P-309 reconcile (pushed).
- `inbox/20261120-0354-iceman-C23-smoke-tabguidebtn.md` — C23 proposal (pushed).
- `inbox/20261120-0358-iceman-B4-C23-smoke-dom-filter.md` — B4/C23 review+filter proposal (pushed).
- `inbox/20261120-0404-iceman-A3-C8b-Q7-week-gap-confirm.md` — A3 third-seat confirm (pushed).

## Role
General advisor. Admitted by the Owner on 2026-11-09. Propose, test, review, dissent, measure. Never edit product/governance/protected files; never push other seats’ branches; never force-push/stash. Core status is the Owner's call after 3 verified items.

## Worktree / branch
- **Path:** `/Users/kosi/wt/iceman`
- **Branch:** `council/iceman` @ `eaaad8578cb0e62648b18c4a60a7d5e9615875ee` (pushed, VERIFIED `git ls-remote origin refs/heads/council/iceman`)
- **merge-base HEAD origin/council/base:** (computed at session end; base ref `864a6aa12689a9ef579fb1a2fb6c07a1c6bd2c0e`)
- **merge-base HEAD origin/council/muse:** (computed at session end; muse ref `79727216a089cc7258a4d52d08517891286d5857`)
